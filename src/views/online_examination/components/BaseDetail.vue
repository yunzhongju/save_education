<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考试名称:">
						<span>{{ detail.examName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="描述:">
						<span>{{ detail.examMessage }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考试次数:">
						<span>{{detail.examCount }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考试方式:">
						<span>{{ detail.examType }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="试卷名称:">
						<span>{{ detail.paperName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考试地点:">
						<span>{{ detail.examAddress }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="开始时间:">
						<span>{{ detail.begDate }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="结束时间:">
						<span>{{ detail.endDate }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="考试人员:">
						<el-table
							ref="multipleTable"
							:data="detail.userList"
							border
							size="mini"
							tooltip-effect="dark"
							max-height="250">
							<el-table-column
								type="index"
								width="55"
								align="center">
							</el-table-column>
							<el-table-column
								label="姓名"
								prop="userName"	
								align="center"
								>
							</el-table-column>
							<el-table-column
								label="是否完成"
								align="center">
								<template slot-scope="scope">
									<span v-if="scope.row.isDone==0" style="color: red;">未完成</span>
									<span v-else style="color: green;">已完成</span>
								</template>
							</el-table-column>
							<el-table-column
								label="分数"
								align="center">
								<template slot-scope="scope">
									<span>{{scope.row.isDone==0?0:scope.row.score}}</span>
								</template>
							</el-table-column>
						</el-table>
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
