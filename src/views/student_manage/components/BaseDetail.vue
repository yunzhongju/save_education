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
					<el-form-item label="学员编码:">
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
			  	<el-form-item label="我的考试个数:">
			  		<span>{{detail.examCount }}</span>
			  	</el-form-item>
			  </div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程数:">
						<span>{{detail.courseCount }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考试总数:">
						<span>{{ detail.examAllCount }}</span>
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
