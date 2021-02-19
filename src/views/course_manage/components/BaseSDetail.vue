<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="章节名称:">
						<span>{{ detail.sectionName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="章节编码:">
						<span>{{ detail.sectionCode }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="课程所属:">
			  		<span>{{detail.courseName }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="所属章节:">
						<span>{{ detail.parentSectionName?detail.parentSectionName:'无' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="章节描述:">
			  		<span>{{detail.remark}}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="观看时长:">
						<span>{{ detail.lookDuration }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="章节时长:">
						<span>{{detail.duration }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="章节视频:">
						<video :src="detail.sectionUrl" controls style="width: 250px;height: 200px;"></video>
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
