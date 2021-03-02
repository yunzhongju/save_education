<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input 
											size="mini" 
											placeholder="搜索用户名称" 
											clearable 
											suffix-icon="el-icon-search" 
											v-model="serachValue"></el-input>
									</li>
									<li class="marg-right30">
										<el-button 
											type="primary" 
											size="mini" 
											icon="el-icon-search" 
											@click="handleSerach">搜索</el-button>
										</li>
									<li class="marg-right30">
										<el-button 
											type="primary" 
											size="mini" 
											icon="el-icon-plus" 
											@click="handleAddUser">新建用户</el-button>
										</li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row class="marg-top20" :gutter="20">
						<el-col :span="4"><div class="grid-content bg-purple-dark">
						<el-card class="" shadow="never" >
							<el-tree
								:data="orgList" 
								node-key="orgCode"
								accordion
								 :default-expanded-keys="['ZGS']"
								:props="{children:'childrenOrg',label:'orgName'}" 
								@node-click="handleNodeClick">
									<div class="showname" slot-scope="{ node, data }">
										<el-tooltip 
											class="item" 
											effect="light" 
											:visible-arrow="false"
											:content="node.label" placement="top">
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
						<el-col :span="20">
							<div class="grid-content bg-purple-dark">
								<base-table 
									:total="total" 
									@getPageSize="getPageSize" 
									@getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="userList" 
									border 
									v-loading="loading"
									tooltip-effect="dark" 
									height="650"
									max-height="650"
									@selection-change="handleSelectionChange">
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
										prop="userCode" 
										label="用户头像" 
										width="100"
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scoped">
												<el-avatar 
												  size="large"
													icon="el-icon-user-solid" 
													:src="scoped.row.avatar"></el-avatar>
											</template>
										</el-table-column>
										<el-table-column 
										prop="userName" 
										label="用户名" 
										align="center" 
										></el-table-column>
										<el-table-column 
										prop="mobileNo" 
										label="手机号" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										prop="status" 
										label="状态" 
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scope">
												<span>{{scope.row.status==1?'有效':'无效'}}</span>
											</template>
										</el-table-column>
										<el-table-column 
										prop="orgName" 
										label="机构" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										label="操作" 
										fixed="right"
										align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text" 
												@click="handleUsreInfo(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleEditUser(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												type="text" 
												@click="handleDeleteUser(scope.$index, scope.row)">删除</el-button>
												<el-button
												size="mini" 
												v-show="scope.row.status!=1"
												type="text" 
												@click="handleStartUser(scope.$index, scope.row)">启用</el-button>
												<el-button
												size="mini" 
												v-show="scope.row.status==1"
												type="text" 
												@click="handleStopUser(scope.$index, scope.row)">停用</el-button>
												<el-button
												size="mini" 
												v-show="scope.row.isVerifier==0"
												@click="handleUpdateSysUserIsVerifier(scope.$index, scope.row)"
												type="text">设为核销员</el-button>
												<el-button
												size="mini" 
												@click="handleUpdateSysUserIsNotVerifier(scope.$index, scope.row)"
												v-show="scope.row.isVerifier==1"
												type="text">撤销核销员</el-button>
											</template>
										</el-table-column>
									</el-table>
								</base-table>
							</div>
						</el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加/修改用户"
		  :visible.sync="dialogVisible"
			center
		  :before-close="handleClose">
		  <span>
				<base-form 
					v-if="dialogVisible"
					:currentUser="currentUser"
					@update="update"
					@resetForm="resetForm"
					@submit="submit"></base-form>
			</span>
		</el-dialog>
		
		
		
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisibleDetail"
		  width="30%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="userDetail"
				></base-detail>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import BaseForm from './components/BaseForm.vue'
