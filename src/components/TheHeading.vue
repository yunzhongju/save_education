<template>
	<div>
		<el-row>
		  <el-col :span="12"><div class="grid-content bg-purple">
				<el-row class="flex-mid">
				  <el-col :span="0">
						<div class="grid-content bg-purple logo">
							 
							<img class="" src="../assets/images/logo.svg" alt="logo">
						</div>
					</el-col>
				  <el-col :span="20"><div class="grid-content bg-purple-light">
					<h2 class="point" @click="$router.push('/home')">安全教育云平台</h2></div></el-col>
				</el-row>
			</div></el-col>
		  <el-col :span="12">
				<div class="grid-content bg-purple-light">
					  <div class="flex-mid flex-end marg-right30">
							<el-tooltip class="item" effect="dark" content="首页" placement="left">
								<i class="el-icon-s-home point" @click="$router.push('/home')"></i>
							</el-tooltip>
							<el-divider direction="vertical"></el-divider>	
							<el-avatar 
								class="point"
								size="medium"
								:src="user_info.avator">
							</el-avatar>
							<el-divider direction="vertical"></el-divider>	
					    <span class="fontSize16">{{user_info.orgName}}--{{user_info.userName}}</span>
					    <el-divider direction="vertical"></el-divider>
					    <span class="point fontSize16" @click="handleQuit">退出</span>
					  </div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import api from '../api/api.js'
	export default {
		data(){
			return {
				user_info:''
			}
		},
		methods:{
			handleQuit(){
				let params={
					token:this.user_info.sessionId
				}
				api.loginOutAPI(params).then(res=>{
					if(res.code===0){
						this.$message({
							type:'success',
							message:'退出成功'
						})
						localStorage.removeItem('user_info')
						this.$router.push('/login')
					}else{
						this.$message({
							type:'error',
							message:res.msg
						})
					}
				})
			}
		},
		created() {
		},
		beforeMount() {
			
		},
		mounted() {
			this.user_info=JSON.parse(localStorage.getItem('user_info'))
		}
	}
</script>

<style lang="less" scoped>
	h2{
		font-family: "bodoni mt black";
	}
	.logo{
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.logo img{
		height: 40px;
		width: 40px;
		margin-right: 30px;
	}
	.point{
		cursor: pointer;
	}
</style>
