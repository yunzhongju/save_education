<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
		  <el-form-item label="上级章节" prop="upchapter">
		    <el-input v-model="form.upchapter"></el-input>
		  </el-form-item>
			<el-form-item label="章节名称" prop="name">
			  <el-input v-model="form.name"></el-input>
			</el-form-item>
		  <el-form-item label="学时" prop="time">
		    <el-input type="text" v-model="form.time"></el-input>
		  </el-form-item>
			<el-form-item label="封面" prop="img">
			  <upload-img></upload-img>
			</el-form-item>
			<el-form-item label="视频" prop="video">
			  <upload-img ></upload-img>
			</el-form-item>
		  <el-form-item>
		     <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
		        <el-button @click="resetForm('form')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import UploadImg from '../../../components/BaseUploadImg.vue'
  export default {
		components:{
			UploadImg
		},
    data() {
      return {
        form: {
          upchapter: '',
          name: '',
          time: '',
					img:'',
					video:''
        },
				rules:{
					 upchapter: [{ required: true, message: '请输入上一章节', trigger: 'blur' }],
					 name: [{ required: true, message: '请输入章节名称', trigger: 'blur' }],
					 time: [{ required: true, message: '请输入学时', trigger: 'blur' }],
					 img: [{ required: true, message: '请上传封面', trigger: 'blur' }],
					 video: [{ required: true, message: '请上传视频', trigger: 'blur' }],
				}
      }
    },
    methods: {
      onSubmit(formName) {
      	 this.$refs[formName].validate((valid) => {
      		if (valid) {
      			alert('submit!');
      		} else {
      			console.log('error submit!!');
      			return false;
      		}
      	});
      },
      resetForm(formName) {
      	this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style lang="less" scoped>
	.el-form-item .el-form-item{
		margin-bottom: 22px;
	}
</style>
