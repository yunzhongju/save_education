<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div>
					<el-row >
						<el-col :span="24"><div class="grid-content bg-purple-dark flex-end ">
							<el-button-group>
							  <el-button 
								  class="marg-right30"
									type="primary"
									icon="el-icon-plus" 
									@click="handleAddMenu"
									size="mini">添加菜单</el-button>
							</el-button-group>
						</div></el-col>
					</el-row>
					<el-row class="mt-2">
						<el-col :span="24">
							<div class="grid-content bg-purple-dark">
								<base-table 
									:showFoot="false"
									>
									<el-table 
										ref="multipleTable" 
										:data="menu" 
										border 
										v-loading="loading"
										row-key="id"
										tooltip-effect="dark" 
										height="680"
										:tree-props="{children: 'childMenus'}"
										highlight-current-row
									>
										<el-table-column
											label="编号"
											width="100"
											align="center"
											>
											<template slot-scope="scope">
												<span>{{scope.$index+1}}</span>
											</template>
										</el-table-column>
										<el-table-column 
										prop="menuName" 
										label="菜单名" 
										align="center"></el-table-column>
										<el-table-column
										prop="icon" 
										label="图标" 
										align="center">
										<template slot-scope="scope">
											<img 
												v-show="scope.row.icon"
												class="img-size18" 
												:src="scope.row.icon" alt="">
											<span v-show="!scope.row.icon">无</span>	
										</template>
										</el-table-column>
										<el-table-column
										prop="menuUrl" 
										label="路由" 
										align="center"></el-table-column>
										<el-table-column 
										prop="menuCode" 
										label="菜单编码" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										label="操作" align="center" width="180">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text" 
												@click="handleEditMenu(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												type="text" 
												@click="handleDeleteMenu(scope.$index, scope.row)">删除</el-button>
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
		  title="添加/修改菜单"
		  :visible.sync="dialogVisible"
			:before-close="handleClose"
		  width="50%"
			center>
		  <div>
				<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
					<el-form-item label="菜单编码" prop="menuCode">
					  <el-input v-model="form.menuCode"></el-input>
					</el-form-item>
				  <el-form-item label="菜单名称" prop="menuName">
				    <el-input v-model="form.menuName"></el-input>
				  </el-form-item>
					<el-form-item label="菜单描述" prop="">
					  <el-input v-model="form.menuDesc"></el-input>
					</el-form-item>
				  <el-form-item label="菜单路由" prop="">
				   <el-input v-model="form.menuUrl"></el-input>
				  </el-form-item>
					<el-form-item label="父级菜单" prop="">
						<el-cascader
							:options="menu"
							v-model="form.parentCode"
							@change="handleMenu"
							:show-all-levels="false"
							placeholder="请选择父级菜单(非必选)"
							:props="{ checkStrictly: true ,children:'childMenus',label:'menuName',value:'menuCode'}"
							clearable></el-cascader>
					</el-form-item>
					<el-form-item label="菜单图标" prop="">
						<upload-img
						:url="form.icon"
						@getImgUrl="getImgUrl"></upload-img>
					</el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
				    <el-button @click="resetForm('form')">取消</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTable from '@/components/BaseTable.vue';
import UploadImg from '@/components/BaseUploadImg.vue'
import api from '../../api/api.js'
export default {
	inject:['reloadAll'],
	components: {
		BaseTabs,
		BaseTable,
		UploadImg
	},   
	data() {
		return {
			loading:false,
			dialogVisible:false,
			form:{
				menuCode:'',
				menuName:'',
				menuDesc:'',
				menuUrl:'',
				parentCode:'-1',
				icon:''
			},
			rulesForm:{
				 menuCode: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
				 menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
			},
			menu: [],
			baseTabs: [{label: '菜单管理',value: '1'}],
		};
	},
	methods: {
		handleMenu(val){
			this.form.parentCode=val[val.length-1]
		},
		onSubmit(formName) {
			 this.$refs[formName].validate((valid) => {
				if (valid) {
					if(!this.form.id){
						api.addSysMenuAPI(this.form).then(res=>{
							// // console.log(res);
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
						}).catch(err=>{
							this.$message({
								type:'warning',
								message:err.msg
							})
						})
					}else{
						api.updateSysMenuAPI(this.form).then(res=>{
							if(res.code===0){
								this.$message({
									message:'更新成功',
									type:'success'
								})
							}else{
								this.$message({
									type:'warning',
									message:res.msg
								})
							}
						})
					}
					this.getSysMenuTree()
					//添加路由
					this.setRouter(this.form.menuUrl,this.form.menuName)
					this.dialogVisible=false
				} else {
					this.$message({
						message:'请填写表单',
						type:'warning'
					})
					return false;
				}
			});
		},
		setRouter(path,name){
			let RouteConfig = [
				{
					path: path,
					component: () => import('../Test.vue'), //test code
					name: name, // 命名路由
					redirect: '/test',
				}
			]
			this.$router.addRoutes(RouteConfig)
		},
		getImgUrl(url){
			this.form.icon=url
		},
		handleClose(done){
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		//创建成功
		resetForm(){
			this.dialogVisible=false
		},
		//删除菜单
		handleDeleteMenu(index,row){
			this.$confirm(`是否删除菜单:${row.menuName}`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				api.deleteSysMenuAPI({id:row.id}).then(res=>{
					if(res.code==0){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getSysMenuTree()
					}else{
						this.$message({
							type: 'warning' ,
							message: res.msg
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

		//添加菜单
		handleAddMenu(){
			this.form={
				menuCode:'',
				menuName:'',
				menuDesc:'',
				menuUrl:'',
				parentCode:'',
				icon:''
			},
			this.dialogVisible=true
		},
		//编辑
		handleEditMenu(index,row){
			this.form=row
			this.dialogVisible=true
		},

		getSysMenuTree(){
			this.loading=true
			api.getSysMenuTreeAPI().then(res=>{
				// // console.log('系统菜单',res);
				this.menu=res.data.reverse()
				this.loading=false
			})
		},	
	},

	created() {
		this.getSysMenuTree()
	}
};
</script>

<style scoped>
	.algin-center{
		height: 40px;
		display: flex;
		align-items: center;
	}
	.marg-left{
		margin-left: 55px !important;
	}
	.grid-content1{
		text-align: center;
	}
</style>
