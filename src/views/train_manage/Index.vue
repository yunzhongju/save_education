<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input size="mini" 
										placeholder="搜索培训名称" 
										clearable 
										suffix-icon="el-icon-search" 
										v-model="serachForm.context"></el-input>
									</li>
									<li class="marg-right30">
										<el-button type="primary" 
										size="mini" 
										icon="el-icon-search" 
										@click="getData">搜索</el-button></li>
									<li class="marg-right30">
										<el-button type="primary" 
										size="mini" 
										icon="el-icon-plus" 
										@click="handleAdd">新建培训</el-button></li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark marg-top20">
								<base-table 
								:total="total" 
								@getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="trainList" 
									border 
									v-loading="loading"
									tooltip-effect="dark" 
									style="width: 100%;min-height: 650px;" 
									max-height="650">
										<el-table-column
											label="编号"
											align="center"
											width="55"
											>
											<template slot-scope="scope">
												<span>{{scope.$index+1}}</span>
											</template>
										</el-table-column>
										<el-table-column
											label="封面"
											align="center"
											>
											<template slot-scope="scope">
												<el-image
													style="width: 100px; height: 50px"
													:src="scope.row.trainImag"
													fit="contain"></el-image>
											</template>
										</el-table-column>
										<el-table-column 
										prop="trainName" 
										label="培训标题" 
										align="center"></el-table-column>
										<el-table-column 
										prop="trainAddress" 
										label="培训地点" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										prop="remark" 
										label="培训描述" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="begDate" 
										label="开始时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="endDate" 
										label="结束时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										label="操作" 
										align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text"
												@click="handleTrainDetail(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleEditTrain(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleDeleteTrain(scope.$index, scope.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</base-table>
							</div>
						</el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisible"
			center
		  :before-close="handleClose1">
		  <span>
				<base-detail
					:detail="trainDetail"
				></base-detail>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTable from '@/components/BaseTable.vue';
import BaseDetail from './components/BaseDetail.vue'
import api from '@/api/api.js'
export default {
	components: {
		BaseTabs,
		BaseTable,
		BaseDetail
	},
	data() {
		return {
			loading:false,
			dialogVisible:false,
			trainDetail:null,
			serachValue: '',
			trainList:[],
			total:0,
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '培训管理',
					value: '1'
				}
			],
			serachForm:{
				pageNo:1,
				pageSize:10,
				context:''
			}
		};
	},
	methods: {
		handleClose(done){
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		handleClose1(done){
			done();
		},
		handleTrainDetail(index,row){
			api.queryTrainPlanDetailAPI({id:row.id}).then(res=>{
				// // console.log('培训详情',res);
				this.trainDetail=res.data
				this.trainDetail.studentList=this.trainDetail.studentList.map(v=>{
					v.studentName=v.userName
					return v
				})
				this.dialogVisible=true
			})
		},

		//编辑
		handleEditTrain(index, row) {
			this.$router.push({
				path:'create_train',
				query:{
					id:row.id
				}
			});
		},

		//删除
		handleDeleteTrain(index, row) {
			// // console.log(row);
			this.$confirm('此操作将删除该培训, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteTrainPlanAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.getData()
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}else{
								this.$message({
									message:res.msg,
									type:'warning'
								})
							}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},


		//创建考试
		handleAdd() {
			this.$router.push({
				path:'create_train',
				query:{
					id:null
				}
			});
		},
		//获取当前页
		getCurrentPage(val) {
			this.serachForm.pageNo=val
			this.getData()
		},

		queryTrainPlanByPage(params){
			this.loading=true
			api.queryTrainPlanByPageAPI(params).then(res=>{
				// // console.log('培训列表',res);
				this.trainList=res.data.records
				this.total=res.data.total
				this.loading=false
			})
		},
		getData(){
			this.queryTrainPlanByPage(this.serachForm)
		}
	},
	created() {
		this.getData()
		this.$store.commit('setUsers',[])
	}
};
</script>

<style></style>
