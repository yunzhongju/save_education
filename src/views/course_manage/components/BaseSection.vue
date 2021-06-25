<template>
	<div class="block">
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark  flex-end">
				<el-button type="primary" size="mini" @click="handleAddSection">添加章节</el-button>
			</div></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
				<el-tree
					:data="courseSectionList" 
					node-key="id" 
					:props="props">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
							<el-button type="text" size="mini" @click="handleDetailSecton(data)">详情</el-button>
							<el-button type="text" size="mini" @click="handleAddSectionChild(data)">添加</el-button>
							<el-button type="text" size="mini" @click="handleDeleteSection(data)">删除</el-button>
							<el-button type="text" size="mini" @click="handleEditSection(data)">编辑</el-button>
						</span>
					</span>
				</el-tree>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
import api from '../../../api/api.js'
export default {
	props:{
		courseSectionList:{
			type:Array,
			default:()=>[]
		},
		courseCode:String,
		courseName:String
	},
	data() {
		return {
			dialogVisible:false,
			props:{
				label:'sectionName',
				children:'childrenSectionList'
			}
		}
	},
	methods: {
		handleDetailSecton(node){
			this.$emit('handleDetailSecton',node)
		},
		handleEditSection(node){
			localStorage.setItem('section',JSON.stringify(node))
			this.$router.push({
				path:'section_manage',
				query:{
					id:node.id,
					courseCode:this.courseCode,
					courseName:this.courseName,
					parentSectionCode:null,
					parentSectionName:null,
				}
			})
		},
		handleDeleteSection(node){
			// // console.log(node);
			this.$confirm('此操作将删除该章节, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				api.deleteCourseSectionAPI({id:node.id}).then(res=>{
					if(res.code==0){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.$emit("handleSection",node)
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		handleAddSection(node){
			this.$router.push({
				path:'section_manage',
				query:{
					id:null,
					courseCode:this.courseCode,
					courseName:this.courseName,
					parentSectionCode:null,
					parentSectionName:null,
				}
			})
		},
		handleAddSectionChild(node){
			this.$router.push({
				path:'section_manage',
				query:{
					courseCode:node.courseCode,
					courseName:node.courseName,
					parentSectionCode:node.sectionCode,
					parentSectionName:node.sectionName,
				}
			})
		}
	},
};
</script>

<style>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}
</style>
