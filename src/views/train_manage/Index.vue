<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input size="mini" 
										placeholder="搜索培训名称" 
										clearable 
										suffix-icon="el-icon-search" 
										v-model="serachValue"></el-input>
									</li>
									<li class="marg-right30">
										<el-button type="primary" 
										size="mini" 
										icon="el-icon-search" 
										@click="handleSerach">搜索</el-button></li>
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
								@getPageSize="getPageSize" 
								@getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="trainList" 
									border 
									v-loading="loading"
									tooltip-effect="dark" 
									style="width: 100%;min-height: 650px;" 
									max-height="650"
									@selection-change="handleSelectionChange">
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
		  width="30%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="trainDetail"
				></base-detail>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import BaseDetail from './components/BaseDetail.vue'
import api from '../../api/api.js'
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
		};
	},
	methods: {
		handleClose(done){done()},
		handleTrainDetail(index,row){
			api.queryTrainPlanDetailAPI({id:row.id}).then(res=>{
				// console.log('培训详情',res);
				this.trainDetail=res.data
				this.dialogVisible=true
			})
		},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
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
		//撤销
		handleCancel(index, row){},
		//删除
		handleDeleteTrain(index, row) {
			// console.log(row);
			this.$confirm('此操作将删除该培训, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteTrainPlanAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.queryTrainPlanByPage({pageNo:1,pageSize:10})
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
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
		//选中数据
		handleSelectionChange(val) {
			// console.log(val);
		},
		//按时间筛选
		handleDateTime(val) {
			// console.log(val);
		},
		//搜索
		handleSerach() {
			this.queryTrainPlanByPage({pageNo:1,pageSize:10,trainName:this.serachValue})
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
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
			this.queryTrainPlanByPage({pageNo:val,pageSize:10})
		},
		//获取pagesize
		getPageSize(val) {
			this.queryTrainPlanByPage({pageNo:1,pageSize:val})
		},
		queryTrainPlanByPage(params){
			this.loading=true
			api.queryTrainPlanByPageAPI(params).then(res=>{
				// console.log('培训列表',res);
				if(res.code==0){
					this.trainList=res.data.records
					this.total=res.data.total
					this.loading=false
				}
			})
		}
	},
	created() {
		this.queryTrainPlanByPage({pageNo:1,pageSize:10})
	}
};
</script>

<style></style>
