<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item label="头像" prop="">
				<upload-img @getImgUrl="getImgUrl" :url="currentUser?currentUser.avatar:''"></upload-img>
			</el-form-item>
			<el-form-item label="用户名" prop="userCode">
			  <el-input v-model="form.userCode"></el-input>
			</el-form-item>
		  <el-form-item label="姓名" prop="userName">
		    <el-input v-model="form.userName"></el-input>
		  </el-form-item>
			<el-form-item label="等级">
			  <el-input v-model.number="form.level"></el-input>
			</el-form-item>
			<el-form-item label="出生日期" prop="">
			  <el-date-picker
					v-model="form.birth"
					value-format="yyyy-mm-dd"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="登陆权限" prop="loginAuthor">
			  <el-radio-group v-model="form.loginAuthor">
			      <el-radio :label="1">PC权限(管理员)</el-radio>
			      <el-radio :label="0">APP权限(学员)</el-radio>
			      <el-radio :label="2">PC与APP权限(讲师)</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="性别" prop="">
			  <el-radio-group v-model="form.sex">
			      <el-radio :label="0">男</el-radio>
			      <el-radio :label="1">女</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="手机号" prop="mobileNo">
			  <el-input v-model="form.mobileNo"></el-input>
			</el-form-item>
			<el-form-item label="机构" prop="orgCode">
				<el-input v-model="form.orgName" placeholder="请选择机构"></el-input>
				<el-tree 
					:data="orgList" 
					node-key="orgCode"
					:props="{label:'orgName', children:'childrenOrg'}" 
					show-checkbox
					:default-checked-keys="[form.orgCode]"
					@node-click="handleNodeClick"></el-tree>
			</el-form-item>
			<el-form-item label="角色添加" prop="" v-if="isAdmin">
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						 <el-checkbox-group v-model="form.roleCodes">
						    <el-checkbox 
									:label="item.roleCode"  
									:key="item.roleCode"
									v-for="(item,index) in roleList">{{item.roleName}}</el-checkbox>
						  </el-checkbox-group>
					</div></el-col>
				</el-row>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{currentUser?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import api from '../../../api/api.js'
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import {mapState} from 'vuex'
  export default {
		components:{
			UploadImg
		},
		computed:{
			...mapState({
				user:s=>s.userInfo
			}),
			isAdmin(){
				return this.$store.state.userInfo.projectDepartment=='admin'?true:false
			}
		},
		inject:['avatar'],
		props:{
			menu:{
				type:Array,
				default:()=>[]
			},
			currentUser:{
				type:Object,
				default:()=>null
			}
		},
    data() {
			let validatePhone=(rule, value, callback)=>{
				let repx=/^[1][3,4,5,7,8,9][0-9]{9}$/;
				let repx2=/(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}/
				if(!repx.test(value)&&!repx2.test(value)){
					return callback(new Error('格式不正确'));
				}
			};
			
      return {
				checkList:[],
				orgList:[],
				roleList:[],
        form: {
					id:'',
					userCode:'',
					sex:0,
					birth:'',
					avatar:'',
					level:'',
					loginAuthor:0,
					userName:'',
					mobileNo:'',
          orgCode: '',
          orgName: '',
          roleCodes: [],
        },
				rulesForm:{
					 userCode: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
					 userName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
					 mobileNo: [{ required: true, message: '请输入用户手机号', trigger: 'blur' }],
					 orgCode: [{ required: true, message: '请选择机构', trigger: 'change' }],
					 roleCodes: [{ required: true, message: '请添加角色', trigger: 'blur' }],
					 loginAuthor: [{ required: true, message: '请选择登陆权限', trigger: 'blur' }],
					 level: [{ type: 'number', message: '等级必须为数字值'}],
				},
      }
    },
    methods: {
			getImgUrl(url){
				this.form.avatar=url
			},
			handleNodeClick(node){
				// // console.log(node);
				this.form.orgCode=node.orgCode
				this.form.orgName=node.orgName
			},
			handleOrgList(arr,code){
				// // console.log(arr);
				let that =this
				for(let i=0;i<arr.length;i++){
					if(arr[i].orgCode==code){
						that.form.orgName=arr[i].orgName
					}
					that.handleOrgList(arr[i].childrenOrg,code)
				}
			},
			getCheckedNodes(arr,checkArr){
				// // console.log(checkArr);
				this.form.menu=checkArr.checkedKeys
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
				this.form.avatar=url
			},
      onSubmit(formName) {
				let that =this
				 that.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							userCode:that.form.userCode,
							userName:that.form.userName,
							mobileNo:that.form.mobileNo,
							orgCode:that.form.orgCode,
							orgName:that.form.orgName,
							roleCodes:that.form.roleCodes,
							sex:that.form.sex,
							birth:that.form.birth,
							avatar:that.form.avatar,
							loginAuthor:that.form.loginAuthor,
						}
						if(!that.currentUser){
							api.addSysUserAPI(params).then(res=>{
								if(res.code==0){
									that.$message({
										message:'创建成功',
										type:'success'
									})
									that.$refs[formName].resetFields();
									that.$emit('submit')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							params['id']=that.form.id
							api.updateSysUserAPI(params).then(res=>{
								if(res.code==0){
									that.$message({
										message:'更新成功',
										type:'success'
									})
									that.$refs[formName].resetFields();
									that.$emit('update')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}
					
					} else {
						that.$message({
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
			getSysOrgTree(){
				api.getSysOrgTreeAPI().then(res=>{
					if(res.code==0){
						// // console.log('机构列表',res);
						this.orgList=res.data
					}
				})
			},
			querySysRoleList(){
				api.querySysRoleListAPI().then(res=>{
					if(res.code==0){
						// console.log('角色列表',res);
						this.roleList=res.data
					}
				})
			}
    },
		created() {
			this.getSysOrgTree()
			this.querySysRoleList()
			// // console.log(11111111111,this);
		},
		mounted() {
			if(this.currentUser){
				this.form.id=this.currentUser.id
				api.querySysUserDetailAPI({userCode:this.currentUser.userCode}).then(res=>{
					// // console.log(22222222,res);
					this.form.userCode=this.currentUser.userCode
					this.form.userName=this.currentUser.userName
					this.form.mobileNo=this.currentUser.mobileNo
					this.form.orgName=res.data.orgName
					this.form.orgCode=res.data.orgCode
					this.form.roleCodes=res.data.roleCodes
					this.form.sex=parseInt(res.data.sex)
					this.form.birth=res.data.birth
					this.form.avatar=res.data.avatar
					this.form.loginAuthor=parseInt(res.data.loginAuthor)
					this.form.level=res.data.level
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