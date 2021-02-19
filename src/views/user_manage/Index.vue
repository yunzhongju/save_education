<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
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
		  width="30%"
			center
		  :before-close="handleClose">
		  <span>
				<base-form 
					v-if="dialogVisible"
					:menu="menu"
					:currentRole="roleDetail"
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
import BaseForm from './components/BaseForm.vue'
import BaseDetail from './components/BaseDetail.vue'
import api from '../../api/api.js'
export default {
	inject:['reloadAll'],
	components: {
		BaseTabs,
		BaseTable,
		BaseForm,
		BaseDetail
	},
	data() {
		return {
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
			pageSize:10
		};
	},
	methods: {
		resetForm(){
			this.dialogVisible=false
		},
		submit(){
			this.querySysRoleByPage({pageNo:1,pageSize:10})
			this.dialogVisible=false
		},
		update(){
			this.reloadAll()
			this.querySysRoleByPage({pageNo:1,pageSize:10})
			this.dialogVisible=false
		},
		handleClose(done){done()},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
		},
		//编辑
		handleEditRole(index, row) {
			this.roleDetail=row
			this.dialogVisible=true
		},
		handleDetailRole(index, row){
			let params={
				roleCode:row.roleCode
			}
			api.querySysRoleDetailAPI(params).then(res=>{
				// console.log('角色详情',res);
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
			// console.log(row);
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
			this.roleDetail=null
			this.dialogVisible=true
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
		handleSerach() {
			let val = this.serachValue
			this.querySysRoleByPage({pageNo:1,pageSize:this.pageSize,roleName:val})
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
		//创建考试
		handleAdd() {
			// this.$router.push('create_train');
		},
		//获取当前页
		getCurrentPage(val) {
			// console.log(val);
			this.querySysRoleByPage({pageNo:val,pageSize:this.pageSize})
		},
		//获取pagesize
		getPageSize(val) {
			// console.log(val);
			this.pageSize=val
			this.querySysRoleByPage({pageNo:1,pageSize:val})
		},
		querySysRoleByPage(params){
			this.loading=true
			api.querySysRoleByPageAPI(params).then(res=>{
				// console.log('角色列表',res);
				this.roleList=res.data.records
				this.total=parseInt(res.data.total)
				this.loading=false
			})
		},
		getSysMenuTree(){
			api.getSysMenuTreeAPI().then(res=>{
				// console.log('系统菜单',res);
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
