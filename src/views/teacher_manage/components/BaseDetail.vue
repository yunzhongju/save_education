<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="姓名:">
						<span>{{ detail.userName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="讲师编码:">
						<span>{{ detail.userCode }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="性别:">
						<span>{{ detail.sex==0?'男':'女' }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="机构编码:">
						<span>{{ detail.orgCode }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="手机号:">
			  		<span>{{detail.mobileNo }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="讲师等级:">
			  		<span>{{detail.integral }}</span>
			  	</el-form-item>
			  </div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="头像:">
						<img :src="detail.avatar" alt="无" style="width: 100px; height: 50px;">
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="更新时间:">
						<span>{{ detail.updateTime }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>

		</el-form>
	</div>
</template>

<script>
	export default {
		props:{
			detail:{
				type:Object,
			}
		}
	}
</script>

<style scoped>
/* 	.demo-table-expand{
		display: flex;
		flex-wrap: wrap;
	} */
</style>
