<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-light">
							<el-row>
								<el-col :span="12"><div class="grid-content bg-purple">
									<el-button-group>
									  <el-button 
											type="primary" 
											size="mini" 
											@click="handleAddBookType">添加分类</el-button>
									  <el-button 
											type="primary" 
											size="mini" 
											@click="handleEditBookType">修改分类</el-button>
									  <el-button 
											type="primary" 
											size="mini" 
											@click="handleDeleteBookType">删除分类</el-button>
									</el-button-group>
								</div></el-col>
							  <el-col :span="12"><div class="grid-content bg-purple-dark">
									<ul  class="flex-end">
										<li class="marg-right30">
										  <el-input
											  size="mini"
												placeholder="搜索文档名称"
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
											创建图书
											</el-button>
										</li>
									</ul>
								</div></el-col>
							</el-row>
							<el-row class="marg-top20">
								<el-col :span="2"><div class="grid-content bg-purple ">
									<base-classification 
										@getNode="getNode"
										:bookTypeList="bookTypeList"></base-classification>
								</div></el-col>
							  <el-col :span="22"><div class="grid-content bg-purple-dark ">
									<base-table
									:total="total"
									@getPageSize="getPageSize"
									@getCurrentPage="getCurrentPage"
									>
										<el-table
											ref="multipleTable"
											:data="bookList"
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
													<div class="block">
														<el-image
															style="width: 50px; height: 100px"
															:src="scope.row.cover"
															fit="scale-down"></el-image>
													</div>
												</template>
											</el-table-column>
											<el-table-column
												prop="bookName"
												label="图书名称"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="autor"
												label="作者"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="bookTypeName"
												label="类别"
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
											  <el-table-column label="操作" align="center">
													<template slot-scope="scope">
														<el-button
															size="mini"
															type="text"
															@click="handleBookDetail(scope.$index, scope.row)">详情</el-button>
														<el-button
															size="mini"
															type="text"
															@click="handleEditBook(scope.$index, scope.row)">编辑</el-button>
														<el-button
															size="mini"
															type="text"
															@click="handleDeleteBook(scope.$index, scope.row)">删除</el-button>
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
		
		<!-- 详情对话框 -->
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisible"
		  width="40%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="bookDetail"
				></base-detail>
			</span>
		</el-dialog>
		
		<!-- 分类编辑对话框 -->
		<el-dialog
		  title="添加/修改分类"
		  :visible.sync="dialogVisibleBookType"
			center
			v-if="dialogVisibleBookType"
		  :before-close="handleCloseBookType">
		  <span>
				<ClassForm
				  :detail="currentBookType"
					@onSubmit="onSubmit"
					@onUpdate="onUpdate"
					></ClassForm>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseTable from '../../components/BaseTable.vue'
	import BaseClassification from './components/BaseClassification.vue'
	import ClassForm from './components/BaseClassificationForm.vue'
	import BaseDetail from './components/BaseDetail.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			BaseTable,
			BaseClassification,
			ClassForm,
			BaseDetail
		},
		data(){
			return {
				loading:false,
				currentBookType:null,
				dialogVisibleBookType:false,
				bookDetail:'',
				dialogVisible:false,
				total:0,
				serachValue:'',
				bookList:[],
				bookTypeList:[],
				baseTabs:[{label: '图书管理',value: '1'}],
			}
		},
		methods:{
			handleEditBookType(){
				if(this.currentBookType){
					this.dialogVisibleBookType=true
				}else{
					this.$message({
						message:'请选择分类',
						type:'warning'
					})
				}
			},
			handleDeleteBookType(){
				if(this.currentBookType){
					this.$confirm('此操作将删除该图书分类, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						api.deleteBookTypeAPI({bookType:this.currentBookType.bookType}).then(res=>{
							if(res.code==0){
								this.queryBookTypeList()
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
				}else{
					this.$message({
						message:'请选择分类',
						type:'warning'
					})
				}
			},
			onSubmit(){
				this.dialogVisibleBookType=false
				this.queryBookTypeList()
			},
			onUpdate(){
				this.dialogVisibleBookType=false
				this.queryBookTypeList()
			},
			getNode(val){
				this.currentBookType=val
				this.queryBookByPage({pageNo:1,pageSize:10,bookType:val.bookType})
			},
			handleAddBookType(){
				this.currentBookType=null
				this.dialogVisibleBookType=true
			},
			handleCloseBookType(done){done()},
			handleClose(done){done()},
			handleBookDetail(index,row){
				api.queryBookDetailAPI({bookCode:row.bookCode}).then(res=>{
					// console.log('书籍详情',res);
					if(res.code==0){
						this.bookDetail=res.data
						this.dialogVisible=true
					}
				})
			},
			handleEditBook(index,row){
				this.$router.push({
					path:'create_book',
					query:{
						bookCode:row.bookCode
					}
				})
			},
			onBaseTabClick(){},
			handleSerach(){
				this.queryBookByPage({pageNo:1,pageSize:10,bookName:this.serachValue})
			},
			handleAdd(){
				this.$router.push({
					path:'create_book',
					query:{
						bookCode:null
					}
				})
			},
			getPageSize(val){
				this.queryBookByPage({pageNo:1,pageSize:val})
			},
			getCurrentPage(val){
				this.queryBookByPage({pageNo:val,pageSize:10})
			},
			handleSelectionChange(){},
			handleComment(index,row){},
			handleEdit(index,row){},
			handleDeleteBook(index,row){
				this.$confirm('此操作将删除该图书, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deleteBookAPI({bookCode:row.bookCode}).then(res=>{
						if(res.code==0){
							this.queryBookByPage({pageNo:1,pageSize:10})
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
			queryBookByPage(params){
				this.loading=true
				api.queryBookByPageAPI(params).then(res=>{
					// console.log('图书列表',res);
					if(res.code==0){
						this.bookList=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
			},
			queryBookTypeList(){
				api.queryBookTypeListAPI().then(res=>{
					// console.log('图示分类列表',res);
					if(res.code==0){
						this.bookTypeList=res.data
					}
				})
			}
		},
		created() {
			this.queryBookByPage({pageNo:1,pageSize:10})
			this.queryBookTypeList()
		}
	}
</script>

<style>
</style>
