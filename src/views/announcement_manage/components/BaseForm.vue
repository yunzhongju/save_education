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
					type="datetime"
					size="medium"
					v-model="form.startTime"
					@change="handleBeginDate"
					value-format="yyyy-MM-dd HH:mm:ss"
					placeholder="选择开始日期"></el-date-picker>
					<el-date-picker
						type="datetime"
						size="medium"
						v-model="form.endTime"
						@change="handleEndDate"
						value-format="yyyy-MM-dd HH:mm:ss"
						style="margin-left: 20px;"
						placeholder="选择结束日期">
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
				<div class="border p-2 rounded" style="max-height: 200px;overflow: auto;" v-if="form.receiver.length!==0">
					<el-tag 
						v-for="(item,index) in form.receiver" 
						closable
						@close="handleRemoveUser(item,index)"
						class="mr-2">{{item.userName}}</el-tag>
				</div>
				<span 
					@click="handleChooseUser" 
					class="btn btn-light border py-2 px-3 mt-2" 
					style="font-size: 26px;">+</span>
			</el-form-item>
			<el-form-item label="公告内容" prop="content">
			 <base-editor @input="getContent" :text="form.content" ></base-editor>
			</el-form-item>
		  <el-form-item>
		    <el-button  type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
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
	import SelectUser from '../../../components/SelectUser.vue'
	import datePicker from '@/components/date-picker.vue'
	import api from '../../../api/api.js'
  export default {
		inject:['app'],
		components:{
			BaseTable,
			UploadFile,
			BaseEditor,
			BaseTransfer,
			SelectUser,
			datePicker
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
					 receiver: [{ required: true, message: '请选择公告对象', trigger: 'change' }],
					 time: [{ required: true, message: '请选择日期时间', trigger: 'blur' }],
					 content: [{ required: true, message: '请输入公告详情', trigger: 'blur' }],
					 creator: [{ required: true, message: '请输入发布单位', trigger: 'blur' }],
				},
      }
    },
    methods: {
			handleRemoveUser(item,index){
				let i=this.form.receiver.findIndex(v=>v.id===item.id)
				this.form.receiver.splice(index,1)
			},
			handleChooseUser(){
				this.app.show(res=>{
					// console.log(res);
					if(res.length===0) return this.$message({type:'warning',message:'请选择人员'})
					this.form.receiver=Array.from(new Set([...this.form.receiver,...res]))
				})
			},
			handleBeginDate(val){
				this.form.time.push(val)
				this.form.startTime=val
			},
			handleEndDate(val){
				this.form.time.push(val)
				this.form.endTime=val
			},
			handleUserList(arr){
				let a=arr.map(v=>v.userCode)
				return a.join(',')
			},
			getUserList(list){
				this.form.receiver=list
			},
			getContent(val){
				this.form.content=val
			},
			getfileobj(obj){
				// // console.log('文件对象',obj);
				this.form.noticeFiles.push(obj)
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							title:this.form.title,
							content:this.form.content,
							startTime:this.form.startTime,
							endTime:this.form.endTime,
							creator:this.form.creator,
							receiver:this.handleUserList(this.form.receiver),
							noticeFiles:this.form.noticeFiles,
						}
						// console.log(params);
						if(!this.form.id){
							delete this.form['id']
							api.noticeByAddAPI(params).then(res=>{
								if(res.code!=0){
									this.$message({
										type:'warning',
										message:res.msg
									})
									return
								}
								// // console.log('ok',res);
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
    },
		created() {
			this.form.id=this.$route.query.id
			if(this.form.id){
				api.noticeByDetailAPI({id:this.form.id}).then(res=>{
					// // console.log('详情',res);
					this.form.content=res.data.content
					this.form.title=res.data.title
					this.form.noticeFiles=res.data.noticeFiles
					this.form.receiver=res.data.users
					this.form.creator=res.data.creator
					this.form.startTime=res.data.startTime
					this.form.endTime=res.data.endTime

				})
			}
		}
  }
</script>