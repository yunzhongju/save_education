<template>
	<div>
		<div>
			<el-transfer
				style="text-align: left; display: inline-block"
				v-model="leftList"
				:titles="['可选人员', '已选人员']"
				:button-texts="['到左边', '到右边']"
				:props="props"
				:format="{
					noChecked: '${total}',
					hasChecked: '${checked}/${total}'
				}"
				@change="handleChange"
				:data="userList"
			>
				<span slot-scope="{ option }">{{ option.userName }}</span>
				<el-cascader
					ref='cascader'
					:options="orgList"
					:show-all-levels="false"
					slot="left-footer" 
					v-model="department"
					@change="handleChooseOrg"
					placeholder="请选择机构"
					style="width: 100%;"
					:props="{ checkStrictly: true,label:'orgName', children:'childrenOrg',value:'orgCode'}"
					clearable></el-cascader>
			</el-transfer>
		</div>
	</div>
</template>

<script>
import api from '../api/api.js'
export default {
	props:{
		leftList:{
			type:Array,
			default:()=>[]
		}
	},
	created() {
		this.getSysOrgTree()
		// this.queryStudentList({pageNo:1,pageSize:100,orgType:0})
		if(typeof this.orgCode =='boolean'){
			this.getUserList({})
		}else{
			this.getUserList({orgCode:this.orgCode,orgType:this.orgType})
		}
	},
	data() {
		return {
			chooseUsers:[],
			department:'',
			orgList:[],
			orgType:0,
			userList:[],
			props:{
				key:'userCode',
				value:'userName',
				name:'userName'
			},
			renderFunc(h, option) {
				return (
					<span>
						{option.key} - {option.label}
					</span>
				);
			}
		};
	},
	computed:{
		orgCode(){
			return this.$store.state.userInfo.projectDepartment=='admin'?true:this.$store.state.userInfo.projectDepartment
		}
	},
	methods: {
		handleChooseOrg(org){
			if(org.length!==0){
				let code=org[org.length-1]
				this.getUserList({orgCode:code,orgType:this.orgType})
			}else{
				if(typeof this.orgCode =='boolean'){
					this.getUserList({})
				}else{
					this.getUserList({orgCode:this.orgCode,orgType:this.orgType})
				}
			}
		},
		handleChange(value, direction, movedKeys) {
			this.$emit('getUserList',value)
		},
		handleChooseRightOrg(val){
			this.queryStudentList({orgCode:val})
		},
	getSysOrgTree(){
		api.getSysOrgTreeAPI().then(res=>{
			if(res.code==0){
				// // console.log('机构列表',res);
				if(typeof this.orgCode=='boolean'){
					this.orgList=res.data
				}else{
					this._handleOrgList(res.data)
					this.orgList=res.data
				}
			}
		})
	},
	_handleOrgList(arr){
		arr.forEach(item=>{
			item.childrenOrg=item.childrenOrg.filter(each=>{
				return each.orgCode==this.orgCode
			})
		})
	},
		queryStudentList(params){
			if(!params.orgCode){
				params['orgCode']=''
			}
			api.querySysUserByPageAPI(params).then(res=>{
				// console.log('学员列表',res);
				if(res.code==0){
					this.userList=res.data.records
				}
			})
		},
		getUserList(params){
			// // console.log(11111111111111111111)
			api.getUserListAPI(params).then(res=>{
				if(res.code==0){
					this.userList=res.data
				}
			})
		}
	},
	mounted() {
		this.chooseUsers=this.leftList
	}
};
</script>

<style>
.transfer-footer {
	margin-left: 20px;
	padding: 6px 5px;
}
</style>
