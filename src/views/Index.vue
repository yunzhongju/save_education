<template>
	<el-container>
		<el-header>
			<the-heading></the-heading>
		</el-header>
		<el-container>
			<el-aside>
				<the-sidebar></the-sidebar>
			</el-aside>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import TheHeading from '../components/TheHeading.vue';
import theSidebar from '../components/TheSidebar.vue';
export default {
	components: {
		TheHeading,
		theSidebar
	}
};
</script>

<style>
.el-header,
.el-footer {
	background-color: #409eff;
	color: rgba(255, 255, 255, 100);
	font-size: 20px;
	line-height: 60px;
}

.el-aside {
	/* background-color: #d3dce6; */
	color: #333;
	/* text-align: center; */
	/* line-height: 200px; */
	width: 200px !important;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	/* text-align: center; */
	/* line-height: 837px; */
	/* height: 900px; */
	padding: 10px !important;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
