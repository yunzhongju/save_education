<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div>
					<el-row>
						<el-col :span="12"><div class="grid-content bg-purple">
							<el-radio-group v-model="status" @change="onHandleChangeRadio">
								<el-radio :label="-1">全部</el-radio>
								<el-radio :label="0">已取消</el-radio>
								<el-radio :label="1">待提货</el-radio>
								<el-radio :label="2">已删除</el-radio>
								<el-radio :label="3">已完成</el-radio>
							</el-radio-group>
						</div></el-col>
					  <el-col :span="12"><div class="grid-content bg-purple-dark">
							<ul  class="flex-end">
								<li class="marg-right30">
								  <el-input
									  size="mini"
										placeholder="搜索订单手机号"
										clearable
										suffix-icon="el-icon-search"
										v-model="serachValue">
									</el-input>
								</li>
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										@click="handleSerach">
									搜索
									</el-button>
								</li>
							</ul>
						</div></el-col>
					</el-row>
					<el-row class="marg-top20">
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<base-table :total="total" @getCurrentPage="getCurrentPage">
								<el-table
									:data="tableData"
									border
									height="660"
									style="width: 100%">
									<el-table-column
										prop="orderCode"
										align="center"
										width="180"
										label="订单号">
									</el-table-column>
									<el-table-column
										prop="goodsName"
										align="center"
										label="订单商品">
									</el-table-column>
									<el-table-column
										prop="totalIntegral"
										align="center"
										label="积分">
									</el-table-column>
									<el-table-column
										prop="createTime"
										align="center"
										label="下单时间">
									</el-table-column>
									<el-table-column
										prop="completionTime"
										align="center"
										label="完成时间">
									</el-table-column>
									<el-table-column
										prop="userName"
										align="center"
										label="买家姓名">
									</el-table-column>
									<el-table-column
										prop="userMobile"
										align="center"
										label="买家手机号">
									</el-table-column>
									<el-table-column
										align="center"
										label="订单状态">
										<template slot-scope="scope">
											<span>
											{{
												scope.row.status==1?'待提货':scope.row.status==0?'已取消':scope.row.status==2?'已删除':'已完成'}}
												</span>
										</template>
									</el-table-column>
									<el-table-column
										prop="orgName"
										align="center"
										label="提货点">
									</el-table-column>
								</el-table>
							</base-table>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../../components/BaseTabs.vue'
	import BaseTable from '../../../components/BaseTable.vue'
	import {queryOrderByPageAPI} from '../../../api/mall.js'
	export default {
		components:{
			BaseTabs,
			BaseTable
		},
		data(){
			return {
				serachValue:'',
				status:-1,
				total:0,
				pageSize:10,
				pageNo:1,
				baseTabs: [{label: '订单管理',value: '1'}],
				tableData: []
			}
		},
		methods:{
			onHandleChangeRadio(val){
				let status=val==-1?'':val
				this.queryOrderByPage({pageSize:this.pageSize,pageNo:this.pageNo,status:status})
			},
			handleSerach(){
				this.queryOrderByPage({pageSize:this.pageSize,pageNo:this.pageNo,userMobile:this.serachValue})
			},
			getCurrentPage(page){
				this.queryOrderByPage({pageSize:this.pageSize,pageNo:page,status:this.status})
			},
			queryOrderByPage(params){
				queryOrderByPageAPI(params).then(res=>{
					// console.log(res);
					this.tableData=res.data.records
					this.total=res.data.total
				})
			}
		},
		created() {
			this.queryOrderByPage({pageSize:this.pageSize,pageNo:this.pageNo})
		}
	}
</script>

<style>
</style>
