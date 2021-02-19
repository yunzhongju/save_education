<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程名称:">
						<span>{{ detail.courseName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程简称:">
						<span>{{ detail.courseShortName }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="课程分类:">
			  		<span>{{detail.courseTypeName }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="创建时间:">
						<span>{{ detail.createTime }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="是否推荐:">
			  		<span>{{detail.recomment==0?'是':'否'}}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程编码:">
						<span>{{ detail.courseCode }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程简介:">
						<span>{{detail.introduction }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程讲师:">
						<span>{{ detail.teacherName }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="课程封面:">
						<img :src="detail.cover" alt="无" style="width: 100px; height: 50px;">
					</el-form-item>
				</div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="更新时间:">
						<span>{{detail.updateTime}}</span>
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
