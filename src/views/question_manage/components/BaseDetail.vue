<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="题目:">
						<span>{{ detail.questionName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="题型:">
						<span>{{ detail.questionType==1?'单选题':detail.questionType==2?'多选题':'判断题' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="所属章节:">
			  		<span>{{detail.sectionName }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="所属课程:">
						<span>{{ detail.courseName }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="描述:">
						<span>{{detail.remark }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="答案:">
						<span>{{ detail.answer }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="选项:">
						<el-row>
						  <el-col :span="24"><div class="grid-content bg-purple">
								<ul>
									<li v-for="(item,index) in detail.optionList">{{item.optionIndex}}-----{{item.optionContext}}</li>
								</ul>
							</div></el-col>
						</el-row>
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
