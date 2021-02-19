<template>
	<div v-if="detail">
		<el-form label-position="left" class="demo-table-expand">
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="图书名称:">
						<span>{{ detail.bookName }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="作者:">
						<span>{{ detail.autor }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  <el-col :span="12"><div class="grid-content bg-purple">
			  	<el-form-item label="图书编码:">
			  		<span>{{detail.bookCode }}</span>
			  	</el-form-item>
			  </div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="图书分类:">
						<span>{{ detail.bookTypeName }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="更新时间:">
						<span>{{detail.updateTime }}</span>
					</el-form-item>
				</div></el-col>
			  <el-col :span="12"><div class="grid-content bg-purple">
					<el-form-item label="创建时间:">
						<span>{{ detail.createTime }}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="图书封面:">
						<img :src="detail.cover" alt="无" style="width: 100px; height: 50px;">
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="描述:">
						<span>{{detail.introduction}}</span>
					</el-form-item>
				</div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple">
					<el-form-item label="文件链接:">
						<a :href="detail.introduction">{{detail.bookUrl}}</a>
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
