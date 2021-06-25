<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="d-flex m-auto">
					<!-- <base-form class="b-form"></base-form> -->
					<div class="m-auto">
						<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
						  <el-form-item label="培训标题" prop="trainName">
						    <el-input v-model="form.trainName"></el-input>
						  </el-form-item>
							<el-form-item label="培训详情" prop="remark">
							 <el-input v-model="form.remark" type="textarea"></el-input>
							</el-form-item>
							<el-form-item label="培训地点" prop="trainAddress">
							 <el-input v-model="form.trainAddress"></el-input>
							</el-form-item>
							<el-form-item label="培训时间" prop="begDate">
								<el-date-picker
									type="datetime"
									size="medium"
									v-model="form.begDate"
									value-format="yyyy-MM-dd HH:mm:ss"
									placeholder="选择开始日期"></el-date-picker>
									<el-date-picker
										type="datetime"
										size="medium"
										v-model="form.endDate"
										value-format="yyyy-MM-dd HH:mm:ss"
										style="margin-left: 20px;"
										placeholder="选择结束日期">
									</el-date-picker>
							</el-form-item>
							<el-form-item label="培训封面" prop="trainImag">
								<upload-img @getImgUrl="getImgUrl" :url="form.trainImag"></upload-img>
							</el-form-item>
							<el-form-item label="培训人员" prop="userCodeList">
								<div 
									class="border p-2 rounded" 
									style="max-height: 200px;overflow: auto;width: 740px;" 
									v-if="form.userCodeList.length!==0">
									<el-tag 
										v-for="(item,index) in form.userCodeList" 
										closable
										@close="handleRemoveUser(item,index)"
										class="mr-2">{{item.userName}}</el-tag>
								</div>
								<span 
									@click="handleChooseUser" 
									class="btn btn-light border py-2 px-3 mt-2" 
									style="font-size: 26px;">+</span>
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
						    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
						    <el-button @click="resetForm('form')">取消</el-button>
						  </el-form-item>
						</el-form>
					</div>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import UploadImg from '@/components/BaseUploadImg.vue'
	import UploadFile from '@/components/BaseUploadFile.vue'
	import api from '../../api/api.js'
	export default {
		inject:['app'],
		components:{
			BaseTabs,
			UploadFile,
			UploadImg
		},
		data(){
			return {
				id:'',
				baseTabs:[{label: '创建培训',value: '1'}],
				form: {
				  trainName: '',
				  trainImag: '',
					trainAddress:'',
					begDate:'',
					endDate:'',
					remark:'',
					fileUrl:'',
					userCodeList:[]
				},
				// http://education.quweiquwei.com/1604989723851/丹禾分销体系.pdf
				// http://education.quweiquwei.com/1604989710372/u=2381403632,2459980562&fm=26&gp=0.jpg
				rulesForm:{
					 trainName: [{ required: true, message: '请输入培训标题', trigger: 'blur' }],
					 trainImag: [{ required: true, message: '请上传培训封面', trigger: 'blur' }],
					 trainAddress: [{ required: true, message: '请输入培训地点', trigger: 'change' }],
					 remark: [{ required: true, message: '请输入培训描述', trigger: 'blur' }],
					 begDate: [{ required: true, message: '请选择时间', trigger: 'change' }],
					 fileUrl: [{ required: true, message: '请上传培训附件', trigger: 'blur' }],
					 userCodeList: [{ required: true, message: '请选择培训人员', trigger: 'blur' }],
				},
			}
		},
		methods:{
			handleRemoveUser(item,index){
				this.form.userCodeList.splice(index,1)
			},
			handleChooseUser(){
				this.app.show(res=>{
					this.form.userCodeList=Array.from(new Set([...this.form.userCodeList,...res]))
				})
			},
			onBaseTabClick(){},
			onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						this.form.userCodeList=this.form.userCodeList.map(v=>v.userCode)
						// console.log(this.form);
						if(!this.id){
							api.addTrainPlanAPI(this.form).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							api.updateTrainPlanAPI(this.form).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}
						this.$router.go(-1)	
					} else {
						// console.log(this.form);
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$router.push('/education/train_manage')
			},
			getfileUrl(val){
				this.form.fileUrl=val
			},
			getImgUrl(val){
				this.form.trainImag=val
			},
			getTrainDetail(){
				api.queryTrainPlanDetailAPI({id:this.id}).then(res=>{
					// console.log('培训详情',res);
					this.form.trainName=res.data.trainName
					this.form.remark=res.data.remark
					this.form.trainAddress=res.data.trainAddress
					this.form.begDate=res.data.begDate
					this.form.endDate=res.data.endDate
					this.form.trainImag=res.data.trainImag
					this.form.fileUrl=res.data.fileUrl
					this.form.userCodeList=res.data.studentList
					this.form.trainCode=res.data.trainCode
				})
			}
		},
		created() {
			this.id=this.$route.query.id
			if(this.id){
				this.getTrainDetail()
			}
		}
	}
</script>

<style>
</style>
