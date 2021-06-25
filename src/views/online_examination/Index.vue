<template>
	<el-tabs type="border-card" v-model="serachForm.planStatus" @tab-click="handleChangeTab">
	  <el-tab-pane :label="item.label" :name="item.value" v-for="(item,index) in tabsList" :id="index">
			<div class="d-flex mb-3">
				<el-input placeholder="关键字" size="small" style="width: 20%;" clearable v-model="serachForm.context" class="mr-3 ml-auto"></el-input>
				<el-button type="primary" size="small" icon="el-icon-search" @click="getData">搜索</el-button>
				<el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddPlan">新建考试</el-button>
			</div>
			<base-table
			:total="total"
			@getCurrentPage="getCurrentPage"
			>
				<el-table
					ref="multipleTable"
					:data="planList"
					v-loading="loading"
					tooltip-effect="dark"
					height="650">
					<el-table-column
						label="二维码"
						align="center"
						show-overflow-tooltip>
						<template slot-scope="scope">
							<el-image
							    style="width: 100px; height: 100px"
							    :src="scope.row.qrCodeUrl"
							    :preview-src-list="[scope.row.qrCodeUrl]">
							</el-image>
						</template>
					</el-table-column>
					<el-table-column
						label="基本信息"
						width="600">
						<template slot-scope="scope">
							<div class="d-flex flex-column">
								<h4>{{scope.row.examName}}</h4>
								<div class="d-flex">
									<div class="w-50 d-flex flex-column">
										<span>考试总分：{{scope.row.sumScore}}分</span>
										<span>答题时间：{{scope.row.paperTime}}分钟</span>
										<span>及格分数：{{scope.row.passScore}}分</span>
										<span>创建人：{{scope.row.userName}}/{{scope.row.orgName}}</span>
									</div>
									<div class="w-50 d-flex flex-column">
										<span>开始时间：{{scope.row.begDate}}</span>
										<span>结束时间：{{scope.row.endDate}}</span>
										<span>创建时间：{{scope.row.createTime}}</span>
									</div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="参与人次"
						prop="sumPeople"
						align="center"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						label="状态"
						align="center"
						show-overflow-tooltip>
						<template slot-scope="scope">
							<el-tag v-if="scope.row.planStatus==2" type="danger">进行中</el-tag>
							<el-tag type="info" v-else-if="scope.row.planStatus==3">已结束</el-tag>
							<el-tag type="warning" v-else-if="scope.row.planStatus==1">未开始</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="text"
								@click="handlePlanDetail(scope.$index, scope.row)">详情</el-button>
							<el-button
								size="mini"
								v-if="scope.row.planStatus!=3"
								type="text"
								@click="handlePlanEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button
								size="mini"
								type="text"
								@click="handleDeletePlan(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</base-table>
		</el-tab-pane>

		<el-dialog
		  title="详情"
		  :visible.sync="dialogVisible"
		  width="30%"
			center
		  :before-close="handleClose">
		  <span>
				<base-detail
					:detail="planDetail"
				></base-detail>
			</span>
		</el-dialog>
	</el-tabs>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import BaseDetail from './components/BaseDetail.vue'
import api from '@/api/api.js'
export default {
	components: {
		BaseTable,
		BaseDetail
	},
	data(){
		return {
			tabsList:[
				{label:'进行中',value:'2'},
				{label:'未开始',value:'1'},
				{label:'已结束',value:'3'},
				{label:'全部',value:'4'},
			],
			serachForm:{
					pageNo:1,
					pageSize:10,
					context:'',
					planStatus:'4'
			},
			loading:false,
			dialogVisible:false,
			planList: [],
			total:0,
			planDetail:''
		}
	},
	methods:{
		//切换tab
		handleChangeTab(e){
			this.serachForm.planStatus=e.name
      this.serachForm.pageNo=1
			this.getData()
		},
		//获取数据
		getData(){
			this.queryExamPlanByPage(this.serachForm)
		},
		// 查看详情
		handlePlanDetail(index,row){
			this.$router.push({
				path:'online_detail',
				query:{
					examCode:row.examCode
				}
			})
		},
		handleClose(done){
			done();
		},

		handlePlanEdit(index,row){
			this.$router.push({
				path:'/education/online_create_exam',
				query:{
					examCode:row.examCode
				}
			})
		},
		//删除
		handleDeletePlan(index,row){
			this.$confirm('此操作将删除该考试计划, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				api.deleteExamPlanAPI({id:row.id}).then(res=>{
					if(res.code==0){
						this.getData()
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		//创建考试
		handleAddPlan(){
			this.$router.push({
				path:'/education/online_create_exam',
				query:{
					examCode:null
				}
			})
		},
		//获取当前页
		getCurrentPage(val){
			this.serachForm.pageNo=val
			this.getData()
		},
		queryExamPlanByPage(params){
			this.loading=true
			api.queryExamPlanByPageAPI(params).then(res=>{
				// // console.log('考试计划',res);
				this.planList=res.data.records
				this.total=res.data.total
				this.loading=false
				if(res.data.records.length===0) return this.$message({type:'warning',message:'没有相关信息!'})
			})
		}
	},
	created() {
		this.getData()
	}
};
</script>

<style></style>
