<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="培训名称:">
						<span>{{ detail.trainName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="培训描述:">
						<span>{{ detail.remark }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="培训地点:">
						<span>{{detail.trainAddress }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="培训编码:">
						<span>{{ detail.trainCode }}</span>
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
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="培训封面:">
						<img :src="detail.trainImag" alt="..." style="width: 100px;height: 50px;">
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="培训附件:">
						<a :href="detail.fileUrl">{{detail.fileUrl}}</a>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="考试人员:">
						<el-table
							ref="multipleTable"
							:data="detail.studentList"
							border
							tooltip-effect="dark"
							max-height="250">
							<el-table-column
								type="index"
								width="55">
							</el-table-column>
							<el-table-column
								label="姓名"
								prop="studentName"
								>
							</el-table-column>
							<el-table-column
								label="是否完成"
								prop=""
								align="center"
								>
								<template slot-scope="scope">
									<span>{{scope.row.isComplete==0?'未完成':'完成'}}</span>
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
