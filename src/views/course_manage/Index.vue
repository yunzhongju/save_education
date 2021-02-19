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
									  <el-button type="primary" size="mini" @click="handleAddCourseType">添加分类</el-button>
									  <el-button type="primary" size="mini" @click="handleEditCourseType">修改分类</el-button>
									  <el-button type="primary" size="mini" @click="handleDeleteCourseType">删除分类</el-button>
									</el-button-group>
								</div></el-col>
							  <el-col :span="12"><div class="grid-content bg-purple-dark">
									<ul  class="flex-end">
										<li class="marg-right30">
										  <el-input
											  size="mini"
												placeholder="搜索课程名称"
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
											添加课程
											</el-button>
										</li>
									</ul>
								</div></el-col>
							</el-row>
							<el-row class="marg-top20">
								<el-col :span="3"><div class="grid-content bg-purple-dark">
									<base-classification
										@handleNodeClick="handleNodeClick"
										:list="courseTypeList"></base-classification>
								</div></el-col>
							  <el-col :span="21"><div class="grid-content bg-purple-dark">
									<base-table
									:total="total"
									@getPageSize="getPageSize"
									@getCurrentPage="getCurrentPage"
									>
										<el-table
											ref="multipleTable"
											:data="courseList"
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
												label="封面"
												align="center"
												>
												<template slot-scope="scope">
													<el-image
														style="width: 100px; height: 100px"
														:src="scope.row.cover"
														fit="scale-down"></el-image>
												</template>
											</el-table-column>
											<el-table-column
												prop="courseName"
												label="课程名称"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="courseTypeName"
												label="课程类型"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="createName"
												label="发布人"
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
															@click="handleDetailCourse(scope.$index, scope.row)">详情</el-button>
														<el-button
															size="mini"
															type="text"
															@click="handleEditCourse(scope.$index, scope.row)">编辑</el-button>
														<el-button
															size="mini"
															type="text"
															@click="handleCourseSectionTree(scope.$index, scope.row)">章节</el-button>
														<el-button
															size="mini"
															v-show="scope.row.status!=1"
															type="text"
															@click="handleDeleteCourseEffective(scope.$index, scope.row)">上架</el-button>
														<el-button
															size="mini"
															type="text"
															v-show="scope.row.status==1"
															@click="handleDeleteCourseInvalid(scope.$index, scope.row)">下架</el-button>
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
		
		<!-- 章节对话框 -->
		<el-dialog
		  title="章节"
		  :visible.sync="dialogVisible"
		  width="30%"
			center
		  :before-close="handleClose">
		  <span>
				<base-section
				 @handleDetailSecton="handleDetailSecton"
				 @handleSection="handleSection"
					:courseCode="courseCode"
					:courseName="courseName"
					:courseSectionList="courseSectionList"></base-section>
			</span>
		</el-dialog>
		
		
		<!-- 课程详情对话框 -->
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisibleDetail"
		  width="50%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="courseDetail"
				></base-detail>
			</span>
		</el-dialog>
		
		<!-- 章节详情对话框 -->
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisibleDetailSection"
		  width="40%"
			center
		  :before-close="handleClose">
		  <span>
				<base-details
					:detail="currentSection"
				></base-details>
			</span>
		</el-dialog>
		
		<!-- 添加/修改分类对话框 -->
		<el-dialog
		  title="添加/修改分类"
		  :visible.sync="dialogVisibleCourseType"
			center
			v-if="dialogVisibleCourseType"
		  :before-close="handleCloseCourseType">
		  <span>
				<ClassForm
				  :detail="currentCourseType"
					@onSubmit="onSubmit"
					@onUpdate="onUpdate"
					></ClassForm>
			</span>
		</el-dialog>
		
		
	</div>
</template>

