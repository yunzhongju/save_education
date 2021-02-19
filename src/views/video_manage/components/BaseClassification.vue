<template>
	<div>
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark">
				<h3>栏目分类</h3>
				<ul class="btn marg-top20" >
					<li>
						<el-button
							size="mini"
							@click="handleAdd">添加
						</el-button>
					</li>
					<li>
						<el-button
							size="mini"
							@click="handleUpdate">修改
						</el-button>
					</li>
					<li>
						<el-button
							size="mini"
							@click="handleDelete">删除
						</el-button>
					</li>
				</ul>
			</div></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
				<el-tree
				  :data="data"
				  :props="defaultProps"
				  accordion
				  @node-click="handleNodeClick">
				</el-tree>
			</div></el-col>
		</el-row>
		
		
		<el-dialog
		  title="添加/修改分类"
		  :visible.sync="dialogVisible"
		  width="30%"
			center
		  :before-close="handleClose">
		  <div>
				<BaseClassificationForm></BaseClassificationForm>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import BaseClassificationForm from './BaseClassificationForm.vue'
  export default {
		components:{
			BaseClassificationForm
		},
    data() {
      return {
				dialogVisible:false,
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        // console.log(data);
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
		}
	}
</style>
