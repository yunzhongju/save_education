
	<template>
	<div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item 
				label="试卷名称" 
				prop="name">
					<el-input v-model="form.name" clearable></el-input>
				</el-form-item>
			<el-form-item 
				label="试卷说明" 
				prop="desc">
					<el-input v-model="form.desc" clearable></el-input>
				</el-form-item>
			<el-form-item 
				label="答卷时长" 
				prop="time">
					<el-input v-model.number="form.time" clearable></el-input>
				</el-form-item>
			<el-form-item 
				label="满分" 
				prop="full_score">
					<el-input v-model="form.full_score" clearable></el-input>
				</el-form-item>
			<el-form-item 
				label="及格分数" 
				prop="pass_score">
				<el-input v-model="form.pass_score" clearable></el-input>
			</el-form-item>
			<el-form-item label="分数构成" prop="score_constrc">
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<el-form-item 
								label="单选题数量">
								<el-input v-model="form.single_num" clearable></el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item 
								label="每题分数">
									<el-input v-model="form.single_score" clearable></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<el-form-item 
								label="多选题数量">
								<el-input v-model="form.multiple_num" clearable></el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item 
								label="每题分数">
								<el-input v-model="form.multiple_score" clearable></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<div class="grid-content bg-purple">
							<el-form-item 
								label="判断题数量">
								<el-input v-model="form.t_or_f_num" clearable></el-input>
							</el-form-item>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<el-form-item 
								label="每题分数">
								<el-input v-model="form.t_or_f_score" clearable></el-input>
							</el-form-item>
						</div>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="" prop="desc">
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<span>单选题:{{ single_count }}/{{ form.single_num?form.single_num:0 }}</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<span>多选题:{{ multiple_count }}/{{ form.multiple_num?form.multiple_num:0 }}</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<span>判断题:{{ t_or_f_count }}/{{ form.t_or_f_num?form.t_or_f_num:0 }}</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="grid-content bg-purple">
							<span>
								总分数:{{ leftSum }}/{{rightSum}}
							</span>
						</div>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="关联题目" prop="rel_test">
				<el-radio-group 
					v-model="ischoose" 
					@change="handleChoose">
					<el-radio :label="1">单选题</el-radio>
					<el-radio :label="2">多选题</el-radio>
					<el-radio :label="3">判断题</el-radio>
				</el-radio-group>
				<base-table 
					:total="total" 
					@getPageSize="getPageSize" 
					@getCurrentPage="getCurrentPage">
					<el-table 
						ref="multipleTable" 
						:data="questions_list" 
						border 
						tooltip-effect="dark" 
						style="width: 100%;" 
						@selection-change="handleSelectionChange">
						<el-table-column
							label="编号"
							align="center"
							width="55"
							>
							<template slot-scope="scope">
								<span>{{scope.$index+1}}</span>
							</template>
						</el-table-column>
						<el-table-column 
							prop="questionName" 
							label="题干" 
							align="center"></el-table-column>
						<el-table-column 
							prop="type" 
							label="题型" 
							align="center" 
							width="120">
							<template slot-scope="scope">
								<span>{{ scope.row.questionType == '1' ? '单选题' : scope.row.questionType == '2' ? '多选题' : '判断题' }}</span>
							</template>
						</el-table-column>
						<el-table-column 
							label="操作" 
							align="center" 
							width="150">
							<template slot-scope="scope">
								<el-button 
									size="mini" 
									type="primary" 
									@click="handleAddQuestion(scope.$index, scope.row)">添加</el-button>
								<el-button 
									size="mini" 
									type="danger" 
									@click="handleCanleQuestion(scope.$index, scope.row)">取消</el-button>
							</template>
						</el-table-column>
					</el-table>
				</base-table>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">{{id?'更新':'创建'}}</el-button>
				<el-button @click="resetForm('form')">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import BaseTable from '../../../components/BaseTable.vue';
