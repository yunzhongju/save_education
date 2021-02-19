<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="box-car">
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<ul  class="flex-end">
								<li class="marg-right30">
									<el-button 
										type="primary" 
										size="mini" 
										icon="el-icon-refresh-left" 
										@click="$router.go(-1)"
										>
									返回
									</el-button>
								</li>
							</ul>
						</div></el-col>
					</el-row>
					<el-row class="marg-top20">
					  <el-col :span="24"><div class="grid-content bg-purple-dark flex-mid2">
							<div style="width: 50%;" >
								<el-form 
									:model="goodsForm" 
									ref="goodsForm" 
									label-width="100px">
								  <el-form-item
								    label="商品名称"
								    prop="goodsName"
								    :rules="[{ required: true, message: '商品名称不能为空'}]">
								    <el-input 
											v-model="goodsForm.goodsName" 
											clearable></el-input>
								  </el-form-item>
									<el-form-item
									  label="所需积分"
									  prop="needIntegral"
									  :rules="[{ required: true, message: '所需积分不能为空'}]">
									  <el-input 
											v-model.number="goodsForm.needIntegral" 
											clearable></el-input>
									</el-form-item>
									<el-form-item
									  label="商品描述"
									  prop="goodsDesc"
									  :rules="[{ required: true, message: '商品描述不能为空'}]">
									  <el-input 
											v-model="goodsForm.goodsDesc" 
											type="textarea"></el-input>
									</el-form-item>
									<el-form-item
									  label="商品分类"
									  prop="goodsCategory"
									  :rules="[{ required: true, message: '商品分类不能为空',trigger: 'change'}]">
									  <el-cascader
									  	<el-cascader
												v-if="goodsForm.goodsCategory"
									  		style="width: 100%;"
									  		clearable
												@change="handleClickNode"
									  		:show-all-levels="false"
									  		:props="{ checkStrictly: true, 
									  							value:'categoryCode',
									  							label:'categoryName',
									  							children:'childrenCategory'}"
									  	  v-model="goodsForm.goodsCategory"
									  	  :options="category"></el-cascader>
									</el-form-item>
									<el-form-item
									  label="库存"
									  prop="stock"
									  :rules="[{ required: true, message: '库存不能为空'}]">
									  <el-input 
											v-model.number="goodsForm.stock" 
											clearable></el-input>
									</el-form-item>
								  <el-form-item>
								    <el-button type="primary" @click="submitForm('goodsForm')">{{id?'更 新':'添加'}}</el-button>
								    <el-button @click="resetForm('goodsForm')">重 置</el-button>
								  </el-form-item>
								</el-form>
							</div>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../../components/BaseTabs.vue'
	import {queryGoodsCategoryTreeAPI,
					addGoodsAPI,
					updateGoodsAPI,
					queryGoodsDetailAPI} from '../../../api/mall.js'
	export default {
		components:{
			BaseTabs
		},
		data(){
			return {
				id:null,
				detail:'',
				category:[],
				bounceOut:'',
				options:[],
				baseTabs: [{label: '添加商品',value: '1'}],
				goodsForm:{
					goodsName:'',
					goodsDesc:'',
					goodsCategory:[],
					needIntegral:'',
					stock:''
				}
			}
		},
		methods: {
			handleClickNode(node){
				// console.log(node);
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let goodsCategory=this.goodsForm.goodsCategory
						this.goodsForm.goodsCategory=goodsCategory[goodsCategory.length-1]
						if(!this.id){
							addGoodsAPI(this.goodsForm).then(res=>{
								if(res.code!==0){
									this.$message({
										type:'warning',
										message:res.msg
									})
									return false;
								}
								this.$message({
									type:'success',
									message:'添加成功'
								})
								this.$router.go(-1)
							})
						}else{
							this.goodsForm['id']=this.id
							updateGoodsAPI(this.goodsForm).then(res=>{
								if(res.code!==0){
									this.$message({
										type:'warning',
										message:res.msg
									})
									return false;
								}
								this.$message({
									type:'success',
									message:'更新成功'
								})
								this.$router.go(-1)
							})
						}
					} else {
						this.$message({
							type:'warning',
							message:'请填写表单'
						})
						return false;
					}
				});
			},
			resetForm(formName) {
				this.bounceOut='bounceOut'
				this.$refs[formName].resetFields();
				setTimeout(()=>{
					this.$router.go(-1)
				},1000)
			},
			queryGoodsCategoryTree(){
				queryGoodsCategoryTreeAPI({}).then(res=>{
					this.category=res.data
				})
			},
			queryGoodsDetail(params){
				queryGoodsDetailAPI(params).then(res=>{
					// console.log(res);
					this.goodsForm.goodsName=res.data.goodsName
					this.goodsForm.needIntegral=res.data.needIntegral
					this.goodsForm.goodsDesc=res.data.goodsDesc
					this.goodsForm.stock=res.data.stock
					if(res.data.parentCategoryCode){
						this.goodsForm.goodsCategory.push(res.data.parentCategoryCode)
						this.goodsForm.goodsCategory.push(res.data.goodsCategory)
					}else{
						this.goodsForm.goodsCategory.push(res.data.goodsCategory)
					}
					// console.log(this.goodsForm);
				})
			}
		},
		created() {
			this.id=this.$route.query.id?this.$route.query.id:null
			this.goodsForm.goodsCategory=[]
			this.queryGoodsCategoryTree()
			if(this.id){
				this.queryGoodsDetail({id:this.id})
			}
		}
	}
</script>

<style scoped>
.box-car{
	min-height: 80vh;
	max-height: 80vh;
}
</style>
