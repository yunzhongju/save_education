<template>
	<div class="in-animate">
		<base-tabs @onBaseTabClick="onBaseTabClick" :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row v-loading="loading">
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<base-banner
							@edit="handleEditor"
							:list="bannerList"
							@delete="handleDelete">
							<div
							class="add-img" 
							@click="handleAddBanner">
								<i class="el-icon-plus"></i>
							</div>
							</base-banner>
						</div></el-col>
					</el-row>
					<el-row>
					  <el-col :span="0"><div class="grid-content bg-purple">
							<el-button-group>
								<el-button 
								type="primary" 
								plain
								@click="handleRecommend(0)"
								size="mini">推荐</el-button>
								<el-button 
								type="primary" 
								plain 
								@click="handleRecommend(1)"
								size="mini">非推荐</el-button>
							</el-button-group>
						</div></el-col>
					  <el-col :span="0"><div class="grid-content bg-purple-light">
							<ul class="flex-end">
								<li class="marg-right30">
									<el-input size="small" 
									placeholder="搜索用户名称" 
									@change="handleSerach" 
									clearable 
									suffix-icon="el-icon-search" 
									v-model="serachValue"></el-input>
								</li>
								<li class="marg-right30">
									<el-button type="primary" 
									size="small" 
									icon="el-icon-search"
									@click="handleAdd">搜索</el-button></li>
							</ul>
						</div></el-col>
					</el-row>
					<el-row>
					  <el-col :span="0"><div class="grid-content bg-purple-dark marg-top">
							<base-table 
							:total="100" 
							@getPageSize="getPageSize" 
							@getCurrentPage="getCurrentPage">
								<el-table 
								ref="multipleTable" 
								:data="tableData" 
								border 
								tooltip-effect="dark" 
								style="width: 100%;min-height: 400px;"
								max-height="400"
								@selection-change="handleSelectionChange">
									<el-table-column 
									label="编号" 
									prop="id" 
									width="55" 
									align="center"></el-table-column>
									<el-table-column 
									prop="title" 
									label="文章标题" 
									align="center"></el-table-column>
									<el-table-column 
									prop="column" 
									label="栏目" 
									align="center" 
									show-overflow-tooltip></el-table-column>
									<el-table-column 
									prop="time" 
									label="创建时间" 
									align="center" 
									show-overflow-tooltip></el-table-column>
									<el-table-column 
									prop="recommend" 
									label="是否推荐" 
									align="center" 
									show-overflow-tooltip></el-table-column>
									<el-table-column 
									label="操作" 
									width="180" 
									align="center">
										<template slot-scope="scope">
											<el-button 
											size="mini" 
											type="primary" 
											v-show="isrecommend"
											@click="handleEdit(scope.$index, scope.row)">添加</el-button>
											<el-button 
											size="mini" 
											type="danger" 
											@click="handleDelete(scope.$index, scope.row)">取消</el-button>
										</template>
									</el-table-column>
								</el-table>
							</base-table>
						</div></el-col>
					</el-row>
					
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加/修改banner"
		  :visible.sync="dialogVisible"
			center
			v-if="dialogVisible"
		  :before-close="handleClose">
		  <span>
				<base-form 
				@submit="submit"
				@resetForm="resetForm"
				:current="current"></base-form>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import BaseBanner from './components/BaseBanner.vue'
import BaseForm from './components/BaseForm.vue'
import api from '../../api/api.js'
export default {
	components: {
		BaseTabs,
		BaseTable,
		BaseBanner,
		BaseForm
	},
	data() {
		return {
			loading:false,
			current:null,
			bannerList:[],
			dialogVisible:false,
			serachValue:'',
			isrecommend:false,
			bannerList:[{imagePath: "https://image.sqfzzl.com/202003031124541232972.jpg",
			title: "四川省人民政府办公厅关于印发实施《四川省应对新冠肺炎疫情分区分级差异化防控工作指南（第二版）》的通知"}],
			baseTabs: [
				{
					label: '广告管理',
					value: '1'
				}
			],
			tableData: [
				{
					id: 1,
					title: 'Jack',
					column: '新闻',
					time: '2016-05-03',
					recommend: '推荐',
				}
			]
		};
	},
	methods: {
		submit(){
			this.bannerQuery()
			this.dialogVisible=false
		},
		resetForm(){
			this.dialogVisible=false
		},
		handleRecommend(val){
			if(val==0){
				
			}else if(val==1){
				
			}
		},
		handleClose(done){done()},
		handleAddBanner(){
			this.current=null
			this.dialogVisible=true
		},
		handleEditor(id){
			this.current=this.bannerList.filter(item=>item.id==id)[0]
			this.dialogVisible=true
		},
		//切换baseTabs
		onBaseTabClick(val) {
			// console.log(val);
		},
		//编辑
		handleEdit(index, row) {
			// console.log(row);
		},
		//撤销
		handleCancel(index, row){},
		//删除
		handleDelete(id) {
			api.bannerDeleteAPI({id:id}).then(res=>{
				if(res.code==0){
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.bannerQuery()
				}
			})
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
		handleSerach(val) {
			// console.log(val);
		},
		//汇总统计
		handleSummary() {},
		//情况统计
		handleHappen() {},
		//创建考试
		handleAdd() {
			// this.$router.push('create_train');
		},
		//获取当前页
		getCurrentPage(val) {
			// console.log(val);
		},
		//获取pagesize
		getPageSize(val) {
			// console.log(val);
		},
		bannerQuery(){
			this.loading=true
			api.bannerQueryAPI().then(res=>{
				if(res.code==0){
					// console.log('bannerList',res);
					this.bannerList=res.data
					this.loading=false
				}
			})
		}
	},
	created() {
		this.bannerQuery()
	}
};
</script>

<style scoped>
	.marg-top{
		margin-top: 20px;
	}
	.divider-hei{
		height: 10px;
	}
	.add-img{
		border-radius: 10px;
		margin-top: 20px;
		width: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px dashed gray;
		cursor: pointer;
		i{
			font-size: 24px;
		}
	}
</style>
