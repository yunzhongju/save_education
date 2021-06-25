<template>
	<el-tabs type="border-card" @tab-click="changeTab" v-model="getListForm.type">
	  <el-tab-pane label="按照分类" name="1">
			<div class="d-flex mb-3">
				<el-input
					placeholder="关键字"
					v-model="getListForm.context"
					size="small"
					clearable
					style="width: 20%;"
					class="mr-3 ml-auto"></el-input>
				<el-button type="primary" size="small" icon="el-icon-search" @click="getList">搜索</el-button>
			</div>
			<div class="d-flex flex-wrap justify-content-between hide-scollBar" style="height: 700px;">
				<div
					class="d-flex py-5 px-3 border flex-column justify-content-center align-content-center mb-3 mr-3 point"
					v-for="(item,index) in list"
					@click="handleToShowQuestion(1,item)"
					:key="index"
					style="width: 32%;height: 200px;">
					<h3 class="m-auto">{{item.name||'未知分类'}}</h3>
					<div class="d-flex justify-content-around mt-4">
						<span>单选题 {{item.single||0}}</span>
						<span>判断题 {{item.judge||0}}</span>
						<span>多选题 {{item.multiple||0}}</span>
					</div>
				</div>
			</div>
		</el-tab-pane>
	  <el-tab-pane label="按照课程" name="2">
			<div class="d-flex flex-column hide-scollBar" style="height: 750px;">
				<div
					class="d-flex flex-column px-3 py-4 border-bottom"
					v-for="(item,index) in list"
					:key="index">
					<h3>《{{item.name||'未知分类'}}》</h3>
					<div class="d-flex justify-content-between mt-3">
						<div class="w-25 d-flex justify-content-between">
							<span>单选题 {{item.single||0}}</span>
							<span>判断题 {{item.judge||0}}</span>
							<span>多选题 {{item.multiple||0}}</span>
						</div>
						<div>
							<el-button type="primary" size="small" @click="handleToShowQuestion(2,item)">查看详情</el-button>
							<el-button type="primary" size="small" @click="handleAdd(item)">添加试题</el-button>
						</div>
					</div>
				</div>
			</div>
		</el-tab-pane>
	  <el-tab-pane label="按照作者" name="3">
			<div class="d-flex mb-3">
				<el-input
					placeholder="作者"
					size="small"
					v-model="getListForm.context"
					style="width: 20%;"
					clearable
					class="mr-3 ml-auto"></el-input>
				<el-button type="primary" size="small" icon="el-icon-search" @click="getList">搜索</el-button>
			</div>
			<div class="d-flex flex-wrap  hide-scollBar" style="min-height: 700px;">
				<div
					class="d-flex py-5 px-3 border flex-column justify-content-center align-content-center mb-3 mr-3 point position-relative"
					v-for="(item,index) in list"
					:key="index"
					@click="handleToShowQuestion(3,item)"
					style="width: 32%;height: 200px;">
					<h3 class="m-auto">{{item.name||'未知'}}</h3>
					<h5 class="m-auto fontSize18">{{item.orgName||'未知'}}</h5>
					<div class="d-flex justify-content-around mt-2">
						<span>单选题 {{item.single||0}}</span>
						<span>判断题 {{item.judge||0}}</span>
						<span>多选题 {{item.multiple||0}}</span>
					</div>
					<div class="pl-5">最后更新时间：{{item.lastTime}}</div>
					<span
						class="position-absolute py-2 px-4 border-right border-bottom font-weight-bold"
						:style="{color:index<4?'red':''}"
						style="top: 0;left: 0;">{{index+1}}</span>
				</div>
			</div>
		</el-tab-pane>
	  <el-tab-pane label="按照题目" name="4">
			<div class="d-flex mb-3">
				<el-select
					v-model="getQuestionFrom.courseType"
					placeholder="课程分类"
					size="small"
					clearable
					class="ml-auto mr-3"
					@change="handleChangeCourseCate">
					<el-option
						v-for="(item,index) in courseCateList"
						:key="index"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select
					v-model="getQuestionFrom.courseCode"
					placeholder="课程"
					clearable
					@change="handleChangeCourse"
					size="small"
					class="mr-3">
					<el-option
						v-for="(item,index) in courseList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-cascader
						v-model="getQuestionFrom.sectionCode"
						clearable
						class="mr-3"
						:options="sectionList"
						size="small"
						placeholder="章节"
						:props="{ expandTrigger: 'hover',label:'sectionName',value:'sectionCode',children:'childrenSectionList', checkStrictly:true, emitPath:false }">
				</el-cascader>
				<el-select
					v-model="getQuestionFrom.questionType"
					placeholder="题型"
					clearable
					size="small"
					class="mr-3" >
					<el-option
						v-for="(item,index) in questionTypeList"
						:key="index"
						:label="item.name"
						:value="item.value">
					</el-option>
				</el-select>
				<el-input clearable placeholder="作者" v-model="getQuestionFrom.userName" size="small" style="width: 8%;" class="mr-3"></el-input>
				<el-input clearable placeholder="关键字" v-model="getQuestionFrom.context" size="small" style="width: 10%;" class="mr-3"></el-input>
				<el-button type="primary" size="small" icon="el-icon-search" @click="getData">搜索</el-button>
				<el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新建试题</el-button>
			</div>
			<base-table
				:total="total"
				@getCurrentPage="getCurrentPage">
				<el-table
					ref="multipleTable"
					:data="questionList"
					border
					v-loading="loading"
					tooltip-effect="dark"
					height="650">
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
						label="题干">
					</el-table-column>
					<el-table-column
						prop="courseName"
						label="所属课程"
						width="200"
						align="center"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						prop="sectionName"
						label="所属章节"
						width="200"
						align="center"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						label="题型"
						width="80"
						 prop="questionType"
						column-key="questionType"
						:filters="[{text:'单选题',value:'1'},{text:'多选题',value:'2'},{text:'判断题',value:'3'}]"
						:filter-method="filterHandler"
						align="center">
						<template slot-scope="scope">
							<span>{{scope.row.questionType==1?'单选题':scope.row.questionType==2?'多选题':'判断题'}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="作者"
						width="80"
						align="center">
						<template slot-scope="scope">
							<span>{{scope.row.createUser||'未知'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180" align="center">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="text"
								@click="handleQuestionDetail(scope.$index, scope.row)">详情</el-button>
							<el-button
								size="mini"
								type="text"
								@click="handleEditQuestion(scope.$index, scope.row)">编辑</el-button>
							<el-button
								size="mini"
								type="text"
								@click="handleDeleteQuestion(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</base-table>
		</el-tab-pane>

		<!-- 试题详情对话框 -->
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisible"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="questionDetail"
				></base-detail>
			</span>
		</el-dialog>
	</el-tabs>
</template>

<script>
	import BaseTable from '@/components/BaseTable.vue'
	import BaseDetail from './components/BaseDetail.vue'
	import api from '@/api/api.js'
	import {queryStatistics} from '@/api/question.js'
	import {queryCourseList} from '@/api/course.js'
	export default {
		components:{
			BaseTable,
			BaseDetail
		},
		data(){
			return {
				getListForm:{
					type:'4',
					context:''
				},
				courseCateList:[],
				courseList:[],
				list:[],
				sectionList:[],
				questionTypeList:[
					{name:'全部',value:''},
					{name:'单选题',value:1},
					{name:'多选题',value:2},
					{name:'判断题',value:3},
				],
				getQuestionFrom:{
					pageNo:1,
					pageSize:10,
					sectionCode:'',
					context:'',
					questionType:'',
					userName:'',
					courseType:'',
					courseCode:''
				},
				loading:false,
				dialogVisible:false,
				questionDetail:null,
				questionList:[],
				total:0,
			}
		},
		methods:{
			//切换tab
			changeTab(e){
				this.getListForm.type=e.name
				this.getListForm.context=''
				this.getQuestionFrom={
							pageNo:1,
							pageSize:10,
							sectionCode:'',
							context:'',
							questionType:'',
							userName:'',
							courseType:'',
							courseCode:''
				}
				if(e.name!=4){
					this.getList()
				}
			},
			//获取课程分类列表
			getCourseCate(){
				api.queryCourseTypeListAPI().then(res=>{
					this.courseCateList=res.data.map(v=>{
						return{
							label:v.courseTypeName,
							value:v.courseType
						}
					})
					this.courseCateList.unshift({label:'全部',value:''})
				})
			},
			//获取课程列表
			queryCourseList(args){
				queryCourseList(args).then(res=>{
					this.courseList=res.data.map(v=>{
						return {
							label:v.courseName,
							value:v.courseCode
						}
					})
					this.courseList.unshift({
							label:'全部',
							value:''
						})
				})
			},
			//选择课程分类
			handleChangeCourseCate(e){
				this.queryCourseList({courseType:e})
			},
			//选择课程
			handleChangeCourse(e){
				this.queryCourseSectionTree({courseCode:e})
			},
			//获取章节
			queryCourseSectionTree(args){
				api.queryCourseSectionTreeAPI(args).then(res=>{
					this.sectionList=res.data
				})
			},
			handleToShowQuestion(type,item){
				if(type===1){
					this.getQuestionFrom.courseType=item.code
				}else if(type===2){
					this.getQuestionFrom.courseCode=item.code
				}else{
					this.getQuestionFrom.userName=item.name
				}
				this.getListForm.type="4"
				this.getData()
			},
			//关闭对话框
			handleClose(done){done();},
			//表格标题按类型过滤
			filterHandler(value, row, column) {
					const property = column['property'];
					return row[property] === value;
				},
			// 添加试题
			handleAdd(e=null){
				let query={id:null}
				if(e){
					query.courseCode=e.code
					query.courseName=e.name
          query.courseType=e.courseType
				}
				this.$router.push({
					path:'create_question',
					query:query
				})
			},
			//获取详情
			handleQuestionDetail(index,row){
				api.queryQuestionDetailAPI({id:row.id}).then(res=>{
					this.questionDetail=res.data
					this.dialogVisible=true
				})
			},
			//编辑
			handleEditQuestion(index,row){
				this.$router.push({
					path:'create_question',
					query:{
						id:row.id
					}
				})
			},
			//获取当前页
			getCurrentPage(val){
				this.getQuestionFrom.pageNo=val
				this.getData()
			},
			//删除题目
			handleDeleteQuestion(index,row){
				this.$confirm('此操作将删除该题目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					api.deleteQuestionAPI({id:row.id}).then(res=>{
						this.getData()
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 获取题目表格数据
			queryQuestionByPage(params){
				this.loading=true
				api.queryQuestionByPageAPI(params).then(res=>{
					this.questionList=res.data.records
					this.total=res.data.total
					this.loading=false
				})
		  },
			getData(){
				this.queryQuestionByPage(this.getQuestionFrom)
			},
			getList(){
				queryStatistics(this.getListForm).then(res=>{
					let data=res.data
					this.list=data
					if( Array.isArray(data)&&data.length===0) return this.$message({type:'warning',message:'没有相关数据!'})
				})
			}
		},
		computed:{

		},
		created() {
			this.getList()
			this.getCourseCate()
			this.queryCourseList({courseType:''})
			this.getData()
		}
	}
</script>

<style>
</style>


<style>
</style>


<style>
</style>
