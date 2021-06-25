<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="试卷名称:">
						<span>{{ detail.paperName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="考试时长:">
						<span>{{ detail.paperTime }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="及格分数:">
						<span>{{detail.passScore }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="试卷总分:">
						<span>{{ detail.sumScore }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="单选题数量:">
						<span>{{detail.scoreBuild|handleScoreBuild(1) }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="单选题分值:">
						<span>{{ detail.scoreBuild|handleScoreBuild(11)  }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="多选题数量:">
						<span>{{detail.scoreBuild|handleScoreBuild(2) }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="多选题分值:">
						<span>{{ detail.scoreBuild|handleScoreBuild(21)  }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="判断题数量:">
						<span>{{detail.scoreBuild|handleScoreBuild(3) }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="判断题分值:">
						<span>{{ detail.scoreBuild|handleScoreBuild(31)  }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="试卷试题:">
						<el-table
							ref="multipleTable"
							:data="detail.questionQueryList"
							border
							tooltip-effect="dark"
							max-height="250">
							<el-table-column
								type="index"
								width="55">
							</el-table-column>
							<el-table-column
								label="题目"
								prop="questionName"
								>
							</el-table-column>
							<el-table-column
								label="类型"
								align="center"
								width="80"
								>
								<template slot-scope="scope">
									<span>{{scope.row.questionType==1?'单选题':scope.row.questionType==2?'多选题':'判断题'}}</span>
								</template>
							</el-table-column>
							<el-table-column
								label="答案"
								width="80"
								align="center"
								prop="answer"
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
		},
		filters:{
			handleScoreBuild(scoreBuild,type){
				let score=scoreBuild
				if(score){
					let scoreList=score.split('|')
					if(type==1){
						return scoreList[0].split('-')[1]
					}else if(type==11){
						return scoreList[0].split('-')[2]
					}else if(type==2){
						return scoreList[1].split('-')[1]
					}else if(type==21){
						return scoreList[1].split('-')[2]
					}else if(type==3){
						return scoreList[2].split('-')[1]
					}else if(type==31){
						return scoreList[2].split('-')[2]
					}
				}else{
					return 0
				}
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
