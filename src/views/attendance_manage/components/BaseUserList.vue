<template>
	<div>
		<el-row>
		  <el-col :span="8"><div class="grid-content bg-purple-dark">
			 <el-select v-model="value" placeholder="请选择部门">
					<el-option
						label="中情局"
						value="1">
					</el-option>
				</el-select>
			</div></el-col>
			<el-col :span="16"><div class="grid-content bg-purple-dark">
				<ul class="flex-end">
					<li class="marg-right30">
						<el-input size="small" 
						placeholder="搜用户名称/手机号" 
						@change="handleSerach" 
						clearable 
						suffix-icon="el-icon-search" 
						v-model="serachValue"></el-input>
					</li>
					<li class="marg-right30">
						<el-button type="primary" 
						size="small" 
						icon="el-icon-search"
						@click="handleBtnSerach">搜索</el-button></li>
				</ul>
			</div></el-col>
		</el-row>
		<el-row class="">
		  <el-col :span="24"><div class="grid-content bg-purple-dark marg-top20">
				<base-table
				:total="100" 
				@getPageSize="getPageSize" 
				@getCurrentPage="getCurrentPage">
					<el-table 
					ref="multipleTable" 
					:data="userData" 
					border 
					tooltip-effect="dark" 
					style="width: 100%;min-height: 450px;" 
					@selection-change="handleSelectionChange">
						<el-table-column 
						type="selection" 
						width="55"></el-table-column>
						<el-table-column 
						label="编号" 
						prop="id" 
						width="55" 
						align="center"></el-table-column>
						<el-table-column 
						prop="name" 
						label="姓名" 
						align="center"></el-table-column>
						<el-table-column
						prop="phone" 
						label="电话" 
						align="center" 
						show-overflow-tooltip></el-table-column>
						<el-table-column 
						prop="department" 
						label="所属部门" 
						align="center" 
						show-overflow-tooltip></el-table-column>
					</el-table>
				</base-table>
			</div></el-col>
		</el-row>
	</div>
</template>

<script>
	import BaseTable from '../../../components/BaseTable.vue';
	export default {
		components:{
			BaseTable
		},
		data(){
			return {
				value:'',
				serachValue:'',
				userData:[{
					id:1,
					name:'tom',
					phone:12381923213,
					department: '中情局',
				}]
			}
		},
		methods:{
			handleSerach(val){},
			handleBtnSerach(){},
			getPageSize(val){},
			getCurrentPage(val){},
			handleSelectionChange(){},
		}
	}
</script>

<style>
</style>
