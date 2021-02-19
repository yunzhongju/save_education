<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="规则名称" prop="rulesName">
		    <el-input v-model="form.rulesName"></el-input>
		  </el-form-item>
			<el-form-item label="考勤地点" prop="attendanceAddress">
			  <el-input v-model="form.attendanceAddress"></el-input>
			</el-form-item>
			<el-form-item label="经纬度" prop="attendanceGis">
				<el-input v-model="form.attendanceGis"></el-input>
			  <base-map @getLocation="getLocation"></base-map>
			</el-form-item>
			<el-form-item label="考勤范围" prop="attendanceRange">
			  <el-input v-model="form.attendanceRange"></el-input>
			</el-form-item>
		  <el-form-item label="签到时间" prop="signTime">
		   <el-time-picker
				 is-range
				 v-model="form.signTime"
				 range-separator="至"
				 value-format='HH:mm'
				 start-placeholder="签到开始时间"
				 end-placeholder="签到结束时间"
				 placeholder="选择时间范围">
			 </el-time-picker>
		  </el-form-item>
			<el-form-item label="签退时间" prop="outTime">
			  <el-time-picker
					is-range
					v-model="form.outTime"
					range-separator="至"
					value-format='HH:mm'
					start-placeholder="签退开始时间"
					end-placeholder="签退结束时间"
					placeholder="选择时间范围">
				</el-time-picker>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import BaseMap from '../../../components/BaseMap.vue'
	import BaseTable from '../../../components/BaseTable.vue'
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import UploadFile from '../../../components/BaseUploadFile.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseTable,
			UploadFile,
			UploadImg,
			BaseMap
		},
		props:{
			currentRule:{}
		},
    data() {
      return {
				isable:0,
        form: {
					id:null,
					rulesName:'',
          attendanceAddress: '',
          attendanceGis: '',
					attendanceRange:'',
					signTime:'',
					signInStartTime:'',
					signInEndTime:'',
					outTime:'',
					signOutStartTime:'',
					signOutEndTime:'',
        },
				rulesForm:{
					 rulesName: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
					 attendanceAddress: [{ required: true, message: '请输入考勤地点', trigger: 'blur' }],
					 attendanceGis: [{ required: true, message: '请选择考勤定位', trigger: 'blur' }],
					 attendanceRange: [{ required: true, message: '请输入考勤范围', trigger: 'blur' }],
					 signInStartTime: [{ required: true, message: '请选择签到时间', trigger: 'blur' }],
					 signOutStartTime: [{ required: true, message: '请选择签退时间', trigger: 'blur' }],
				},
      }
    },
    methods: {
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							rulesName:this.form.rulesName,
							attendanceGis:this.form.attendanceGis,
							attendanceAddress:this.form.attendanceAddress,
							attendanceRange:this.form.attendanceRange,
							signInStartTime:this.form.signTime[0],
							signInEndTime:this.form.signTime[1],
							signOutStartTime:this.form.outTime[0],
							signOutEndTime:this.form.outTime[1],
						}
						if(!this.form.id){
							api.attendanceRuleAddAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$emit('submit')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							api.attendanceRuleUpdateAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$emit('submit')
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
							message:'请检查必填项!',
							type:'warning'
						})
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$emit('resetForm',2)
			},
			getPageSize(val){},
			getLocation(val){
				this.form.attendanceGis=val.lnglat.lng+','+val.lnglat.lat
			},
			getCurrentPage(val){},
			handleSelectionChange(){},
			handleEdit(index,row){
				// console.log(index,row);
				this.form.exam=row.name
			},
			
    },
		created() {
			if(this.currentRule){
				this.form.id=this.currentRule.id
				this.form.attendanceAddress=this.currentRule.attendanceAddress
				this.form.attendanceGis=this.currentRule.attendanceGis
				this.form.attendanceRange=this.currentRule.attendanceRange
				this.form.rulesName=this.currentRule.rulesName
				this.form.signTime=[]
				this.form.outTime=[]
				this.form.signTime.push(this.currentRule.signInStartTime)
				this.form.signTime.push(this.currentRule.signInEndTime)
				this.form.outTime.push(this.currentRule.signOutStartTime)
				this.form.outTime.push(this.currentRule.signOutEndTime)
			}
		}
  }
</script>