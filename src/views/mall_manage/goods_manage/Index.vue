<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div>
					<el-row>
						<el-col :span="12"><div class="grid-content bg-purple">
							<el-button-group>
							  <el-button 
									type="primary" 
									:disabled="!isAdmin"
									size="mini" @click="onHandleAddGoodsType">添加分类</el-button>
							  <el-button 
									type="primary" 
									:disabled="!isAdmin"
									size="mini" @click="onHandleEdiGoodsType">修改分类</el-button>
							  <el-button 
									type="primary" 
									:disabled="!isAdmin"
									size="mini" @click="onHandleDelGoodsType">删除分类</el-button>
							</el-button-group>
						</div></el-col>
					  <el-col :span="12"><div class="grid-content bg-purple-dark">
							<ul  class="flex-end">
								<li class="marg-right30" v-if="isAdmin">
								  <el-select 
										size="mini" 
										clearable 
										@change="getData"
										v-model="serachForm.orgCode" 
										placeholder="请选择机构">
								      <el-option
								        v-for="item in orgList"
								        :key="item.orgCode"
								        :label="item.orgName"
								        :value="item.orgCode">
								      </el-option>
								    </el-select>
								</li>
								<li class="marg-right30">
								  <el-input
									  size="mini"
										placeholder="搜索商品名称"
										clearable
										suffix-icon="el-icon-search"
										v-model="serachForm.goodsName">
									</el-input>
								</li>
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-search"
										@click="getData">搜索
									</el-button>
								</li>
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-plus" 
										@click="onHandleAddGoods"
										>
									添加商品
									</el-button>
								</li>
							</ul>
						</div></el-col>
					</el-row>
					<el-row class="marg-top20">
						<el-col :span="3"><div class="grid-content bg-purple-dark">
							<h4>商品分类</h4>
							<div class="marg-top20">
								<el-tree
									:data="category" 
									 accordion
									 default-expand-all
									:props="{children: 'childrenCategory',label: 'categoryName'}" 
									@node-click="handleNodeClick"></el-tree>
							</div>
						</div></el-col>
					  <el-col :span="21"><div class="grid-content bg-purple-dark">
							<base-table :total="total" @getCurrentPage="getCurrentPage">
								<el-table
									:data="tableData"
									border
									height="660"
									style="width: 100%">
									<el-table-column
										prop="goodsName"
										align="center"
										label="商品名称">
									</el-table-column>
									<el-table-column
										prop="goodsDesc"
										align="center"
										label="商品描述">
									</el-table-column>
									<el-table-column
										prop="needIntegral"
										align="center"
										width="80"
										label="所需积分">
									</el-table-column>
									<el-table-column
										prop="stock"
										width="80"
										align="center"
										label="库存">
									</el-table-column>
									<el-table-column
										prop="saleVolume"
										align="center"
										width="80"
										label="销量">
									</el-table-column>
		
									<el-table-column
										prop="createTime"
										align="center"
										label="创建时间">
									</el-table-column>
									<el-table-column
										prop="updateTime"
										align="center"
										label="更新时间">
									</el-table-column>
									<el-table-column
										prop=""
										fixed="right"
										align="center"
										width="250"
										label="操作">
										<template slot-scope="scope">
											<el-button 
												v-show="scope.row.status==0"
												type="text" 
												@click="onHandleUpdateGoodsEffective(scope.row)">上架</el-button>
											<el-button 
												v-show="scope.row.status==1"
												@click="onHandleUpdateGoodsInvalid(scope.row)"
												type="text">下架</el-button>
											<el-button 
												type="text" 
												@click="onHandleGoodsDetail(scope.row)">详情</el-button>
											<el-button 
												type="text"
											 @click="onHandleEdiGoods(scope.row)">编辑</el-button>
											<el-button 
												type="text" 
												@click="onHandleDelGoods(scope.row)">删除</el-button>
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
		  title="添加/修改分类"
		  :visible.sync="dialogVisible"
			center
		  :before-close="handleClose">
		  <div v-if="dialogVisible">
				<el-form 
					:model="goodsTypeForm" 
					ref="goodsTypeForm" 
					label-width="100px" 
					class="demo-ruleForm">
					<el-form-item
					  label="分类名称"
					  prop="categoryName"
					  :rules="[{ required: true, message: '名称不能为空'},]">
					  <el-input 
							v-model="goodsTypeForm.categoryName" 
							clearable
							autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
					  label="父级分类">
						<el-cascader
							style="width: 100%;"
							clearable
							placeholder="非必选"
							:show-all-levels="false"
							:props="{ checkStrictly: true, 
												value:'categoryCode',
												label:'categoryName',
												children:'childrenCategory'}"
					    v-model="goodsTypeForm.parentCode"
					    :options="category"></el-cascader>
					</el-form-item>
					<el-form-item
					  label="排序"
						clearable>
					  <el-input 
							v-model="goodsTypeForm.sort" 
							clearable></el-input>
					</el-form-item>
					<el-form-item
					  label="图标">
					  <UploadImg @getImgUrl="getImgUrl" :url="goodsTypeForm.icon"></UploadImg>
					</el-form-item>
				</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('goodsTypeForm')">取 消</el-button>
		    <el-button type="primary" @click="submitForm('goodsTypeForm')">{{isEdit?'更 新':'确 定'}}</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import BaseTabs from '@/components/BaseTabs.vue'
	import BaseTable from '@/components/BaseTable.vue'
	import UploadImg from '@/components/BaseUploadImg.vue'
	import api from '@/api/api.js'
	import {queryGoodsCategoryTreeAPI,
					addGoodsCategoryAPI,
					queryGoodsByPageAPI,
					updateGoodsCategoryAPI,
					deleteGoodsAPI,
					updateGoodsInvalidAPI,
					updateGoodsEffectiveAPI,
					deleteGoodsCategoryAPI} from '@/api/mall.js'
	export default {
		components:{
			BaseTabs,
			BaseTable,
			UploadImg
		},
		data(){
			return {
				total:0,
				pageSize:10,
				pageNo:1,
				isEdit:false,
				currentCategory:'',
				goodsTypeForm:{
					categoryName:'',
					parentCode:[],
					sort:'',
					icon:''
				},
				serachValue:'',
				dialogVisible:false,
				baseTabs: [{label: '商品管理',value: '1'}],
				tableData: [],
				options: [],
				category:[],
				goodsCategory:'',
				serachForm:{
					pageNo:1,
					pageSize:10,
					goodsName:'',
					goodsCategory:'',
					orgCode:''
				},
				orgList:[]
				}
		},
		computed:{
			isAdmin(){
				return this.$store.state.userInfo.projectDepartment=='admin'?true:false
			},
		},
		methods:{
			// 上架商品
			onHandleUpdateGoodsEffective(row){
				updateGoodsEffectiveAPI({id:row.id}).then(res=>{
					if(res.code===0){
						this.$message({
							type: 'success',
							message: '上架成功'
						});
						this.getData()
					}else{
						this.$message({
							type: 'warning',
							message: res.msg
						});
					}
				})
			},
			// 下架商品
			onHandleUpdateGoodsInvalid(row){
				this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					updateGoodsInvalidAPI({id:row.id}).then(res=>{
						if(res.code===0){
							this.$message({
								type: 'success',
								message: '下架成功'
							});
							this.getData()
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
			//商品详情
			onHandleGoodsDetail(row){
				this.$router.push({
					path:'goods_detail',
					query:{
						id:row.id
					}
				})
			},
			//删除商品
			onHandleDelGoods(row){
				this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					deleteGoodsAPI({id:row.id}).then(res=>{
						if(res.code===0){
							this.$message({
								type: 'success',
								message: '删除成功'
							});
							this.getData()
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
			getCurrentPage(page){
				this.serachForm.pageNo=page
				this.getData()
			},
			getImgUrl(url){
				this.goodsTypeForm.icon=url
			},
			onHandleAddGoods(){
				this.$router.push({
					path:'create_goods',
					query:{
						id:null
					}
				})
			},
			onHandleEdiGoods(row){
				this.$router.push({
					path:'create_goods',
					query:{
						id:row.id
					}
				})
			},
			onHandleAddGoodsType(){
				this.isEdit=false 
				this.currentCategory=null
				this.goodsTypeForm.categoryName=''
				this.goodsTypeForm.parentCode=[]
				this.goodsTypeForm.sort=''
				this.goodsTypeForm.icon=''
				this.dialogVisible=true
				
			},
			onHandleDelGoodsType(){
				if(!this.currentCategory){
					this.$message({
						type:'warning',
						message:'请选择商品分类'
					})
					return
				}
				this.$confirm(`此操作将删除该商品类型${this.currentCategory.categoryName}, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					deleteGoodsCategoryAPI({id:this.currentCategory.id}).then(res=>{
						if(res.code===0){
							this.$message({
								type: 'success',
								message: '删除成功'
							});
							this.queryGoodsCategoryTree()
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
			onHandleEdiGoodsType(){
				if(!this.currentCategory){
					this.$message({
						type:'warning',
						message:'请选择商品分类'
					})
					return
				}
				this.isEdit=true
				this.dialogVisible=true
			},
			handleNodeClick(node){
				// // console.log(node);
				this.goodsCategory=node.categoryCode
				this.serachForm.goodsCategory=node.categoryCode
				this.pageNo=1
				this.$message({
					type:'success',
					message:`已选中${node.categoryName}`
				})
				this.currentCategory=node
				this.goodsTypeForm.categoryName=node.categoryName
				this.goodsTypeForm.sort=node.sort
				this.goodsTypeForm.icon=node.icon
				if(!node.parentCode){
					this.goodsTypeForm.parentCode=[]
				}else{
					this.goodsTypeForm.parentCode.push(node.parentCode)
				}
				this.getData()
				// // console.log(this.goodsTypeForm);
			},
			handleClose(done){
				this.$confirm('确认关闭？')
					.then(_ => {
						this.goodsTypeForm.parentCode=[]
						done();
					})
					.catch(_ => {});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let parentCode=this.goodsTypeForm.parentCode
						this.goodsTypeForm.parentCode=parentCode.length!==0?parentCode[parentCode.length-1]:''
						// // console.log(this.goodsTypeForm);
						if(!this.isEdit){
							addGoodsCategoryAPI(this.goodsTypeForm).then(res=>{
								if(res.code===0){
									this.$message({
										type:'success',
										message:'添加成功'
									})
									this.queryGoodsCategoryTree()
									this.dialogVisible=false
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							this.goodsTypeForm['id']=this.currentCategory.id
							this.goodsTypeForm.parentCode=parentCode.length!==0?parentCode[parentCode.length-1]:''
							updateGoodsCategoryAPI(this.goodsTypeForm).then(resp=>{
								if(resp.code===0){
									this.$message({
										type:'success',
										message:'更新成功'
									})
									delete this.goodsTypeForm['id']
									this.goodsTypeForm.parentCode=[]
									this.queryGoodsCategoryTree()
									this.dialogVisible=false
								}else{
									this.$message({
										type:'warning',
										message:resp.msg
									})
								}
							})
						}
						
					} else {
						// // console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible=false
			},
			queryGoodsCategoryTree(){
				queryGoodsCategoryTreeAPI({}).then(res=>{
					this.category=res.data
				})
			},
			queryGoodsByPage(params){
				queryGoodsByPageAPI(params).then(res=>{
					this.total=res.data.total
					this.tableData=res.data.records
				})
			},
			getData(){
				this.queryGoodsByPage(this.serachForm)
			},
			getSysOrgTree(){
				api.getSysOrgTreeAPI({}).then(res=>{
					this.orgList=res.data[0].childrenOrg.map(v=>{
						delete v.childrenOrg
						return v
					})
					console.log(this.orgList);
				})
			}
		},
		created() {
			this.queryGoodsCategoryTree()
			this.getSysOrgTree()
			this.getData()
		}
	}
</script>

<style>
</style>
