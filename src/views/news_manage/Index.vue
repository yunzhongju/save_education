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
											@click="handleAddChannel">添加栏目</el-button>
									  <el-button 
											type="primary" 
											size="mini" 
											@click="handleEditChannel">修改栏目</el-button>
									  <el-button 
											type="primary" 
											size="mini" 
											@click="handleDeleteChannel">删除栏目</el-button>
									</el-button-group>
								</div></el-col>
							  <el-col :span="12"><div class="grid-content bg-purple-dark">
									<ul  class="flex-end">
										<li class="marg-right30">
										  <el-input
											  size="mini"
												placeholder="搜索新闻名称"
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
											添加新闻
											</el-button>
										</li>
									</ul>
								</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
									<el-row>
										<el-col :span="2"><div class="grid-content bg-purple marg-top20">
											<base-classification
												:channelList="channelList"
												@handleNodeClick="handleNodeClick"
											></base-classification>
										</div></el-col>
									  <el-col :span="22"><div class="grid-content bg-purple-dark ">
										<el-row>
										  <el-col :span="24"><div class="grid-content bg-purple-dark">
												<el-radio-group v-model="approve" @change="handleChooseApprove">
												  <el-radio :label="1">通过</el-radio>
												  <el-radio :label="2">未通过</el-radio>
												  <el-radio :label="0">未审核</el-radio>
												</el-radio-group>
											</div></el-col>
										</el-row>
										<el-row>
										  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top10">
												<base-table
												:total="total"
												@getPageSize="getPageSize"
												@getCurrentPage="getCurrentPage"
												>
													<el-table
														ref="multipleTable"
														:data="newsList"
														border
														v-loading="loading"
														tooltip-effect="dark"
														height="600"
														max-height="650"
														@selection-change="handleSelectionChange">
														</el-table-column>
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
																	style="width: 100px; height: 50px"
																	:src="scope.row.imagePath"
																	fit="contain"></el-image>
															</template>
														</el-table-column>
														<el-table-column
															prop="title"
															label="文章标题"
															align="center"
															>
														</el-table-column>
														<el-table-column
															prop="channelName"
															label="栏目"
															align="center"
															>
														</el-table-column>
														<el-table-column
															prop="readNumber"
															label="阅读量"
															align="center"
															>
														</el-table-column>
														<el-table-column
															prop="status"
															label="状态"
															align="center"
															>
															<template slot-scope="scope">
																<span>{{scope.row.approve==0?'未审核':scope.row.approve==1?'通过':'未通过'}}</span>
															</template>
														</el-table-column>
														<el-table-column
															prop="createTime"
															label="创建时间"
															align="center"
															width="180"
															show-overflow-tooltip>
														</el-table-column>
														  <el-table-column label="操作" align="center">
																<template slot-scope="scope">
																	<el-button
																		size="mini"
																		type="text"
																		@click="handleNewsDetail(scope.$index, scope.row)">详情</el-button>
																	<el-button
																		size="mini"
																		type="text"
																		@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
																	<el-button
																		size="mini"
																		type="text"
																		@click="handleDelete(scope.$index, scope.row)">删除</el-button>
																	<el-button
																		size="mini"
																		type="text"
																		@click="handleApproveList(scope.$index, scope.row)">记录</el-button>
																	<el-button
																		size="mini"
																		type="text"
																		v-show="scope.row.approve==0"
																		@click="handleApproveNews(scope.$index, scope.row)">审核</el-button>
																</template>
															</el-table-column>
													</el-table>
												</base-table>
											</div></el-col>
										</el-row>
										</div></el-col>
									</el-row>
								</div></el-col>
							</el-row>
						</div>
						</el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="审核"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <span>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<el-radio-group v-model="radio">
							<el-radio :label="1">通过</el-radio>
							<el-radio :label="2">未通过</el-radio>
						</el-radio-group>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<el-input v-model="input" type="textarea" placeholder="请输入内容"></el-input>
					</div></el-col>
				</el-row>
			</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleApprove">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog title="审核记录" :visible.sync="dialogTableVisible" center>
		  <el-table :data="approveList">
				<el-table-column property="status" align="center" label="审核状态">
					<template slot-scope="scope">
						<span>{{scope.row.approveStatus==1?'通过':'未通过'}}</span>
					</template>
				</el-table-column>
				<el-table-column property="failureCause" align="center" label="审核备注"></el-table-column>
		    <el-table-column property="approveTime" align="center" label="审核日期"></el-table-column>
		  </el-table>
		</el-dialog>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseTable from '../../components/BaseTable.vue'
	import BaseClassification from './components/BaseClassification.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			BaseTable,
			BaseClassification,
		},
		data(){
			return {
				channelList:[],
				currentChannel:null,
				dialogTableVisible:false,
				loading:false,
				id:'',
				input:'',
				radio:1,
				approveList:[],
				dialogVisible:false,
				approve:1,
				newsList:[],
				total:0,
				serachValue:'',
				baseTabs:[
					{
						label: '新闻管理',
						value: '1'
					}
				],
			}
		},
		methods:{
			handleNodeClick(node){
				this.currentChannel=node
				this.newsPage({pageNo:1,pageSize:10,channelId:node.id})
			},
			handleAddChannel(){
				this.$router.push({
					path:'create_channel',
					query:{
						id:null
					}
				})
			},
			handleEditChannel(){
				if(!this.currentChannel){
					this.$message({
						message:'请选择栏目',
						type:'warning'
					})
					return false
				}
				this.$router.push({
					path:'create_channel',
					query:{
						id:this.currentChannel.id
					}
				})
			},
			handleDeleteChannel(){
				if(!this.currentChannel){
					this.$message({
						message:'请选择栏目',
						type:'warning'
					})
					return false
				}
				
				this.$confirm('此操作将删除该栏目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.channelDeleteAPI({id:this.currentChannel.id}).then(res=>{
						if(res.code==0){
							this.channelPage()
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
			handleApproveList(index,row){
				api.queryApproveRecordAPI({contentId:row.id}).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.dialogTableVisible=true
						this.approveList=res.data
					}
				})
			},
			handleApprove(){
				api.approveNewsAPI({contentId:this.id,approveStatus:this.radio,failureCause:this.input}).then(res=>{
					if(res.code==0){
						this.$message({
							message:'审核成功',
							type:'success'
						})
						this.dialogVisible=false
						this.input=''
						this.newsPage({pageNo:1,pageSize:10,approve:this.approve})
					}
				})
			},
			handleApproveNews(index,row){
				this.dialogVisible=true
				this.id=row.id
			},
			handleClose(done){done()},
			handleChooseApprove(val){
				this.newsPage({pageNo:1,pageSize:10,approve:val})
			},
			handleNewsDetail(index,row){
				this.$router.push({
					path:'news_detail',
					query:{
						id:row.id
					}
				})
			},
			onBaseTabClick(){},
			handleSerach(){
				this.newsPage({pageNo:1,pageSize:10,title:this.serachValue})
			},
			handleAdd(){
				this.$router.push({
					path:'create_news',
					query:{
						id:null
					}
				})
			},
			getPageSize(val){
				this.newsPage({pageNo:1,pageSize:val})
			},
			getCurrentPage(val){
				this.newsPage({pageNo:val,pageSize:10})
			},
			handleSelectionChange(){},
			handleComment(index,row){},
			handleEdit(index,row){
				this.$router.push({
					path:'create_news',
					query:{
						id:row.id
					}
				})
			},
			handleDelete(index,row){
				this.$confirm('此操作将删除该资讯, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.newsDeleteAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.newsPage({pageNo:1,pageSize:10,approve:this.approve})
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
			newsPage(params){
				this.loading=true
				api.newsPageAPI(params).then(res=>{
					// console.log('资讯列表',res);
					if(res.code==0){
						this.newsList=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
			},
			channelPage(params){
				api.channelPageAPI(params).then(res=>{
					// console.log('栏目',res);
					if(res.code==0){
						this.currentChannel=null
						this.channelList=res.data
					}
				})
			}
		},
		created() {
			this.newsPage({pageNo:1,pageSize:10})
			this.channelPage()
		}
	}
</script>

<style lang="less" scoped>

</style>


<style>
</style>


<style>
</style>
