<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="头像:">
						<div class="block"><el-avatar :size="50" :src="detail.avatar"></el-avatar></div>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="用户姓名:">
						<span>{{ detail.userName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="用户名:">
						<span>{{ detail.userCode }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="用户编码:">
						<span>{{ detail.userCode }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="性别:">
						<span>{{ detail.sex==0?'男':'女'}}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="权限:">
						<span>{{ detail.loginAuthor==0?'管理员':detail.loginAuthor==1?'学员':'讲师' }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="出生日期:">
						<span>{{ detail.birth }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="机构:">
						<span>{{ detail.orgName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="状态:">
						<span>{{ detail.status==1?'有效':'无效' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="手机号:">
						<span>{{ detail.mobileNo }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="机构编码:">
						<span>{{ detail.orgCode}}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="创建时间:">
			  		<span>{{detail.createTime }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="更新时间:">
			  		<span>{{detail.updateTime }}</span>
			  	</el-form-item>
			  </div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="24"><div class="grid-content bg-purple">
			  	<el-form-item label="角色:">
			  		<el-checkbox-group v-model="detail.roleCodes">
			  		   <el-checkbox :label="item.roleCode"  v-for="(item,index) in roleList">{{item.roleName}}</el-checkbox>
			  		 </el-checkbox-group>
			  	</el-form-item>
			  </div></el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import api from '../../../api/api.js'
	export default {
		props:{
			detail:{
				type:Object,
			},
		},
		data(){
			return {
				roleList:[]
			}
		},
		created() {
			api.querySysRoleListAPI().then(res=>{
				if(res.code==0){
					// console.log('角色列表',res);
					this.roleList=res.data
				}
			})
		},
		mounted() {
		}
	}
</script>

<style scoped>
/* 	.demo-table-expand{
		display: flex;
		flex-wrap: wrap;
	} */
</style>
