<template>
	<div>
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark">
				<el-button type="primary" size="mini" icon="el-icon-plus" @click="addChapter">添加章节</el-button>
			</div></el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark">
				<el-tree
					:data="data"
					node-key="id"
					accordion
					default-expand-all
					:expand-on-click-node="false">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
							<el-button
								type="text"
								size="mini"
								@click="() => append(data)">
								添加
							</el-button>
							<el-button
								type="text"
								size="mini"
								@click="() => remove(node, data)">
								删除
							</el-button>
							<el-button
								type="text"
								size="mini"
								@click="() => update(node, data)">
								修改
							</el-button>
						</span>
					</span>
				</el-tree>
			</div></el-col>
		</el-row>
		
		<el-dialog
		  title="添加/修改章节"
		  :visible.sync="dialogVisible"
			center
		  :before-close="handleClose">
		  <span>
				<chapter-form></chapter-form>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import ChapterForm from './ChapterForm.vue'
  export default {
		components:{
			ChapterForm
		},
    data() {
      const data = [{
        id: 1,
        label: 'JavaScript',
        children: [{
          id: 4,
          label: 'JavaScript 入门',}]
      },
			{
			  id: 2,
			  label: 'Python',
			  children: [{
			    id: 4,
			    label: 'Python 入门',},
					{
					  id: 5,
					  label: 'Python 爬虫',}]
			}];
      return {
        data: JSON.parse(JSON.stringify(data)),
        dialogVisible:false
      }
    },

    methods: {
			handleClose(done){
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			addChapter(){
				this.dialogVisible=true
			},
      append(data) {
        // // console.log(data);
				this.dialogVisible=true
      },
			update(data) {
			  // // console.log(data);
				this.dialogVisible=true
			},
      remove(node, data) {
        // // console.log(data,node);
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
