<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="w-50 m-auto">
					<!-- <base-form class="b-form"></base-form> -->
					<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
					  <!-- <el-form-item label="机构代码" prop="orgCode">
					    <el-input type="text" v-model="form.orgCode" clearable></el-input>
					  </el-form-item> -->
						<el-form-item label="机构名称" prop="orgName">
						  <el-input type="text" v-model="form.orgName" clearable></el-input>
						</el-form-item>
						<el-form-item label="机构类型" prop="orgType">
						  <el-radio-group v-model="form.orgType">
								<el-radio :label="0">机构</el-radio>
								<el-radio :label="1">小组</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="级别" prop="level">
						  <el-radio-group v-model="form.level">
						  	<el-radio :label="0">部</el-radio>
						  	<el-radio :label="1">处</el-radio>
						  	<el-radio :label="2">科</el-radio>
						  	<el-radio :label="3">班</el-radio>
						  	<el-radio :label="4">队</el-radio>
						  </el-radio-group>
						</el-form-item>
						<el-form-item label="所属机构" prop="parentCode">
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark">
									<el-input type="text" v-model="form.parentName" clearable></el-input>
								</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark">
									<el-tree
										:data="orgList" 
										 accordion
										:props="defaultProps" 
										@node-click="handleNodeClick"></el-tree>
								</div></el-col>
							</el-row>
						</el-form-item>
						<el-form-item label="省份">
						  <el-input type="text" v-model="form.province" clearable></el-input>
						</el-form-item>
						<el-form-item label="城市">
						  <el-input type="text" v-model="form.city" clearable></el-input>
						</el-form-item>
						<el-form-item label="区县" >
						  <el-input type="text" v-model="form.district" clearable></el-input>
						</el-form-item>
						<el-form-item label="详细地址" >
						  <el-input type="text" v-model="form.address" clearable></el-input>
						</el-form-item>
						<el-form-item label="联系人" >
						  <el-input type="text" v-model="form.linkman" clearable></el-input>
						</el-form-item>
						<el-form-item label="联系电话" prop="">
						  <el-input type="text" v-model="form.linkphone" clearable></el-input>
						</el-form-item>
						<el-form-item label="排序" prop="">
						  <el-input type="text" v-model.number="form.sort" clearable></el-input>
						</el-form-item>
						<el-form-item label="备注">
						  <el-input type="textarea" v-model="form.remark" clearable></el-input>
						</el-form-item>
					  <el-form-item>
					    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
					    <el-button @click="resetForm('form')">取消</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '@/components/BaseTabs.vue';
	import api from '@/api/api.js'
  import {refreshOrgCache} from '@/api/refre'
	import {mapState} from 'vuex'
	export default {
		components:{
			BaseTabs
		},
		computed:{
			...mapState({
				user:s=>s.userInfo
			})
		},
		data(){
			return {
				orgList:[],
				defaultProps:{
					label:'orgName',
					children:'childrenOrg'
				},
				baseTabs:[{label: '创建机构',value: '1'}],
				form: {
				  orgCode: '',
					orgName:'',
					orgType:0,
					level:0,
					parentCode:0,
					parentName:'',
					province:'',
					city:'',
					district:'',
					address:'',
					linkman:'',
					linkphone:null,
					sort:null,
					remark:'',
				},
				rulesForm:{
					 orgCode: [{ required: true, message: '请输入机构代码', trigger: 'blur' }],
					 orgName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
					 level: [{ required: true, message: '请选择机构级别', trigger: 'blur' }],
					 parentCode: [{ required: true, message: '请选择所属机构', trigger: 'blur' }],
					 orgType: [{ required: true, message: '请选择机构类型', trigger: 'blur' }],
				},
			}
		},
		methods:{
			onBaseTabClick(){},
			onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.form);
						if(!this.form.id){
							api.addSysOrgAPI(this.form).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										message:res.msg,
										type:'warning'
									})
									return false
								}
							})
						}else{
							api.updateSysOrgAPI(this.form).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										message:res.msg,
										type:'warning'
									})
								}
							})
						}
            window.location.url=`${process.env.NODE_ENV==='development'?'/test':'/api'}/refreshOrgCache.do`
					} else {
						this.$message({
							message:'请填写完整的表单',
							type:'warning'
						})
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$router.push('/menu/mechanismManage')
			},
			handleNodeClick(node) {
				// // console.log(node);
				this.form.parentCode=node.orgCode
				this.form.parentName=node.orgName
			},
			getSysOrgTree(){
				api.getSysOrgTreeAPI({orgCode:this.user.projectDepartment}).then(res=>{
					if(res.code==0){
						this.orgList=res.data
					}
				})
			},
			getOrgDetail(code){
				api.querySysOrgDetailAPI({orgCode:this.$route.query.orgCode}).then(res=>{
					if(res.code==0){
						this.form={
							orgCode: res.data.orgCode,
							orgName:res.data.orgName,
							orgType:Number(res.data.orgType),
							level:Number(res.data.level),
							parentCode:res.data.parentCode,
							parentName:res.data.parentName,
							province:res.data.province,
							city:res.data.city,
							district:res.data.district,
							address:res.data.address,
							linkman:res.data.linkman,
							linkphone:res.data.linkphone,
							sort:res.data.sort,
							remark:res.data.remark,
							id:res.data.id
						}
					}
				})
			}
		},
		created() {
			this.getSysOrgTree()
			let code=this.$route.query.orgCode
			if(code){
				this.getOrgDetail(code)
			}
		}
	}
</script>

<style>
</style>
