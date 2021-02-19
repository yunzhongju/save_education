<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input size="mini" 
										placeholder="搜索规则名称" 
										clearable 
										suffix-icon="el-icon-search" 
										v-model="serachValue"></el-input>
									</li>
									<li class="marg-right30">
										<el-button type="primary" 
										size="mini" 
										icon="el-icon-search"
										@click="handleSerach">搜索</el-button></li>
										<li class="marg-right30">
											<el-button type="primary" 
											size="mini" 
											icon="el-icon-plus"
											@click="handleAdd">添加</el-button></li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark marg-top20">
								<base-table 
								:showFoot="false"
								>
									<el-table 
									ref="multipleTable" 
									:data="tableData" 
									border 
									v-loading="loading"
									tooltip-effect="dark" 
									height="670"
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
										prop="rulesName" 
										label="规则名称" 
										align="center"></el-table-column>
										<el-table-column 
										prop="attendanceAddress" 
										label="考勤地点" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="attendanceGis" 
										label="经纬度" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="signInStartTime" 
										label="签到开始时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="signInEndTime" 
										label="签到结束时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="signOutStartTime" 
										label="签退开始时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="signOutEndTime" 
										label="签退结束时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column label="操作" align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text"
												@click="handleRuleDetail(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
		
		<!-- 详情对话框 -->
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisibleDetail"
		  width="40%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="ruleDetail"
				></base-detail>
			</span>
		</el-dialog>
		
		<el-dialog
		  title="添加/修改规则"
		  :visible.sync="dialogVisible"
			v-if="dialogVisible"
		  width="50%"
			center
		  :before-close="handleClose">
		  <span>
				<base-form
				 @submit="onSubmit"
				 @resetForm="resetForm"
				 :currentRule="currentRule"
				></base-form>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import BaseForm from './components/BaseForm.vue'
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
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
			currentRule:null,
			ruleDetail:null,
			dialogVisibleDetail:false,
			loading:false,
			dialogVisible:false,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '考勤规则',
					value: '1'
				}
			],
			tableData: []
		};
	},
	methods: {
		onSubmit(val){
			this.dialogVisible=false
			this.attendanceRuleQueryList()
		},
		handleRuleDetail(index,row){
			api.attendanceRuleDetailAPI({id:row.id}).then(res=>{
				// console.log('详情',res);
				if(res.code==0){
					this.ruleDetail=res.data
					this.dialogVisibleDetail=true
				}
			})
		},
		resetForm(val){
			this.dialogVisible=false
		},
		handleClose(done){done()},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
		},
		//编辑
		handleEdit(index, row) {
			this.currentRule=this.tableData.filter(item=>item.id==row.id)[0]
			this.dialogVisible=true
		},
		//撤销
		handleCancel(index, row){},
		//删除
		handleDelete(index, row) {
			// console.log(row);
			this.$confirm('此操作将删除该考勤规则, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.attendanceRuleDeleteAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.attendanceRuleQueryList()
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
			this.attendanceRuleQueryList({rulesName:this.serachValue})
		},
		//创建考试
		handleAdd() {
			this.currentRule=null
			this.dialogVisible=true
		},
		//获取当前页
		getCurrentPage(val) {
			// console.log(val);
		},
		//获取pagesize
		getPageSize(val) {
			// console.log(val);
		},
		attendanceRuleQueryList(params){
			api.attendanceRuleQueryListAPI(params).then(res=>{
				// console.log(res);
				if(res.code==0){
					this.tableData=res.data
				}
			})
		}
	},
	created() {
		this.attendanceRuleQueryList({})
	}
};
</script>

<style></style>
