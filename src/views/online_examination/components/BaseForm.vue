<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="考试名称" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="考试简介" prop="desc">
		   <el-input v-model="form.desc"></el-input>
		  </el-form-item>
			<el-form-item label="考试次数" prop="count">
			 <el-input v-model="form.count"></el-input>
			</el-form-item>
		  <el-form-item label="考试时间" prop="time">
				<el-date-picker
					v-model="form.time"
					type="datetimerange"
					range-separator="至"
					value-format="yyyy-MM-dd H:mm:ss"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
		  </el-form-item>
			<el-form-item label="考试类型" prop="type">
			   <el-radio-group v-model="radio" @change="handleChooseType">
			     <el-radio label="在线考试">在线考试</el-radio>
			     <el-radio label="线下考试">线下考试</el-radio>
			   </el-radio-group>
			</el-form-item>
			<el-form-item label="考试地点" prop="addr">
			 <el-input v-model="form.addr"></el-input>
			</el-form-item>
			<el-form-item label="考试人员" prop="userList">
			 <base-transfer @getUserList="getUserList" :leftList="form.userList"></base-transfer>
			</el-form-item>
			<el-form-item label="考试试卷" prop="exam">
			 <el-input v-model="form.exam" clearable></el-input>
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
		    <el-button type="primary" @click="onSubmit('form')">{{examCode?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import BaseTransfer from '../../../components/BaseTransfer.vue'
	import BaseTable from '../../../components/BaseTable.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseTable,
			BaseTransfer
		},
		props:{

		},
    data() {
      return {
				examCode:'',
				planDetail:null,
				paperList:[],
				radio:'在线考试',
        form: {
					id:null,
          name: '',
          desc: '',
					time:[],
					addr:'',
					type:'在线考试',
					userList:[],
					exam:'',
					exam_code:'',
					count:0,
        },
				rulesForm:{
					 name: [{ required: true, message: '请输入考试名称', trigger: 'blur' }],
					 desc: [{ required: true, message: '请输入考试简介', trigger: 'blur' }],
					 time: [{ required: true, message: '请选择日期时间', trigger: 'change' }],
					 exam: [{ required: true, message: '请选中考试试卷', trigger: 'blur' }],
					 addr: [{ required: true, message: '请输入考试地点', trigger: 'blur' }],
					 type: [{ required: true, message: '请选择考试类型', trigger: 'blur' }],
					 count: [{ required: true, message: '请输入考试次数', trigger: 'blur' }],
				},
      }
    },
    methods: {
			handleChooseType(val){
				// console.log(val);
				this.form.type=val
			},
			getUserList(val){
				this.form.userList=val
			},
			handleChoosePaper(index,row){
				this.form.exam=row.paperName
				this.form.exam_code=row.paperCode
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					 let params={
					 	examName:this.form.name,
					 	examMessage:this.form.desc,
					 	examType:this.form.type,
					 	examAddress:this.form.addr,
					 	examCount:this.form.count,
					 	begDate:this.form.time[0],
					 	endDate:this.form.time[1],
					 	paperCode:this.form.exam_code,
					 	paperName:this.form.exam,
					 	userCodeList:this.form.userList
					 }
					if (valid) {
						if(!this.examCode){
							api.addExamPlanAPI(params).then(res=>{
								// console.log('ok',res);
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$router.push('online_examination')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							params['id']=this.form.id
							// console.log(params);
							api.updateExamPlanAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$router.push('online_examination')
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
							message:'请填写完整表单',
							type:'warning'
						})
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$router.push('/education/online_examination')
			},
			queryPaperList(params={}){
				api.queryPaperListAPI(params).then(res=>{
					// console.log('试卷列表',res);
					if(res.code==0){
						this.paperList=res.data
					}
				})
			},
			handleUserList(arr){
				let list =[]
				arr.forEach(item=>{
					list.push(item.studentCode)
				})
				return list
			}
    },
		created() {
			this.queryPaperList()
			this.examCode=this.$route.query.examCode
			if(this.examCode){
				api.queryExamPlanDetailAPI({examCode:this.examCode}).then(res=>{
					// console.log('详情',res);
					this.planDetail=res.data
					this.form.id=res.data.id
					this.form.name=res.data.examName
					this.form.desc=res.data.examMessage
					this.form.count=res.data.examCount
					this.form.time.push(res.data.begDate)
					this.form.time.push(res.data.endDate)
					this.form.type=res.data.examType
					this.form.addr=res.data.examAddress
					this.form.exam_code=res.data.paperCode
					this.form.exam=res.data.paperName
					this.form.userList=this.handleUserList(res.data.userList)
				})
			}
		}
  }
</script>