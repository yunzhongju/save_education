<template>
	<div>
		<el-row>
		  <el-col :span="24">
				<div class="grid-content bg-purple-dark">
					<slot></slot>
				</div>
			</el-col>
		</el-row>
		<el-row v-if="showFoot">
		  <el-col :span="24">
				<div class="grid-content bg-purple-dark marg-top20">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="1"
						:page-sizes="[10, 20, 30, 40]"
						:page-size="10"
						layout="total, prev, pager, next, jumper"
						:total="total">
					</el-pagination>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
  export default {
		props:{
			total:{
				type:Number,
				default:()=>100
			},
			showFoot:{
				type:Boolean,
				default:()=>true
			}
		},
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
				this.$emit('getPageSize',val)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
				this.$emit('getCurrentPage',val)
      }
    },
    data() {
      return {
      };
    }
  }
</script>

<style lang="less" scoped>

</style>
