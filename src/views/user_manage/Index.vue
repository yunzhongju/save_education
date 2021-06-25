<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="">
					<el-row>
						<el-col :span="0">
							<div class="grid-content bg-purple">
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input size="mini" 
										placeholder="搜索角色名称" 
										clearable 
										suffix-icon="el-icon-search" 
										v-model="serachValue"></el-input>
									</li>
									<li class="marg-right30">
										<el-button type="primary" 
										size="mini" 
										icon="el-icon-search"
										@click="handleSerach">搜索</el-button></li>
										<li class="marg-right30">
											<el-button
											type="primary"
											icon="el-icon-plus" 
											@click="handleAddRole"
											size="mini">添加</el-button></li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark marg-top20">
								<base-table 
								:total="total" 
								@getPageSize="getPageSize" 
								@getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="roleList" 
									border 
									v-loading="loading"
									tooltip-effect="dark" 
									height="600"
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
										prop="roleName" 
										label="用户名" 
										align="center"></el-table-column>
										<el-table-column 
										prop="createTime" 
										label="注册时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										prop="updateTime" 
										label="最近更新" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										prop="" 
										label="状态" 
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scope">
												<span>{{scope.row.status==1?'启用':'停用'}}</span>
											</template>
										</el-table-column>
										<el-table-column 
										label="操作" 
										align="center">
											<template slot-scope="scope">
												<el-button
													type="text"
													icon="" 
													@click="handleDetailRole(scope.$index, scope.row)"
													size="mini">详情</el-button>
												<el-button
													type="text"
													icon="" 
													@click="handleEditRole(scope.$index, scope.row)"
													size="mini">编辑</el-button>
												<el-button 
													type="text" 
													icon="" 
													v-show="scope.row.status==1"
													@click="handleDeleteRole(scope.$index, scope.row)"
													size="mini">删除</el-button>
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
		  title="添加/修改角色"
		  :visible.sync="dialogVisible"
			:before-close="handleClose"
		  width="30%"
			center>
			<div>
				<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
					<el-form-item label="角色编码" prop="roleCode">
					  <el-input v-model="form.roleCode"></el-input>
					</el-form-item>
				  <el-form-item label="角色名称" prop="roleName">
				    <el-input v-model="form.roleName"></el-input>
				  </el-form-item>
					<el-form-item label="角色描述" prop="roleDesc">
					  <el-input v-model="form.roleDesc"></el-input>
					</el-form-item>
					<el-form-item label="添加菜单" prop="menuCodes">
						<el-row>
						  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
								<el-tree
									ref="menutree"
									:data="menu" 
									show-checkbox
									v-model="form.menuCodes"
									accordion
									node-key="menuCode" 
									@check="getCheckedNodes"
									:props="{label:'menuName',children:'childMenus'}">
									<span class="custom-tree-node" slot-scope="{ node, data }">
										<span>{{ node.label }}</span>
										<span>
											<!-- <el-button type="text" size="mini" @click="handleAddMenuChild(data)">添加</el-button>
											<el-button type="text" size="mini" @click="handleDeleteMenu(data)">取消</el-button> -->
										</span>
									</span>
								</el-tree>
							</div></el-col>
						</el-row>
					</el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
				    <el-button @click="resetForm('form')">取消</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
		
		
		<el-dialog
		  title="详情"
			v-if="dialogVisibleDetail"
		  :visible.sync="dialogVisibleDetail"
			:before-close="handleClose1"
		  width="30%"
			center>
		  <span>
				<base-detail
					:menu="menu"
					:detail="roleDetail"
				></base-detail>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
