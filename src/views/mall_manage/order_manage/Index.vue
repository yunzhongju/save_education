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
								<li class="marg-right30" v-if="status===1">
									<el-button 
										type="primary" 
										size="mini" 
										@click="handleAllOrder">
									核销订单
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
									@selection-change="handleSelectionChange"
									height="660"
									style="width: 100%">
									<el-table-column
										type="selection"
										width="55">
									</el-table-column>
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
										<template slot-scope="scope">
											<span v-if="scope.row.completionTime">{{scope.row.completionTime}}</span>
											<span v-else>未完成</span>
										</template>
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
	import {queryOrderByPageAPI,updateOrderCompleteAPI} from '../../../api/mall.js'
	import {mapState} from 'vuex'
	export default {
		components:{
			BaseTabs,
			BaseTable
		},
		computed:{
			...mapState({
				user:s=>s.userInfo
			}),
			serachForm(){
				return {
					userMobile:this.serachValue,
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					status:this.status==-1?'':this.status
				}
			}
		},
		data(){
			return {
				serachValue:'',
				status:-1,
				total:0,
				pageSize:10,
				pageNo:1,
				baseTabs: [{label: '订单管理',value: '1'}],
				tableData: [],
				multipleSelection: []
			}
		},
		methods:{
			handleAllOrder(){
				if(this.multipleSelection.length===0) return this.$message({type:'warning',message:'请选择订单'})
				// console.log(this.multipleSelection);
				 this.$confirm('是否完成选中订单?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let orderCodes=this.multipleSelection.map(v=>v.orderCode)
						updateOrderCompleteAPI({orderCodes}).then(res=>{
							this.getData()
							this.$message({
								type: 'success',
								message: '成功!'
							});
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				
			},
			handleSelectionChange(val){
				// console.log(val);
				this.multipleSelection=val
			},
			onHandleChangeRadio(val){
				this.pageNo=1
				this.getData()
			},
			handleSerach(){
				this.pageNo=1
				this.getData()
			},
			getCurrentPage(page){
				this.pageNo=page
				this.getData()
			},
			queryOrderByPage(params){
				params.orgCode=this.user.projectDepartment
				queryOrderByPageAPI(params).then(res=>{
					// // console.log(res);
					this.tableData=res.data.records
					this.total=res.data.total
				})
			},
			getData(){
				this.queryOrderByPage(this.serachForm)
			}
		},
		created() {
			this.getData()
		}
	}
</script>

<style>
</style>
