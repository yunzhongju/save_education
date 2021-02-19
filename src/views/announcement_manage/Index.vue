<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
						<el-col :span="12">
							<div class="grid-content bg-purple">
								<el-radio-group v-model="status" @change="handleChooseStatus">
									<el-radio :label="1">发布</el-radio>
									<el-radio :label="0">草稿</el-radio>
									<el-radio :label="3">结束</el-radio>
								</el-radio-group>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="grid-content bg-purple-light">
								<ul class="flex-end">
									<li class="marg-right30">
										<el-input 
											size="mini" 
											placeholder="搜索公告名称" 
											clearable 
											suffix-icon="el-icon-search" 
											v-model="serachValue"></el-input>
									</li>
									<li class="marg-right30"><el-button
										type="primary" 
										size="mini" 
										icon="el-icon-search" 
										@click="handleSerach">搜索</el-button></li>
									<li class="marg-right30"><el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-plus" 
										@click="handleAdd">新建公告</el-button></li>
								</ul>
							</div>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark marg-top20">
								<base-table :total="total" @getPageSize="getPageSize" @getCurrentPage="getCurrentPage">
									<el-table 
									ref="multipleTable" 
									:data="list" 
									border 
									v-loading="loading"
									tooltip-effect="dark" 
									style="width: 100%;min-height: 650px;" 
									max-height="650"
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
										prop="title" 
										label="公告信息" 
										align="center" 
										></el-table-column>
										<el-table-column 
										prop="startTime" 
										label="开始时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										prop="endTime" 
										label="结束时间" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										prop="status" 
										label="状态" 
										align="center" 
										show-overflow-tooltip>
											<template slot-scope="scope">
												<span>{{scope.row.status==1?'发布':scope.row.status==0?'草稿':'结束'}}</span>
											</template>
										</el-table-column>
										<el-table-column 
										prop="creator" 
										label="发布人" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										label="操作" 
										align="center">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text"
												@click="handleToDetail(scope.$index, scope.row)">详情</el-button>
												<el-button 
												size="mini" 
												type="text"
												v-show="scope.row.status==0"
												@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												v-show="scope.row.status==1"
												type="text"
												@click="handleCancel(scope.$index, scope.row)">撤销</el-button>
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
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import api from '../../api/api.js'
export default {
	components: {
		BaseTabs,
		BaseTable
	},
	data() {
		return {
			loading:false,
			status:1,
			list:[],
			total:0,
			serachValue: '',
			dateTimer: '', //按时间筛选
			baseTabs: [
				{
					label: '公告信息',
					value: '1'
				}
			],
		};
	},
	methods: {
		handleChooseStatus(val){
			this.noticeByPage({pageNo:1,pageSize:10,status:val})
		},
		handleToDetail(index,row){
			this.$router.push({
				path:'announcement_detail',
				query:{
					id:row.id
				}
			})
		},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
		},
		//编辑
		handleEdit(index, row) {
			this.$router.push({
				path:'create_announcement',
				query:{
					id:row.id
				}
			})
		},
		//撤销
		handleCancel(index, row){
			this.$confirm('此操作将该公告撤销为草稿, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.noticeByCancelAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '撤销成功!'
							});
							this.noticeByPage({pageNo:1,pageSize:10})
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消撤销'
					});
				});
		},
		//删除
		handleDelete(index, row) {
			// console.log(row);
			this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					api.noticeByDeleteAPI({id:row.id}).then(res=>{
						if(res.code==0){
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.noticeByPage({pageNo:1,pageSize:10})
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
			this.noticeByPage({pageNo:1,pageSize:10,title:this.serachValue})
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
		//创建考试
		handleAdd() {
			this.$router.push({
				path:'create_announcement',
				query:{
					id:null
				}
			})
		},
		//获取当前页
		getCurrentPage(val) {
			this.noticeByPage({pageNo:val,pageSize:10})
		},
		//获取pagesize
		getPageSize(val) {
			this.noticeByPage({pageNo:1,pageSize:val})
		},
		noticeByPage(params){
			this.loading=true
			api.noticeByPageAPI(params).then(res=>{
				// console.log('公告列表',res);
				if(res.code==0){
					this.list=res.data.records
					this.total=res.data.total
					this.loading=false
				}
			})
		}
	},
	created() {
		this.noticeByPage({pageNo:1,pageSize:10})
	}
};
</script>

<style></style>
