<template>
	<div>
		<base-tabs 
		@onBaseTabClick="onBaseTabClick" 
		:baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input 
										size="mini" 
										placeholder="搜索讲师名称" 
										@change="handleSerach" 
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
											@click="handleAddTeacher">添加</el-button></li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark marg-top20">
								<base-table 
								:total="total" 
								@getPageSize="getPageSize" 
								@getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="teacherList" 
									border 
									tooltip-effect="dark" 
									style="width: 100%;min-height: 650px;" 
									@selection-change="handleSelectionChange">
										<!-- <el-table-column type="selection" width="55"></el-table-column> -->
										<el-table-column 
										label="编号" 
										prop="id" 
										width="55" 
										align="center"></el-table-column>
										<el-table-column
											prop="userName"
											label="姓名"
											align="center"
											width="180"
											>
										</el-table-column>
										<el-table-column 
										prop="" 
										label="性别" 
										align="center">
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
										prop="integral" 
										label="讲师等级" 
										align="center" 
										show-overflow-tooltip>
										</el-table-column>
										<el-table-column 
										prop="updateTime" 
										label="更新日期" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="createTime" 
										label="创建日期" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column label="操作" align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text"
												@click="handleTeacherDetail(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleEditTeacher(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
		  title="添加/修改讲师"
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
					:currentTeacher="currentTeacher"
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
					:detail="currentTeacher"
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
		BaseForm,
		BaseDetail,
		BaseTable
	},
	data() {
		return {
			dialogVisibleDetail:false,
			currentTeacher:null,
			orgList:[],
			dialogVisible:false,
			teacherList:[],
			total:0,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '讲师管理',
					value: '1'
				}
			],
			tableData: [
				{
					id: 1,
					name: 'Jack',
					gender: '男',
					level:'高级',
					phone: '1232724324234',
					time: '2016-05-03',
				}
			]
		};
	},
	methods: {
		onSubmit(){
			this.queryTeacherByPage({pageNo:1,pageSize:10})
			this.dialogVisible=false
		},
		onUpdate(){
			this.queryTeacherByPage({pageNo:1,pageSize:10})
			this.dialogVisible=false
		},
		handleClose(done){done()},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
		},
		//编辑
		handleEditTeacher(index, row) {
			this.currentTeacher=this.teacherList.filter(item=>item.id==row.id)[0]
			this.dialogVisible=true
		},
		//撤销
		handleCancel(index, row){},
		handleTeacherDetail(index,row){
			api.queryTeacherDetailAPI({userCode:row.userCode}).then(res=>{
				// console.log(res);
				this.currentTeacher=res.data
				this.dialogVisibleDetail=true
			})
		},
		//删除
		handleDelete(index, row) {
			// console.log(row);
			this.$confirm('此操作将删除该讲师, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.deleteTeacherAPI({userCode:row.userCode}).then(res=>{
						if(res.code==0){
							this.queryTeacherByPage({pageNo:1,pageSize:10})
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
			// console.log(val);
		},
		//按时间筛选
		handleDateTime(val) {
			// console.log(val);
		},
		//搜索
		handleSerach() {
			this.queryTeacherByPage({pageNo:1,pageSize:10,userName:this.serachValue})
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
		//创建考试
		handleAddTeacher() {
			this.currentTeacher=null
			this.dialogVisible=true
		},
		//获取当前页
		getCurrentPage(val) {
			this.queryTeacherByPage({pageNo:val,pageSize:10})
		},
		//获取pagesize
		getPageSize(val) {
			this.queryTeacherByPage({pageNo:1,pageSize:val})
		},
		queryTeacherByPage(params){
			api.queryTeacherByPageAPI(params).then(res=>{
				// console.log('讲师列表',res);
				if(res.code==0){
					this.teacherList=res.data.records
					this.total=res.data.total
				}
			})
		}
	},
	created() {
		this.queryTeacherByPage({pageNo:1,pageSize:10})
		api.querySysOrgByPageAPI({pageNo:1,pageSize:100}).then(res=>{
			// console.log('机构列表',res);
			if(res.code==0){
				this.orgList=res.data.records
			}
		})
	}
};
</script>

<style></style>
