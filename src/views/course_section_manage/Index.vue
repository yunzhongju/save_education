<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark flex-end">
							<el-button
							  class="marg-right30"
								type="primary"
								icon="el-icon-plus" 
								@click="handleAdd"
								size="mini">添加章节</el-button>
							<el-button
								class="marg-right30"
								type="primary"
								icon="el-icon-refresh-left" 
								@click="$router.go(-1)"
								size="mini">返回</el-button>
						</div></el-col>
					</el-row>
					<el-row class="marg-top20">
					  <el-col :span="24"><div class="grid-content bg-purple-dark ">
							<base-table
								:showFoot="false"
								>
								<el-table 
									ref="multipleTable" 
									:data="courseSectionList" 
									border 
									v-loading="loading"
									row-key="id"
									tooltip-effect="dark" 
									height="680"
									:tree-props="{children: 'childrenSectionList'}"
									highlight-current-row
								>
									<el-table-column
										label="编号"
										align="center"
										width="100"
										>
										<template slot-scope="scope">
											<span>{{scope.$index+1}}</span>
										</template>
									</el-table-column>
									<el-table-column 
									prop="sectionName" 
									label="章节名" 
									align="center"></el-table-column>
									<el-table-column
									prop="duration" 
									label="时长" 
									align="center">
									</el-table-column>
									<el-table-column
									prop="remark" 
									label="描述" 
									align="center"></el-table-column>
									<el-table-column 
									prop="courseName" 
									label="所属课程" 
									align="center" 
									show-overflow-tooltip></el-table-column>
									<el-table-column 
									label="操作" align="center">
										<template slot-scope="scope">
											<el-button
											size="mini" 
											type="text" 
											@click="handleDetailSection(scope.$index, scope.row)">详情</el-button>
											<el-button
											size="mini" 
											type="text" 
											v-show="!scope.row.parentSectionCode"
											@click="handleAddSection(scope.$index, scope.row)">添加</el-button>
											<el-button
											size="mini" 
											type="text" 
											@click="handleEditSection(scope.$index, scope.row)">编辑</el-button>
											<el-button 
											size="mini" 
											type="text" 
											@click="handleDeleteSection(scope.$index, scope.row)">删除</el-button>
										</template>
									</el-table-column>
								</el-table>
							</base-table>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加/修改章节"
		  :visible.sync="dialogVisible"
			v-if="dialogVisible"
			center
		  :before-close="handleClose">
				<base-form
					:isAdd="isAdd"
					@submit="submit"
					@update="update"
					:parentSectionCode="currentSection?currentSection.sectionCode:null"
					:parentSectionName="currentSection?currentSection.sectionName:null"
					:currentCourse="currentCourse"
					:currentSection="currentSection"
				></base-form>
		</el-dialog>
		
		<el-dialog
		  :visible.sync="dialogVisibleDetail"
			center
		  :before-close="handleClose">
			<div style="display: flex;justify-content: center;">
				<img
					v-if="!sectionUrl.endsWith('mp4')" 
					:src="sectionUrl">
				<video 
					:src="sectionUrl" 
					controls 
					autoplay
					muted="muted"
					v-if="sectionUrl.endsWith('mp4')" 
					style="width: 100%; height: 100%;"></video>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseForm from './components/BaseForm.vue'
	import BaseTable from '../../components/BaseTable.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			BaseForm,
			BaseTable,
		},
		data(){
			return {
				dialogVisibleDetail:false,
				sectionUrl:'',
				loading:false,
				isAdd:false,
				currentCourse:{},
				currentSection:null,
				dialogVisible:false,
				courseSectionList:[],
				courseCode:null,
				baseTabs:[
					{
						label: '课程章节',
						value: '1'
					}
				],
			}
		},
		methods:{
			handleDetailSection(index,row){
				// console.log(row);
				this.sectionUrl=row.sectionUrl
				this.dialogVisibleDetail=true
			},
			handleEditSection(index,row){
				this.isAdd=false
				this.currentSection=row
				this.dialogVisible=true
			},
			handleDeleteSection(index,row){
				// console.log(row)
				this.$confirm('此操作将删除该章节, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deleteCourseSectionAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.queryCourseSectionTree({courseCode:this.currentCourse.courseCode})
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			update(){
				this.dialogVisible=false
				this.queryCourseSectionTree({courseCode:this.currentCourse.courseCode})
			},
			submit(){
				this.dialogVisible=false
				this.queryCourseSectionTree({courseCode:this.currentCourse.courseCode})
			},
			handleAdd(){
				this.currentSection=null
				this.isAdd=true
				this.dialogVisible=true
			},
			handleAddSection(index,row){
				this.isAdd=true
				this.currentSection=row
				this.dialogVisible=true
			},
			handleClose(done){done()},
			onBaseTabClick(){},
			queryCourseSectionTree(params){
				this.loading=true
				api.queryCourseSectionTreeAPI(params).then(res=>{
					// console.log('章节列表',res);
					if(res.code==0){
						this.courseSectionList=res.data
						this.loading=false
					}
				})
			}
		},
		created() {
			this.currentCourse['courseCode']=this.$route.query.courseCode
			this.currentCourse['courseName']=this.$route.query.courseName
			this.queryCourseSectionTree({courseCode:this.currentCourse.courseCode})
		}
	}
</script>

<style>
</style>
