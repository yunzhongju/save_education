<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="机构名称:">
						<span>{{ detail.orgName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="上级机构:">
						<span>{{ detail.parentName?detail.parentName:'无' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="行政级别:">
			  		<span>{{detail.level==1?'省':detail.level==2?'市':detail.level==3?'县':'区' }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="顺序号:">
						<span>{{ detail.sort }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="联系人:">
			  		<span>{{detail.linkman?detail.linkman:'无'}}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="联系电话:">
						<span>{{ detail.linkphone?detail.linkphone:'无' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="类别:">
						<span>{{detail.orgType==0?'机构':'小组' }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="备注:">
						<span>{{ detail.remark?detail.remark:'无' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="省:">
						<span>{{detail.province?detail.province:'无' }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="市:">
						<span>{{ detail.city?detail.city:'无' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="县/区:">
						<span>{{detail.district ?detail.district:'无'}}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="详细地址:">
						<span>{{ detail.address?detail.address:'无' }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="创建时间:">
						<span>{{detail.createTime}}</span>
					</el-form-item>
				</div></el-col>
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="更新时间:">
						<span>{{detail.updateTime}}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	export default {
		props:{
			detail:{
				type:Object,
			}
		}
	}
</script>

<style scoped>
/* 	.demo-table-expand{
		display: flex;
		flex-wrap: wrap;
	} */
</style>
