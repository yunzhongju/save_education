<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="组名称:">
						<span>{{ detail.groupName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考勤规则:">
						<span>{{ detail.attendanceRuleName }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="所属机构:">
						<span>{{detail.orgName }}</span>
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
					<el-form-item label="创建时间:">
						<span>{{ detail.createTime }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="更新时间:">
						<span>{{ detail.updateTime }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="组成员:">
						<el-table
							ref="multipleTable"
							:data="detail.userList"
							border
							size="mini"
							tooltip-effect="dark"
							max-height="250">
							<el-table-column
								label="编号"
								prop="id"
								width="55"
								>
							</el-table-column>
							<el-table-column
								label="姓名"
								prop="userName"
								>
							</el-table-column>
							<el-table-column
								label="性别"
								prop=""
								>
								<template slot-scope="scope">
									<span>{{scope.row.sex==0?'男':'女'}}</span>
								</template>
							</el-table-column>
							<el-table-column
								label="手机号"
								prop="mobileNo"
								align="center"
								>
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
