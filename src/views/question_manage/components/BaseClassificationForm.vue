<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
		  <el-form-item label="类别名称" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
			<el-form-item label="显示顺序" prop="order">
			  <el-input v-model="form.order"></el-input>
			</el-form-item>
		  <el-form-item label="类别描述">
		    <el-input type="textarea" v-model="form.desc"></el-input>
		  </el-form-item>
		  <el-form-item>
		     <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
		        <el-button @click="resetForm('form')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          order: '',
          desc: ''
        },
				rules:{
					 name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
					 order: [{ required: true, message: '请输入显示顺序', trigger: 'blur' }],
				}
      }
    },
    methods: {
      onSubmit(formName) {
      	 this.$refs[formName].validate((valid) => {
      		if (valid) {
      			alert('submit!');
      		} else {
      			// console.log('error submit!!');
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

<style>
</style>
