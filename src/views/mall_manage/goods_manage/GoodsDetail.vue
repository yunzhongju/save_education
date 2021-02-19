<template>
	<div class="in-animate">
		<base-tabs
		@onBaseTabClick="onBaseTabClick"
		:baseTabs="baseTabs">
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
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<el-card>
							  <div slot="header" class="clearfix">
							    <span>商品信息</span>
									<el-button
										style="float: right; padding: 3px 0" 
										icon="el-icon-edit" 
										@click="onHandleEditGoodsInfo"
										type="text">修改信息</el-button>
							  </div>
							  <ul class="goods-info">
									<li>
										<span class="marg-top10">商品名称 :  {{detail.goodsName}}</span>
										<span class="marg-top10">商品状态 :  {{detail.status==1?'上架':'下架'}}</span>
										<span class="marg-top10">商品库存 :  {{detail.stock}}</span>
									</li>
									<li>
										<span class="marg-top10">商品销量 :  {{detail.saleVolume}}</span>
										<span class="marg-top10">商品分类 :  {{detail.goodsCategory}}</span>
										<span class="marg-top10">所需积分 :  {{detail.needIntegral}}</span>
									</li>
									<li>
										<span class="marg-top10">创建时间 :  {{detail.createTime}}</span>
										<span class="marg-top10">更新时间 :  {{detail.updateTime}}</span>
										<span class="marg-top10">商品描述 :  {{detail.goodsDesc}}</span>
									</li>
								</ul>
							</el-card>
						</div></el-col>
					</el-row>
					<el-row class="marg-top20">
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<el-card>
							  <div slot="header" class="clearfix">
							    <span>商品介绍图</span>
							    <el-button 
										style="float: right; padding: 3px 0" 
										icon="el-icon-plus" 
										@click="onHandleAddIntroducePic"
										type="text">添加介绍图</el-button>
							  </div>
								<div 
									v-if="introducePic.length===0"
									class="empty"><span style="color: #808080;">暂无图片</span></div>
							  <ul class="" v-if="introducePic">
									<li 
										v-for="(item,index) in introducePic" 
										:class="{'roll-in-left':1==1,'bounce-out-left':active==item.id}">
										<div class="img-sort">
											<el-tooltip 
												effect="dark" 
												content="请手动设置排序" 
												placement="top">
												<span>{{item.sort?item.sort:1}}</span>
											</el-tooltip>
										</div>
										<el-card :body-style="{ padding: '0px' }">
											<img 
											:src="item.imagePath" 
											style="width: 314px;height: 420px;">
											<div style="padding: 10px;">
												<div class="bottom">
													<el-button 
														type="text" 
														icon="el-icon-edit"
														@click="onHandleEditImg(item)">编辑</el-button>
													<el-button 
														type="text" 
														icon="el-icon-view"
														@click="onHandlePreview(item.imagePath)">预览</el-button>
													<el-button 
														type="text" 
														icon="el-icon-delete"
														@click="onHandleDelImg(item.id)">删除</el-button>
												</div>
											</div>
										</el-card>
									</li>
								</ul>
							</el-card>
						</div></el-col>
					</el-row>
					<el-row class="marg-top20">
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<el-card>
							  <div slot="header" class="clearfix">
							    <span>商品详情图</span>
							    <el-button 
										style="float: right; padding: 3px 0" 
										icon="el-icon-plus" 
										@click="onHandleAddDetailPic"
										type="text">添加详情图</el-button>
							  </div>
								<div
									v-if="detailPic.length===0"
									class="empty"><span style="color: #808080;">暂无图片</span></div>
							  <ul class="" v-if="detailPic">
							  	<li 
										v-for="(item,index) in detailPic" 
										:class="{'roll-in-left':1==1,'bounce-out-left':active==item.id}">
										<div class="img-sort">
											<el-tooltip
												effect="dark" 
												content="请手动设置排序" 
												placement="top">
												<span>{{item.sort?item.sort:1}}</span>
											</el-tooltip>
										</div>
										<el-card :body-style="{ padding: '0px' }">
											<img 
											:src="item.imagePath" 
											style="width: 314px;height: 420px;">
											<div style="padding: 10px;">
												<div class="bottom">
													<el-button 
														type="text" 
														icon="el-icon-edit"
														@click="onHandleEditImg(item)">编辑</el-button>
													<el-button 
														type="text" 
														icon="el-icon-view"
														@click="onHandlePreview(item.imagePath)">预览</el-button>
													<el-button 
														type="text"
														icon="el-icon-delete"
														@click="onHandleDelImg(item.id)">删除</el-button>
												</div>
											</div>
										</el-card>
							  	</li>
							  </ul>
							</el-card>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加/修改图片"
		  :visible.sync="dialogVisible"
			center
			v-if="dialogVisible"
		  :before-close="handleClose">
		  <div v-if="dialogVisible">
				<el-form 
					:model="imgForm" 
					ref="imgForm" 
					label-width="100px">
				  <el-form-item
				    label="上传图片"
				    :prop="isEdit?'':'imagePath'"
				    :rules="[{ required: true, message: '图片不能为空'}]">
				    <UploadImg @getImgUrl="getImgUrl"></UploadImg>
				  </el-form-item>
					<el-form-item
					  label="图片类型">
						<el-radio-group v-model="imgForm.imageType">
							<el-radio :label="1">介绍图</el-radio>
							<el-radio :label="2">详情图</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
					  label="排序">
					  <el-input 
							v-model.number="imgForm.sort"></el-input>
					</el-form-item>
				</el-form>
			</div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('imgForm')">取 消</el-button>
		    <el-button 
					type="primary" 
					@click="submitForm('imgForm')">{{imgForm.id?'更 新':'添 加'}}</el-button>
		  </span>
		</el-dialog>
		
		
		<el-dialog
		  :visible.sync="dialogVisiblePreView"
			center
			width="50%"
		  :before-close="handleClose">
		  <div style="display: flex;justify-content: c;">
				<img :src="previewUrl" style="width: 100%;">
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import BaseTabs from '../../../components/BaseTabs.vue';
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import {queryGoodsDetailAPI,
					updateGoodsPicAPI,
					addGoodsPicAPI,
					deleteGoodsPicAPI} from '../../../api/mall.js'
	export default {
		components:{
			BaseTabs,
			UploadImg
		},
		data(){
			return {
				id:'',
				active:'',
				previewUrl:'',
				introducePic:[],
				detailPic:[],
				isEdit:false,
				dialogVisiblePreView:false,
				dialogVisible:false,
				detail:'',
				baseTabs:[{label: '商品详情',value: '1'}],
				imgForm:{
					goodsCode:'',
					imagePath:'',
					imageType:1,
					sort:1
				}
			}
		},
		methods:{
			onHandleEditGoodsInfo(){
				this.$router.push({
					path:'create_goods',
					query:{
						id:this.detail.id
					}
				})
			},
			onHandleDelImg(id){
				this.$confirm(`此操作将删除该图片, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					this.active=id
					setTimeout(()=>{
						deleteGoodsPicAPI({id:id}).then(res=>{
							if(res.code===0){
								this.$message({
									type: 'success',
									message: '删除成功'
								});
								this.queryGoodsDetail({id:this.id})
							}
						})
					},1000)
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			onHandlePreview(path){
				this.previewUrl=path
				this.dialogVisiblePreView=true
			},
			onHandleEditImg(item){
				this.isEdit=true
				this.imgForm['id']=item.id
				this.imgForm.imageType=parseInt(item.imageType)
				// this.imgForm.imagePath=item.imagePath
				this.dialogVisible=true
			},
			onHandleAddIntroducePic(){
				if(this.imgForm.id){
					delete this.imgForm.id
				}
				this.isEdit=false
				this.imgForm.imageType=1
				this.dialogVisible=true
			},
			onHandleAddDetailPic(){
				if(this.imgForm.id){
					delete this.imgForm.id
				}
				this.imgForm.imageType=2
				this.dialogVisible=true
			},
			handleClose(done){done()},
			onBaseTabClick(){},
			getImgUrl(url){
				this.imgForm.imagePath=url
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.imgForm);
						if(!this.imgForm.id){
							addGoodsPicAPI(this.imgForm).then(res=>{
								if(res.code===0){
									this.$message({
										type:'success',
										message:'添加成功'
									})
									this.$refs[formName].resetFields();
									this.dialogVisible=false
									this.queryGoodsDetail({id:this.id})
								}else{
									this.$message({
										type:'warning',
										message:res.msg
									})
								}
							})
						}else{
							updateGoodsPicAPI(this.imgForm).then(resp=>{
								if(resp.code===0){
									this.$message({
										type:'success',
										message:'更新成功'
									})
									this.dialogVisible=false
									this.queryGoodsDetail({id:this.id})
								}else{
									this.$message({
										type:'warning',
										message:resp.msg
									})
								}
							})
						}
					} else {
						// console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.dialogVisible=false
			},
			queryGoodsDetail(params){
				queryGoodsDetailAPI(params).then(res=>{
					// console.log(res);
					this.detail=res.data
					this.imgForm.goodsCode=res.data.goodsCode
					this.detailPic=res.data.detailPic
					this.introducePic=res.data.introducePic
				})
			}
		},
		created() {
			this.id=this.$route.query.id
			this.queryGoodsDetail({id:this.id})
		}
	}
</script>

<style scoped lang="less">
.box-car::-webkit-scrollbar { width: 0 !important }
.box-car{
	height: 750px !important;
	overflow-y: auto;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;
}
.goods-info{
	display: flex;
	li{
		flex-basis: 20%;
		display: flex;
		flex-direction: column;
		letter-spacing: 2px;
		color: grey;
	}
	li:nth-child(3){
		flex: 1;
	}
}
ul{
	display: flex;
	overflow-x: auto;
	li{
		position: relative;
		margin-right: 30px;
		padding: 10px 0;
		.bottom{
			display: flex;
			justify-content: space-around;
		}
		.img-sort{
			position: absolute;
			cursor: pointer;
			top: 20px;
			right: 10px;
			display: flex;
			box-sizing: border-box;
			justify-content: center;
			align-items: center;
			height: 20px;
			width: 20px;
			border-radius: 50%;
			background-color: #409EFF;
			color: #fff;
			font-size: 12px;
		}
	}
}
.empty{
	display: flex;
	justify-content: center;
}
</style>