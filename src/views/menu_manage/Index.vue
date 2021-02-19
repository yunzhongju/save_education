<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div class="container">
					<el-row>
						<el-col :span="24"><div class="grid-content bg-purple-dark flex-end ">
							<el-button-group>
							  <el-button 
								  class="marg-right30"
									type="primary"
									icon="el-icon-plus" 
									@click="handleAddMenu"
									size="mini">添加菜单</el-button>
							</el-button-group>
						</div></el-col>
					</el-row>
					<el-row class="marg-top10">
						<el-col :span="24">
							<div class="grid-content bg-purple-dark">
								<base-table 
									:showFoot="false"
									>
									<el-table 
										ref="multipleTable" 
										:data="menu" 
										border 
										v-loading="loading"
										row-key="id"
										tooltip-effect="dark" 
										height="680"
										:tree-props="{children: 'childMenus'}"
										highlight-current-row
									>
										<el-table-column
											label="编号"
											width="100"
											align="center"
											>
											<template slot-scope="scope">
												<span>{{scope.$index+1}}</span>
											</template>
										</el-table-column>
										<el-table-column 
										prop="menuName" 
										label="菜单名" 
										align="center"></el-table-column>
										<el-table-column
										prop="icon" 
										label="图标" 
										align="center">
										<template slot-scope="scope">
											<img 
												v-show="scope.row.icon"
												class="img-size18" 
												:src="scope.row.icon" alt="">
											<span v-show="!scope.row.icon">无</span>	
										</template>
										</el-table-column>
										<el-table-column
										prop="menuUrl" 
										label="路由" 
										align="center"></el-table-column>
										<el-table-column 
										prop="menuCode" 
										label="菜单编码" 
										align="center" 
										show-overflow-tooltip></el-table-column>
										<el-table-column 
										label="操作" align="center" width="180">
											<template slot-scope="scope">
												<el-button
												size="mini" 
												type="text" 
												@click="handleAddMenu(scope.$index, scope.row)">添加</el-button>
												<el-button
												size="mini" 
												type="text" 
												@click="handleEditMenu(scope.$index, scope.row)">编辑</el-button>
												<el-button 
												size="mini" 
												type="text" 
												@click="handleDeleteMenu(scope.$index, scope.row)">删除</el-button>
											</template>
										</el-table-column>
									</el-table>
								</base-table>
							</div>
						</el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
		
		<el-dialog
		  title="添加/修改菜单"
		  :visible.sync="dialogVisible"
		  width="50%"
			center
		  :before-close="handleClose">
		  <span>
				<base-form 
					v-if="dialogVisible"
					:type="type"
					:currentMenu="currentMenu"
					:parentMenu="menu" 
					@resetForm="resetForm"
					@submit="submit"></base-form>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import BaseForm from './components/BaseForm.vue'
import BaseTabs from '../../components/BaseTabs.vue';
import BaseTable from '../../components/BaseTable.vue';
import api from '../../api/api.js'
export default {
	inject:['reloadAll'],
	components: {
		BaseTabs,
		BaseTable,
		BaseForm
	},   
	data() {
		return {
			loading:false,
			type:null,
			currentMenu:null,
			dialogVisible:false,
			form:{manager:''},
			menu: [],
			subMenu:[],
			baseTabs: [{label: '菜单管理',value: '1'}],
		};
	},
	methods: {
		//创建成功
		submit(){
			this.dialogVisible=false
			this.reloadAll()
		},
		update(){
			this.dialogVisible=false
			this.getSysMenuTree()
		},
		resetForm(){
			this.dialogVisible=false
		},
		//删除菜单
		handleDeleteMenu(index,row){
			this.$confirm(`是否删除菜单:${row.menuName}`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				api.deleteSysMenuAPI({id:row.id}).then(res=>{
					if(res.code==0){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getSysMenuTree()
					}else{
						this.$message({
							type: 'warning' ,
							message: res.msg
						});
					}
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		//切换一级菜单
		handleChangeMenu(menu){
			this.menu.forEach(item=>{
				if(item.id==menu.id){
					this.currentMenu=item
					this.subMenu=item.childMenus
				}
			})
		},
		//添加菜单
		handleAddMenu(){
			this.currentMenu=null
			this.dialogVisible=true
			this.type=0
		},
		handleClose(done){done()},
		//编辑
		handleEditMenu(index,row){
			this.currentMenu=row
			this.dialogVisible=true
			this.type=1
		},
		handleStart(index, row) {
			// console.log(row);
			if(!this.form.manager){
				this.$message({
					showClose: true,
					message: '请选择管理员!',
					type: 'warning'
				});
			}else{
				this.$message({
					showClose: true,
					message: `${this.form.manager}启用该菜单`,
					type: 'success'
				});
			}
		},
		getSysMenuTree(){
			this.loading=true
			api.getSysMenuTreeAPI().then(res=>{
				// console.log('系统菜单',res);
				this.menu=res.data.reverse()
				this.subMenu=res.data[0].childMenus
				this.loading=false
			})
		},	
	},
	mounted() {
		this.getSysMenuTree()
	}
};
</script>

<style scoped>
	.algin-center{
		height: 40px;
		display: flex;
		align-items: center;
	}
	.marg-left{
		margin-left: 55px !important;
	}
	.grid-content1{
		text-align: center;
	}
</style>
