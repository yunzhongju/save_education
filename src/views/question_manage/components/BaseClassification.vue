<template>
	<div>
		
		<el-row>
			<h4>题库分类</h4>
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20 " >
				<el-select 
					v-model="value" 
					placeholder="请选择课程" 
					@change="handleCourseType"
					style="width: 90%;" 
					clearable
					size="mini">
				    <el-option
				      v-for="item in courseList"
				      :key="item.courseCode"
				      :label="item.courseName"
				      :value="item.courseCode">
				    </el-option>
				  </el-select>
			</div></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20 over-x">
				<el-tree
				  :data="courseSectionTree"
				  :props="defaultProps"
				  accordion
				  @node-click="handleNodeClick">
					<div slot-scope="{ node, data }">
						<el-tooltip class="item" effect="light" :content="node.label" placement="top">
							<span>{{node.label}}</span>
						</el-tooltip>
					</div>
				</el-tree>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
	import BaseClassificationForm from './BaseClassificationForm.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseClassificationForm
		},
    data() {
      return {
				value:'',
				courseList:[],
				courseSectionTree:[],
				dialogVisible:false,
        defaultProps: {
          children: 'childrenSectionList',
          label: 'sectionName'
        }
      };
    },
    methods: {
			handleCourseType(val){
				this.queryCourseSectionTree({courseCode:val})
			},
      handleNodeClick(data) {
				this.$emit('getNode',data)
      },
			handleAdd(){
				this.dialogVisible=true
			},
			handleUpdate(){
				this.dialogVisible=true
			},
			handleClose(done){done()},
			handleDelete(){
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
				api.queryCourseByPageAPI(params).then(res=>{
					// console.log('课程列表',res);
					if(res.code==0){
						this.courseList=res.data.records
					}
				})
			},
			queryCourseSectionTree(params){
				api.queryCourseSectionTreeAPI(params).then(res=>{
					// console.log('章节列表',res);
					if(res.code==0){
						this.courseSectionTree=res.data
					}
				})
			}
    },
		created() {
			this.queryCourseByPage({pageNo:1,pageSize:100})
		}
  };
</script>

<style lang="less" scoped>
	.btn{
		display: flex;
		justify-content: space-around;
		li{
			margin-right: 15px;
		}
	}
	.over-x{
		overflow-x: auto;
		height: 565px;
	}
</style>
