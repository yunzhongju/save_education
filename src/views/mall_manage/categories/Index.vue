<template>
	<div class="in-animate">
		<base-tabs :baseTabs="baseTabs">
			<template v-slot:1>
				<div>
					<el-row>
					  <el-col :span="24"><div class="grid-content bg-purple-dark">
							<base-table>
								<el-table
									:data="tableData"
									border
									height="700"
									style="width: 100%">
									<el-table-column
										prop="date"
										label="日期"
										width="180">
									</el-table-column>
									<el-table-column
										prop="name"
										label="姓名"
										width="180">
									</el-table-column>
									<el-table-column
										prop="address"
										label="地址">
									</el-table-column>
								</el-table>
							</base-table>
						</div></el-col>
					</el-row>
				</div>
			</template>
		</base-tabs>
	</div>
</template>

<script>
	import BaseTabs from '../../../components/BaseTabs.vue'
	import BaseTable from '../../../components/BaseTable.vue'
	export default {
		components:{
			BaseTabs,
			BaseTable
		},
		data(){
			return {
				baseTabs: [{label: '商品分类',value: '1'}],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		}
	}
</script>

<style>
</style>
