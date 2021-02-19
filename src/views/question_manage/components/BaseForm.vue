<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="题干" prop="questionName">
		    <el-input type="textarea" v-model="form.questionName"></el-input>
		  </el-form-item>
<!-- 			<el-form-item label="题号" prop="questionIndex">
			  <el-input type="text" v-model="form.questionIndex"></el-input>
			</el-form-item> -->
		  <el-form-item label="题型" prop="questionType">
		   <el-select v-model="form.questionType" placeholder="请选择题型" style="width: 100%;">
		       <el-option
		         v-for="item in options"
		         :key="item.value"
		         :label="item.label"
		         :value="item.value">
		       </el-option>
		     </el-select>
		  </el-form-item>
			<el-form-item label="解析" prop="remark">
			  <el-input type="textarea" v-model="form.remark"></el-input>
			</el-form-item>
			<el-form-item label="课程" prop="courseCode">
			  <el-select 	
					@change="handleChooseCourse"
					v-model="form.courseCode" 
					placeholder="请选择课程" 
					style="width: 100%;">
			      <el-option
			        v-for="item in courseList"
			        :key="item.id"
			        :label="item.courseName"
			        :value="item.courseCode">
			      </el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="章节" prop="sectionCode">
			  <el-input type="text" v-model="form.sectionName" clearable></el-input>
				<div>
					<el-tree :data="sectionList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</div>
			</el-form-item>
		  <el-form-item label="选项与答案" prop="">
				<div v-show="form.questionType!=2">
					<el-radio-group 
						@change="handleRadioChoose"
						v-model="form.answer" 
						class="flex-column">
						<el-radio 
							:label="item.optionIndex" v-for="(item,index) in radioChooseList">
								{{item.optionIndex}}
							<el-input clearable v-model="item.optionContext" size="mini" style="width: 50%;"></el-input>
							<i class="el-icon-delete" @click.stop="onHandleDel(index)" style="margin-left: 10px;"></i>
						</el-radio>
					</el-radio-group>
				</div>
				<div v-show="form.questionType==2">
					<el-checkbox-group 
						v-model="checkList" 
						v-for="(item,index) in checkChooseList" 
						class="flex-column">
						<el-checkbox :label="item.optionIndex">{{item.optionIndex}}  
							<el-input clearable v-model="item.optionContext" size="mini" style="width: 100%;"></el-input>
							<i class="el-icon-delete" @click.stop="onHandleDel(index)" style="margin-left: 10px;"></i>
						</el-checkbox>
					</el-checkbox-group>
				</div>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top10">
						<el-button type="primary" size="mini" @click="handleAddChoose">添加选项</el-button>
					</div></el-col>
				</el-row>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
		
		
		<el-dialog
		  title="添加选项"
		  :visible.sync="dialogVisible"
		  width="20%"
			center
		  :before-close="handleClose">
			<div>
				<el-form ref="formchoose" :model="chooseForm" :rules="chooseRule" label-width="80px">
				  <el-form-item label="选项标签" prop="optionIndex">
				    <el-input v-model="chooseForm.optionIndex" placeholder="A 或 B ..."></el-input>
				  </el-form-item>
					<el-form-item label="选项值" prop="optionContext">
					  <el-input v-model="chooseForm.optionContext"></el-input>
					</el-form-item>
				  <el-form-item>
				     <el-button type="primary" @click="onSubmitChoose('formchoose')">添加</el-button>
				        <el-button @click="resetFormChoose('formchoose')">取消</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</el-dialog>
  </div>

</template>

