<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="公告标题" prop="title">
		    <el-input v-model="form.title" clearable></el-input>
		  </el-form-item>
			<el-form-item label="发布单位" prop="creator">
			  <el-input v-model="form.creator" clearable></el-input>
			</el-form-item>
			<el-form-item label="公告时间" prop="time">
				<el-date-picker
					v-model="form.time"
					type="datetimerange"
					range-separator="至"
					value-format="yyyy-MM-dd HH:mm:ss"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="附件">
				<el-row :gutter="20">
				  <el-col :span="0"><div class="grid-content bg-purple">
						<!-- <el-input v-model="form.annex" type="text"></el-input> -->
					</div></el-col>
				  <el-col :span="10"><div class="grid-content bg-purple">
						<upload-file @getfileobj="getfileobj"></upload-file>
					</div></el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="公告对象" prop="receiver">
			 <base-transfer 
				@getUserList="getUserList" 
				:leftList="form.receiver.length!==0?form.receiver:[]"></base-transfer>
			</el-form-item>
			<el-form-item label="公告内容" prop="content">
			 <base-editor @input="getContent" :text="form.content" ></base-editor>
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
	import BaseEditor from '../../../components/ckeditor/ckeditor.vue'
	import BaseTransfer from '../../../components/BaseTransfer.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseTable,
			UploadFile,
			BaseEditor,
			BaseTransfer
		},
    data() {
			let	validateTime=(rule,value,callback)=>{
				let currentTime=new Date().getTime()
				let beginTime=new Date(value[0]).getTime()
				if(beginTime<currentTime){
					return callback(new Error('开始时间不能小于当前时间'))
				}
			}
      return {
        form: {
					id:'',
          title: '',
          content: '',
					time:[],
					noticeFiles:[],
					startTime:'',
					endTime:'',
					creator:'',
					receiver:'',
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
					 receiver: [{ required: true, message: '请选择公告对象', trigger: 'blur' }],
					 time: [{ required: true, message: '请选择日期时间', trigger: 'blur' },
									{ validator: validateTime, trigger: 'blur' }],
					 content: [{ required: true, message: '请输入公告详情', trigger: 'blur' }],
					 creator: [{ required: true, message: '请输入发布单位', trigger: 'blur' }],
				},
      }
    },
    methods: {
			handleUserList(arr){
				let s=arr[0]
				for(let i=1;i<arr.length;i++){
					s+=','+arr[i]
				}
				return s
			},
			getUserList(list){
				this.form.receiver=list
			},
			getContent(val){
				this.form.content=val
			},
			getfileobj(obj){
				// console.log('文件对象',obj);
				this.form.noticeFiles.push(obj)
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							title:this.form.title,
							content:this.form.content,
							startTime:this.form.time[0],
							endTime:this.form.time[1],
							creator:this.form.creator,
							receiver:this.handleUserList(this.form.receiver),
							noticeFiles:this.form.noticeFiles,
						}
						// console.log(params);
						if(!this.form.id){
							api.noticeByAddAPI(params).then(res=>{
								if(res.code!=0){
									this.$message({
										type:'warning',
										message:res.msg
									})
									return
								}
								// console.log('ok',res);
								this.$message({
									message:'添加成功',
									type:'success'
								})
								this.$router.go(-1)
							})
						}else{
							api.noticeByUpdateAPI(params).then(res=>{
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
    },
		created() {
			this.form.id=this.$route.query.id
			if(this.form.id){
				api.noticeByDetailAPI({id:this.form.id}).then(res=>{
					// console.log('详情',res);
					this.form.content=res.data.content
					this.form.title=res.data.title
					this.form.noticeFiles=res.data.noticeFiles
					this.form.receiver=res.data.receiver.split(',')
					this.form.creator=res.data.creator
					this.form.time.push(res.data.startTime)
					this.form.time.push(res.data.endTime)
				})
			}
		}
  }
</script>