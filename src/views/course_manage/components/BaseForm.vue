<template>
  <div class="m-auto">
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="课程名称" prop="title">
		    <el-input type="text" v-model="form.title"></el-input>
		  </el-form-item>
			<el-form-item label="课程简称" prop="courseShortName">
			  <el-input type="textarea" v-model="form.courseShortName"></el-input>
			</el-form-item>
			<el-form-item label="课程简介" prop="desc">
			  <el-input type="text" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item label="课程分类" prop="courseTypeName">
			  <el-select 
					@change="handleChooseCoureseType"
					v-model="form.courseTypeCode" 
					placeholder="请选择课程分类">
					<el-option
						v-for="item in courseTypeList"
						:key="item.id"
						:label="item.courseTypeName"
						:value="item.courseType">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="课程封面" prop="coverimg">
				<upload-img 
					@getImgUrl="getImgUrl" 
					:url="currentCourse?currentCourse.cover:''"></upload-img>
			</el-form-item>
			<el-form-item label="课程机构" prop="orgCodes" v-if="isAdmin">
			  <el-cascader
					style="width: 100%;"
					:options="orgList"
					v-model="form.orgCodes"
					@change="onHandleChangeNode"
					:show-all-levels="false"
					:props="{ multiple: true, checkStrictly: false, label:'orgName',value:'orgCode',children:'childrenOrg', emitPath:false }"
					clearable>
				</el-cascader>
			</el-form-item>
			<el-form-item label="课程讲师">
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<el-input type="text" v-model="form.teacherName"></el-input>
					</div></el-col>
				</el-row> 
			</el-form-item>
			<el-form-item label="是否推荐">
			    <el-radio-group v-model="form.recomment">
			      <el-radio :label="1">是</el-radio>
			      <el-radio :label="0">否</el-radio>
			    </el-radio-group>
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
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import CourseContent from './CourseContent.vue'
	import api from '../../../api/api.js'
	import {bus} from '../../../utils/bus.js'
  export default {
		components:{
			UploadImg,
			CourseContent,
			BaseTable
		},
    data() {
      return {
				id:'',
				currentCourse:null,
				orgType:null,
				teacherList:[],
				serachValue:'',
				orgList:[],
				courseTypeList:[],
        form: {
          title: '',
					courseShortName:'',
					courseTypeCode:'',
					courseTypeName:'',
					avatar:0,
					desc:'',
					coverimg:'',
					teacherCode:'',
					recomment:0,
					teacherName:'',
					orgCodes:this.$store.state.userInfo.projectDepartment=='admin'?[]:[this.$store.state.userInfo.projectDepartment]
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
					 courseShortName: [{ required: true, message: '请输入课程简称', trigger: 'blur' }],
					 courseTypeName: [{ required: true, message: '请选择课程类型', trigger: 'blur' }],
					 desc: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
					 content: [{ required: true, message: '请选择课程类容', trigger: 'blur' }],
					 coverimg: [{ required: true, message: '请上传课程封面', trigger: 'blur' }],
					 orgCodes: [{ required: true, message: '请选择机构', trigger: 'blur' }],
				},
      }
    },
		computed:{
			isAdmin(){
				return this.$store.state.userInfo.projectDepartment=='admin'?true:false
			}
		},
    methods: {
			onHandleChangeNode(node){
				// console.log(111,node);
				this.form.orgCodes=node
			},
			handleChooseCoureseType(value){
				this.form.courseTypeName=this.courseTypeList.filter(item=>item.courseType==value)[0].courseTypeName
			},
			handleChooseOrgType(node){
				// // console.log(node);
				let code=node[node.length-1]
				this.queryTeacherList({roleCode:'teacher',orgCode:code})
			},
			handleChooseTeacher(index,row){
				this.form.teacherName=row.userName
				this.form.teacherCode=row.userCode
			},
			getImgUrl(url){
				this.form.coverimg=url
			},
			handleSerach(){},
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = {
							courseName:this.form.title,
							courseShortName:this.form.courseShortName,
							courseType:this.form.courseTypeCode,
							courseTypeName:this.form.courseTypeName,
							introduction:this.form.desc,
							cover:this.form.coverimg,
							avatar:this.form.avatar,
							// teacherCode:this.form.teacherCode,
							teacherName:this.form.teacherName,
							orgCodes:this.form.orgCodes,
							recomment:this.form.recomment
						}
						if(!this.id){
							api.addCourseAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$router.push('course_manage')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							let args={
								id:this.id,
								courseType:this.form.courseTypeCode,
								courseTypeName:this.form.courseTypeName,
								courseCode:this.currentCourse.courseCode,
								courseName:this.form.title,
								courseShortName:this.form.courseShortName,
								introduction:this.form.desc,
								cover:this.form.coverimg,
								avatar:this.form.avatar,
								// teacherCode:this.form.teacherCode,
								teacherName:this.form.teacherName,
								orgCodes:this.form.orgCodes,
								recomment:this.form.recomment
							}
							// // console.log(args);
							api.updateCourseAPI(args).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$router.push('course_manage')
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}
						localStorage.removeItem('course')
					} else {
						this.$message({
							message:'请填写完整的表单',
							type:'warning'
						})
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$router.go(-1)
			},
			getPageSize(val){},
			getCurrentPage(val){},
			handleSelectionChange(){},
			handleEdit(index,row){
				this.form.exam=row.name
			},
			handleNodeClick(data) {
				this.form.type=data.label
				// // console.log(data);
			},
			queryTeacherList(params){
				api.getUserListAPI(params).then(res=>{
					// console.log('讲师列表',res);
					if(res.code==0){
						this.teacherList=res.data
					}
				})
			},
			querySysOrgByPage(params){
				api.getSysOrgTreeAPI(params).then(res=>{
					// // console.log('机构列表',res.data);
					if(res.code==0){
						this._handleOrgList(res.data)
						this.orgList=res.data
					}
				})
			},
			_handleOrgList(arr){
				arr.forEach(item=>{
					item.childrenOrg.forEach(each=>{
						delete each.childrenOrg
					})
				})
			},
			queryCourseTypeList(params){
				api.queryCourseTypeListAPI(params).then(res=>{
					// // console.log('课程分类',res);	
					if(res.code==0){
						this.courseTypeList=res.data
					}
				})
			},
			
    },
		created() {
			this.id=this.$route.query.id
			this.queryTeacherList({roleCode:'teacher'})
			this.querySysOrgByPage({pageNo:1,pageSize:20})
			this.queryCourseTypeList()
			if(this.id){
				this.currentCourse=JSON.parse(localStorage.getItem('course'))
				this.id=this.currentCourse.id
				this.form.title=this.currentCourse.courseName
				this.form.desc=this.currentCourse.introduction
				this.form.courseShortName=this.currentCourse.courseShortName
				this.form.courseTypeCode=this.currentCourse.courseType
				this.form.courseTypeName=this.currentCourse.courseTypeName
				this.form.coverimg=this.currentCourse.cover
				this.form.teacherCode=this.currentCourse.teacherCode
				this.form.teacherName=this.currentCourse.teacherName||'无'
				this.form.recomment=Number(this.currentCourse.recomment)
				if(this.isAdmin){
					this.form.orgCodes=this.currentCourse.orgCodes?this.currentCourse.orgCodes:[]
				}
			}
		},
		mounted() {
		
		},
		destroyed() {
			
		}
  }
</script>