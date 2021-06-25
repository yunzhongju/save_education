<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="规则名称:">
						<span>{{ detail.rulesName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考勤地点:">
						<span>{{ detail.attendanceAddress }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="时间:">
			  		<!-- <span>{{detail.signInStartTime }}</span> -->
						<div v-for="(item,index) in detail.attendanceTimes">
							<span>{{item.signInStartTime}}---{{item.signInEndTime}}</span>
						</div>
			  	</el-form-item>
			  </div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="签到范围:">
						<span>{{ detail.attendanceRange }}km</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="经纬度:">
			  		<span>{{detail.attendanceGis }}</span>
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
					<el-form-item label="更新时间:">
						<span>{{detail.updateTime }}</span>
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
