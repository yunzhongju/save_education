<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="考勤组名称" prop="groupName">
		    <el-input v-model="form.groupName"></el-input>
		  </el-form-item>
			<el-form-item label="备注" prop="remarks">
			  <el-input v-model="form.remarks"></el-input>
			</el-form-item>
			<el-form-item label="机构" prop="orgCode">
				<el-cascader
					:options="orgList"
					v-model="form.orgCode"
					@change="handleChooseOrg"
					placeholder="请选择机构"
					style="width: 100%;"
					:props="{ checkStrictly: true,label:'orgName', children:'childrenOrg',value:'orgCode'}"
					clearable></el-cascader>
			</el-form-item>
			<el-form-item label="考勤规则" prop="attendanceRule">
				<el-select 
				v-model="form.attendanceRule" 
				@change="handleChooseRule"
				clearable
				placeholder="请选择考勤规则">
					<el-option
						:label="item.rulesName"
						v-for="(item,index) in ruleList"
						:key="item.id"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="人员选择" prop="userCodes">
			  <base-transfer
				:leftList="form.userCodes"
				 @handleChooseDepartment="handleChooseDepartment"
				 @getUserList="getUserList">
				</base-transfer>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
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
			id:Number
		},
    data() {
      return {
				orgList:[],
				ruleList:[],
				value:'',
				userData:[{
					id:1,
					name:'tom',
					phone:12381923213,
					department: '中情局',
				}],
				isable:0,
        form: {
					id:null,
          groupName: '',
          remarks: '',
					orgCode:'00000000000300',
					userCodes:[],
					attendanceRule:''
        },
				rulesForm:{
					 groupName: [{ required: true, message: '请输入考勤组名称', trigger: 'blur' }],
					 remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
					 attendanceRule: [{ required: true, message: '请选择规则', trigger: 'blur' }],
					 userCodes: [{ required: true, message: '请选择人员', trigger: 'blur' }],
					 orgCode: [{ required: true, message: '请选择机构', trigger: 'blur' }],
				},
      }
    },
    methods: {
			handleChooseOrg(node){
				// console.log(node);
				this.form.orgCode=node[node.length-1]
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							id:this.form.id,
							groupName:this.form.groupName,
							remarks:this.form.remarks,
							orgCode:this.form.orgCode,
							userCodes:this.form.userCodes,
							attendanceRule:this.form.attendanceRule,
						}
						if(!this.form.id){
							api.attendanceGroupAddAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$emit('submit')
								}
							})
						}else{
							api.attendanceGroupUpdateAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$emit('submit')
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
				this.$emit('resetForm')
			},
			getUserList(val){
				this.form.userCodes=val
			},
			getPageSize(val){},
			getLocation(val){
				this.form.addr=val.lnglat.lng+' | '+val.lnglat.lat
			},
			handleChooseDepartment(val){
				// console.log(val);
			},
			handleChooseRule(val){},
			getCurrentPage(val){},
			handleSelectionChange(){},
			handleEdit(index,row){
				// console.log(index,row);
				this.form.exam=row.name
			},
			handleUserList(arr){
				let list=[]
				if(arr){
					arr.forEach(item=>{
						list.push(item.userCode)
					})
				}
				return list
			},
			getSysOrgTree(){
				api.getSysOrgTreeAPI().then(res=>{
					if(res.code==0){
						// console.log('机构列表',res);
						this.orgList=res.data
					}
				})
			},
    },
		created() {
			this.getSysOrgTree()
			api.attendanceRuleQueryListAPI({}).then(res=>{
				if(res.code==0){
					// console.log(res);
					this.ruleList=res.data
				}
			})
			
			if(this.id){
				this.form.id=this.id
				api.attendanceGroupDetailAPI({id:this.id}).then(res=>{
					if(res.code==0){
						this.form.groupName=res.data.groupName
						this.form.remarks=res.data.remarks
						this.form.orgCode=res.data.orgCode
						this.form.userCodes=[...this.handleUserList(res.data.userList)]
						this.form.attendanceRule=res.data.attendanceRule
					}
				})
			}
		}
  }
</script>