// import BaseForm from './components/BaseForm.vue'
import BaseDetail from './components/BaseDetail.vue'
import api from '../../api/api.js'
export default {
	inject:['reloadAll'],
	components: {
		BaseTabs,
		BaseTable,
		BaseDetail
	},
	data() {
		return {
			currentRole:null,
			loading:false,
			dialogVisibleDetail:false,
			RoleDetail:null,
			type:0,
			menu:[],
			roleDetail:null,
			dialogVisible:false,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [{label: '角色管理',value: '1'}],
			roleList: [],
			total:0,
			pageSize:10,
			form: {
				roleCode:'',
				roleName:'',
			  roleDesc: '',
				menuCodes:[]
			},
			rulesForm:{
				 roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
				 roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
				 roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
				 menuCodes: [{ required: true, message: '请选择菜单', trigger: 'blur' }],
			},
		};
	},
	methods: {
		handleClose(done){
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		handleClose1(done){
			done();
		},
		onSubmit(formName) {
			 this.$refs[formName].validate((valid) => {
				if (valid) {
					if(!this.form.id){
						api.addSysRoleAPI(this.form).then(res=>{
							if(res.code==0){
								this.$message({
									message:'创建成功',
									type:'success'
								})
							}else{
								this.$message({
									type:'warning',
									message:res.msg
								})
							}
						})
					}else{
						api.updateSysRoleAPI(this.form).then(res=>{
							if(res.code==0){
								this.$message({
									message:'更新成功',
									type:'success'
								})
								this.$refs[formName].resetFields();
								this.$emit('update')
							}else{
								this.$message({
									type:'warning',
									message:res.msg
								})
							}
						})
					}
					this.dialogVisible=false
					this.reloadAll()
				} else {
					this.$message({
						message:'请填写表单',
						type:'warning'
					})
					return false;
				}
			});
		},
		getCheckedNodes(arr,checkArr){
			this.form.menuCodes=checkArr.checkedKeys
		},

		resetForm(){
			this.dialogVisible=false
		},

		//切换baseTabs
		onBaseTabClick(val) {},
		//编辑
		handleEditRole(index, row) {
			api.querySysRoleDetailAPI({roleCode:row.roleCode}).then(res=>{
				// console.log('角色详情',res);
				if(res.code==0){
					this.form.id=res.data.id
					this.form.roleCode=res.data.roleCode
					this.form.roleName=res.data.roleName
					this.form.roleDesc=res.data.roleDesc
					this.form.menuCodes=res.data.menuCodes
					this.dialogVisible=true
					this.$nextTick(()=>{
						this.$refs.menutree.setCheckedKeys(res.data.menuCodes)
					})
				}
			})
		},
		handleDetailRole(index, row){
			this.roleDetail=null
			let params={
				roleCode:row.roleCode
			}
			api.querySysRoleDetailAPI(params).then(res=>{
				// // console.log('角色详情',res);
				if(res.code==0){
					this.roleDetail=res.data
					this.dialogVisibleDetail=true
				}
			})
		},
		//撤销
		handleStartRole(index, row){},
		//删除
		handleDeleteRole(index, row) {
			// // console.log(row);
			this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteSysRoleAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.querySysRoleByPage({pageNo:1,pageSize:10})
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
		handleStopRole(index, row){
			
		},
		handleAddRole(){
			this.form={
				roleCode:'',
				roleName:'',
			  roleDesc: '',
				menuCodes:[]
			},
			this.dialogVisible=true
			this.$nextTick(()=>{
				this.$refs.menutree.setCheckedKeys([])
			})
		},

		

		//搜索
		handleSerach() {
			let val = this.serachValue
			this.querySysRoleByPage({pageNo:1,pageSize:this.pageSize,roleName:val})
		},


		//获取当前页
		getCurrentPage(val) {
			// // console.log(val);
			this.querySysRoleByPage({pageNo:val,pageSize:this.pageSize})
		},
		//获取pagesize
		getPageSize(val) {
			// // console.log(val);
			this.pageSize=val
			this.querySysRoleByPage({pageNo:1,pageSize:val})
		},
		querySysRoleByPage(params){
			this.loading=true
			api.querySysRoleByPageAPI(params).then(res=>{
				// // console.log('角色列表',res);
				this.roleList=res.data.records
				this.total=parseInt(res.data.total)
				this.loading=false
			})
		},
		getSysMenuTree(){
			api.getSysMenuTreeAPI().then(res=>{
				// // console.log('系统菜单',res);
				this.menu=res.data
			})
		},	
	},
	created() {
		this.querySysRoleByPage({pageNo:1,pageSize:10})
		this.getSysMenuTree()
	}
};
</script>

<style></style>
