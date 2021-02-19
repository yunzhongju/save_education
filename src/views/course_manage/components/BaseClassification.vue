<template>
	<div>
		<el-row>
			<h4>课程分类</h4>
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
				<el-tree
				  :data="list"
				  :props="defaultProps"
				  accordion
				  @node-click="handleNodeClick">
				</el-tree>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
	import BaseClassificationForm from './BaseClassificationForm.vue'
  export default {
		components:{
			BaseClassificationForm
		},
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
    data() {
      return {
				dialogVisible:false,
        defaultProps: {
          children: 'children',
          label: 'courseTypeName'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
				this.$emit('handleNodeClick',data)
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
    }
  };
</script>

<style lang="less" scoped>
	.btn{
		display: flex;
		justify-content: space-around;
		li{
			// margin-right: 15px;
			text-align: center;
			margin-top: 10px;
		}
	}
</style>
