<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item label="资讯封面" prop="imagePath">
				<upload-img 
					@getImgUrl="getbgImg" 
					:url="form.imagePath"></upload-img>
			</el-form-item>
		  <el-form-item label="标题" prop="title">
		    <el-input type="text" v-model="form.title"></el-input>
		  </el-form-item>
			<el-form-item label="栏目" prop="channelId">
			  <el-input type="text" v-model="form.channelName" placeholder=""></el-input>
			  <div>
			  	<el-tree :data="channelList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			  </div>
			</el-form-item>
			<el-form-item label="来源" prop="source">
			  <el-input type="text" v-model="form.source"></el-input>
			</el-form-item>
			<el-form-item label="浏览量" prop="vmReadNumber">
			  <el-input type="text" v-model="form.vmReadNumber"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
			  <base-editor @input="getContent" :text="form.content"></base-editor>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import UploadFile from '../../../components/BaseUploadFile.vue'
	import BaseEditor from '../../../components/ckeditor/ckeditor.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseEditor,
			UploadImg,
			UploadFile,
		},
    data() {
      return {
				detail:null,
				channelList:[],
				defaultProps: {
						children: 'childrenChannel',
						label: 'channelName'
					},
        form: {
					id:null,
          title: '',
          content: '',
          source: '',
          imagePath: '',
					vmReadNumber:'',
					channelId:'',
					channelName:'',
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入资讯标题', trigger: 'blur' }],
					 content: [{ required: true, message: '请编写资讯内容', trigger: 'blur' }],
					 source: [{ required: true, message: '请输入资讯来源', trigger: 'blur' }],
					 imagePath: [{ required: true, message: '请上传资讯封面', trigger: 'blur' }],
					 vmReadNumber: [{ required: true, message: '请输入浏览量', trigger: 'blur' }],
					 channelId: [{ required: true, message: '请选择所属栏目', trigger: 'blur' }],
				},
      }
    },
    methods: {
			geticon(url){
				this.form.channelIcon=url
			},
			getbgImg(url){
				this.form.imagePath=url
			},
			getImgUrl(val){
				this.form.imagePath=val
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							title:this.form.title,
							content:this.form.content,
							source:this.form.source,
							imagePath:this.form.imagePath,
							vmReadNumber:this.form.vmReadNumber,
							channelId:this.form.channelId,
						}
						// console.log(params);
						if(!this.form.id){
							api.newsAddAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'创建成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							api.newsUpdateAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}
						
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$router.go(-1)
			},
			getPageSize(val){},
			getCurrentPage(val){},
			handleSelectionChange(){},
			handleEdit(index,row){
				// console.log(index,row);
				this.form.exam=row.name
			},
			handleNodeClick(data) {
				// console.log(data);
				this.form.channelName=data.channelName
				this.form.channelId=data.id
			},
			getContent(val){
				this.form.content=val
			}
    },
		created() {
			this.form.id=this.$route.query.id
			api.channelPageAPI().then(res=>{
				if(res.code==0){
					this.channelList=res.data
				}
			})
			if(this.form.id){
				api.newsDetailAPI({id:this.form.id}).then(res=>{
					if(res.code==0){
						// console.log('news详情',res);
						this.detail=res.data
						this.form.title=res.data.title
						this.form.channelId=res.data.channelId
						this.form.channelName=res.data.channelName
						this.form.imagePath=res.data.imagePath
						this.form.vmReadNumber=res.data.vmReadNumber
						this.form.source=res.data.source
						this.form.content=res.data.content
					}
				})
			}
		}
  }
</script>