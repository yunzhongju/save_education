<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
					  <el-col :span="0"><div class="grid-content bg-purple marg-top20">
							<base-classification></base-classification>
						</div></el-col>
					  <el-col :span="24"><div class="grid-content bg-purple-light">
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark">
									<ul  class="flex-end">
										<li class="marg-right30">
										  <el-input
											  size="mini"
												placeholder="搜索试题名称"
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
											添加试题
											</el-button>
										</li>
									</ul>
								</div></el-col>
							</el-row>
							<el-row class="marg-top20">
								<el-col :span="3"><div class="grid-content bg-purple">
									<base-classification @getNode="getNode"></base-classification>
								</div></el-col>
							  <el-col :span="21"><div class="grid-content bg-purple-dark">
									<base-table
									:total="total"
									@getPageSize="getPageSize"
									@getCurrentPage="getCurrentPage"
									>
										<el-table
											ref="multipleTable"
											:data="questionList"
											border
											v-loading="loading"
											tooltip-effect="dark"
											height="650"
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
												prop="questionName"
												label="题干"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="questionIndex"
												label="题号"
												align="center"
												width="50"
												>
											</el-table-column>
											<el-table-column
												prop="courseName"
												label="所属课程"
												align="center"
												show-overflow-tooltip>
											</el-table-column>
											<el-table-column
												prop="sectionName"
												label="所属章节"
												align="center"
												show-overflow-tooltip>
											</el-table-column>
											<el-table-column
												prop="updateTime"
												label="更新时间"
												align="center"
												show-overflow-tooltip>
											</el-table-column>
											  <el-table-column label="操作" width="180" align="center">
													<template slot-scope="scope">
														<el-button
															size="mini"
															type="text"
															@click="handleQuestionDetail(scope.$index, scope.row)">详情</el-button>
														<el-button
															size="mini"
															type="text"
															@click="handleEditQuestion(scope.$index, scope.row)">编辑</el-button>
														<el-button
															size="mini"
															type="text"
															@click="handleDeleteQuestion(scope.$index, scope.row)">删除</el-button>
													</template>
												</el-table-column>
										</el-table>
									</base-table>
								</div></el-col>
							</el-row>
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
					:detail="questionDetail"
				></base-detail>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseTable from '../../components/BaseTable.vue'
	import BaseClassification from './components/BaseClassification.vue'
	import BaseDetail from './components/BaseDetail.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			BaseTable,
			BaseClassification,
			BaseDetail
		},
		data(){
			return {
				loading:false,
				dialogVisible:false,
				questionDetail:null,
				questionList:[],
				total:0,
				serachValue:'',
				tableData:[
					{
						id:1,
						title:'水域是港口最主要的组成部分，它又可分为港内水域和（ ）。',
						type:'数学',
						content:'单选题'
					}
				],
				baseTabs:[
					{
						label: '题库管理',
						value: '1'
					}
				],
			}
		},
		methods:{
			getNode(node){
				// console.log(node);/
				this.queryQuestionByPage({pageNo:1,pageSize:10,sectionCode:node.sectionCode})
			},
			handleClose(done){done()},
			onBaseTabClick(){},
			handleSerach(){
				this.queryQuestionByPage({pageNo:1,pageSize:10,context:this.serachValue})
			},
			handleAdd(){
				this.$router.push({
					path:'create_question',
					query:{
						id:null
					}
				})
			},
			handleQuestionDetail(index,row){
				api.queryQuestionDetailAPI({id:row.id}).then(res=>{
					// console.log("详情",res);
					if(res.code==0){
						this.questionDetail=res.data
						this.dialogVisible=true
					}
				})
			},
			handleEditQuestion(index,row){
				this.$router.push({
					path:'create_question',
					query:{
						id:row.id
					}
				})
			},
			getPageSize(val){
				this.queryQuestionByPage({pageNo:1,pageSize:val})
			},
			getCurrentPage(val){
				this.queryQuestionByPage({pageNo:val,pageSize:10})
			},
			handleSelectionChange(){},
			handleDeleteQuestion(index,row){
				this.$confirm('此操作将删除该题目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deleteQuestionAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.queryQuestionByPage({pageNo:1,pageSize:10})
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
			queryQuestionByPage(params){
				this.loading=true
				api.queryQuestionByPageAPI(params).then(res=>{
					// console.log('试题列表',res);
					if(res.code==0){
						this.questionList=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
		}
		},
		created() {
			this.queryQuestionByPage({pageNo:1,pageSize:10})
		}
	}
</script>

<style>
</style>


<style>
</style>


<style>
</style>
