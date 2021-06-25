<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div>
					<el-row>
						<el-col :span="12">
							<div class="grid-content bg-purple-light">
								<el-button-group>
								  <el-button 
										type="primary" 
										size="mini" 
										@click="handleAddOrg"
										icon="el-icon-plus">添加</el-button>
								  <el-button 
										type="primary" 
										size="mini" 
										@click="handleEditOrg"
										icon="el-icon-edit">修改</el-button>
								  <el-button 
										type="primary" 
										size="mini" 
										@click="handleDelOrg"
										icon="el-icon-delete">删除</el-button>
								</el-button-group>
							</div>
						</el-col>
					</el-row>
					<el-row class="marg-top20" :gutter="10">
					  <el-col :span="5"><div class="grid-content bg-purple ">
						<el-card class="card">
							<el-tree 
								:data="orgList" 
								node-key="orgCode"
								:props="defaultProps" 
								accordion
								draggable
								@node-drop="nodeDrop"
								:default-expanded-keys="['ZGS']"
								@node-click="handleNodeClick">
								<div class="showname" slot-scope="{ node, data }">
									<el-tooltip 
										class="item" 
										effect="light" 
										:visible-arrow="false"
										:content="node.label" placement="right">
											<span >
												<img 
													src="../../assets/images/org.png" 
													style="width: 12px;height: 12px;">
												{{node.label}}</span>
									</el-tooltip>
								</div>
							</el-tree>
						</el-card>
						</div></el-col>
					  <el-col :span="19"><div class="grid-content bg-purple-light">
							<el-card class="card">
							  <el-tabs v-model="activeName" @tab-click="handleClick">
							      <el-tab-pane label="基本信息" name="0">
							  			<base-detail :detail="orgDeatil" @onHandleUpdate="onHandleUpdate"></base-detail>
							  		</el-tab-pane>
							      <el-tab-pane :label="'下级机构('+orgTotal+')'" name="1">
											<base-table
											:total="orgTotal" 
											@getPageSize="getPageSizeOrg" 
											@getCurrentPage="getCurrentPageOrg">
											<el-table
												ref="multipleTable"
												:data="secendList"
												border
												v-loading="loading"
												tooltip-effect="dark"
												height="500">
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
													label="机构编码"
													prop="orgCode"
													align="center"
													>
												</el-table-column>
												<el-table-column
													prop="orgName"
													label="机构名称"
													align="center"
													>
												</el-table-column>
												<el-table-column
													prop="counts"
													label="成员"
													align="center"
													>
												</el-table-column>
												<el-table-column
													prop="linkman"
													label="联系人"
													align="center"
													>
												</el-table-column>
												<el-table-column
													prop="linkphone"
													label="联系方式"
													align="center"
													>
												</el-table-column>
													<el-table-column label="操作" align="center">
														<template slot-scope="scope">
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
																v-show="scope.row.status==1"
																type="text"
																@click="handleOrgStop(scope.$index, scope.row)">停用</el-button>
															<el-button
																size="mini"
																type="text"
																v-show="scope.row.status==0"
																@click="handleOrgStart(scope.$index, scope.row)">启用</el-button>
														</template>
													</el-table-column>
												</el-table>
											</base-table>
										</el-tab-pane>
							      <el-tab-pane :label="'下级小组('+groupTotal+')'" name="2">
											<base-table
											:total="groupTotal" 
											@getPageSize="getPageSizeGroup" 
											@getCurrentPage="getCurrentPageGroup">
												<el-table
													ref="multipleTable"
													:data="groupList"
													border
													v-loading="loading"
													tooltip-effect="dark"
													height="550"
													max-height="650">
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
														label="小组编码"
														prop="orgCode"
														align="center"
														>
													</el-table-column>
													<el-table-column
														prop="orgName"
														label="小组名称"
														align="center"
														>
													</el-table-column>
													<el-table-column
														prop="counts"
														label="成员"
														align="center"
														>
													</el-table-column>
													<el-table-column
														prop="linkman"
														label="联系人"
														align="center"
														>
													</el-table-column>
													<el-table-column
														prop="linkphone"
														label="联系方式"
														align="center"
														>
													</el-table-column>
													<el-table-column label="操作" align="center">
														<template slot-scope="scope">
															<el-button
																size="mini"
																type="text"
																@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
															<el-button
																size="mini"
																type="text"
																@click="handleDeleteGroup(scope.$index, scope.row)">解散</el-button>
															<el-button
																size="mini"
																type="text"
																@click="handleGroupUser(scope.$index, scope.row)">成员</el-button>
															<el-button
																size="mini"
																type="text"
																@click="handleAddGroupUser(scope.$index, scope.row)">添加</el-button>
														</template>
													</el-table-column>
												</el-table>
											</base-table>
										</el-tab-pane>
							      <el-tab-pane :label="'所属成员('+userTotal+')'" name="3">
											<base-table
											:total="userTotal" 
											@getPageSize="getPageSizeUser" 
											@getCurrentPage="getCurrentPageUser">
												<el-table
													ref="multipleTable"
													:data="userList"
													border
													v-loading="loading"
													tooltip-effect="dark"
													height="500">
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
														label="头像"
														prop="userName"
														width="100"
														align="center"
														>
														<template slot-scope="scope">
															<div class="block">
																<el-avatar 
																	icon="el-icon-user-solid"
																	:src="scope.row.avatar">
																</el-avatar>
															</div>
														</template>
													</el-table-column>
													<el-table-column
														label="姓名"
														prop="userName"
														align="center"
														>
													</el-table-column>
													<el-table-column
														label="性别"
														align="center"
														>
														<template slot-scope="scope">
															<span>{{scope.row.sex==0?'男':'女'}}</span>
														</template>
													</el-table-column>
													<el-table-column
														prop="mobileNo"
														label="手机号"
														align="center"
														>
													</el-table-column>
													<el-table-column
														label="角色"
														align="center"
														>
														<template slot-scope="scope">
															<span>{{scope.row.loginAuthor==1?'管理员':scope.row.loginAuthor==0?'学员':'讲师'}}</span>
														</template>
													</el-table-column>
												</el-table>
											</base-table>
										</el-tab-pane>
							    </el-tabs>
							</el-card>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加成员"
			center
			width="45%"
			v-if="dialogVisibleAdd"
		  :visible.sync="dialogVisibleAdd"
		  :before-close="handleClose">
		  <div style="margin: 0 auto; width: 100%;">
				<!-- <base-transfer @getUserList="getUserList"></base-transfer> -->
				<SelectUser @getUserCodes="getUserList"></SelectUser>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="handleAddUserSubmit">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog
		  title="成员"
			center
		  :visible.sync="dialogVisibleUser"
		  :before-close="handleClose">
		  <div style="margin: 0 auto; width: 100%;">
				<UserList 
					:list="groupUser" 
					@handleUserRemove="handleUserRemove"
					@handleUserGroup="handleUserGroup"
					@handleEditUserCom="handleEditUserCom"
					:total="groupUserTotal"></UserList>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
