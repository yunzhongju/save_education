<template>
	<div class="d-flex justify-content-center">
		<div class="d-flex align-items-center">
			<img
				src="../assets/images/logo1.png" 
				style="height: 40px;width: 40px;"
				class="rounded-circle point">	
			<span class="point ml-2" style="font-size:32px;color: white;" @click="$router.push('/home')">安全教育云平台</span>
		</div>
		<div class="ml-auto">
			<el-tooltip class="" effect="dark" content="首页" placement="left">
				<i class="el-icon-s-home point" @click="$router.push('/home')"></i>
			</el-tooltip>
			<el-divider direction="vertical"></el-divider>	
			<img 
				:src="user.avator||'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" 
				style="height: 40px;width: 40px;"
				class="rounded-circle point">	
			</el-avatar>
			<el-divider direction="vertical"></el-divider>	
			<span class="fontSize16">{{user.orgName}}--{{user.userName}}</span>
			<el-divider direction="vertical"></el-divider>
			<span class="point fontSize16" @click="handleQuit">退出</span>
		</div>
	</div>
</template>

<script>
	import api from '../api/api.js'
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				
			}
		},
		computed:{
			...mapState({
				user:s=>s.userInfo
			})
		},
		methods:{
			handleQuit(){
				let params={
					token:this.$store.state.token
				}
				api.loginOutAPI(params).then(res=>{
					if(res.code===0){
						this.$message({
							type:'success',
							message:'退出成功'
						})
						this.$store.commit('logout')
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
