<template>
	<div>
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="">
					<el-row>
		<!-- 				<el-col :span="0">
							<div class="grid-content bg-purple">
								<el-upload
								  class="upload-demo"
								  action="https://jsonplaceholder.typicode.com/posts/"
								  :on-preview="handlePreview"
								  :on-remove="handleRemove"
								  :before-remove="beforeRemove"
								  multiple
								  :limit="3"
								  :on-exceed="handleExceed"
								  :file-list="fileList">
								  <el-button size="small" icon="el-icon-upload2" type="primary">导入</el-button>
								</el-upload>
							</div>
						</el-col> -->
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input 
											size="mini" 
											placeholder="搜索学员名称" 
											clearable 
											suffix-icon="el-icon-search" 
											v-model="serachValue"></el-input>
									</li>
									<li class="marg-right30">
										<el-button 
											type="primary" 
											size="mini" 
											icon="el-icon-search"
											@click="handleSerach">搜索</el-button></li>
										<li class="marg-right30">
											<el-button
												type="primary" 
												size="mini" 
												icon="el-icon-plus"
												@click="handleAddStudent">添加</el-button></li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row class="marg-top20">
						<el-col :span="0"><div class="grid-content bg-purple">
							<el-row>
								<h4>学员分类</h4>
							  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
									<el-tree
									  :data="orgList"
									  :props="{children: 'childrenSectionList',label: 'orgName'}"
									  accordion
									  @node-click="handleNodeClick">
									</el-tree>
								</div></el-col>
							</el-row>
						</div></el-col>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark ">
								<base-table 
								:total="total" 
								@getPageSize="getPageSize" 
								@getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="studentList" 
									border 
									tooltip-effect="dark" 
									height="650"
									@selection-change="handleSelectionChange">
										<el-table-column 
										label="编号" 
										prop="id" 
										width="55" 
										align="center">
										</el-table-column>
										</el-table-column>
										<el-table-column 
										prop="userName" 
										label="姓名" 
										align="center"></el-table-column>
										<el-table-column 
										prop="gender" 
										label="性别" 
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scope">
												<span>{{scope.row.sex==0?'男':'女'}}</span>
											</template>
										</el-table-column>
										<el-table-column 
										prop="mobileNo" 
										label="电话" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="" 
										label="学习情况" 
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scope">
												<!-- <el-row>
												  <el-col :span="12"><div class="grid-content bg-purple text-algin-left">我学习的课程数</div></el-col>
												  <el-col :span="12"><div class="grid-content bg-purple-light">{{scope.row.courseCount}}</div></el-col>
												</el-row> -->
												<el-row>
												  <el-col :span="12"><div class="grid-content bg-purple text-algin-left">我的考试总数</div></el-col>
												  <el-col :span="12"><div class="grid-content bg-purple-light">{{scope.row.examAllCount}}</div></el-col>
												</el-row>
				<!-- 								<el-row>
												  <el-col :span="12"><div class="grid-content bg-purple text-algin-left">完成的考试个数</div></el-col>
												  <el-col :span="12"><div class="grid-content bg-purple-light">{{scope.row.examCount}}</div></el-col>
												</el-row> -->
											</template>
										</el-table-column>
										<el-table-column 
										prop="updateTime" 
										label="更新时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column label="操作" align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text"
												@click="handleStudentDeatil(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleEditStudent(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleDeleteStudent(scope.$index, scope.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</base-table>
							</div>
						</el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		
		<el-dialog
		  title="添加/修改学员"
			v-if="dialogVisible"
		  :visible.sync="dialogVisible"
		  width="50%"
			center
		  :before-close="handleClose">
		  <span>
				<base-form
					@onSubmit="onSubmit"
					@onUpdate="onUpdate"
					:orgList="orgList"
					:currentStudent="currentStudent"
					></base-form>
			</span>
		</el-dialog>
		
		
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisibleDetail"
		  width="30%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="currentStudent"
				></base-detail>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import BaseForm from './components/BaseForm.vue'
import BaseDetail from './components/BaseDetail.vue'
import api from '../../api/api.js'
export default {
	components: {
		BaseTabs,
		BaseTable,
		BaseForm,
		BaseDetail
	},
	data() {
		return {
			dialogVisibleDetail:false,
			orgList:[],
			dialogVisible:false,
			studentList:[],
			currentStudent:null,
			total:0,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '学员管理',
					value: '1'
				}
			],
		};
	},
	methods: {
		handleNodeClick(node){
			this.queryStudentByPage({pageNo:1,pageSize:10,orgCode:node.orgCode})
		},
		handleStudentDeatil(index,row){
			api.queryStudentDetailAPI({userCode:row.userCode}).then(res=>{
				// console.log(res);
				this.currentStudent=res.data
				this.dialogVisibleDetail=true
			})
		},
		onUpdate(){
			this.queryStudentByPage({pageNo:1,pageSize:10})
			this.dialogVisible=false
		},
		onSubmit(){
			this.queryStudentByPage({pageNo:1,pageSize:10})
			this.dialogVisible=false
		},
		handleClose(done){done()},
		//切换baseTabs
		onBaseTabClick(val) {
			// // console.log(val);
		},
		//编辑
		handleEditStudent(index, row) {
			this.currentStudent=this.studentList.filter(item=>item.id==row.id)[0]
			this.dialogVisible=true
		},
		//撤销
		handleCancel(index, row){},
		//删除
		handleDeleteStudent(index, row) {
			this.$confirm('此操作将删除该学员, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteStudentAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.queryStudentByPage({pageNo:1,pageSize:10})
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		//选中数据
		handleSelectionChange(val) {
			// // console.log(val);
		},
		//按时间筛选
		handleDateTime(val) {
			// // console.log(val);
		},
		//搜索
		handleSerach() {
			this.queryStudentByPage({pageNo:1,pageSize:10,userName:this.serachValue})
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
		handleAddStudent() {
			this.currentStudent=null
			this.dialogVisible=true
		},
		//获取当前页
		getCurrentPage(val) {
			// // console.log(val);
		},
		//获取pagesize
		getPageSize(val) {
			// // console.log(val);
		},
		queryStudentByPage(params){
			api.queryStudentByPageAPI(params).then(res=>{
				// // console.log('学员列表',res);
				if(res.code==0){
					this.studentList=res.data.records
					this.total=res.data.total
				}
			})
		}
	},
	created() {
		this.queryStudentByPage({pageNo:1,pageSize:10})
		api.querySysOrgByPageAPI({pageNo:1,pageSize:100}).then(res=>{
			// // console.log('机构列表',res);
			if(res.code==0){
				this.orgList=res.data.records
			}
		})
	}
};
</script>

<style></style>
