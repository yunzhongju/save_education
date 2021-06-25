<template>
  <div class="m-auto">
		
		
		
		
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
					optionIndex: [{ validator: checkLabel, trigger: 'blur' }],
					optionContext: [{ required: true, message: '请输入值', trigger: 'blur' }],
				},
				dialogVisible:false,
				checkList:['A'],
				courseList:[],
				sectionList:[],
				defaultProps: {
						children: 'childrenSectionList',
						label: 'sectionName'
					},
				radioChooseList:[],
				checkChooseList:[],
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
					answer:'A',
					remark:'',
					optionList:[],
					answerA:'',
					answerB:'',
					answerC:'',
					answerD:'',
        },
				

      }
    },
    methods: {
			onHandleDel(index){
				// console.log(index);
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
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(type!=2){
							this.radioChooseList.push({optionIndex:this.chooseForm.optionIndex,optionContext:this.chooseForm.optionContext})
						}else{
							this.checkChooseList.push({optionIndex:this.chooseForm.optionIndex,optionContext:this.chooseForm.optionContext})
						}
						this.$refs[formName].resetFields();
						this.dialogVisible=false
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},
			handleClose(done){
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
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
						// if(this.form.questionType!=2&&this.form.answer)
						
						
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
							// // console.log(params);
							api.updateQuestionAPI(params).then(res=>{
								this.$message({
									message:'更新成功',
									type:'success'
								})
								this.$router.go(-1)
							})
						}
						
					} else {
						// // console.log('error submit!!');
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
					// // console.log('课程列表',res);
					if(res.code==0){
						this.courseList=res.data.records
					}
				})
			},
			queryCourseSectionTree(params){
				api.queryCourseSectionTreeAPI(params).then(res=>{
					console.log('章节列表',res);
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
					// // console.log("详情",res);
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
	.custom-tree-node{
		display: flex;
		align-items: center;
		span{
			margin-left: 10px;
		}
	}
</style>