import BaseDetail from './components/BaseDetail.vue'
import api from '../../api/api.js'
import {updateSysUserIsVerifierAPI,updateSysUserIsNotVerifierAPI} from '../../api/mall.js'
export default {
	components: {
		BaseTabs,
		BaseTable,
		BaseForm,
		BaseDetail
	},
	provide(){
		return {
			avatar:this.currentUser?this.currentUser.avatar:''
		}
	},
	data() {
		return {
			orgList:[],
			loading:false,
			userDetail:null,
			dialogVisibleDetail:false,
			currentUser:null,
			dialogVisible:false,
			userList:[],
			total:0,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '用户管理',
					value: '1'
				}
			],
		};
	},
	methods: {
		handleUpdateSysUserIsVerifier(index,row){
			updateSysUserIsVerifierAPI({userCode:row.userCode}).then(res=>{
				if(res.code===0){
					this.$message({
						type:'success',
						message:'设为核销员成功'
					})
					this.querySysUserByPage({pageNo:1,pageSize:10})
				}else{
					this.$message({
						type:'warning',
						message:res.msg
					})
				}
			})
		},
		handleUpdateSysUserIsNotVerifier(index,row){
			updateSysUserIsNotVerifierAPI({userCode:row.userCode}).then(res=>{
				if(res.code===0){
					this.$message({
						type:'success',
						message:'撤销成功'
					})
					this.querySysUserByPage({pageNo:1,pageSize:10})
				}else{
					this.$message({
						type:'warning',
						message:res.msg
					})
				}
			})
		},
		handleNodeClick(node){
			console.log(node);
			this.querySysUserByPage({pageNo:1,pageSize:10,orgCode:node.orgCode,orgType:0})
		},
		handleStartUser(index,row){
			api.updateSysUserStartAPI({id:row.id}).then(res=>{
				if(res.code==0){
					this.$message({
						type: 'success',
						message: '启用成功!'
					});
					this.querySysUserByPage({pageNo:1,pageSize:10})
				}
			})
		},
		handleStopUser(index,row){
			this.$confirm('此操作将停用该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.updateSysUserStopAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '停用成功!'
							});
							this.querySysUserByPage({pageNo:1,pageSize:10})
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		},
		update(){
			this.dialogVisible=false
			this.querySysUserByPage({pageNo:1,pageSize:10})
		},
		submit(){
			this.dialogVisible=false
			this.querySysUserByPage({pageNo:1,pageSize:10})
		},
		resetForm(){
			this.dialogVisible=false
		},
		handleClose(done){done()},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
		},
		//编辑
		handleEditUser(index, row) {
			this.currentUser=row
			this.dialogVisible=true
		},
		//撤销
		handleUsreInfo(index, row){
			api.querySysUserDetailAPI({userCode:row.userCode}).then(res=>{
				console.log('用户详情',res);
				if(res.code==0){
					this.userDetail=res.data
					this.dialogVisibleDetail=true
				}else{
					this.$message({
						type: 'warning',
						message: res.msg
					});
				}
			})
		},
		//删除
		handleDeleteUser(index, row) {
			// console.log(row);
			this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteSysUserAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.querySysUserByPage({pageNo:1,pageSize:10})
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
		//选中数据
		handleSelectionChange(val) {
			// console.log(val);
		},
		//按时间筛选
		handleDateTime(val) {
			// console.log(val);
		},
		//搜索
		handleSerach(val) {
			this.querySysUserByPage({pageNo:1,pageSize:10,userName:this.serachValue})
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
		//创建考试
		handleAddUser() {
			this.currentUser=null
			this.dialogVisible=true
		},
		//获取当前页
		getCurrentPage(val) {
			this.querySysUserByPage({pageNo:val,pageSize:10})
		},
		//获取pagesize
		getPageSize(val) {
			this.querySysUserByPage({pageNo:1,pageSize:val})
		},
		querySysUserByPage(params){
			this.loading=true
			api.querySysUserByPageAPI(params).then(res=>{
				if(res.code==0){
					// console.log('用户列表',res);
					this.userList=res.data.records
					this.total=res.data.total
					this.loading=false
				}
			})
		},
		getSysOrgTree(){
			api.getSysOrgTreeAPI().then(res=>{
				// console.log(res);
				if(res.code==0){
					this.orgList=res.data
				}
			})
		}
	},
	created() {
		this.querySysUserByPage({pageNo:1,pageSize:10})
		this.getSysOrgTree()
	}
};
</script>

<style></style>
