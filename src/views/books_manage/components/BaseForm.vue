<template>
  <div class="m-auto">
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="图书名称" prop="bookName">
		    <el-input type="text" v-model="form.bookName"></el-input>
		  </el-form-item>
			<el-form-item label="图书作者" prop="autor">
			  <el-input type="text" v-model="form.autor"></el-input>
			</el-form-item>
			<el-form-item label="图书简介" prop="introduction">
			  <el-input type="textarea" v-model="form.introduction"></el-input>
			</el-form-item>
			<el-form-item label="是否推荐" prop="recomment">
			   <el-radio-group v-model="form.recomment">
			      <el-radio :label="1">是</el-radio>
			      <el-radio :label="0">否</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="图书分类" prop="bookType">
				<el-select 
					v-model="form.bookType" 
					@change="handleBookType"
					placeholder="请选择图书分类" 
					style="width: 100%;">
					<el-option
						v-for="item in bookTypeList"
						:key="item.bookType"
						:label="item.bookTypeName"
						:value="item.bookType">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="图书封面" prop="cover">
				<upload-img 
					@getImgUrl="getImgUrl" 
					:url="form.cover"></upload-img>
				<img :src="form.cover" style="height: 180px;width: 360px;" alt="">
			</el-form-item>
			<el-form-item label="图书类容" prop="bookUrl">  
			<upload-file @getfileUrl="getfileUrl"></upload-file>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{bookCode?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import UploadFile from '../../../components/BaseUploadFile.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			UploadImg,
			UploadFile
		},
    data() {
      return {
				bookCode:'',
				bookDetail:'',
				bookTypeList:[],
        form: {
					id:'',
					bookCode:'',
          bookName: '',
          bookType: '',
					bookTypeName:'',
					autor:'',
					introduction:'',
					cover:'',
					bookUrl:'',
					recomment:1
        },
				rulesForm:{
					 bookName: [{ required: true, message: '请输入图书名称', trigger: 'blur' }],
					 autor: [{ required: true, message: '请输入图书作者', trigger: 'blur' }],
					 bookType: [{ required: true, message: '请选择图书类型', trigger: 'blur' }],
					 introduction: [{ required: true, message: '请输入图书简介', trigger: 'blur' }],
					 bookUrl: [{ required: true, message: '请选择图书类容', trigger: 'blur' }],
					 cover: [{ required: true, message: '请上传图书封面', trigger: 'blur' }],
					 recomment: [{ required: true, message: '请选择是否推荐', trigger: 'blur' }],
				},
      }
    },
    methods: {
			handleBookType(val){
				this.form.bookTypeName=this.bookTypeList.filter(item=>item.bookType==val)[0].bookTypeName
			},
			getfileUrl(val){
				this.form.bookUrl=val
			},
			getImgUrl(val){
				this.form.cover=val
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = {
							bookName:this.form.bookName,
							bookType:this.form.bookType,
							bookTypeName:this.form.bookTypeName,
							autor:this.form.autor,
							introduction:this.form.introduction,
							cover:this.form.cover,
							bookUrl:this.form.bookUrl,
							recomment:this.form.recomment
						}
						
						if(!this.bookCode){
							api.addBookAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$router.push('books_manage')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							params['id']=this.form.id
							params['bookCode']=this.form.bookCode
							// // console.log(params);
							api.updateBookAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$router.push('books_manage')
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
				// // console.log(index,row);
				this.form.exam=row.name
			},
			handleNodeClick(data) {
				this.form.type=data.label
				// // console.log(data);
			},
			queryBookTypeList(){
				api.queryBookTypeListAPI().then(res=>{
					if(res.code==0){
						this.bookTypeList=res.data
					}
				})
			}
    },
		created() {
			this.queryBookTypeList()
			this.bookCode=this.$route.query.bookCode
			if(this.bookCode){
				api.queryBookDetailAPI({bookCode:this.bookCode}).then(res=>{
					// // console.log('书籍详情',res);
					if(res.code==0){
						this.bookDetail=res.data
						this.form.id=res.data.id
						this.form.bookName=res.data.bookName
						this.form.bookCode=res.data.bookCode
						this.form.autor=res.data.autor
						this.form.introduction=res.data.introduction
						this.form.recomment=parseInt(res.data.recomment)
						this.form.bookType=res.data.bookType
						this.form.bookTypeName=res.data.bookTypeName
						this.form.cover=res.data.cover
						this.form.bookUrl=res.data.bookUrl
					}
				})
			}
		}
  }
</script>