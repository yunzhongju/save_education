<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
					  <el-col :span="24">
							<div class="grid-content bg-purple-dark">
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
											icon="el-icon-search"
											@click="handleSerach"
											>
										搜索
										</el-button>
									</li>
									<li class="marg-right30">
										<el-button 
											type="primary" 
											size="mini" 
											icon="el-icon-plus" 
											@click="handleAdd"
											>
										添加试卷
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
										:data="paperList"
										border
										v-loading="loading"
										tooltip-effect="dark"
										height="650"
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
											prop="paperName"
											label="试卷名称"
											align="center"
											>
										</el-table-column>
										<el-table-column
											prop="sumScore"
											label="总分"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="passScore"
											label="及格分"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="createTime"
											label="创建时间"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="updateTime"
											label="更新时间"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										<el-table-column
											prop="remark"
											label="试卷说明"
											align="center"
											show-overflow-tooltip>
										</el-table-column>
										  <el-table-column label="操作" align="center">
												<template slot-scope="scope">
													<el-button
														size="mini"
														type="text"
														@click="handlePaperDetail(scope.$index, scope.row)">详情</el-button>
													<el-button
														size="mini"
														type="text"
														@click="handleEditPaper(scope.$index, scope.row)">编辑</el-button>
													<el-button
														size="mini"
														type="text"
														@click="handleDeletePaper(scope.$index, scope.row)">删除</el-button>
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
					:detail="paperDetail"
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
		components:{
			BaseTabs,
			BaseTable,
			BaseDetail
		},
		data(){
			return {
				loading:false,
				dialogVisible:false,
				paperDetail:'',
				serachValue:'',
				paperList:[],
				total:0,
				baseTabs:[{label: '试卷管理',value: '1'}],
			}
		},
		methods:{
			handleEditPaper(index,row){
				this.$router.push({
					path:'create_test_paper',
					query:{
						id:row.id
					}
				})
			},
			handleClose(done){done()},
			handlePaperDetail(index,row){
				api.queryPaperDetailAPI({id:row.id}).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.paperDetail=res.data
						this.dialogVisible=true
					}
				})
			},
			onBaseTabClick(){},
			handleSerach(){
				this.queryPaperByPage({pageNo:1,pageSize:10,context:this.serachValue})
			},
			handleAdd(){
				this.$router.push({
					path:'create_test_paper',
					query:{
						id:null
					}
				})
			},
			getPageSize(val){
				this.queryPaperByPage({pageNo:1,pageSize:val})
			},
			getCurrentPage(val){
				this.queryPaperByPage({pageNo:val,pageSize:10})
			},
			handleDeletePaper(index,row){
				this.$confirm('此操作将除该试卷, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deletePaperAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.queryPaperByPage({pageNo:1,pageSize:10})
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
			queryPaperByPage(params){
				this.loading=true
				api.queryPaperByPageAPI(params).then(res=>{
					// console.log('试卷list',res);
					if(res.code==0){
						this.paperList=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
			}
		},
		created() {
			this.queryPaperByPage({pageNo:1,pageSize:10})
		}
	}
</script>

<style>
</style>


<style>
</style>
