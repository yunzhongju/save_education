<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
			<el-form-item label="视频封面" prop="coverimg">
				<upload-img></upload-img>
			</el-form-item>
		  <el-form-item label="视频标题" prop="title">
		    <el-input type="text" v-model="form.title"></el-input>
		  </el-form-item>
			<el-form-item label="来源" prop="source">
			  <el-input type="text" v-model="form.source"></el-input>
			</el-form-item>
			<el-form-item label="区域" prop="region">
			  <el-input type="text" v-model="form.region"></el-input>
			</el-form-item>
			<el-form-item label="栏目" prop="type">
			  <el-input type="text" v-model="form.type"></el-input>
			  <div>
			  	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			  </div>
			</el-form-item>
			<el-form-item label="视频详情" prop="content">  
				<upload-img></upload-img>
			</el-form-item>
			<el-form-item label="视频链接" prop="link">
			  <el-input type="text" v-model="form.link"></el-input>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import UploadFile from '../../../components/BaseUploadFile.vue'
	import BaseEditor from '../../../components/ckeditor/ckeditor.vue'
  export default {
		components:{
			BaseEditor,
			UploadImg,
			UploadFile,
		},
    data() {
      return {
				data:[
					{
						label: '编程基础',
						 children: [{
							label: '前端',
						}]
					},
					{
						label: '物理',
						 children: [{
							label: '二级 1-1',
							children: [{
								label: '三级 1-1-1'
							}]
						}]
					}
				],
				defaultProps: {
						children: 'children',
						label: 'label'
					},
        form: {
          title: '',
          type: '',
					source:'',
					region:'',
					coverimg:'',
					content:'',
					link:''
        },
				rulesForm:{
					 title: [{ required: true, message: '请输入文章标题', trigger: 'change' }],
					 type: [{ required: true, message: '请选择文章栏目', trigger: 'change' }],
					 source: [{ required: true, message: '请输入文章来源', trigger: 'change' }],
					 content: [{ required: true, message: '请输入文章内容', trigger: 'change' }],
					 coverimg: [{ required: true, message: '请上传文章封面', trigger: 'change' }],
					 region: [{ required: true, message: '请输入区域', trigger: 'change' }],
					 link: [{ required: true, message: '请输入视频链接', trigger: 'change' }],
				},
      }
    },
    methods: {
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						// // console.log('error submit!!');
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getPageSize(val){},
			getCurrentPage(val){},
			handleSelectionChange(){},
			handleEdit(index,row){
				// // console.log(index,row);
				this.form.exam=row.name
			},
			handleNodeClick(data) {
				this.form.type=data.label
				// // console.log(data);
			},
			getContent(val){
				// // console.log(val);
			}
    }
  }
</script>