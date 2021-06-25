<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item label="章节名称" prop="sectionName">
			  <el-input v-model="form.sectionName"></el-input>
			</el-form-item>
		  <el-form-item label="章节备注" prop="remark">
		    <el-input type="textarea" v-model="form.remark"></el-input>
		  </el-form-item>
			<el-form-item label="视频时长" prop="duration">
			  <el-input v-model.number="form.duration"></el-input>
			</el-form-item>
			<el-form-item label="章节内容" prop="sectionUrl">
			  <upload-video
					:type="1"
					@getImgUrl="getImgUrl" :url="form.sectionUrl"></upload-video>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import UploadVideo from '../../../components/BaseUploadVideo.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			UploadVideo
		},
		props:{
			isAdd:{
				type:Boolean,
				default:()=>true
			},
			parentSectionCode:{
				type:String,
				default:()=>null
			},
			parentSectionName:{
				type:String,
				default:()=>null
			},
			currentCourse:{
				type:Object,
				default:()=>{}
			},
			currentSection:{
				type:Object,
				default:()=>{}
			}
		},
    data() {
      return {
        form: {
					id:'',
					courseCode:'',
					courseName:'',
          sectionName: '',
          sectionUrl: '',
					duration:0,
					remark:'',
					parentSectionCode:'',
					parentSectionName:'',
        },
				rulesForm:{
					 sectionName: [{ required: true, message: '请输入章节名称', trigger: 'blur' }],
					 remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
					 sectionUrl: [{ required: true, message: '请上传章节内容', trigger: 'blur' }],
					 duration: [{ required: true, message: '请输入视频时长', trigger: 'blur' },
					 {type:'number',message:'时长必须为数字值'}],
				},
      }
    },
    methods: {
			getImgUrl(url){
				this.form.sectionUrl=url
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params ={
							courseCode:this.currentCourse.courseCode,
							courseName:this.currentCourse.courseName,
							sectionName:this.form.sectionName,
							sectionUrl:this.form.sectionUrl,
							duration:this.form.duration,
							remark:this.form.remark,
							parentSectionCode:this.parentSectionCode,
							parentSectionName:this.parentSectionName,
						}
						// // console.log(params);
						if(this.isAdd){
							api.addCourseSectionAPI(params).then(res=>{
								// // console.log('ok',res);
								if(res.code==0){
									this.$message({
										message:'添加成功',
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
							let arg={
								id:this.form.id,
								sectionName:this.form.sectionName,
								sectionUrl:this.form.sectionUrl,
								duration:this.form.duration,
								remark:this.form.remark,
							}
							api.updateCourseSectionAPI(arg).then(res=>{
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
			if(!this.isAdd){
				this.form.id=this.currentSection.id
				this.form.sectionName=this.currentSection.sectionName
				this.form.remark=this.currentSection.remark
				this.form.duration=this.currentSection.duration
				this.form.sectionUrl=this.currentSection.sectionUrl
			}
		},
		beforeMount() {
		},
		destroyed() {
			}
  }
</script>