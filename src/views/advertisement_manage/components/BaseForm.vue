<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="标题" prop="title">
		    <el-input v-model="form.title"></el-input>
		  </el-form-item>
			<el-form-item label="封面" prop="imagePath">
			 <upload-img @getImgUrl="getImgUrl" :url="form.imagePath"></upload-img>
			</el-form-item>
		  <el-form-item label="位置" prop="displayLocation">
				  <el-radio-group v-model="form.displayLocation">
				    <el-radio label="index">首页</el-radio>
				    <el-radio label="exam">考试页</el-radio>
				    <el-radio label="store">商城</el-radio>
				  </el-radio-group>
		  </el-form-item>
			<el-form-item label="排序" prop="">
			  <el-input v-model="form.sort"></el-input>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import BaseTable from '../../../components/BaseTable.vue'
	import UploadFile from '../../../components/BaseUploadFile.vue'
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseTable,
			UploadFile,
			UploadImg
		},
		props:{
			current:{}
		},
    data() {
      return {
				radio:0,
        form: {
					id:null,
          title: '',
          displayLocation: 'index',
          imagePath: '',
					sort:'',
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入banner标题', trigger: 'blur' }],
					 imagePath: [{ required: true, message: '请上传图片', trigger: 'blur' }],
					 displayLocation: [{ required: true, message: '请选择展示位置', trigger: 'blur' }],
				},
      }
    },
    methods: {
			getImgUrl(url){
				this.form.imagePath=url
			},
			handleChoose(index,row){
				// console.log(index,row);
				this.form.link=row.title
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							title:this.form.title,
							imagePath:this.form.imagePath,
							displayLocation:this.form.displayLocation,
							sort:this.form.sort,
						}
						if(!this.form.id){
							api.bannerAddAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$emit('submit')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							api.bannerUpdateAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$emit('submit')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
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
				this.$emit('resetForm')
			},
			getPageSize(val){},
			getCurrentPage(val){},
			handleSelectionChange(){},
			handleEdit(index,row){
				// console.log(index,row);
			},
			
    },
		created() {
			if(this.current){
				this.form.id=this.current.id
				this.form.sort=this.current.sort
				this.form.imagePath=this.current.imagePath
				this.form.title=this.current.title
				this.form.displayLocation=this.current.displayLocation
			}
		}
  }
</script>