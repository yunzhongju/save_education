<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
			<template v-slot:1>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark flex-end">
						 <el-button 
							type="primary" 
							size="mini" 
							class="marg-right30" 
							@click="handleAddBigClass"
							icon="el-icon-plus">添加</el-button>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<base-table
						:total="total" 
						@getPageSize="getPageSize" 
						@getCurrentPage="getCurrentPage">
							<el-table 
							ref="multipleTable" 
							:data="bigDictList" 
							border 
							size="medium "
							tooltip-effect="dark" 
							height="650"
							max-height="650">
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
								prop="entityDesc" 
								label="描述" 
								align="center"></el-table-column>
								<el-table-column
								prop="uniqueCode" 
								label="唯一编码" 
								align="center" 
								show-overflow-tooltip>
								</el-table-column>
								<el-table-column 
								prop="createTime" 
								label="注册时间" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column 
								prop="updateTime" 
								label="最近更新" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column 
								label="操作" 
								width="180"
								align="center">
									<template slot-scope="scope">
										<el-button
											type="text"
											icon="" 
											@click="handleEditBigDict(scope.$index, scope.row)"
											size="mini">编辑</el-button>
										<el-button 
											type="text" 
											icon="" 
											@click="handleDeleteBigDict(scope.$index, scope.row)"
											size="mini">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</base-table>
					</div></el-col>
				</el-row>
			</template>
			<template v-slot:2>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark flex-end">
						 <el-button 
							type="primary" 
							size="mini" 
							class="marg-right30" 
							@click="handleAddSmallClass"
							icon="el-icon-plus">添加</el-button>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<base-table
						:total="totalS" 
						@getPageSize="getPageSize" 
						@getCurrentPage="getCurrentPage">
							<el-table 
							ref="multipleTable" 
							:data="smallDictList" 
							border 
							size="medium "
							tooltip-effect="dark" 
							height="650"
							max-height="650">
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
								prop="entityName" 
								label="名称" 
								align="center"></el-table-column>
								<el-table-column 
								prop="entityDesc" 
								label="描述" 
								align="center"></el-table-column>
								<el-table-column
								prop="uniqueCode" 
								label="唯一编码" 
								align="center" 
								show-overflow-tooltip>
								</el-table-column>
								<el-table-column 
								prop="createTime" 
								label="注册时间" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column 
								prop="updateTime" 
								label="最近更新" 
								align="center" 
								show-overflow-tooltip></el-table-column>
								<el-table-column 
								label="操作" 
								width="180"
								align="center">
									<template slot-scope="scope">
										<el-button
											type="text"
											icon="" 
											@click="handleEditSmallDict(scope.$index, scope.row)"
											size="mini">编辑</el-button>
										<el-button 
											type="text" 
											icon="" 
											@click="handleDeleteSmallDict(scope.$index, scope.row)"
											size="mini">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
						</base-table>
					</div></el-col>
				</el-row>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加/修改大类"
		  :visible.sync="dialogVisibleBig"
		  width="20%"
			center
		  :before-close="handleClose">
		  <span>
				<el-form :model="bigform">
				  <el-form-item label="编码" v-show="!currentDictBig">
				    <el-input 
							v-model="bigform.uniqueCode"  
							placeholder="唯一编码标志"></el-input>
				  </el-form-item>
				  <el-form-item label="注解">
						<el-input v-model="bigform.entityDesc" placeholder="数据注解"></el-input>
				  </el-form-item>
				</el-form>
			</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisibleBig = false">取 消</el-button>
		    <el-button type="primary" @click="handleBigSubmit">{{currentDictBig?'更新':'创建'}}</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="添加/修改小类"
		  :visible.sync="dialogVisibleSmall"
		  width="20%"
			center
		  :before-close="handleClose">
		  <span>
				<el-form :model="smallform" >
				  <el-form-item label="唯一编码" v-show="!currentDictSmall">
				    <el-input 
							v-model="smallform.uniqueCode"  
							placeholder="唯一编码标志"></el-input>
				  </el-form-item>
				  <el-form-item label="注解" v-show="!currentDictSmall">
						<el-input v-model="smallform.entityDesc"></el-input>
				  </el-form-item>
					<el-form-item label="名称">
						<el-input v-model="smallform.entityName"></el-input>
					</el-form-item>
					<el-form-item label="编码">
						<el-input v-model="smallform.entityCode"></el-input>
					</el-form-item>
				</el-form>
			</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisibleSmall = false">取 消</el-button>
		    <el-button type="primary" @click="handleSmallSubmit">{{currentDictSmall?'更新':'创建'}}</el-button>
		  </span>
		</el-dialog>
		
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
				currentDictSmall:null,
				smallform:{
					entityCode:'',
					entityName:'',
					entityDesc:'',
					uniqueCode:''
				},
				dialogVisibleSmall:false,
				currentDictBig:null,
				bigform:{
					uniqueCode:'',
					entityDesc:''
				},
				dialogVisibleBig:false,
				type:1,
				bigDictList:[],
				smallDictList:[],
				totalS:0,
				total:0,
				pageSize:10,
				baseTabs:[
					{
						label: '字典大类',
						value: '1'
					},
					{
						label: '字典小类',
						value: '2'
					}
				],
			}
		},
		methods:{
			handleDeleteSmallDict(index,row){
				this.$confirm('此操作将删除该小类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						api.deleteSysDictionaryAPI({id:row.id}).then(res=>{
							if(res.code==0){
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.querySysDictionaryByPage({pageNo:1,pageSize:this.pageSize})
							}else{
								this.$message({
									type: 'warning',
									message: res.msg
								});
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
			handleEditSmallDict(index,row){
				this.currentDictSmall=row
				this.dialogVisibleSmall=true
			},
			handleSmallSubmit(){
				let params=this.smallform
				if(!this.currentDictSmall){
					api.addSysDictionaryAPI(params).then(res=>{
						if(res.code==0){
							this.$message({
								message:'添加成功',
								type:'success'
							})
							this.querySysDictionaryByPage({pageNo:1,pageSize:10})
							this.dialogVisibleSmall=false
						}else{
							this.$message({
								message:res.msg,
								type:'warning'
							})
						}
					})
				}else{
					params['id']=this.currentDictSmall.id
					api.updateSysDictionaryAPI(params).then(res=>{
						if(res.code==0){
							this.$message({
								message:'更新成功',
								type:'success'
							})
							this.querySysDictionaryByPage({pageNo:1,pageSize:this.pageSize})
							this.dialogVisibleSmall=false
						}
					})
				}
				
			},
			handleAddSmallClass(){
				this.currentDictSmall=null
				this.dialogVisibleSmall=true
			},
			handleDeleteBigDict(index,row){
				this.$confirm('此操作将删除该大类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						api.deleteSysDictionaryCategoryAPI({id:row.id}).then(res=>{
							if(res.code==0){
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
								this.querySysDictionaryCategoryByPage({pageNo:1,pageSize:10})
							}else{
								this.$message({
									type: 'warning',
									message: res.msg
								});
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
			handleBigSubmit(){
				let params=this.bigform
				if(!this.currentDictBig){
					api.addSysDictionaryCategoryAPI(params).then(res=>{
						if(res.code==0){
							this.$message({
								message:'添加成功',
								type:'success'
							})
							this.querySysDictionaryCategoryByPage({pageNo:1,pageSize:10})
							this.dialogVisibleBig=false
						}else{
							this.$message({
								message:res.msg,
								type:'warning'
							})
						}
					})
				}else{
					params["id"]=this.currentDictBig.id
					api.updateSysDictionaryCategoryAPI(params).then(res=>{
						if(res.code==0){
							this.$message({
								message:'更新成功',
								type:'success'
							})
							this.querySysDictionaryCategoryByPage({pageNo:1,pageSize:10})
							this.dialogVisibleBig=false
						}else{
							this.$message({
								message:res.msg,
								type:'warning'
							})
						}
					})
				}
		
			
			
			},
			handleEditBigDict(index,row){
				this.currentDictBig=row
				this.dialogVisibleBig=true
			},
			handleClose(done){done()},
			handleAddBigClass(){
				this.currentDictBig=null
				this.dialogVisibleBig=true
			},
			getPageSize(val){
				this.pageSize=val
				if(this.type==1){
					this.querySysDictionaryCategoryByPage({pageNo:1,pageSize:val})
				}else{
					this.querySysDictionaryByPage({pageNo:1,pageSize:val})
				}
			},
			getCurrentPage(val){
				if(this.type==1){
					this.querySysDictionaryCategoryByPage({pageNo:val,pageSize:this.pageSize})
				}else{
					this.querySysDictionaryByPage({pageNo:val,pageSize:this.pageSize})
				}
			},
			onBaseTabClick(val){
				// console.log(val);
				this.type=parseInt(val)
			},
			querySysDictionaryCategoryByPage(params){
				api.querySysDictionaryCategoryByPageAPI(params).then(res=>{
					if(res.code==0){
						// console.log('字典大',res);
						this.bigDictList=res.data.records
						this.total=res.data.total
					}
				})
			},
			querySysDictionaryByPage(params){
				api.querySysDictionaryByPageAPI(params).then(res=>{
					if(res.code==0){
						// console.log('字典小',res);
						this.smallDictList=res.data.records
						this.totalS=res.data.total
					}
				})
			}
		},
		created() {
			this.querySysDictionaryCategoryByPage({pageNo:1,pageSize:this.pageSize})
			this.querySysDictionaryByPage({pageNo:1,pageSize:this.pageSize})
		}
	}
</script>

<style>
</style>
