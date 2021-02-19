<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item label="菜单编码" prop="code">
			  <el-input v-model="form.code"></el-input>
			</el-form-item>
		  <el-form-item label="菜单名称" prop="title">
		    <el-input v-model="form.title"></el-input>
		  </el-form-item>
			<el-form-item label="菜单描述" prop="">
			  <el-input v-model="form.desc"></el-input>
			</el-form-item>
		  <el-form-item label="菜单路由" prop="">
		   <el-input v-model="form.path"></el-input>
		  </el-form-item>
			<el-form-item label="父级菜单" prop="">
				<el-cascader
					:options="parentMenu"
					v-model="form.parentCode"
					:show-all-levels="false"
					placeholder="请选择父级菜单(非必选)"
					:props="{ checkStrictly: true ,children:'childMenus',label:'menuName',value:'menuCode'}"
					clearable></el-cascader>
			</el-form-item>
			<el-form-item label="菜单图标" prop="">
				<upload-img
				:url="currentMenu?currentMenu.icon:''"
				@getImgUrl="getImgUrl"></upload-img>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{currentMenu?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			UploadImg
		},
		props:{
			parentMenu:{
				type:Array,
				default:()=>[]
			},
			type:{
				type:Number,
				default:()=>0
			},
			currentMenu:{
				type:Object,
				default:()=>{}
			}
		},
    data() {
      return {
        form: {
					code:'',
					desc:'',
          title: '',
          path: '',
					parentCode:'',
					icon:''
        },
				rulesForm:{
					 code: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
					 title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
				},
      }
    },
    methods: {
			getImgUrl(url){
				this.form.icon=url
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.type==0){
							let params={
								menuCode:this.form.code,
								menuName:this.form.title,
								menuDesc:this.form.desc,
								menuUrl:this.form.path,
								parentCode:this.form.parentCode[this.form.parentCode.length-1],
								icon:this.form.icon
							}
							// console.log('提交的form',params);
							api.addSysMenuAPI(params).then(res=>{
								// console.log(res);
								if(res.code==0){
									this.$message({
										message:'创建成功',
										type:'success'
									})
									this.$refs[formName].resetFields();
									this.$emit('submit')
								}else if(res.code==210){
									this.$message({
										message:res.msg,
										type:'warning'
									})
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							let params={
								id:this.currentMenu.id,
								menuCode:this.form.code,
								menuName:this.form.title,
								menuDesc:this.form.desc,
								menuUrl:this.form.path,
								parentCode:this.form.parentCode,
								icon:this.form.icon
							}
							// console.log('提交的form',params);
							api.updateSysMenuAPI(params).then(res=>{
								// console.log('更新',res);
								if(res.code==0){
									this.$message({
										message:'更新成功',
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
						}
						
						//添加路由
						this.setRouter(this.form.path,this.form.title)
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
			setRouter(path,name){
				// console.log(1111111111111111);
				let RouteConfig = [
					{
						path: path,
						component: () => import('../../Test.vue'), //test code
						name: name, // 命名路由
						redirect: '/test',
					}
				]
				this.$router.addRoutes(RouteConfig)
			},
    },
		created() {

		},
		beforeMount() {
			if(this.type==0){
				return
			}else{
				this.form.code=this.currentMenu.menuCode,
				this.form.title=this.currentMenu.menuName,
				this.form.desc=this.currentMenu.menuDesc,
				this.form.path=this.currentMenu.menuUrl,
				this.form.parentCode=this.currentMenu.parentCode==-1?'':this.currentMenu.parentCode,
				this.form.icon=this.currentMenu.icon
			}
		},
  }
</script>