<template>
	<div>
		<base-table
		:total="total" 
		@getPageSize="getPageSize" 
		@getCurrentPage="getCurrentPage">
			<el-table
				ref="multipleTable"
				:data="list"
				border
				tooltip-effect="dark"
				height="600"
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
					label="头像"
					width="100"
					align="center"
					>
					<template slot-scope="scope">
						<div class="block">
							<el-avatar :size="large" :src="scope.row.avatar">
							</el-avatar>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="用户名"
					prop="userName"
					align="center"
					>
				</el-table-column>
				<el-table-column
					prop="userCode"
					label="用户编码"
					align="center"
					>
				</el-table-column>
				<el-table-column
					label="性别"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{scope.row.sex==0?'男':'女'}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="mobileNo"
					label="手机号"
					align="center"
					>
				</el-table-column>
				<el-table-column
					label="身份"
					align="center"
					>
					<template slot-scope="scope">
						<span>{{scope.row.isMaster==1?'组长':'成员'}}</span>
					</template>
				</el-table-column>
					<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button
							size="mini"
							type="text"
							@click="handleUserRemove(scope.$index, scope.row)">移除</el-button>
						<el-button
							size="mini"
							type="text"
							v-show="scope.row.isMaster==0"
							@click="handleUserGroup(scope.$index, scope.row)">设为组长</el-button>
						<el-button
							size="mini"
							type="text"
							v-show="scope.row.isMaster==1"
							@click="handleEditUserCom(scope.$index, scope.row)">设为成员</el-button>
					</template>
					</el-table-column>
				</el-table>
		</base-table>
	</div>
</template>

<script>
	import BaseTable from '../../../components/BaseTable.vue'
	export default {
		components:{
			BaseTable
		},
		props:{
			list:{
				type:Array,
				default:()=>[]
			},
			total:{
				type:Number,
				default:()=>0
			}
		},
		methods:{
			handleUserRemove(index,row){
				this.$emit('handleUserRemove',row)
			},
			handleUserGroup(index,row){
				this.$emit('handleUserGroup',row)
			},
			handleEditUserCom(index,row){
				this.$emit('handleEditUserCom',row)
			},
			getPageSize(val){},
			getCurrentPage(val){}
		}
	}
</script>

<style>
</style>
