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
							@click="$router.go(-1)"
							icon="el-icon-refresh-right">返回</el-button>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						<el-card class="box-card" shadow="never">
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: center;">
									<h2>{{detail.title}}</h2>
								</div></el-col>
							</el-row>
							<el-row>
							  <el-col :span="24"><div class="grid-content bg-purple-dark">
									<ul>
										<li>开始时间:{{detail.startTime}}</li>
										<li>结束时间:{{detail.endTime}}</li>
										<li>创建时间:{{detail.createTime}}</li>
										<li>公告状态:{{detail.status==1?'发布':detail.status==2?'草稿':'删除'}}</li>
										<li>公告对象:  <span v-for="(item,index) in detail.users">{{item.userName}}</span></li>
										<li>
											<el-row>
											  <el-col :span="2"><div class="grid-content bg-purple"><i>公告附件:</i></div></el-col>
											  <el-col :span="22"><div class="grid-content bg-purple-light">
													<ol>
														<li v-for="(item,index) in detail.noticeFiles"><a :href="item.filePath">{{item.fileName}}</a></li>
													</ol>
												</div></el-col>
											</el-row>
										</li>
									</ul>
								</div></el-col>
							</el-row>
						  <el-row>
						    <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
						  		<div class="show-content" v-html="detail.content"></div>
						  	</div></el-col>
						  </el-row>
						</el-card>
					</div></el-col>
				</el-row>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../components/BaseTabs.vue';
	// import BaseEditor from '../../components/ckeditor/ckeditor.vue'
	import api from '../../api/api.js'
	export default {
		components:{
			BaseTabs,
			// BaseEditor
		},
		data(){
			return {
				id:'',
				detail:'',
				baseTabs:[
					{
						label: '公告详情',
						value: '1'
					}
				],
			}
		},
		methods:{
			onBaseTabClick(){
				
			}
		},
		created() {
			this.id=this.$route.query.id
			api.noticeByDetailAPI({id:this.id}).then(res=>{
				// console.log('公告详情',res);
				this.detail=res.data
			})
		}
	}
</script>

<style scoped lang="less">
	.box-card{
		height: 700px;
		overflow-y: auto;
	}
	.show-content{
		min-height: 350px;
		max-height: 600px;
	}
	ul{
		li{
			margin-bottom: 10px;
			span{
				margin-left: 20px 
			}
		}
	}
</style>
