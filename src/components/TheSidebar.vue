<template>
	<div class="sider">
		 <el-menu
		  ref="menu"
			default-active="2"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			router
			unique-opened
			@select="handleChooseMenu"
			@close="handleClose">
				<el-submenu 
					:index="item.menuUrl" 
					v-for="(item,index) in menu" 
					:key="item.menuCode">
					<template slot="title">
						<el-image
								:src="item.icon"
								lazy
								class="img-size18 marg-letf marg-right">
						</el-image>
						<span>{{item.menuName}}</span>
					</template>
					<el-menu-item 
						:index="each.menuUrl"
						:key="each.menuCode"
						v-for="(each,index) in item.children">
						<span>{{each.menuName}}</span>
					</el-menu-item>
				</el-submenu>
		</el-menu>
	</div>
</template>

<script>
import api from '../api/api.js'
export default {
	data(){
		return {
			menu:[]
		}
	},
	methods: {
		handleChooseMenu(index,path){
			// console.log(this.$route.matched);
			// try{
			// 	this.$router.push(index)
			// }catch{
			// 	this.$router.push('/test')
			// }
		},
		handleOpen(key, keyPath) {
			// console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			// console.log(key, keyPath);
		}
	},
	created() {
		api.loadUserMenuAPI().then(res=>{
			// console.log('当前用户菜单',res);
			if(res.code==0){
				this.menu=res.data
			}else{
				this.$message({
					message:res.msg,
					type:'error'
				})
			}
		})
	}
}
</script>

<style scoped>
	.el-submenu .el-menu-item{
		padding-left: 70px !important
	}
/* 	.el-submenu .el-menu-item:hover{
		background-color: #409EFF !important;
		color: #fff;
	} */
	.el-submenu__title{
		color: red !important;
	}
	.sider{
		/* overflow-y: scroll; */
	}
	.marg-letf{
		margin-left: 10px;
	}
	.marg-right{
		margin-right: 10px;
	}
	.padd{
		padding-left: 20px;
		line-height: 56px;
	}
	.show-menu{
		display: flex;
		/* height: 56px; */
		align-items: center;
	}
</style>
