<template>
	<div class="in-animate">
		<el-row>
			<el-col :span="24"><div class="grid-content bg-purple-dark">
				 <el-card shadow="always" class="box-card">
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<el-card shadow="hover">
							  <div slot="header" class="clearfix">
									<el-row>
									  <el-col :span="12"><div class="grid-content bg-purple">
											<h4>考勤</h4>
										</div></el-col>
									  <el-col :span="12"><div class="grid-content bg-purple-light flex-end">	
											<el-radio-group v-model="radio" @change="handleChooseDate">
										    <el-radio :label="3">今日</el-radio>
										    <el-radio :label="6">本周</el-radio>
										    <el-radio :label="9">本月</el-radio>
										  </el-radio-group>
										</div></el-col>
									</el-row> 
							  </div>	
							  <el-row>
									<el-col :span="24"><div class="grid-content bg-purple-light">
										<base-chart 
										:data="attendanceData"></base-chart>
									</div></el-col>
							  </el-row>
							</el-card>
						</div></el-col>
					</el-row>
					
					<el-row :gutter="20" class="marg-top20">
						<el-col :span="12"><div class="grid-content bg-purple">
							<el-card class="item-box-card" shadow="hover">
							  <div slot="header" class="clearfix">
									<el-row>
									  <el-col :span="12"><div class="grid-content bg-purple">
											<h4>资讯</h4>
										</div></el-col>
									  <el-col :span="0"><div class="grid-content bg-purple-light flex-end">	
											<el-button-group>
											  <el-button type="primary" plain size="mini">今日</el-button>
											  <el-button type="primary" plain size="mini">本周</el-button>
											  <el-button type="primary" plain size="mini">本月</el-button>
											</el-button-group>
										</div></el-col>
									</el-row> 
							  </div>
							  <div v-for="(item,index) in newsList" :key="item.id" class="text item">
							  	<el-row>
							  	  <el-col :span="2"><div class="grid-content bg-purple-dark">
							  			<span class="show-sort">{{index+1}}</span>
							  		</div></el-col>
							  		<el-col :span="15"><div class="grid-content bg-purple-dark">
							  			{{item.title }}
							  		</div></el-col>
							  		<el-col :span="5"><div class="grid-content bg-purple-dark">
							  			<span>{{item.updateTime}}</span>
							  		</div></el-col>
							  	</el-row>
							  	<el-divider></el-divider>
							  </div>
							</el-card>
						</div></el-col>
					  <el-col :span="12"><div class="grid-content bg-purple">
							<el-card class="item-box-card" shadow="hover">
							  <div slot="header" class="clearfix">
									<el-row>
									  <el-col :span="12"><div class="grid-content bg-purple">
											<h4>通知</h4>
										</div></el-col>
									  <el-col :span="0"><div class="grid-content bg-purple-light flex-end">	
											<el-button-group>
											  <el-button type="primary" plain size="mini">今日</el-button>
											  <el-button type="primary" plain size="mini">本周</el-button>
											  <el-button type="primary" plain size="mini">本月</el-button>
											</el-button-group>
										</div></el-col>
									</el-row> 
							  </div>
							  <div v-for="(item,index) in annoucementList" :key="item.id" class="text item">
							  	<el-row>
							  	  <el-col :span="2"><div class="grid-content bg-purple-dark">
							  			<span class="show-sort">{{index+1}}</span>
							  		</div></el-col>
							  		<el-col :span="15"><div class="grid-content bg-purple-dark">
							  			{{item.title}}
							  		</div></el-col>
							  		<el-col :span="5"><div class="grid-content bg-purple-dark">
							  			<span>{{item.updateTime}}</span>
							  		</div></el-col>
							  	</el-row>
							  	<el-divider></el-divider>
							  </div>
							</el-card>
						</div></el-col>
					</el-row>
					
					<el-row :gutter="20" class="marg-top20">
					  <el-col :span="12"><div class="grid-content bg-purple">
					  	<el-card class="item-box-card" shadow="hover">
					  	  <div slot="header" class="clearfix">
					  			<el-row>
					  			  <el-col :span="12"><div class="grid-content bg-purple">
					  					<h4>活跃度排名</h4>
					  				</div></el-col>
					  			  <el-col :span="12"><div class="grid-content bg-purple-light flex-end">	
					  					<el-button-group>
					  					  <!-- <el-button type="primary" plain size="mini">今日</el-button> -->
					  					 <!-- <el-button type="primary" plain size="mini">本周</el-button>
					  					  <el-button type="primary" plain size="mini">本月</el-button> -->
					  					</el-button-group>
					  				</div></el-col>
					  			</el-row> 
					  	  </div>
								
								<div v-for="(item,index) in userList" :key="item.id" class="text item">
									<el-row>
									  <el-col :span="2"><div class="grid-content bg-purple-dark">
											<span class="show-sort">{{index+1}}</span>
										</div></el-col>
										<el-col :span="15"><div class="grid-content bg-purple-dark">
											{{item.userName}}
										</div></el-col>
										<el-col :span="7"><div class="grid-content bg-purple-dark">
											<span>{{item.createTime}}</span>
										</div></el-col>
									</el-row>
									<el-divider></el-divider>
								</div>
					  	</el-card>
					  </div></el-col>
					  <el-col :span="12"><div class="grid-content bg-purple">
							<el-card class="item-box-card" shadow="hover">
							  <div slot="header" class="clearfix">
									<el-row>
									  <el-col :span="12"><div class="grid-content bg-purple">
											<h4>近期考试</h4>
										</div></el-col>
									  <el-col :span="0"><div class="grid-content bg-purple-light flex-end">	
											<el-button-group>
											  <el-button type="primary" plain size="mini">今日</el-button>
											  <el-button type="primary" plain size="mini">本周</el-button>
											  <el-button type="primary" plain size="mini">本月</el-button>
											</el-button-group>
										</div></el-col>
									</el-row> 
							  </div>
							  <div v-for="(item,index) in examList" :key="item.id" class="text item">
									<el-row>
									  <el-col :span="2"><div class="grid-content bg-purple-dark">
											<span class="show-sort">{{index+1}}</span>
										</div></el-col>
										<el-col :span="15"><div class="grid-content bg-purple-dark">
											{{item.examName}}
										</div></el-col>
										<el-col :span="7"><div class="grid-content bg-purple-dark">
											<span>{{item.updateTime}}</span>
										</div></el-col>
									</el-row>
									<el-divider></el-divider>
							  </div>
							</el-card>
						</div></el-col>
					</el-row>
					
					<el-row :gutter="20" class="marg-top20">
					  <el-col :span="12"><div class="grid-content bg-purple">
							<el-card class="item-box-card" shadow="hover">
							  <div slot="header" class="clearfix">
									<el-row>
									  <el-col :span="12"><div class="grid-content bg-purple">
											<h4>热门课程</h4>
										</div></el-col>
									  <el-col :span="0"><div class="grid-content bg-purple-light flex-end">	
											<el-button-group>
											  <el-button type="primary" plain size="mini">今日</el-button>
											  <el-button type="primary" plain size="mini">本周</el-button>
											  <el-button type="primary" plain size="mini">本月</el-button>
											</el-button-group>
										</div></el-col>
									</el-row> 
							  </div>
								<div v-for="(item,index) in courseList" :key="item.id" class="text item">
									<el-row>
									  <el-col :span="2"><div class="grid-content bg-purple-dark">
											<span class="show-sort">{{index+1}}</span>
										</div></el-col>
										<el-col :span="15"><div class="grid-content bg-purple-dark">
											{{item.courseName}}
										</div></el-col>
										<el-col :span="7"><div class="grid-content bg-purple-dark">
											<span>{{item.updateTime}}</span>
										</div></el-col>
									</el-row>
									<el-divider></el-divider>
								</div>
							</el-card>
						</div></el-col>
					  <el-col :span="12"><div class="grid-content bg-purple">
							<el-card class="item-box-card" shadow="hover">
							  <div slot="header" class="clearfix">
									<el-row>
									  <el-col :span="12"><div class="grid-content bg-purple">
											<h4>热门图书</h4>
										</div></el-col>
									  <el-col :span="0"><div class="grid-content bg-purple-light flex-end">	
											<el-button-group>
											  <el-button type="primary" plain size="mini">今日</el-button>
											  <el-button type="primary" plain size="mini">本周</el-button>
											  <el-button type="primary" plain size="mini">本月</el-button>
											</el-button-group>
										</div></el-col>
									</el-row> 
							  </div>
								<div v-for="(item,index) in bookList" :key="item.id" class="text item">
									<el-row>
									  <el-col :span="2"><div class="grid-content bg-purple-dark">
											<span class="show-sort">{{index+1}}</span>
										</div></el-col>
										<el-col :span="15"><div class="grid-content bg-purple-dark">
											{{item.bookName}}
										</div></el-col>
										<el-col :span="7"><div class="grid-content bg-purple-dark">
											<span>{{item.updateTime}}</span>
										</div></el-col>
									</el-row>
									<el-divider></el-divider>
								</div>
							</el-card>
						</div></el-col>
					</el-row>
				 </el-card>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
	import BaseChart from './components/BaseChart.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseChart
		},
		data(){
			return {
				radio:3,
				newsList:[],
				annoucementList:[],
				userList:[],
				examList:[],
				courseList:[],
				bookList:[],
				attendanceData:{
					xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					yData: [0.1, 0.15, 0.18, 0.25, 0.23, 0.32, 0.33]
				}
			}
		},
		methods:{
			handleChooseDate(val){},
			queryExamPlanByPage(params){
				api.queryExamPlanByPageAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.examList=res.data.records
					}
				})
			},
			queryStudentByPage(params){
				api.getUserListAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.userList=res.data
					}
				})
			},
			queryBookByPage(params){
				api.queryBookByPageAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.bookList=res.data.records
					}
				})
			},
			queryCourseByPage(params){
				api.queryCourseByPageAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.courseList=res.data.records
					}
				})
			},
			noticeByPage(params){
				api.noticeByPageAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.annoucementList=res.data.records
					}
				})
			},
			newsPage(params){
				api.newsPageAPI(params).then(res=>{
					// console.log(res);
					if(res.code==0){
						this.newsList=res.data.records
					}
				})
			}
		},
		created() {
			let params={pageNo:1,pageSize:10}
			this.newsPage(params)
			this.noticeByPage(params)
			this.queryExamPlanByPage(params)
			this.queryCourseByPage(params)
			this.queryBookByPage(params)
			this.queryStudentByPage(params)
		}
	}
</script>

<style>
	.box-card::-webkit-scrollbar { width: 0 !important }
	.box-card{
		height: 850px !important;
		overflow-y: scroll;
		-ms-overflow-style: none;
		overflow: -moz-scrollbars-none;
	}
	.item-box-card::-webkit-scrollbar { width: 0 !important }
	.item-box-card{
		min-height: 400px;
		max-height: 400px;
		overflow-y: auto;
		-ms-overflow-style: none;
		overflow: -moz-scrollbars-none;
	}
	.show-sort{
		background-color: #409EFF;
		color: white;
		padding: 5px 10px;
		border-radius: 5px;
		margin-right: 10px;
	}
	.show-sorts{
		background-color: grey;
		color: white;
		padding: 5px 10px;
		border-radius: 5px;
		margin-right: 10px;
	}
	.color-red{
		color: red;
	}
	.color-blue{
		color: #409EFF;
	}
	.color-ye{
		color: green;
	}
</style>
