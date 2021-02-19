<template>
	<div class="in-animate">
		<base-tabs 
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
					  <el-col :span="12">
							<div class="grid-content bg-purple">
								<el-date-picker
								  size="mini"
									clearable
									v-model="dateTimer"
									type="datetimerange"
									value-format="yyyy-MM-dd HH:mm:ss"
									@change="handleDateTime"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期">
								</el-date-picker>
							</div>
						</el-col>
					  <el-col :span="12">
							<div class="grid-content bg-purple-light">
								<ul  class="flex-end">
									<li class="marg-right30">
									  <el-input
										  size="mini"
											placeholder="搜索试卷名称"
											clearable
											suffix-icon="el-icon-search"
											v-model="serachValue">
										</el-input>
									</li>
									<li class="marg-right30">
										<el-button 
											type="primary" 
											size="mini" 
											@click="handleSerach">
										搜索
										</el-button>
									</li>
									<li class="marg-right30">
										<el-button 
											type="primary" 
											size="mini" 
											icon="el-icon-plus" 
											@click="handleAddPlan"
											>
										创建考试
										</el-button>
									</li>
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
								@getCurrentPage="getCurrentPage"
								>
									<el-table
										ref="multipleTable"
										:data="planList"
										border
										v-loading="loading"
										tooltip-effect="dark"
										max-height="650"
										height="650"
										@selection-change="handleSelectionChange">
										<el-table-column
											label="编号"
											prop="id"
											align="center"
											width="55"
											>
											<template slot-scope="scope">
												<span>{{scope.$index+1}}</span>
											</template>
										</el-table-column>
										<el-table-column
											prop="examName"
											label="考试名称"
											align="center"
											>
										</el-table-column>
										<el-table-column
											prop="begDate"
											label="开始时间"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="endDate"
											label="结束时间"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="examType"
											label="考试方式"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="examCount"
											label="限制考试次数"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="createTime"
											label="创建时间"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										  <el-table-column label="操作" align="center">
												<template slot-scope="scope">
													<el-button
														size="mini"
														type="text"
														@click="handlePlanDetail(scope.$index, scope.row)">详情</el-button>
													<el-button
														size="mini"
														type="text"
														@click="handlePlanEdit(scope.$index, scope.row)">编辑</el-button>
													<el-button
														size="mini"
														type="text"
														@click="handleDeletePlan(scope.$index, scope.row)">删除</el-button>
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
					:detail="planDetail"
				></base-detail>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue'
import BaseDetail from './components/BaseDetail.vue'
import api from '../../api/api.js'
export default {
	components: {
		BaseTabs,
		BaseTable,
		BaseDetail
	},
	data(){
		return {
			loading:false,
			dialogVisible:false,
			serachValue:'',
			dateTimer:'', //按时间筛选
			baseTabs: [{label: '考试信息',value: '1'},],
			planList: [],
			total:0,
			planDetail:''
		}
	},
	methods:{
		handleClose(done){done()},
		handlePlanEdit(index,row){
			this.$router.push({
				path:'/education/online_create_exam',
				query:{
					examCode:row.examCode
				}
			})
		},
		handlePlanDetail(index,row){
			api.queryExamPlanDetailAPI({examCode:row.examCode}).then(res=>{
				// console.log('详情',res);
				this.planDetail=res.data
				this.dialogVisible=true
			})
		},
		//切换baseTabs
		onBaseTabClick(val){
			// console.log(val);
		},
		//删除
		handleDeletePlan(index,row){
			// console.log(row);
			this.$confirm('此操作将删除该考试计划, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				api.deleteExamPlanAPI({id:row.id}).then(res=>{
					if(res.code==0){
						this.queryExamPlanByPage({pageNo:1,pageSize:10})
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		//选中数据
		handleSelectionChange(val){
			// console.log(val);
		},
		//按时间筛选
		handleDateTime(val){
			this.queryExamPlanByPage({pageNo:1,pageSize:10,begDate:val[0],endDate:val[1]})
		},
		//搜索
		handleSerach(){
			this.queryExamPlanByPage({pageNo:1,pageSize:10,context:this.serachValue})
		},

		//创建考试
		handleAddPlan(){
			this.$router.push({
				path:'/education/online_create_exam',
				query:{
					examCode:null
				}
			})
		},
		//获取当前页
		getCurrentPage(val){
			this.queryExamPlanByPage({pageNo:val,pageSize:10})
		},
		//获取pagesize
		getPageSize(val){
			this.queryExamPlanByPage({pageNo:1,pageSize:val})
		},
		queryExamPlanByPage(params){
			this.loading=true
			api.queryExamPlanByPageAPI(params).then(res=>{
				// console.log('考试计划',res);
				if(res.code==0){
					this.planList=res.data.records
					this.total=res.data.total
					this.loading=false
				}
			})
		}
	},
	created() {
		this.queryExamPlanByPage({pageNo:1,pageSize:10})
	}
};
</script>

<style></style>