<script>
	import BaseTable from '../../../components/BaseTable.vue'
	import api from '../../../api/api.js'
  export default {
		components:{
			BaseTable
		},
    data() {
      return {
				id:'',
				chooseForm:{
					optionIndex:'',
					optionContext:''
				},
				chooseRule:{
					optionIndex: [{ required: true, message: '请输入标签', trigger: 'blur' }],
					optionContext: [{ required: true, message: '请输入值', trigger: 'blur' }],
				},
				dialogVisible:false,
				checkList:[],
				courseList:[],
				sectionList:[],
				defaultProps: {
						children: 'childrenSectionList',
						label: 'sectionName'
					},
				radioChooseList:[],
				checkChooseList:[],
				radioChooseList:[],
				options:[
					{
						value: 1,
						label: '单选题'
					},
					{
						value: 2,
						label: '多选题'
					},
					{
						value: 3,
						label: '判断题'
					}
				],
				radio:'1',
				checked:'',
        form: {
          sectionCode: '',
          sectionName: '',
					questionIndex:'',
					courseCode:'',
					courseName:'',
					questionName:'',
					questionType:1,
					answer:'',
					remark:'',
					optionList:[],
					answerA:'',
					answerB:'',
					answerC:'',
					answerD:'',
        },
				rulesForm:{
					 questionName: [{ required: true, message: '请输入题干', trigger: 'blur' }],
					 questionIndex: [{ required: true, message: '请输入题号', trigger: 'blur' }],
					 remark: [{ required: true, message: '请输入题目解析', trigger: 'blur' }],
					 questionType: [{ required: true, message: '请选择题型', trigger: 'blur' }],
					 sectionCode: [{ required: true, message: '请选择章节', trigger: 'blur' }],
					 courseCode: [{ required: true, message: '请选择课程', trigger: 'blur' }],
					 content: [{ required: true, message: '请选择分类', trigger: 'blur' }],
					 answer: [{ required: true, message: '请选择答案', trigger: 'change' }],
				},

      }
    },
    methods: {
			onHandleDel(index){
				console.log(index);
				if(this.form.questionType!=2){
					this.radioChooseList.splice(index,1)
				}else{
					this.checkChooseList.splice(index,1)
				}
			},
			handleCheckList(arr){
				arr.sort()
				let s=''
				arr.forEach(item=>{
					s+=item
				})
				return s
			},
			handleRadioChoose(val){
				this.form.answer=val
			},
			resetFormChoose(formName){
				this.$refs[formName].resetFields();
				this.dialogVisible=false
			},
			onSubmitChoose(formName){
				let type = this.form.questionType
				if(type!=2){
					this.radioChooseList.push({optionIndex:this.chooseForm.optionIndex,optionContext:this.chooseForm.optionContext})
				}else{
					this.checkChooseList.push({optionIndex:this.chooseForm.optionIndex,optionContext:this.chooseForm.optionContext})
				}
				this.$refs[formName].resetFields();
				this.dialogVisible=false
			},
			handleClose(done){done()},
			handleAddChoose(){
				this.dialogVisible=true
			},
			handleChooseCourse(val){
				this.form.courseName=this.courseList.filter(item=>item.courseCode==val)[0].courseName
				this.queryCourseSectionTree({courseCode:val})
			},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params={
							courseCode:this.form.courseCode,
							courseName:this.form.courseName,
							questionIndex:this.form.questionIndex,
							sectionCode:this.form.sectionCode,
							sectionName:this.form.sectionName,
							questionName:this.form.questionName,
							questionType:this.form.questionType,
							answer:this.form.questionType!=2?this.form.answer:this.handleCheckList(this.checkList),
							remark:this.form.remark,
							optionList:this.form.questionType!=2?this.radioChooseList:this.checkChooseList
						}
						
						if(!this.id){
							api.addQuestionAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							params['id']=this.id
							// console.log(params);
							api.updateQuestionAPI(params).then(res=>{
								this.$message({
									message:'更新成功',
									type:'success'
								})
								this.$router.go(-1)
							})
						}
						
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$router.go(-1)
			},
			handleNodeClick(data) {
				this.form.sectionName=data.sectionName
				this.form.sectionCode=data.sectionCode
			},
			queryCourseByPage(params){
				api.queryCourseByPageAPI(params).then(res=>{
					// console.log('课程列表',res);
					if(res.code==0){
						this.courseList=res.data.records
					}
				})
			},
			queryCourseSectionTree(params){
				api.queryCourseSectionTreeAPI(params).then(res=>{
					// console.log('章节列表',res);
					if(res.code==0){
						this.sectionList=res.data
					}
				})
			},
			handleMulitAnswer(str){
				let list=[]
				for(let s of str){
					list.push(s)
				}
				return list
			}
    },
		created() {
			this.queryCourseByPage({pageNo:1,pageSize:20})
			this.id=this.$route.query.id
			if(this.id){
				api.queryQuestionDetailAPI({id:this.id}).then(res=>{
					// console.log("详情",res);
					if(res.code==0){
						this.form.questionName=res.data.questionName
						this.form.questionType=parseInt(res.data.questionType)
						this.form.remark=res.data.remark
						this.form.answer=res.data.answer
						this.form.courseName=res.data.courseName
						this.form.courseCode=res.data.courseCode
						this.form.sectionName=res.data.sectionName
						this.form.sectionCode=res.data.sectionCode
						this.form.questionIndex=res.data.questionIndex
						if(res.data.questionType==2){
							this.checkChooseList=res.data.optionList?res.data.optionList:[]
							this.checkList=this.handleMulitAnswer(res.data.answer?res.data.answer:[])
						}else{
							this.radioChooseList=res.data.optionList?res.data.optionList:[]
						}
					}
				})
			}
		}
  }
</script>
<style lang="less" scoped>
	.el-radio{
		margin-right: 0;
		margin-top: 20px;
	}
</style>