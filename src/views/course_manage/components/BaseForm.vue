<template>
  <div>
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
					:url="currentCourse?currentCourse.coverimg:''"></upload-img>
			</el-form-item>
			<el-form-item label="课程讲师" prop="title">
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<el-input type="text" v-model="form.teacherName"></el-input>
					</div></el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="6"><div class="grid-content bg-purple-dark">
						<el-cascader
							:options="orgList"
							:show-all-levels="false"
							slot="left-footer" 
							@change="handleChooseOrgType"
							placeholder="请选择机构"
							style="width: 100%;"
							size="mini"
							:props="{ checkStrictly: true,label:'orgName', children:'childrenOrg',value:'orgCode'}"
							clearable></el-cascader>
					</div></el-col>
					<el-col :span="0"><div class="grid-content bg-purple-dark">
						<el-input
						  size="small"
							placeholder="搜索试卷名称"
							@change="handleSerach"
							clearable
							suffix-icon="el-icon-search"
							v-model="serachValue">
						</el-input>
					</div></el-col>
					<el-col :span="0"><div class="grid-content bg-purple-dark">
						<el-input
						  size="small"
							placeholder="搜索试卷名称"
							@change="handleSerach"
							clearable
							suffix-icon="el-icon-search"
							v-model="serachValue">
						</el-input>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<base-table
							:total="0" 
							:showFoot="false"
							@getPageSize="getPageSize" 
							@getCurrentPage="getCurrentPage">
							<el-table 
								ref="multipleTable" 
								:data="teacherList" 
								border
								tooltip-effect="dark" 
								style="width: 100%;" 
								@selection-change="handleSelectionChange">
								<el-table-column 
									label="编号" 
									prop="id" 
									align="center" 
									width="55">
									<template slot-scope="scope">
										<span>{{scope.$index+1}}</span>
									</template>
								</el-table-column>
								<el-table-column
									label="头像"
									align="center"
									>
									<template slot-scope="scope">
										<div class="block"><el-avatar :size="50" :src="scope.row.avatar"></el-avatar></div>
									</template>
								</el-table-column>
								<el-table-column 
									prop="userName" 
									label="姓名" 
									align="center"></el-table-column>
									<el-table-column
										label="性别" 
										align="center">
										<template slot-scope="scope">
											<span>{{scope.row.sex==0?'男':'女'}}</span>
										</template>
									</el-table-column>
								<el-table-column 
									prop="integral" 
									label="等级" 
									align="center">
									<template slot-scope="scope">
										<span>{{scope.row.level?scope.row.level:'0'}}</span>
									</template>
								</el-table-column>
								<el-table-column 
									prop="mobileNo" 
									label="手机号" 
									align="center">
								</el-table-column>
								<el-table-column 
									label="操作" 
									align="center">
									<template slot-scope="scope">
										<el-button 
											size="mini" 
											type="text" 
											@click="handleChooseTeacher(scope.$index, scope.row)">选择</el-button>
									</template>
								</el-table-column>
							</el-table>
						</base-table>
					</div></el-col>
				</el-row>	  
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
					teacherName:''
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
					 courseShortName: [{ required: true, message: '请输入课程简称', trigger: 'blur' }],
					 courseTypeName: [{ required: true, message: '请选择课程类型', trigger: 'blur' }],
					 desc: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
					 content: [{ required: true, message: '请选择课程类容', trigger: 'blur' }],
					 coverimg: [{ required: true, message: '请上传课程封面', trigger: 'blur' }],
				},
      }
    },
    methods: {
			handleChooseCoureseType(value){
				this.form.courseTypeName=this.courseTypeList.filter(item=>item.courseType==value)[0].courseTypeName
			},
			handleChooseOrgType(node){
				// console.log(node);
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
							teacherCode:this.form.teacherCode,
							teacherName:this.form.teacherName,
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
								teacherCode:this.form.teacherCode,
								teacherName:this.form.teacherName,
							}
							// console.log(args);
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
				// console.log(data);
			},
			queryTeacherList(params){
				api.getUserListAPI(params).then(res=>{
					console.log('讲师列表',res);
					if(res.code==0){
						this.teacherList=res.data
					}
				})
			},
			querySysOrgByPage(params){
				api.getSysOrgTreeAPI(params).then(res=>{
					// console.log('机构列表',res.data);
					if(res.code==0){
						this.orgList=res.data
					}
				})
			},
			queryCourseTypeList(params){
				api.queryCourseTypeListAPI(params).then(res=>{
					// console.log('课程分类',res);	
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
				this.form.teacherName=this.currentCourse.teacherName
			}
		},
		mounted() {
		
		},
		destroyed() {
			
		}
  }
</script>