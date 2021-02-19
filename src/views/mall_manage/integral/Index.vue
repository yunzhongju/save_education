<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div>
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<ul  class="flex-end">
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-plus"
										@click="onHandleAdd">
											添加
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
										prop="typeName"
										align="center"
										label="类型">
									</el-table-column>
									<el-table-column
										prop="rewardIntegral"
										align="center"
										label="奖励积分">
									</el-table-column>
									<el-table-column
										prop="dailyLimit"
										align="center"
										label="每日上限">
									</el-table-column>
									<el-table-column
										prop="createTime"
										align="center"
										label="创建时间">
									</el-table-column>
									<el-table-column
										align="center"
										width="180"
										label="操作">
										<template slot-scope="scope">
											<el-button type="text" @click="onHandleEdi(scope.row)">编辑</el-button>
											<el-button type="text" @click="onHandleDel(scope.row)">删除</el-button>
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
		  title="添加/修改"
		  :visible.sync="dialogVisible"
		  width="30%"
			center
		  :before-close="handleClose">
		  <div>
				<el-form 
					:model="integralForm" 
					ref="integralForm" 
					label-width="100px" 
					class="demo-ruleForm">
				  <el-form-item
				    label="类型编码"
				    prop="typeCode"
				    :rules="[{ required: true, message: '类型编码不能为空'},]">
				    <el-input 
							:disabled="isEdit"
							v-model="integralForm.typeCode"></el-input>
				  </el-form-item>
					<el-form-item
					  label="类型名称"
					  prop="typeName"
					  :rules="[{ required: true, message: '类型名称不能为空'},]">
					  <el-input 
							:disabled="isEdit"
							v-model="integralForm.typeName"></el-input>
					</el-form-item>
					<el-form-item
					  label="奖励积分"
					  prop="rewardIntegral"
					  :rules="[{ required: true, message: '奖励积分不能为空'},]">
					  <el-input 
							v-model.number="integralForm.rewardIntegral"></el-input>
					</el-form-item>
					<el-form-item
					  label="每日上限"
					  prop="dailyLimit"
					  :rules="[{ required: true, message: '每日上限不能为空'},]">
					  <el-input 
							v-model.number="integralForm.dailyLimit"></el-input>
					</el-form-item>
				</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('integralForm')">取 消</el-button>
		    <el-button type="primary" @click="submitForm('integralForm')">{{isEdit?'更新':'添加'}}</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
	import BaseTabs from '../../../components/BaseTabs.vue'
	import BaseTable from '../../../components/BaseTable.vue'
	import {queryIntegralTypeByPageAPI,
					addIntegralTypeAPI,
					updateIntegralTypeAPI,
					deleteIntegralTypeAPI} from '../../../api/mall.js'
	export default {
		components:{
			BaseTabs,
			BaseTable
		},
		data(){
			return {
				currentId:'',
				total:0,
				isEdit:false,
				pageSize:10,
				pageNumber:1,
				integralForm:{
					typeName:'',
					typeCode:'',
					rewardIntegral:'',
					dailyLimit:''
				},
				dialogVisible:false,
				baseTabs: [{label: '积分类型',value: '1'}],
				tableData: []
			}
		},
		methods:{
			getCurrentPage(page){
				this.queryIntegralTypeByPage({pageSize:this.pageSize,pageNumber:page})
			},
			handleClose(done){
				done()
			},
			onHandleAdd(){
				this.isEdit=false
				this.dialogVisible=true
				this.$nextTick(()=>{
					this.$refs['integralForm'].resetFields();
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(!this.isEdit){
							addIntegralTypeAPI(this.integralForm).then(res=>{
								if(res.code!==0){
									this.$message({
										type:'warning',
										message:res.msg
									})
									return
								}
								this.$message({
									type:'success',
									message:'添加成功'
								})
								this.dialogVisible=false
							})
						}else{
							let params={
								id:this.currentId,
								rewardIntegral:this.integralForm.rewardIntegral,
								dailyLimit:this.integralForm.dailyLimit
							}
							updateIntegralTypeAPI(params).then(resp=>{
								if(resp.code!==0){
									this.$message({
										type:'warning',
										message:resp.msg
									})
									return
								}
								this.$message({
									type:'success',
									message:'更新成功'
								})
								this.queryIntegralTypeByPage({pageSize:this.pageSize,pageNumber:this.pageNumber})
								this.dialogVisible=false
							})
						}
					this.queryIntegralTypeByPage({pageSize:this.pageSize,pageNumber:this.pageNumber})
					} else {
						this.$message({
							type:'warning',
							message:'填写完整的表单'
						})
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible=false
			},
			onHandleEdi(row){
				this.isEdit=true
				this.dialogVisible=true
				this.currentId=row.id
				this.integralForm.dailyLimit=row.dailyLimit
				this.integralForm.rewardIntegral=row.rewardIntegral
				this.integralForm.typeCode=row.typeCode
				this.integralForm.typeName=row.typeName
			},
			onHandleDel(row){
				this.$confirm('此操作将删除该积分类型, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					deleteIntegralTypeAPI({id:row.id}).then(res=>{
						if(res.code===0){
							this.$message({
								type: 'success',
								message: '删除成功'
							});
							this.queryIntegralTypeByPage({pageSize:this.pageSize,pageNumber:this.pageNumber})
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
			queryIntegralTypeByPage(params){
				queryIntegralTypeByPageAPI(params).then(res=>{
					if(res.code!==0){
						this.$message({
							message:res.msg,
							type:'warning'
						})
						return
					}
					this.total=res.data.total
					this.tableData=res.data.records
				})
			}
		},
		created() {
			this.queryIntegralTypeByPage({pageSize:this.pageSize,pageNumber:this.pageNumber})
		}
	}
</script>

<style>
</style>
