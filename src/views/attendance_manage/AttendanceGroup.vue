<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="">
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input size="mini" 
										placeholder="搜索组名称" 
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
									@getCurrentPage="getCurrentPage"
									:total="total">
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
										prop="groupName" 
										label="考勤组名称" 
										align="center"></el-table-column>
										<el-table-column 
										prop="orgName" 
										label="所属部门" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="attendanceRuleName" 
										label="考勤规则" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column
										prop="userCount" 
										label="成员数量" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column label="操作" width="240" align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text"
												@click="handleGroupDetail(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
												<el-button
												size="mini" 
												type="text"
												@click="handleRecord(scope.$index, scope.row)">记录</el-button>
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
		  title="添加/修改考勤组"
		  :visible.sync="dialogVisible"
			v-if="dialogVisible"
		  width="60%"
			center
		  :before-close="handleClose">
		  <span>
				<group-form 
					@submit="submit" 
					@resetForm="resetForm"
					:id="id"></group-form>
			</span>
		</el-dialog>
		
		<!-- 详情对话框 -->
		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisibleDetail"
		  width="40%"
			center
		  :before-close="handleClose1">
		  <span>
				<base-detail
					:detail="groupDetail"
				></base-detail>
			</span>
		</el-dialog>
		
		
		<el-dialog
		  title="成员列表"
		  :visible.sync="dialogVisibleList"
		  width="50%"
			center
		  :before-close="handleClose">
		  <div>
				<user-list></user-list>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import GroupForm from './components/BaseFormGroup.vue'
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTable from '@/components/BaseTable.vue';
import UserList from './components/BaseUserList.vue'
import BaseDetail from './components/BaseGroup.vue'
import api from '@/api/api.js'
export default {
	components: {
		BaseTabs,
		BaseTable,
		UserList,
		BaseDetail,
		GroupForm
	},
	data() {
		return {
			id:null,
			loading:false,
			groupDetail:null,
			dialogVisibleDetail:false,
			total:0,
			dialogVisibleList:false,
			dialogVisible:false,
			pageNo:1,
			pagesize:10,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '考勤组',
					value: '1'
				}
			],
			tableData: [
			],
		};
	},
	computed:{
		serachForm(){
			return {
				pageNo:this.pageNo,
				pageSize:this.pagesize,
				groupName:this.serachValue
			}
		}
	},
	methods: {
		handleRecord(index,row){
			this.$router.push({
				path:'attendance_record',
				query:{
					id:row.id
				}
			})
		},
		submit(){
			this.getData()
			this.dialogVisible=false
		},
		resetForm(){
			this.dialogVisible=false
		},
		handleGroupDetail(index,row){
			// this.$router.push({
			// 	path:'group_detail',
			// 	query:{
			// 		id:row.id
			// 	}
			// })
			api.attendanceGroupDetailAPI({id:row.id}).then(res=>{
				if(res.code==0){
					// // console.log(res.data);
					this.groupDetail=res.data
					this.dialogVisibleDetail=true
				}
			})
		},
		handleBtnSerach(){},
		handleUserList(index,row){
			this.dialogVisibleList=true
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
			this.id=row.id
			this.dialogVisible=true
			// // console.log(row);
		},
		//撤销
		handleCancel(index, row){},
		//删除
		handleDelete(index, row) {
			// // console.log(row);
			this.$confirm('此操作将删除该考勤组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.attendanceGroupDeleteAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
						this.getData()
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
			this.pageNo=1
			this.getData()
		},

		//创建考试
		handleAdd() {
			this.id=null
			this.dialogVisible=true
			// this.$router.push('create_train');
		},
		//获取当前页
		getCurrentPage(val) {
			this.pageNo=val
			this.getData()
		},
		//获取pagesize
		getPageSize(val) {
			this.attendanceGroupQueryList({pageNo:1,pageSize:val})
		},
		attendanceGroupQueryList(params){
			this.loading=true
			api.attendanceGroupPageAPI(params).then(res=>{
				// // console.log(res);
				if(res.code==0){
					this.tableData=res.data.records
					this.total=res.data.total
					this.loading=false
				}
			})
		},
		getData(){
			this.attendanceGroupQueryList(this.serachForm)
		}
	},
	created() {
		this.getData()
	}
};
</script>

<style></style>
