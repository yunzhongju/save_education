<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<el-row>
					<el-col :span="12"><div class="grid-content bg-purple-dark">
						<el-date-picker
						  size="mini"
							clearable
							v-model="dateTimer"
							value-format="yyyy-MM-dd"
							placeholder="选择日期"
							@change="handleDateTime">
						</el-date-picker>
					</div></el-col>
					<el-col :span="12">
						<div class="grid-content bg-purple-light">
							<ul class="flex-end">
								<li class="marg-right30">
									<el-input size="mini" 
									placeholder="搜索姓名" 
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
									icon="el-icon-refresh-right"
									@click="$router.go(-1)">返回</el-button></li>
							</ul>
						</div>
					</el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<base-table
						:total="total"
						@getCurrentPage="getCurrentPage">
							<el-table 
							ref="multipleTable" 
							:data="tableData" 
							border 
							v-loading="loading"
							tooltip-effect="dark" 
							height="660">
								<el-table-column 
								label="编号" 
								prop="id" 
								width="55" 
								align="center">
									<template slot-scope="scope">
										<span>{{scope.$index+1}}</span>
									</template>
								</el-table-column>
								<el-table-column 
								prop="userName" 
								label="姓名" 
								align="center"></el-table-column>
								<el-table-column 
								prop="orgName" 
								label="单位" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column
								prop="mobileNo" 
								label="电话" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column
								prop="signInTime" 
								label="签到时间" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column
								prop="signInAddr" 
								label="签到地点" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column
								prop="signInGis" 
								label="经纬度" 
								align="center" 
								show-overflow-tooltip></el-table-column>
							<!-- 	<el-table-column
								prop="" 
								label="状态" 
								align="center" 
								show-overflow-tooltip>
									<template slot-scope="scope">
										<span>{{scope.row.attendanceStatus?'异常':'正常'}}</span>
									</template>
								</el-table-column> -->
							</el-table>
						</base-table>
					</div></el-col>
				</el-row>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	import BaseTable from '../../components/BaseTable.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			BaseTable
		},
		data(){
			return {
				dateTimer:null,
				serachValue:'',
				id:null,
				orgCode:null,
				total:0,
				loading:false,
				tableData:[],
				baseTabs:[{label: '考勤记录',value: '1'}],
				pageNo:1,
				pageSize:10
			}
		},
		computed:{
			serachForm(){
				return {
					pageNo:this.pageNo,
					pageSize:this.pageSize,
					attendanceDate:this.dateTimer,
					userName:this.serachValue,
					attendanceGroup:this.id,
					orgCode:this.orgCode
				}
			}
		},
		methods:{
			getCurrentPage(page){
				this.pageNo=page
				this.getData()
			},
			handleDateTime(val){
				this.dateTimer=val
				this.pageNo=1
				this.getData()
			},
			handleSerach(){
				this.pageNo=1
				this.getData()
			},
			onBaseTabClick(){},
			getPageSize(val){
				this.attendanceRecoedPage({attendanceGroup:this.id,pageNo:1,pageSize:val})
			},
			attendanceRecoedPage(params){
				this.loading=true
				api.attendanceRecoedPageAPI(params).then(res=>{
					if(res.code==0){
						// // console.log(res);
						this.tableData=res.data.records
						this.total=res.data.total
						this.loading=false
					}
				})
			},
			getData(){
				this.attendanceRecoedPage(this.serachForm)
			}
		},
		created() {
			console.log(this.$route.query);
			this.id=this.$route.query.id
			this.orgCode=this.$route.query.orgCode
			if(this.id||this.orgCode){
				this.getData()
			}
		}
	}
</script>

<style>
</style>
