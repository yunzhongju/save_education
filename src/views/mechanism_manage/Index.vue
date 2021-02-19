<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="">
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
					  <el-col :span="4"><div class="grid-content bg-purple ">
						<el-card class="box-card">
							<el-tree 
								:data="orgList" 
								 default-expand-all
								:props="defaultProps" 
								@node-click="handleNodeClick"></el-tree>
						</el-card>
						</div></el-col>
					  <el-col :span="20"><div class="grid-content bg-purple-light">
							<el-card class="box-card">
							  <el-tabs v-model="activeName" @tab-click="handleClick">
							      <el-tab-pane label="基本信息" name="0">
							  			<base-detail :detail="orgDeatil"></base-detail>
							  		</el-tab-pane>
							      <el-tab-pane label="下级机构" name="1">
											<base-table
											:total="total" 
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
												<el-table-column
													prop=""
													label="机构类型"
													align="center"
													>
													<template slot-scope="scope">
														<span>{{scope.row.orgType==0?'机构':'小组'}}</span>
													</template>
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
							      <el-tab-pane label="下级小组" name="2">
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
													<el-table-column
														prop=""
														label="机构类型"
														align="center"
														>
														<template slot-scope="scope">
															<span>{{scope.row.orgType==0?'机构':'小组'}}</span>
														</template>
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
							      <el-tab-pane label="所属成员" name="3">
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
																<el-avatar size="large" :src="scope.row.avatar">
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
														prop="birth"
														label="出生日期"
														align="center"
														>
													</el-table-column>
													<el-table-column
														label="角色"
														align="center"
														>
														<template slot-scope="scope">
															<span>{{scope.row.loginAuthor==0?'管理员':scope.row.loginAuthor==1?'学员':'讲师'}}</span>
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
		  :visible.sync="dialogVisibleAdd"
		  :before-close="handleClose">
		  <div style="margin: 0 auto; width: 100%;">
				<base-transfer @getUserList="getUserList"></base-transfer>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="handleAddUserSubmit">确 定</el-button>
			</span>
		</el-dialog>
		
		<el-dialog
		  title="成员"
			center
			width="70%"
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
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import BaseDetail from './components/BaseDetail.vue'
import BaseTransfer from '../../components/BaseTransfer.vue'
import api from '../../api/api.js'
export default {
	inject:['reloadAll'],
	components: {
		BaseTabs,
		BaseTable,
		BaseDetail,
		BaseTransfer,
		UserList
	},
	data() {
		return {
			groupTotal:0,
			userTotal:0,
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
			activeName:"0",
			currentOrg:null,
			orgDeatil:{},
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
	methods: {
		getPageSizeUser(val){
			this.querySysUserByPage({pageNo:1,pageSize:val,orgCode:node.orgCode,orgType:0})
		},
		getCurrentPageUser(val){
			this.querySysUserByPage({pageNo:val,pageSize:val,orgCode:node.orgCode,orgType:0})
		},
		getPageSizeOrg(val){
			this.querySysOrgByPage({pageNo:1,pageSize:val,parentCode:this.currentOrg.orgCode,orgType:0})
		},
		getCurrentPageOrg(val){
			this.querySysOrgByPage({pageNo:val,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:0})
		},
		getPageSizeGroup(val){
			this.querySysOrgByPage({pageNo:1,pageSize:val,parentCode:this.currentOrg.orgCode,orgType:1})
		},
		getCurrentPageGroup(val){
			this.querySysOrgByPage({pageNo:val,pageSize:this.pageSize,parentCode:this.currentOrg.orgCode,orgType:1})
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
						this.querySysUserByPage({pageNo:1,pageSize:10,orgCode:row.groupCode,orgType:1})
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
					this.querySysUserByPage({pageNo:1,pageSize:10,orgCode:row.groupCode,orgType:1})
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
					this.querySysUserByPage({pageNo:1,pageSize:10,orgCode:row.groupCode,orgType:1})
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
		handleClose(done){done()},
		handleAddGroupUser(index,row){
			this.currentGroup=row
			this.dialogVisibleAdd=true
		},
		handleGroupUser(index,row){
			this.currentGroup=row
			this.querySysUserByPage({pageNo:1,pageSize:10,orgCode:row.orgCode,orgType:1})
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
							this.reloadAll()
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
					this.reloadAll()
				}
			})
		},
		handleOrgStop(index,row){
			this.stopSysOrg(row.orgCode)
		},
		stopSysOrg(code){
			this.$confirm('此操作将停用该机构/小组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.stopSysOrgAPI({orgCode:code}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '停用成功!'
							});
							this.reloadAll()
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
			if(!this.currentOrg){
				this.$message({
					message:'请选择机构',
					type:'warning'
				})
				return false
			}
			if(node.index==0){
				api.querySysOrgDetailAPI({orgCode:this.currentOrg.orgCode}).then(res=>{
					if(res.code==0){
						// console.log('详情',res);
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
			api.querySysOrgDetailAPI({orgCode:node.orgCode}).then(res=>{
				if(res.code==0){
					// console.log('详情',res);
					this.orgDeatil=res.data
				}
			})
		},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
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
							this.secendList=this.secendList.filter(item=>{item.orgCode!=row.orgCode})
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
		//获取当前页
		getCurrentPage(val) {
			// console.log(val);
		},
		//获取pagesize
		getPageSize(val) {
			// console.log(val);
		},
		getSysOrgTree(){
			api.getSysOrgTreeAPI().then(res=>{
				// console.log('tree',res);
				if(res.code==0){
					this.orgList=res.data
				}
			})
		},
		querySysOrgByPage(params){
			api.querySysOrgByPageAPI(params).then(res=>{
				if(res.code==0){
					// console.log('机构列表',res);
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
		querySysUserByPage(params){
			api.querySysUserByPageAPI(params).then(res=>{
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
	}
};
</script>

<style>
	.box-card{
		height: 700px;
	}
</style>
