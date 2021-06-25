<template>
	<div>
		<el-row>
			<h4>图书分类</h4>
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
				<el-tree
				  :data="bookTypeList"
				  :props="defaultProps"
				  accordion
				  @node-click="handleNodeClick">
				</el-tree>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
  export default {
		props:{
			bookTypeList:{
				type:Array,
				default:()=>[]
			}
		},
    data() {
      return {
				dialogVisible:false,
        defaultProps: {
          children: 'children',
          label: 'bookTypeName'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
				this.$emit('getNode',data)
      },
			handleAdd(){
				this.dialogVisible=true
			},
			handleUpdate(){
				this.dialogVisible=true
			},
			handleClose(done){
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
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

    },
		created() {
		}
  };
</script>

<style lang="less" scoped>
	.btn{
		display: flex;
		justify-content: space-around;
		li{
			// margin-right: 15px;
		}
	}
</style>
