<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
		  <el-form-item label="类别名称" prop="bookTypeName">
		    <el-input v-model="form.bookTypeName"></el-input>
		  </el-form-item>
		  <el-form-item label="图标">
		    <upload-img @getImgUrl="getImgUrl" :url="form.cover"></upload-img>
		  </el-form-item>
		  <el-form-item>
		     <el-button type="primary" @click="onSubmit('form')">{{detail?'更新':'创建'}}</el-button>
		        <el-button @click="resetForm('form')">重置</el-button>
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
			detail:{
				type:Object,
				default:()=>{}
			}
		},
    data() {
      return {
        form: {
          bookTypeName: '',
          cover: '',
          bookType: ''
        },
				rules:{
					 bookTypeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
				}
      }
    },
    methods: {
			getImgUrl(url){
				this.form.cover=url
			},
      onSubmit(formName) {
      	 this.$refs[formName].validate((valid) => {
      		if (valid) {
      			let params={
							bookTypeName:this.form.bookTypeName,
							cover:this.form.cover
						}
						if(!this.detail){
							api.addBookTypeAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
								}
								this.$emit('onSubmit')
							})
						}else{
							params['bookType']=this.detail.bookType
							api.updateBookTypeAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
								}
								this.$emit('onUpdate')
							})
						}
						
      		} else {
      			console.log('error submit!!');
      			return false;
      		}
      	});
      },
      resetForm(formName) {
      	this.$refs[formName].resetFields();
      },
    },
		created() {
			if(this.detail){
				this.form.bookTypeName=this.detail.bookTypeName
				this.form.bookType=this.detail.bookType
				this.form.cover=this.detail.cover
			}
		}
  }
</script>

<style>
</style>
