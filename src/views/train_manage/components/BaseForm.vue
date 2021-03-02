<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="培训标题" prop="trainName">
		    <el-input v-model="form.trainName"></el-input>
		  </el-form-item>
			<el-form-item label="培训详情" prop="remark">
			 <el-input v-model="form.remark" type="textarea"></el-input>
			</el-form-item>
			<el-form-item label="培训地点" prop="trainAddress">
			 <el-input v-model="form.trainAddress" type="textarea"></el-input>
			</el-form-item>
			<el-form-item label="培训时间" prop="time">
				<el-date-picker
					v-model="form.time"
					type="datetimerange"
					range-separator="至"
					value-format="yyyy-MM-dd HH:mm:ss"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="培训封面" prop="trainImag">
				<upload-img @getImgUrl="getImgUrl" :url="trainDetail?trainDetail.trainImag:''"></upload-img>
			</el-form-item>
			<el-form-item label="培训人员" prop="userCodeList">
			 <base-transfer @getUserList="getUserList" :leftList="form.userCodeList"></base-transfer>
			</el-form-item>
			<el-form-item label="培训附件" prop="fileUrl">
				<el-row>
				  <el-col :span="15"><div class="grid-content bg-purple">
						<el-input v-model="form.fileUrl" type="text"></el-input>
					</div></el-col>
				  <el-col :span="5"><div class="grid-content bg-purple marg-letf20">
						<upload-file @getfileUrl="getfileUrl"></upload-file>
					</div></el-col>
				</el-row>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import BaseTable from '../../../components/BaseTable.vue'
	import UploadFile from '../../../components/BaseUploadFile.vue'
	import BaseTransfer from '../../../components/BaseTransfer.vue'
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseTable,
			UploadFile,
			BaseTransfer,
			UploadImg
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
				id:'',
				trainDetail:'',
        form: {
          trainName: '',
          trainImag: '',
					trainAddress:'',
					begDate:'',
					endDate:'',
					remark:'',
					fileUrl:'',
					time:[],
					userCodeList:[]
        },
				// http://education.quweiquwei.com/1604989723851/丹禾分销体系.pdf
				// http://education.quweiquwei.com/1604989710372/u=2381403632,2459980562&fm=26&gp=0.jpg
				rulesForm:{
					 trainName: [{ required: true, message: '请输入培训标题', trigger: 'blur' }],
					 trainImag: [{ required: true, message: '请上传培训封面', trigger: 'blur' }],
					 trainAddress: [{ required: true, message: '请输入培训地点', trigger: 'change' }],
					 remark: [{ required: true, message: '请输入培训描述', trigger: 'blur' }],
					 time: [{ required: true, message: '请选择时间', trigger: 'blur' },
					 { validator: validateTime, trigger: 'blur' }],
					 fileUrl: [{ required: true, message: '请上传培训附件', trigger: 'blur' }],
					 userCodeList: [{ required: true, message: '请选择培训人员', trigger: 'blur' }],
				},
      }
    },
    methods: {
			getfileUrl(val){
				this.form.fileUrl=val
			},
			getImgUrl(val){
				this.form.trainImag=val
			},
			getUserList(val){
				this.form.userCodeList=val
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							trainName:this.form.trainName,
							trainImag:this.form.trainImag,
							trainAddress:this.form.trainAddress,
							remark:this.form.remark,
							fileUrl:this.form.fileUrl,
							begDate:this.form.time[0],
							endDate:this.form.time[1],
							userCodeList:this.form.userCodeList,
						}
						if(!this.id){
							api.addTrainPlanAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
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
							params['trainCode']=this.trainDetail.trainCode
							params['studentList']=this.trainDetail.studentList
							api.updateTrainPlanAPI(params).then(res=>{
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
			handleUserList(arr){
				let list=[]
				arr.forEach(item=>{
					list.push(item.studentCode)
				})
				return list
			}
    },
		created() {
			this.id=this.$route.query.id
			if(this.id){
				api.queryTrainPlanDetailAPI({id:this.id}).then(res=>{
					// console.log('培训详情',res);
					this.trainDetail=res.data
					this.form.trainName=res.data.trainName
					this.form.remark=res.data.remark
					this.form.trainAddress=res.data.trainAddress
					this.form.time.push(res.data.begDate)
					this.form.time.push(res.data.endDate)
					this.form.trainImag=res.data.trainImag
					this.form.fileUrl=res.data.fileUrl
					this.form.userCodeList=this.handleUserList(res.data.studentList)
				})
			}
		}
  }
</script>