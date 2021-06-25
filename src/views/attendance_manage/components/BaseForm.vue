<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="规则名称" prop="rulesName">
		    <el-input v-model="form.rulesName"></el-input>
		  </el-form-item>
			<el-form-item
				label="机构" 
				prop="orgCode" 
				:rules="[{ required: true, message: '机构不能为空'}]"
				v-if="isAdmin">
			  <el-cascader
					style="width: 100%;"
					:options="orgList"
					v-model="form.orgCode"
					@change="onHandleChangeNode"
					:show-all-levels="false"
					:props="{ multiple: false, checkStrictly: false, label:'orgName',value:'orgCode',children:'', emitPath:false }"
					clearable>
				</el-cascader>
			</el-form-item>
			<el-form-item label="考勤地点" prop="attendanceAddress">
			  <el-input v-model="form.attendanceAddress"></el-input>
			</el-form-item>
			<el-form-item label="经纬度" prop="attendanceGis">
				<el-input v-model="form.attendanceGis" disabled></el-input>
			  <base-map @getLocation="getLocation"></base-map>
			</el-form-item>
			<el-form-item label="考勤范围" prop="attendanceRange">
			  <el-input v-model="form.attendanceRange" type="number">
					<template slot="append">km</template>
				</el-input>
			</el-form-item>
		  <el-form-item label="时间" prop="signTime">
				<div>
					<ul class="mb-1">
						<li v-for="(item, index) in timeList" :key="index" class="mt-2 d-flex align-items-center">
							<el-time-picker
								 v-model="item.start"
								 value-format='HH:mm:ss'
								 :clearable="false"
								 @change="changeTime"
								 placeholder="开始时间">
							 </el-time-picker>
							 <el-time-picker
							 	 v-model="item.end"
								 class="ml-2"
								 @change="changeTime"
								 :clearable="false"
							 	 value-format='HH:mm:ss'
							 	 placeholder="结束时间">
							  </el-time-picker>
								<i class="el-icon-delete fontSize20 ml-2" style="cursor: pointer; color: #007BFF;" @click="removeChildTime(index)"></i>
						</li>
					</ul>
					<div>
						<span class="border btn btn-light" @click="addChildTime"><i class="el-icon-plus"></i></span>
					</div>
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
		computed:{
			isAdmin(){
				return this.$store.state.userInfo.projectDepartment=='admin'?true:false
			}
		},
		props:{
			currentRule:{}
		},
    data() {
      return {
				timeList:[
					{
						start:null,
						end:null
					}
				],
				isable:0,
				orgList:[],
        form: {
					id:null,
					orgCode:this.$store.state.userInfo.projectDepartment=='admin'?'':this.$store.state.userInfo.projectDepartment,
					rulesName:'',
          attendanceAddress: '',
          attendanceGis: '',
					attendanceRange:'',
					signTime:[],
					signInStartTime:'',
					signInEndTime:'',
					outTime:[],
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
			changeTime(e){
				// console.log(e);
				if(this.timeList.length!==0){
				this.timeList.forEach((item,index)=>{
					let pre=this.timeList[index-1]
					let after=this.timeList[index+1]
					//监听开始时间
					if(e===item.start){
						if(item.end!==null){
							if(e>=item.end){
								item.start=null
								return this.$message({type:'warning',message:'开始时间不能大于结束时间'})
							}
							if(e<=pre.end){
								item.start=null
								return this.$message({type:'warning',message:'不能小于上一个时间段的结束时间'})
							}
						}else{
							if(typeof pre !=='undefined'){
								if(e<=pre.end){
									item.start=null
									return this.$message({type:'warning',message:'不能小于上一个时间段的结束时间'})
								}
								if(typeof after ==='undefined'){
									if(e<=pre.end){
										item.start=null
										return this.$message({type:'warning',message:'不能小于上一个时间段的结束时间'})
									}
									if(pre.start>=e){
										item.start=null
										return this.$message({type:'warning',message:'不能小于上一个时间段的开始时间'})
									}
								}else{
									if(e>=after.start){
										item.start=null
										return this.$message({type:'warning',message:'不能大于下一个时间段的开始时间'})
									}
								}
							}
						}
					}
					//监听结束时间
					if(e===item.end){
						if(item.start!==null){
							if(item.start>=e){
								item.end=null
								return this.$message({type:'warning',message:'结束时间不能小于开始时间'})
							}
						}else{
							item.end=null
							return this.$message({type:'warning',message:'开始时间不能为空'})
						}
					}	
				})
				}
			},
			onHandleChangeNode(value){
				// console.log(value);
				this.form.orgCode=value
			},
			querySysOrgByPage(){
				api.getSysOrgTreeAPI().then(res=>{
					// console.log('机构列表',res.data);
					if(res.code==0){
						this.orgList=res.data[0].childrenOrg.map(v=>{
							v.childrenOrg=[]
							return v
						})
					}
				})
			},
			removeChildTime(index){
				this.$confirm('是否删除该时间段?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.timeList.splice(index,1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			addChildTime(){
				if(this.timeList.length===4) return this.$message({type:'warning',message:'最大设置四个时间段'})
				let item=this.timeList[this.timeList.length-1]
				if(item.end===null||item.start===null) return this.$message({type:'warning',message:'请填写上一个时间段'})
				this.timeList.push(
				{
					start:null,
					end:null
				})
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							rulesName:this.form.rulesName,
							attendanceGis:this.form.attendanceGis,
							attendanceAddress:this.form.attendanceAddress,
							attendanceRange:this.form.attendanceRange,
							projectDepartmentCode:this.form.orgCode,
							attendanceTimes:this.timeList.map(v=>{
								return {
									signInStartTime:v.start,
									signInEndTime:v.end
								}
							})
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
				// // console.log(index,row);
				this.form.exam=row.name
			},
			
    },
		created() {
			this.querySysOrgByPage()
			if(this.currentRule){
				// console.log(this.currentRule);
				this.form.id=this.currentRule.id
				this.form.attendanceAddress=this.currentRule.attendanceAddress
				this.form.attendanceGis=this.currentRule.attendanceGis
				this.form.attendanceRange=this.currentRule.attendanceRange
				this.form.rulesName=this.currentRule.rulesName
				this.form.orgCode=this.currentRule.projectDepartmentCode
				this.timeList=this.currentRule.attendanceTimes.map(v=>{
					return {
						start:v.signInStartTime,
						end:v.signInEndTime
					}
				})
				// console.log(this.form);
			}
		}
  }
</script>