import UserList from './components/UserList.vue'
import SelectUser from '../../components/SelectUser.vue'
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import BaseDetail from './components/BaseDetail.vue'
import BaseTransfer from '../../components/BaseTransfer.vue'
import api from '../../api/api.js'
import {mapState} from 'vuex'
export default {
	inject:['reloadAll','app'],
	components: {
		BaseTabs,
		BaseTable,
		BaseDetail,
		BaseTransfer,
		UserList,
		SelectUser
	},
	data() {
		return {
			groupTotal:0,
			userTotal:0,
			downOrgPage:1,
			downGroupPage:1,
			currentGroup:null,
			dialogVisibleAdd:false,
			dialogVisibleUser:false,
			loading:false,
			addUserList:[],
			groupUser:[],
			groupUserTotal:null,
			userList:[],
			orgList:[],
			groupList:[],
			secendList:[],
			orgTotal:0,
			activeName:"0",
			currentOrg:null,
			orgDeatil:null,
			defaultProps:{
				label:'orgName',
				children:'childrenOrg'
			},
			total:0,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [{label: '组织机构',value: '1'}],
			pageSize:10
		};
	},
	computed:{
		...mapState({
			user:s=>s.userInfo
		}),
		orgCode(){
			return this.user.projectDepartment==='admin'?'ZGS':this.user.projectDepartment
		}
	},
	methods: {
		nodeDrop(befor,after,inner,e){
			// console.log(befor);
			// console.log(after);
			// console.log(inner);
			// console.log(e);
		},
		onHandleUpdate(){
			this.$router.push({
				path:'/menu/mechanismCreate',
				query:{
					orgCode:this.currentOrg.orgCode
				}
			})
		},
		getPageSizeUser(val){
			this.querySysUserByPage({pageNo:1,pageSize:val,orgCode:this.currentOrg.orgCode,orgType:0})
		},
		getCurrentPageUser(val){
			this.querySysUserByPage({pageNo:val,pageSize:10,orgCode:this.currentOrg.orgCode,orgType:0})
		},
		getPageSizeOrg(val){
			this.querySysOrgByPage({pageNo:1,pageSize:val,parentCode:this.currentOrg.orgCode,orgType:0})
		},
		getCurrentPageOrg(val){
			this.downOrgPage=val
			this.querySysOrgByPage({pageNo:this.downOrgPage,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:0})
		},
		getPageSizeGroup(val){
			this.querySysOrgByPage({pageNo:1,pageSize:val,parentCode:this.currentOrg.orgCode,orgType:1})
		},
		getCurrentPageGroup(val){
			this.downGroupPage=val
			this.querySysOrgByPage({pageNo:this.downGroupPage,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:1})
		},
		handleUserRemove(row){
			this.$confirm('此操作将移除该成员, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
			.then(() => {
				api.deleteUserGroupAPI({groupCode:row.groupCode,userCode:row.userCode}).then(res=>{
					if(res.code==0){
						this.$message({
							type: 'success',
							message: '移除成功!'
						});
						// this.getGourpUser({pageNo:1,pageSize:10,orgCode:row.orgCode,orgType:1})
						let i =this.groupList.findIndex(v=>v.id===row.id)
						this.groupList.splice(i,1)
					}else{
						this.$message({
							type: 'warning',
							message: res.msg
						});
					}
				})
			})
			.catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		handleUserGroup(row){
			api.makeUserToMasterAPI({groupCode:row.groupCode,userCode:row.userCode}).then(res=>{
				if(res.code==0){
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
					// this.getGourpUser({pageNo:1,pageSize:10,orgCode:row.orgCode,orgType:1})
				}else{
					this.$message({
						type: 'warning',
						message: res.msg
					});
				}
			})
		},
		handleEditUserCom(row){
			api.makeUserToSimpleAPI({groupCode:row.groupCode,userCode:row.userCode}).then(res=>{
				if(res.code==0){
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
					// this.querySysUserByPage({pageNo:1,pageSize:10,orgCode:row.groupCode,orgType:1})
				}else{
					this.$message({
						type: 'warning',
						message: res.msg
					});
				}
			})
		},
		handleAddUserSubmit(){
			api.addUserToGroupAPI({groupCode:this.currentGroup.orgCode,userList:this.addUserList}).then(res=>{
				if(res.code==0){
					this.$message({
						type: 'success',
						message: '添加成功!'
					});
					this.dialogVisibleAdd=false
				}else{
					this.$message({
						type: 'warning',
						message: res.msg
					});
				}
			})
		},
		getUserList(arr){
			this.addUserList=arr
		},
		handleClose(done){
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		handleAddGroupUser(index,row){
			this.app.show(res=>{
				// console.log(res);
				if(res.length!==0){
					api.addUserToGroupAPI({groupCode:row.orgCode,userList:res.map(v=>v.userCode)}).then(res=>{
						this.$message({
							type: 'success',
							message: '添加成功!'
						});
					})
				}
			})
			// // console.log(row);
			// this.currentGroup=row
			// api.querySysUserByPageAPI({pageNo:1,pageSize:100,orgCode:row.orgCode,orgType:1}).then(res=>{
			// 	this.groupUser=res.data.records
			// 	this.$store.commit('setUsers',res.data.records)
			// 	this.dialogVisibleAdd=true
			// })
		},
		handleGroupUser(index,row){
			this.currentGroup=row
			this.getGourpUser({pageNo:1,pageSize:30,orgCode:row.orgCode,orgType:1})
			this.dialogVisibleUser=true
		},
		handleDeleteGroup(index,row){
			this.$confirm('此操作将解散该小组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteGroupAPI({orgCode:row.orgCode}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '解散成功!'
							});
							this.querySysOrgByPage({pageNo:this.downGroupPage,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:1})
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		handleOrgStart(index,row){
			api.startSysOrgAPI({orgCode:row.orgCode}).then(res=>{
				if(res.code==0){
					this.$message({
						type: 'success',
						message: '启用成功!'
					});
					this.querySysOrgByPage({pageNo:this.downOrgPage,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:0})
				}
			})
		},
		handleOrgStop(index,row){
			this.$confirm('此操作将停用该机构/小组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.stopSysOrgAPI({orgCode:row.orgCode}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '停用成功!'
							});
							this.querySysOrgByPage({pageNo:this.downOrgPage,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:0})
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		handleDelOrg(){
			if(!this.currentOrg){
				this.$message({
					message:'请选择机构',
					type:'warning'
				})
				return false
			}
			this.$confirm('此操作将删除该机构, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteSysOrgAPI({orgCode:this.currentOrg.orgCode}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getSysOrgTree()
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		handleEditOrg(){
			if(!this.currentOrg){
				this.$message({
					message:'请选择机构',
					type:'warning'
				})
				return false
			}
			this.$router.push({
				path:'/menu/mechanismCreate',
				query:{
					orgCode:this.currentOrg.orgCode
				}
			})
		},
		handleAddOrg(){
			this.currentOrg=null
			this.$router.push({
				path:'/menu/mechanismCreate',
				query:{
					orgCode:null
				}
			})
		},
		handleClick(node){
			// if(!this.currentOrg){
			// 	this.$message({
			// 		message:'请选择机构',
			// 		type:'warning'
			// 	})
			// 	return false
			// }
			if(node.index==0){
				api.querySysOrgDetailAPI({orgCode:this.currentOrg.orgCode}).then(res=>{
					if(res.code==0){
						// // console.log('详情',res);
						this.orgDeatil=res.data
					}
				})
			}else if(node.index==1){
				this.querySysOrgByPage({pageNo:1,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:0})
			}else if(node.index==2){
				this.querySysOrgByPage({pageNo:1,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:1})
			}else if(node.index==3){
				this.querySysUserByPage({pageNo:1,pageSize:this.pageSize,orgCode:this.currentOrg.orgCode,orgType:0})
			}
		},
		handleNodeClick(node){
			// console.log(node);
			this.currentOrg=node
			this.secendList=node.childrenOrg
			// api.querySysOrgDetailAPI({orgCode:node.orgCode}).then(res=>{
			// 	if(res.code==0){
			// 		// // console.log('详情',res);
			// 		this.orgDeatil=res.data
			// 	}
			// })
			api.querySysOrgDetailAPI({orgCode:node.orgCode}).then(res=>{this.orgDeatil=res.data})
			this.querySysOrgByPage({pageNo:1,pageSize:this.pageSize,parentCode:node.orgCode,orgType:0})
			this.querySysOrgByPage({pageNo:1,pageSize:this.pageSize,parentCode:node.orgCode,orgType:1})
			this.querySysUserByPage({pageNo:1,pageSize:this.pageSize,orgCode:node.orgCode,orgType:0})
		},
		//切换baseTabs
		onBaseTabClick(val) {
			// // console.log(val);
		},
		//编辑
		handleEdit(index, row) {
			this.$router.push({
				path:'/menu/mechanismCreate',
				query:{
					orgCode:row.orgCode
				}
			})
		},
		//删除
		handleDelete(index, row) {
			this.$confirm('此操作将删除该机构, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteSysOrgAPI({orgCode:row.orgCode}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.querySysOrgByPage({pageNo:this.downOrgPage,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:0})
							this.getSysOrgTree()
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		getSysOrgTree(){
			api.getSysOrgTreeAPI({orgCode:this.user.projectDepartment}).then(res=>{
				// // console.log('tree',res);
				if(res.code==0){
					this.orgList=res.data
					this.currentOrg=res.data[0]
				}
			})
		},
		querySysOrgByPage(params){
			api.querySysOrgByPageAPI(params).then(res=>{
				if(res.code==0){
					// // console.log('机构列表',res);
					if(params.orgType==0){
						this.secendList=res.data.records
						this.orgTotal=res.data.total
					}else if(params.orgType==1){
						this.groupList=res.data.records
						this.groupTotal=res.data.total
					}
				}
			})
		},
		getGourpUser(p){
			api.querySysUserByPageGroupAPI(p).then(res=>{
				this.groupUser=res.data.records
				this.groupUserTotal=res.data.total
			})
		},
		querySysUserByPage(params){
			api.querySysUserByOrgCodeAPI(params).then(res=>{
				// console.log('用户列表',res.data);
				if(params.orgType==0){
					this.userList=res.data.records
					this.userTotal=res.data.total
				}else{
					this.groupUser=res.data.records
					this.groupUserTotal=res.data.total
				}
			})
		}
	},
	created() {
		this.getSysOrgTree()
		api.querySysOrgDetailAPI({orgCode:this.orgCode}).then(res=>{this.orgDeatil=res.data})
		this.querySysOrgByPage({pageNo:1,pageSize:this.pageSize,parentCode:this.orgCode,orgType:0})
		this.querySysOrgByPage({pageNo:1,pageSize:this.pageSize,parentCode:this.orgCode,orgType:1})
		this.querySysUserByPage({pageNo:1,pageSize:this.pageSize,orgCode:this.orgCode,orgType:0})
	}
};
</script>

<style scoped>
	.card{
		height: 700px;
		overflow: auto;
	}
.showname{
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	display: block;
	/* margin-top: 10px; */
}

</style>