<script>
	import BaseSection from './components/BaseSection.vue'
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseTable from '../../components/BaseTable.vue'
	import BaseClassification from './components/BaseClassification.vue'
	import ClassForm from './components/BaseClassificationForm.vue'
	import BaseCourse from './components/BaseCourseList.vue'
	import BaseDetail from './components/BaseDetail.vue'
	import BaseDetails from './components/BaseSDetail.vue'
	import api from '../../api/api.js'
	import {bus} from '../../utils/bus.js'
	export default {
		components:{
			BaseTabs,
			BaseTable,
			BaseClassification,
			ClassForm,
			BaseCourse,
			BaseSection,
			BaseDetail,
			BaseDetails
		},
		data(){
			return {
				loading:false,
				dialogVisibleDetailSection:false,
				currentCourseType:null,
				dialogVisibleCourseType:false,
				dialogVisibleDetail:false,
				courseDetail:null,
				courseSectionList:[],
				currentSection:null,
				dialogVisible:false,
				courseList:[],
				courseTypeList:[],
				total:0,
				courseName:null,
				courseCode:null,
				serachValue:'',
				baseTabs:[{label: '课程管理',value: '1'}],
			}
		},
		methods:{
			handleDetailSecton(node){
				// console.log('章节详情',node);
				this.currentSection=node
				this.dialogVisible=false
				this.dialogVisibleDetailSection=true
			},
			handleSection(node){
				this.dialogVisible=false
			},
			handleEditCourseType(){
				if(this.currentCourseType){
					this.dialogVisibleCourseType=true
				}else{
					this.$message({
						message:'请选择分类',
						type:'warning'
					})
				}
			},
			handleDeleteCourseType(){
				if(!this.currentCourseType){
					this.$message({
						message:'请选择分类',
						type:'warning'
					})
					return false
				}else{
					
					this.$confirm('此操作将删除该课程分类, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						api.deleteCourseTypeAPI({courseType:this.currentCourseType.courseType}).then(res=>{
							if(res.code==0){
								this.queryCourseTypeList()
								this.$message({
									message:'删除成功',
									type:'success'
								})
							}
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消下架'
						});          
					});
					
					
				}
			},
			handleAddCourseType(){
				this.currentCourseType=null
				this.dialogVisibleCourseType=true
			},
			onSubmit(){
				this.queryCourseTypeList()
				this.dialogVisibleCourseType=false
			},
			onUpdate(){
				this.queryCourseTypeList()
				this.dialogVisibleCourseType=false
			},
			handleCloseCourseType(done){done()},
			handleDeleteCourseEffective(index,row){
				api.updateCourseEffectiveAPI({id:row.id}).then(res=>{
					if(res.code==0){
						this.$message({
							type: 'success',
							message: '上架成功!'
						});
						this.queryCourseByPage({pageNo:1,pageSize:10})
					}
				})
			},
			handleDeleteCourseInvalid(index,row){
				this.$confirm('此操作将下架改课程, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.updateCourseInvalidAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '下架成功!'
							});
							this.queryCourseByPage({pageNo:1,pageSize:10})
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消下架'
					});          
				});
			},
			handleDetailCourse(index,row){
				this.courseDetail=this.courseList.filter(item=>item.id==row.id)[0]
				this.dialogVisibleDetail=true
			},
			handleClose(done){done()},
			handleCourseSectionTree(index,row){
				this.$router.push({
					path:'section_manage',
					query:{
						courseCode:row.courseCode,
						courseName:row.courseName
					}
				})
			},
			handleNodeClick(node){
				this.currentCourseType=node
				let courseCode=node.courseType
				this.queryCourseByPage({pageNo:1,pageSize:10,courseType:courseCode})
			},
			onBaseTabClick(){},
			handleSerach(){
				this.queryCourseByPage({pageNo:1,pageSize:10,context:this.serachValue})
			},
			handleEditCourse(index,row){
				let course=this.courseList.filter(item=>item.id==row.id)[0]
				localStorage.setItem('course',JSON.stringify(course))
				this.$router.push({path:'create_course',query:{id:row.id}})
			},
			handleAdd(){
				this.$router.push({path:'create_course',query:{id:null}})
			},
			getPageSize(val){
				this.queryCourseByPage({pageNo:1,pageSize:val})
			},
			getCurrentPage(val){
				this.queryCourseByPage({pageNo:val,pageSize:10})
			},
			handleSelectionChange(){},
			handleComment(index,row){},
			handleEdit(index,row){},
			handleDelete(index,row){
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			queryCourseByPage(params){
				this.loading=true
				api.queryCourseByPageAPI(params).then(res=>{
					// console.log('课程列表',res);
					if(res.code==0){
						this.courseList=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
			},
			queryCourseTypeList(params){
				api.queryCourseTypeListAPI(params).then(res=>{
					// console.log('课程分类列表',res);
					if(res.code==0){
						this.courseTypeList=res.data
					}
				})
			}
		},
		created() {
			this.queryCourseByPage({pageNo:1,pageSize:10})
			this.queryCourseTypeList()
		}
	}
</script>

<style>
</style>
