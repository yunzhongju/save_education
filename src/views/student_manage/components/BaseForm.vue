<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item label="姓名" prop="">
			  <el-input v-model="form.userName"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="">
			  <el-input v-model="form.mobileNo"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="" v-if="form.id">
			  <el-input v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item label="机构" prop="">
			  <el-select v-model="form.orgCode" placeholder="请选择机构">
			      <el-option
			        v-for="item in orgList"
			        :key="item.id"
			        :label="item.orgName"
			        :value="item.orgCode">
			      </el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="性别" prop="">
			  <el-radio-group v-model="form.sex">
			      <el-radio :label="0">男</el-radio>
			      <el-radio :label="1">女</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="头像" prop="">
				<upload-img
				:url="currentStudent?currentStudent.avatar:''"
				@getImgUrl="getImgUrl"></upload-img>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
			orgList:{
				type:Array,
				default:()=>[]
			},
			type:{
				type:Number,
				default:()=>0
			},
			currentStudent:{
				type:Object,
				default:()=>{}
			}
		},
    data() {
      return {
        form: {
					id:'',
					userName:'',
					sex:0,
          avatar: 'http://education.quweiquwei.com/1604302827887/icon_editor01.png',
          mobileNo: '',
					orgCode:'',
					mobileNo:'',
					password:'',
        },
				rulesForm:{
					 code: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
					 title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
				},
      }
    },
    methods: {
			getImgUrl(url){
				this.form.avatar=url
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							userName:this.form.userName,
							sex:this.form.sex,
							avatar:this.form.avatar,
							mobileNo:this.form.mobileNo,
							orgCode:this.form.orgCode,
						}
						// // console.log(params);
						if(!this.form.id){
							api.addStudentAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$refs[formName].resetFields();
									this.$emit('onSubmit')
								}else{
									this.$message({
										message:res.msg,
										type:'warning'
									})
								}
							})
						}else{
							params["id"]=this.form.id
							params['password']=this.form.password
							api.updateStudentAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$refs[formName].resetFields();
									this.$emit('onUpdate')
								}else{
									this.$message({
										message:res.msg,
										type:'warning'
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

		},
		beforeMount() {
			if(this.currentStudent){
				this.form.id=this.currentStudent.id
				this.form.userName=this.currentStudent.userName
				this.form.sex=parseInt(this.currentStudent.sex)
				this.form.mobileNo=this.currentStudent.mobileNo
				this.form.orgCode=this.currentStudent.orgCode
				this.form.avatar=this.currentStudent.avatar
			}
		},
  }
</script>