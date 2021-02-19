<template>
	<div>
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
					  <el-col :span="3"><div class="grid-content bg-purple marg-top20">
							<base-classification></base-classification>
						</div></el-col>
					  <el-col :span="21"><div class="grid-content bg-purple-light">
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark">
									<ul  class="flex-end">
										<li class="marg-right30">
										  <el-input
											  size="small"
												placeholder="搜索文档名称"
												@change="handleSerach"
												clearable
												suffix-icon="el-icon-search"
												v-model="serachValue">
											</el-input>
										</li>
										<li class="marg-right30">
											<el-button 
												type="primary" 
												size="small" 
												icon="el-icon-plus" 
												@click="handleAdd"
												>
											添加视频
											</el-button>
										</li>
									</ul>
								</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
									<base-table
									:total="100"
									@getPageSize="getPageSize"
									@getCurrentPage="getCurrentPage"
									>
										<el-table
											ref="multipleTable"
											:data="tableData"
											border
											tooltip-effect="dark"
											style="width: 100%;min-height: 650px;"
											max-height="650"
											@selection-change="handleSelectionChange">
										<!-- 	<el-table-column
												type="selection"
												width="55"> -->
											</el-table-column>
											<el-table-column
												label="编号"
												prop="id"
												width="55"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop=""
												label="视频封面"
												align="center"
												width="180"
												>
												<template slot-scope="scope">
													<el-image class="img-size" :src="scope.row.coverimg"></el-image>
												</template>
											</el-table-column>
											<el-table-column
												prop="title"
												label="视频标题"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="column"
												label="栏目"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="readnum"
												label="阅读量"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="status"
												label="状态"
												align="center"
												>
											</el-table-column>
											<el-table-column
												prop="time"
												label="创建时间"
												align="center"
												width="180"
												show-overflow-tooltip>
											</el-table-column>
											  <el-table-column label="操作" width="180" align="center">
													<template slot-scope="scope">
														<el-button
															size="mini"
															@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
														<el-button
															size="mini"
															type="danger"
															@click="handleDelete(scope.$index, scope.row)">删除</el-button>
														<el-button
															size="mini"
															class="marg0"
															type="info"
															@click="handleEdit(scope.$index, scope.row)">移动</el-button>
														<el-button
															size="mini"
															type="warning"
															@click="handleDelete(scope.$index, scope.row)">复制</el-button>
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
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseTable from '../../components/BaseTable.vue'
	import BaseClassification from './components/BaseClassification.vue'
	export default {
		components:{
			BaseTabs,
			BaseTable,
			BaseClassification,
		},
		data(){
			return {
				serachValue:'',
				baseTabs:[
					{
						label: '视频管理',
						value: '1'
					}
				],
				tableData:[
					{
						id:1,
						title:'【PDF】仿真',
						column:'爱尔兰',
						readnum:23,
						status:'发布',
						time:'2020-20-20',
						coverimg:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
					}
				],
			}
		},
		methods:{
			onBaseTabClick(){},
			handleSerach(){},
			handleAdd(){
				this.$router.push('create_video')
			},
			getPageSize(){},
			getCurrentPage(){},
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
		}
	}
</script>

<style lang="less" scoped>

</style>


<style>
</style>


<style>
</style>
