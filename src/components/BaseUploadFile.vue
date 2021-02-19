<template>
	<div>
		<el-upload
		  :action="domain" 
		  :before-upload="beforUpload" 
		  :data="qn" 
		  :on-success="handleSuccess" >
		  <el-button size="small" type="primary">点击上传</el-button>
		</el-upload>
	</div>
</template>

<script>
	import api from '../api/api.js'
export default {
	props:{
		url:{
			type:String,
			default:()=>''
		},
		type:{
			type:Number,
			default:()=>0
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
			qiniuaddr: 'http://education.quweiquwei.com/',
			img_url: ''
		};
	},
	methods: {
		handleSuccess(res, file, filelist) {
			this.img_url = this.qiniuaddr + res.key;
			let obj={
				filePath:this.qiniuaddr+file.response.key,
				fileName:file.name
			}
			// console.log('imgurl', file);
			this.$emit('getfileUrl', this.img_url);
			this.$emit('getfileobj',obj);
			
		},
		beforUpload(file) {
			var timestamp = new Date().getTime();
			this.qn.key = `${timestamp}/${file.name}`;
		},
		getSimpleUpToken(){
			api.getSimpleUpTokenAPI().then(res=>{
				// console.log('token',res);
				if(res.code==0){
					this.qn.token=res.data
				}
			})
		}
	},
	created() {
		this.getSimpleUpToken()
		this.img_url=this.url?this.url:''
	}
};
</script>

<style>
</style>
