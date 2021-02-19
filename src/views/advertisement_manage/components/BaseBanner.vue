<template>
	<ul>
		<li 
			v-if="list.length!==0"
			:class="{'roll-in-left':1==1,'bounce-out-left':active==item.id}"
			v-for="(item,index) in list"
			@mousemove="isShow=index" 
			@mouseleave="isShow=''">
			<div >
				<!-- <img :src="item.imagePath" alt=""> -->
				<el-image
						:src="item.imagePath"
						class="show-img">
				</el-image>
				<span v-show="isShow===index" class="show-motai">
					<i class="el-icon-edit" @click="handleEdit(item.id)"></i>
					<i class="el-icon-zoom-in" @click="handlePreview(item.imagePath)"></i>
					<i class="el-icon-delete" @click="handleDelete(item.id)"></i>
				</span>
			</div>
			<p><span class="title">{{item.title}}</span></p>
		</li>
		<li><slot></slot></li>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="img_url" alt="">
		</el-dialog>
	</ul>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:[]
			}
		},
		data(){
			return {
				dialogVisible:false,
				msg:'',
				isShow:'',
				img_url:'',
				active:''
			}
		},
		methods:{
			handlePreview(url){
				this.dialogVisible=true
				this.img_url=url
			},
			handleEdit(id){
				this.$emit('edit',id)
			},
			handleDelete(id){
				this.$confirm('此操作将删除该banner, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					this.active=id
					setTimeout(()=>{
						this.$emit('delete',id)
					},1000)
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	ul{
		display: flex;
		flex-wrap: wrap;
		li{
			margin-right: 10px;
			border-radius: 10px;
			margin-top: 30px;
			padding: 5px 5px;
			width: 240px;
			// height: 160px;
			border-radius: 10px;
			div{
				position: relative;
				height: 140px;
				border-top-right-radius: 5px;
				border-top-left-radius: 5px;
				.show-img{
					width: 100%;
					height: 100%;
					border-top-right-radius: 5px;
					border-top-left-radius: 5px;
				}
				}
				p{
					border-bottom-right-radius: 5px;
					border-bottom-left-radius: 5px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					padding: 5px 5px;
					height: 40px;
					opacity: 0.8;
					background-color: rgba(8, 8, 8, 1);
					text-align: left;
					border: 1px solid rgba(255, 255, 255, 0);
					.title{
						color: rgba(255, 255, 255, 1);
						font-size: 14px;
						text-align: left;
						font-family: SourceHanSansSC-regular;
						
					}
				}
				.show-motai{
					border-top-right-radius: 10px;
					border-top-left-radius: 10px;
					position: absolute;
					left: 0;
					top: 0;
					// width: 250px;
					width: 100%;
					height: 140px;
					z-index: 10;
					background-color: black;
					opacity: 0.65;
					display: flex;
					justify-content: space-around;
					align-items: center;
					i{
						font-size: 24px;
						color: white;
						cursor: pointer;
						font-weight: 500;
						// margin-left: 15px;
					}
				}
			}
		}
</style>
