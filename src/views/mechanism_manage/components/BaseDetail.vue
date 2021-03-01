<template>
	<div v-if="detail">
		<el-card class="box-card" hover>
		  <div slot="header" class="clearfix">
		    <el-button 
					style="float: right; padding: 3px 0" 
					v-if="detail"
					type="text" 
					@click="onHandleUpdate">修改机构</el-button>
		  </div>
		  <ul>
				<li>
					<span>机构名称:{{detail.orgName?detail.orgName:'无'}}</span>
					<span>行政级别:{{detail.level==1?'省':detail.level==2?'市':detail.level==3?'县':'区'}}</span>
					<span>联系人:{{detail.linkman?detail.linkman:'无'}}</span>
					<span>机构排序:{{detail.sort?detail.sort:'无'}}</span>
					<span>县/区:{{detail.district ?detail.district:'无'}}</span>
					<span>机构状态:
						<el-switch
						  v-model="detail.status==='1'?true:false"
						  active-color="#409eff"
							@change="onHandleOrgStatus"
						  inactive-color="#ff4949">
						</el-switch>
					</span>
				</li>
				<li>
					<span>机构类别:{{detail.orgType==0?'机构':'小组'}}</span>
					<span>机构代码:{{detail.orgCode?detail.orgCode:'无'}}</span>
					<span>联系电话:{{detail.linkphone?detail.linkphone:'无'}}</span>
					<span>省:{{detail.province?detail.province:'无'}}</span>
					<span>市:{{detail.city?detail.city:'无'}}</span>
				</li>
				<li>
					<span>机构备注:{{detail.remark?detail.remark:'无'}}</span>
					<span>上级机构:{{detail.parentName?detail.parentName:'无'}}</span>
					<span>详细地址:{{detail.address?detail.address:'无'}}</span>
					<span>创建时间:{{detail.createTime?detail.createTime:'无'}}</span>
					<span>更新时间:{{detail.updateTime?detail.updateTime:'无'}}</span>
				</li>
			</ul>
		</el-card>
	</div>
</template>

<script>
	export default {
		props:{
			detail:{
				type:Object,
			}
		},
		data(){
			return {
				value:true
			}
		},
		methods:{
			onHandleUpdate(){
				this.$emit('onHandleUpdate')
			},
			onHandleOrgStatus(){
				this.$emit('onHandleOrgStatus')
			}
		}
	}
</script>

<style scoped lang="less">
ul{
	display: flex;
	font-size: 18px;
	li{
		flex-basis: 33%;
		display: flex;
		flex-direction: column;
		letter-spacing: 2px;
		color: grey;
		span{
			margin-top: 20px;
		}
	}
	// li:nth-child(3){
	// 	flex: 1;
	// }
}
</style>
