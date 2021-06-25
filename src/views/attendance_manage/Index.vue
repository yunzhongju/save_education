<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30" v-if="isAdmin">
										<el-select 
											v-model="orgCode" 
											clearable 
											@change="change"
											placeholder="请选择部门" 
											size="mini">
										    <el-option
										      v-for="item in orgList"
										      :key="item.orgCode"
										      :label="item.orgName"
										      :value="item.orgCode">
										    </el-option>
										  </el-select>
									</li>
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
										prop="projectDepartmentName" 
										label="部门" 
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
										label="时间" 
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scope">
												<div v-for="(item,index) in scope.row.attendanceTimes">
													<span>{{item.signInStartTime}}</span>
													<span>——</span>
													<span>{{item.signInEndTime}}</span>
												</div>
											</template>
										</el-table-column>
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
		  :before-close="handleClose1">
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
import {mapState} from 'vuex'
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
			orgCode:'',
			orgList:[],
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
	computed:{
		isAdmin(){
			return this.$store.state.userInfo.projectDepartment=='admin'?true:false
		}
	},
	methods: {
		change(e){
			console.log(e);
			this.attendanceRuleQueryList({projectDepartmentCode:e})
		},
		onSubmit(val){
			this.dialogVisible=false
			this.attendanceRuleQueryList({})
		},
		handleRuleDetail(index,row){
			api.attendanceRuleDetailAPI({id:row.id}).then(res=>{
				// // console.log('详情',res);
				if(res.code==0){
					this.ruleDetail=res.data
					this.dialogVisibleDetail=true
				}
			})
		},
		resetForm(val){
			this.dialogVisible=false
		},
		handleClose(done){
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		handleClose1(done){
			done();
		},
		//切换baseTabs
		onBaseTabClick(val) {
			// // console.log(val);
		},
		//编辑
		handleEdit(index, row) {
			this.currentRule=row
			this.dialogVisible=true
		},
		//删除
		handleDelete(index, row) {
			// // console.log(row);
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
							this.attendanceRuleQueryList({})
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
			this.attendanceRuleQueryList({rulesName:this.serachValue})
		},
		//创建考试
		handleAdd() {
			this.currentRule=null
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
		querySysOrgByPage(){
			api.getSysOrgTreeAPI().then(res=>{
				// console.log('机构列表',res.data);
				if(res.code==0){
					this.orgList=res.data[0].childrenOrg.map(v=>{
						v.childrenOrg=[]
						return v
					})
				}
			})
		},
		attendanceRuleQueryList(params){
			api.attendanceRuleQueryListAPI(params).then(res=>{
				// // console.log(res);
				if(res.code==0){
					this.tableData=res.data.map(v=>{
						if(v.attendanceTimes.length===0){
							v.attendanceTimes.push({
								signInStartTime:v.signInStartTime,
								signInEndTime:v.signInEndTime
							})
						}
						return v
					})
				}
			})
		}
	},
	created() {
		this.attendanceRuleQueryList({})
		this.querySysOrgByPage()
	}
};
</script>

<style></style>