import api from '../../../api/api.js'
export default {
	components: {
		BaseTable
	},
	props: {
	},
	data() {
		return {
			id:'',
			total:0,
			questions_list: [],
			ischoose: '',
			single_count: 0,
			multiple_count: 0,
			t_or_f_count: 0,
			form: {
				name: '',
				desc: '',
				time: '',
				full_score: '',
				pass_score: '',
				single_num: 0,
				single_score: 0,
				multiple_score: 0,
				multiple_num: 0,
				t_or_f_num: 0,
				t_or_f_score: 0,
				rel_test: [],
				score_constrc: 0
			},
			rulesForm: {
				name: [{ required: true, message: '请输入试卷名称', trigger: 'blur' }],
				desc: [{ required: true, message: '请输入试卷简介', trigger: 'blur' }],
				time: [{ required: true, message: '请输入答卷时长', trigger: 'change' },
							 { type: 'number', message: '时长必须为数字值'}],
				full_score: [{ required: true, message: '请输入试卷满分值', trigger: 'blur' },
				{ type: 'number', message: '满分值必须为数字值'}],
				pass_score: [{ required: true, message: '请设置及格分数', trigger: 'blur' },
				{ type: 'number', message: '及格分数必须为数字值'}],
				rel_test: [{ required: true, message: '请选中题目', trigger: 'blur' }],
				score_constrc: [{ required: true, message: '请输入分数构成', trigger: 'blur' }]
			}
		};
	},
	methods: {
		queryQuestionByPage(params){
				this.loading=true
				api.queryQuestionByPageAPI(params).then(res=>{
					// console.log('试题列表',res);
					if(res.code==0){
						this.questions_list=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
		},
		onSubmit(formName) {
			let scoreBuild = `1-${this.form.single_num}-${this.form.single_score}|2-${this.form.multiple_num}-${this.form.multiple_score}|3-${this.form.t_or_f_num}-${
				this.form.t_or_f_score
			}`;
			this.$refs[formName].validate(valid => {
				if (valid) {
					if(this.form.full_score!=this.rightSum && this.leftSum!=this.rightSum){
						this.$message({
							message: '分数构成不合理,请重新设置',
							type: 'warning'
						});
						return false
					}
					let params = {
						paperName: this.form.name,
						remark: this.form.desc,
						sumScore: this.form.full_score,
						passScore: this.form.pass_score,
						paperTime: this.form.time,
						scoreBuild: scoreBuild,
						questionCodeList: this.form.rel_test
					};
					// console.log('提交的', params);
					if(!this.id){
						api.addPaperAPI(params).then(res=>{
							if(res.code==0){
								this.$message({
									message: '添加成功',
									type: 'success'
								});
								this.$router.push('test_paper_manage')
							}else{
								this.$message({
									type:'warning',
									message:res.msg
								})
							}
						})
					}else{
						params['id']=this.id
						api.updatePaperAPI(params).then(res=>{
							if(res.code==0){
								this.$message({
									message: '更新成功',
									type: 'success'
								});
								this.$router.push('test_paper_manage')
							}else{
								this.$message({
									type:'warning',
									message:res.msg
								})
							}
						})
					}
					
				} else {
					this.$message({
						message: '请填写完整的表单',
						type: 'warning'
					});
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.$router.go(-1)
		},
		handleAddQuestion(index, row) {
			let rel_test = this.form.rel_test;
			if (rel_test.includes(row.questionCode)) {
				this.$message({
					message: '请勿重复添加',
					type: 'warning'
				});
				return;
			} else if (row.questionType == 1) {
				this.single_count += 1;
			} else if (row.questionType == 2) {
				this.multiple_count += 1;
			} else if (row.questionType == 3) {
				this.t_or_f_count += 1;
			}
			rel_test.push(row.questionCode);
			this.$message({
				message: '添加成功',
				type: 'success'
			});
		},
		handleCanleQuestion(index, row) {
			// console.log(row);
			let rel_test = this.form.rel_test;
			if (!rel_test.includes(row.questionCode)) {
				this.$message({
					message: '该题目还没添加',
					type: 'warning'
				});
			} else {
				this.form.rel_test = rel_test.filter(item => item != row.questionCode);
				if(row.questionType==1){
					this.single_count-=1
				}else if(row.questionType==2){
					this.multiple_count-=1
				}else if(row.questionType==3){
					this.t_or_f_count-=1
				}
				this.$message({
					message: '取消成功',
					type: 'success'
				});
			}
		},
		getPageSize(val) {
			this.queryQuestionByPage({pageNo:1,pageSize:val})
		},
		getCurrentPage(val) {
			this.queryQuestionByPage({pageNo:val,pageSize:10})
		},
		handleSelectionChange() {},
		handleChoose(label) {
			this.$emit('handleChoose',label)
		},
		handleQuestionList(arr){
			let list=[]
			arr.forEach(item=>{
				list.push(item.questionCode)
			})
			return list
		},
		handleScore(scoreBuild,type){
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
	},
	created() {
		this.queryQuestionByPage({pageNo:1,pageSize:10})
		this.id=this.$route.query.id
		if(this.id){
			api.queryPaperDetailAPI({id:this.id}).then(res=>{
				// console.log(res);
				if(res.code==0){
					this.form.name=res.data.paperName
					this.form.desc=res.data.remark
					this.form.time=res.data.paperTime
					this.form.full_score=res.data.sumScore
					this.form.pass_score=res.data.passScore
					this.form.rel_test=this.handleQuestionList(res.data.questionQueryList)
					this.form.single_num=this.handleScore(res.data.scoreBuild,1)
					this.form.single_score=this.handleScore(res.data.scoreBuild,11)
					this.form.multiple_num=this.handleScore(res.data.scoreBuild,2)
					this.form.multiple_score=this.handleScore(res.data.scoreBuild,21)
					this.form.t_or_f_num=this.handleScore(res.data.scoreBuild,3)
					this.form.t_or_f_score=this.handleScore(res.data.scoreBuild,31)
					this.single_count=this.handleScore(res.data.scoreBuild,1)
					this.multiple_count=this.handleScore(res.data.scoreBuild,2)
					this.t_or_f_count=this.handleScore(res.data.scoreBuild,3)
				}
			})
		}
	},
	computed:{
		leftSum(){
			return (this.single_count*this.form.single_score)+(this.multiple_count*this.form.multiple_score)+(this.t_or_f_count*this.form.t_or_f_score)
		},
		rightSum(){
			return (this.form.single_num*this.form.single_score)+(this.form.multiple_num*this.form.multiple_score)+(this.form.t_or_f_num*this.form.t_or_f_score)
		}
	}
};
</script>
