<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="角色名称:">
						<span>{{ detail.roleName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="角色编码:">
						<span>{{ detail.roleCode }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="角色描述:">
						<span>{{ detail.roleDesc }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="角色状态:">
						<span>{{ detail.status==1?'有效':'无效' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="创建时间:">
			  		<span>{{detail.createTime }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="更新时间:">
			  		<span>{{detail.updateTime }}</span>
			  	</el-form-item>
			  </div></el-col>
			</el-row>
			<el-row >
				<el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="角色菜单:">
						<el-row>
						  <el-col :span="24"><div class="grid-content bg-purple-dark">
								<el-tree
									ref="menutree"
									:data="menu" 
									show-checkbox
									accordion
									node-key="menuCode" 
									:props="{label:'menuName',children:'childMenus'}">
									<span class="custom-tree-node" slot-scope="{ node, data }">
										<span>{{ node.label }}</span>
									</span>
								</el-tree>
							</div></el-col>
						</el-row>
					</el-form-item>
				</div></el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import api from '../../../api/api.js'
	export default {
		props:{
			detail:{
				type:Object,
			},
			menu:{
				type:Array,
				default:()=>[]
			}
		},
		data(){
			return {
			}
		},
		created() {
		},
		
		mounted() {
			this.$refs.menutree.setCheckedKeys(this.detail.menuCodes)
		}
	}
</script>

<style scoped>
/* 	.demo-table-expand{
		display: flex;
		flex-wrap: wrap;
	} */
</style>
