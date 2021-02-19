<template>
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
			<el-form-item label="添加菜单" prop="menu">
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<el-tree
							ref="menutree"
							:data="menu" 
							show-checkbox
							accordion
							node-key="menuCode" 
							@check="getCheckedNodes"
							@check-change="handleCheckChange"
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
		    <el-button type="primary" @click="onSubmit('form')">{{currentRole?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import api from '../../../api/api.js'
  export default {
		components:{
		},
		props:{
			menu:{
				type:Array,
				default:()=>[]
			},
			currentRole:{
				type:Object,
				default:()=>null
			}
		},
    data() {
      return {
				xz:'',
        form: {
					id:'',
					roleCode:'',
					roleName:'',
          roleDesc: '',
					menu:[]
        },
				rulesForm:{
					 roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
					 roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
					 roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
					 menu: [{ required: true, message: '请选择菜单', trigger: 'blur' }],
				},
      }
    },
    methods: {
			getCheckedNodes(arr,checkArr){
				// console.log(checkArr);
				this.form.menu=checkArr.checkedKeys
			},
			handleCheckChange(data, checked, indeterminate){
				// console.log(data);
				// console.log(checked);
				// console.log(indeterminate);
			},
			handleAddMenuChild(node){
				if(this.form.menu.includes(node.menuCode)){
					this.$message({
						message:'该菜单以选中',
						type:'warning'
					})
					return false
				}
				this.form.menu.push(node.menuCode)
				this.$message({
					message:'添加成功',
					type:'success'
				})
			},
			handleDeleteMenu(node){
				if(!this.form.menu.includes(node.menuCode)){
					this.$message({
						message:'该菜单未选中',
						type:'warning'
					})
					return false
				}
				this.form.menu=this.form.menu.filter(item=>item.menuCode!=node.menuCode)
				this.$message({
					message:'取消成功',
					type:'success'
				})
			},
			getImgUrl(url){
				this.form.icon=url
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							roleCode:this.form.roleCode,
							roleName:this.form.roleName,
							roleDesc:this.form.roleDesc,
							menuCodes:this.form.menu,
						}
						if(!this.currentRole){
							api.addSysRoleAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'创建成功',
										type:'success'
									})
									this.$refs[formName].resetFields();
									this.$emit('submit')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							// console.log('vue',this);
							params['id']=this.form.id
							api.updateSysRoleAPI(params).then(res=>{
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
					
					} else {
						this.$message({
							message:'请填写表单',
							type:'warning'
						})
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$emit('resetForm')
			},
    },
		created() {
			// console.log('dsds',this.$refs);
			if(this.currentRole){
				this.form.id=this.currentRole.id
				api.querySysRoleDetailAPI({roleCode:this.currentRole.roleCode}).then(res=>{
					this.form.roleName=this.currentRole.roleName
					this.form.roleDesc=this.currentRole.roleDesc
					this.form.roleCode=this.currentRole.roleCode
					this.form.menu=res.data.menuCodes
					this.$refs.menutree.setCheckedKeys(res.data.menuCodes)
				})
				
			}
		},
		beforeMount() {
	
		},
  }
</script>
<style scoped>
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>