<template>
	<div class="in-animate">
		<base-tabs 
		:baseTabs="baseTabs">
		<template v-slot:1>
			<div class="m-auto w-50">
				<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
					<el-form-item label="考试名称" prop="examName">
						<el-input v-model="form.examName" clearable></el-input>
					</el-form-item>
					<el-form-item label="考试简介" prop="examMessage">
					 <el-input v-model="form.examMessage" type="textarea" clearable></el-input>
					</el-form-item>
					<el-form-item label="考试次数" prop="examCount">
					 <el-input type="number" v-model.number="form.examCount" clearable></el-input>
					</el-form-item>
					<el-form-item label="考试时间" prop="begDate">
						<el-date-picker
							type="datetime"
							size="medium"
							v-model="form.begDate"
							@change="handleBeginDate"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择开始日期"></el-date-picker>
							<el-date-picker
								type="datetime"
								size="medium"
								v-model="form.endDate"
								@change="handleEndDate"
								value-format="yyyy-MM-dd HH:mm:ss"
								style="margin-left: 20px;"
								placeholder="选择结束日期">
							</el-date-picker>
					</el-form-item>
					<el-form-item label="考试类型" prop="type">
						 <el-radio-group v-model="form.examType" @change="handleChooseType">
							 <el-radio label="在线考试">在线考试</el-radio>
							 <el-radio label="线下考试">线下考试</el-radio>
						 </el-radio-group>
					</el-form-item>
					<el-form-item label="考试地点" prop="examAddress">
					 <el-input v-model="form.examAddress" clearable></el-input>
					</el-form-item>
					<el-form-item label="考试人员" prop="userList">
					 <div 
						class="d-flex flex-wrap py-1 px-2  border rounded" 
						style="overflow: auto;max-height: 300px;" 
						v-if="form.userCodeList.length!==0">
						 <el-tag 
							class="mr-2 mb-2" 
							v-for="(item, index) in form.userCodeList" 
							closable 
							:key="index"
							@close="handleRemoveUser(index)">{{item.userName}}</el-tag>
					 </div>
					 <span 
							class="d-flex align-items-center p-3 justify-content-center border btn btn-light mt-2" 
							@click="handleChooseUser"
							style="width: 100px;">
					 		<i class="el-icon-plus"></i>
					 </span>
					</el-form-item>
					<el-form-item label="考试试卷" prop="exam">
					 <el-input v-model="form.paperName" clearable></el-input>
					 <base-table
					 :showFoot="false"
					 >
						<el-table
							ref="multipleTable"
							:data="paperList"
							border
							tooltip-effect="dark"
							style="width: 100%; height: 300px;"
							max-height="300">
							<el-table-column
								label="编号"
								prop="id"
								align="center"
								width="55"
								>
								<template slot-scope="scope">
									<span>{{scope.$index+1}}</span>
								</template>
							</el-table-column>
							<el-table-column
								prop="paperName"
								label="试卷名称"
								align="center"
								>
							</el-table-column>
							<el-table-column
								prop="passScore"
								label="及格分数"
								align="center"
								>
							</el-table-column>
							<el-table-column
								prop="paperTime"
								label="考试时长"
								align="center"
								show-overflow-tooltip>
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button
										size="mini"
										@click="handleChoosePaper(scope.$index, scope.row)">选中</el-button>
								</template>
							</el-table-column>
						</el-table>
					 </base-table>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
						<el-button @click="resetForm('form')">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</template>
		</base-tabs>
	</div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTable from '@/components/BaseTable.vue'
import api from '@/api/api.js'
export default {
	inject:['app'],
	components: {
		BaseTabs,
		BaseTable
	},
	data() {
		return {
			examCode:'',
			paperList:[],
			baseTabs: [{label: '创建考试',value: '1'}],
			form: {
				examName:'',
			  examMessage: '',
			  examType: '在线考试',
				examAddress:'',
				examCount:'',
				begDate:'',
				endDate:'',
				paperCode:'',
				paperName:'',
				userCodeList:[],
			},
			rulesForm:{
				 examName: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
				 userCodeList: [{ required: true, message: '选择考试人员', trigger: 'blur' }],
				 examMessage: [{ required: true, message: '请输入考试简介', trigger: 'blur' }],
				 begDate: [{ required: true, message: '请选择日期时间', trigger: 'change' }],
				 paperCode: [{ required: true, message: '请选中考试试卷', trigger: 'blur' }],
				 examAddress: [{ required: true, message: '请输入考试地点', trigger: 'blur' }],
				 examType: [{ required: true, message: '请选择考试类型', trigger: 'blur' }],
				 examCount: [{ required: true, message: '请输入考试次数', trigger: 'blur' }],
			},
		};
	},
	methods:{
		handleChoosePaper(index,row){
			this.form.paperName=row.paperName
			this.form.paperCode=row.paperCode
		},
		handleBeginDate(val){
			if(this.form.endDate){
				let sb=new Date(val).getTime()
				let eb=new Date(this.form.endDate).getTime()
				if(eb-sb<=0) {
					this.form.begDate=''
					return this.$message({type:'warning',message:'开始时间不能大于结束时间'})
				}
			}
		},
		handleEndDate(val){
			console.log(val);
			if(this.form.begDate){
				let sb=new Date(this.form.begDate).getTime()
				let eb=new Date(val).getTime()
				if(eb-sb<=0) {
					this.form.endDate=''
					return this.$message({type:'warning',message:'结束时间不能小于开始时间'})
				}
			}
		},
		onSubmit(formName) {
			 this.$refs[formName].validate((valid) => {
				this.form.userCodeList=this.form.userCodeList.map(v=>v.userCode)
				if (valid) {
					console.log(this.form);
					if(!this.form.id){
						api.addExamPlanAPI(this.form).then(res=>{
							this.$message({
								message:'添加成功',
								type:'success'
							})
						})
					}else{
						api.updateExamPlanAPI(this.form).then(res=>{
							this.$message({
								message:'更新成功',
								type:'success'
							})
						})
					}
					this.$router.push('online_examination')
				} else {
					this.$message({
						message:'请填写完整表单',
						type:'warning'
					})
					return false;
				}
			});
		},
		onHandleTimeChange(){},
		resetForm(formName) {
			this.$router.push('/education/online_examination')
		},
		handleChooseType(){},
		handleRemoveUser(index){
			this.form.userCodeList.splice(index,1)
		},
		handleChooseUser(){
			this.app.show(res=>{
				// console.log(res);
				this.form.userCodeList=Array.from(new Set([...this.form.userCodeList,...res]))
			})
		},
		queryPaperList(params={}){
			api.queryPaperListAPI(params).then(res=>{
				this.paperList=res.data
			})
		},
		getExamDetail(){
			api.queryExamPlanDetailAPI({examCode:this.examCode}).then(res=>{
				// console.log('详情',res);
				this.form.id=res.data.id
				this.form.examName=res.data.examName
				this.form.examMessage=res.data.examMessage
				this.form.examCount=res.data.examCount
				this.form.begDate=res.data.begDate
				this.form.endDate=res.data.endDate
				this.form.examType=res.data.examType
				this.form.examAddress=res.data.examAddress
				this.form.paperCode=res.data.paperCode
				this.form.paperName=res.data.paperName
				this.form.userCodeList=res.data.userList
				this.form.examCode=res.data.examCode
			})
		}
	},
	created() {
		this.examCode=this.$route.query.examCode
		if(this.examCode){
			this.getExamDetail()
		}
		this.queryPaperList()
	}
};
</script>

<style lang="less" scoped>
	.b-form{
		width: 50%;
	}
</style>
