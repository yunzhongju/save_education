<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="栏目名称" prop="title">
		    <el-input type="text" v-model="form.title"></el-input>
		  </el-form-item>
			<el-form-item label="栏目描述" prop="">
			  <el-input type="textarea" v-model="form.summary"></el-input>
			</el-form-item>
			<el-form-item label="主标题" prop="">
			  <el-input type="text" v-model="form.firstTitle"></el-input>
			</el-form-item>
			<el-form-item label="副标题" prop="">
			  <el-input type="text" v-model="form.secondTitle"></el-input>
			</el-form-item>
			<el-form-item label="排序" prop="">
			  <el-input type="textarea" v-model="form.indx"></el-input>
			</el-form-item>
			<el-form-item label="英文名称" prop="">
			  <el-input type="text" v-model="form.channelEng"></el-input>
			</el-form-item>
			<el-form-item label="栏目图标" prop="coverimg">
				<upload-img @getImgUrl="geticon" :url="form.channelIcon"></upload-img>
			</el-form-item>
			<el-form-item label="背景图片" prop="coverimg">
				<upload-img @getImgUrl="getbgImg" :url="form.channelBgpic"></upload-img>
			</el-form-item>
			<el-form-item label="所属栏目" prop="">
			  <el-input type="text" v-model="form.parentName" placeholder="非必选"></el-input>
			  <div>
			  	<el-tree :data="channelList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			  </div>
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
				channelList:[],
				defaultProps: {
						children: 'childrenChannel',
						label: 'channelName'
					},
        form: {
					id:null,
          parentId: '',
          parentName: '',
          title: '',
          summary: '',
					channelIcon:'',
					channelEng:'',
					channelBgpic:'',
					firstTitle:'',
					secondTitle:'',
					indx:'',
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入栏目名称', trigger: 'blur' }],
				},
      }
    },
    methods: {
			geticon(url){
				this.form.channelIcon=url
			},
			getbgImg(url){
				this.form.channelBgpic=url
			},
			getImgUrl(val){
				this.form.imagePath=val
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							parentId:this.form.parentId,
							channelName:this.form.title,
							summary:this.form.summary,
							channelIcon:this.form.channelIcon,
							channelEng:this.form.channelEng,
							channelBgpic:this.form.channelBgpic,
							firstTitle:this.form.firstTitle,
							secondTitle:this.form.secondTitle,
							indx:this.form.indx,
						}
						// console.log(params);
						if(!this.form.id){
							api.channelAddAPI(params).then(res=>{
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
							api.channelUpdateAPI(params).then(res=>{
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
						console.log('error submit!!');
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
				this.form.parentName=data.channelName
				this.form.parentId=data.id
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
				api.channelDetailAPI({id:this.form.id}).then(res=>{
					if(res.code==0){
						// console.log('栏目详情',res);
						this.form.title=res.data.channelName
						this.form.parentId=res.data.parentId
						this.form.channelBgpic=res.data.channelBgpic
						this.form.channelEng=res.data.channelEng
						this.form.channelIcon=res.data.channelIcon
						this.form.indx=res.data.indx
						this.form.summary=res.data.summary
						this.form.secondTitle=res.data.secondTitle
						this.form.firstTitle=res.data.firstTitle
						this.form.parentName=res.data.parentName
					}
				})
			}
		}
  }
</script>