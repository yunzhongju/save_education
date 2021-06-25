<template>
	<div>
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<el-upload 
						class="upload-demo" 
						drag 
						:action="domain" 
						:file-list="fileList" 
						:before-upload="beforUpload" 
						:data="qn" 
						:limit="1" 
						:on-success="handleSuccess" 
						 multiple>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">
							将文件拖到此处，或
							<em>点击上传</em>
						</div>
						<!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div> -->
					</el-upload>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-light showimg" v-show="img_url || url">
					<img 
						style="height: 180px; width: 360px;" 
						:src="img_url || url">
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	import api from '../api/api.js'
export default {
	components:{
	},
	props:{
		url:{
			type:String,
			default:()=>''
		},
		size:{
			type:Number,
			default:()=>5
		},
		limit:{
			type:Number,
			default:()=>1
		}
	},
	data() {
		return {
			domain: 'http://upload-z2.qiniup.com',
			fileList:[],
			qn: {
				key: '',
				token: ''
			},
			qiniuaddr: 'https://education.quweiquwei.com/',
			img_url: null
		};
	},
	methods: {

		handleSuccess(res, file, filelist) {
			this.img_url = this.qiniuaddr + res.key;
			// console.log('imgurl', this.img_url);
			this.$emit('getImgUrl', this.img_url);
		},
		beforUpload(file) {
			let type = file.type
			let size = file.size/1024/1024
			if(type!='image/jpeg'&&type!='image/png'){
				this.$message({
					message:'只能上传jpg/png文件',
					type:'warning'
				})
				return false
			}else if(size>this.size){
				this.$message({
					message:`上传的图片的大小不能超过${this.size}M`,
					type:'warning'
				})
				return false
			}
			var timestamp = new Date().getTime();
			if(type==='image/jpeg'||type==='image/png'){
				this.qn.key = `${timestamp}/${file.name}`;
			}else{
				this.qn.key = `${timestamp}.mp4`;
			}
		},
		getSimpleUpToken(){
			api.getSimpleUpTokenAPI().then(res=>{
				// // console.log('token',res);
				if(res.code==0){
					this.qn.token=res.data
				}
			})
		}
	},
	created() {
		this.getSimpleUpToken()
		// this.img_url=this.url?this.url:''
		// // console.log(1111111,this);
	},
	mounted() {
		
	},
	beforeDestroy() {
		// this.img_url=''
	}
};
</script>

<style lang="less" scoped>
.showimg {
	padding-left: 20px;
}
</style>
