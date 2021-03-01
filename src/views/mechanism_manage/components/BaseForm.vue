<template>
  <div>
		<el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
		  <el-form-item label="机构代码" prop="orgCode">
		    <el-input type="text" v-model="form.orgCode"></el-input>
		  </el-form-item>
			<el-form-item label="机构名称" prop="orgName">
			  <el-input type="text" v-model="form.orgName"></el-input>
			</el-form-item>
			<el-form-item label="机构类型" prop="orgType">
			  <el-radio-group v-model="form.orgType">
					<el-radio :label="0">机构</el-radio>
					<el-radio :label="1">小组</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="级别" prop="level">
			  <el-radio-group v-model="form.level">
			  	<el-radio :label="0">省</el-radio>
			  	<el-radio :label="1">厅</el-radio>
			  	<el-radio :label="2">局</el-radio>
			  	<el-radio :label="3">处</el-radio>
			  	<el-radio :label="4">科</el-radio>
			  </el-radio-group>
			</el-form-item>
			<el-form-item label="所属机构" prop="parentCode">
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<el-input type="text" v-model="form.parentName"></el-input>
					</div></el-col>
				</el-row>
				<el-row>
				  <el-col :span="24"><div class="grid-content bg-purple-dark">
						<el-tree
							:data="orgList" 
							 accordion
							:props="defaultProps" 
							@node-click="handleNodeClick"></el-tree>
					</div></el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="省份">
			  <el-input type="text" v-model="form.province"></el-input>
			</el-form-item>
			<el-form-item label="城市">
			  <el-input type="text" v-model="form.city"></el-input>
			</el-form-item>
			<el-form-item label="区县" >
			  <el-input type="text" v-model="form.district"></el-input>
			</el-form-item>
			<el-form-item label="详细地址" >
			  <el-input type="text" v-model="form.address"></el-input>
			</el-form-item>
			<el-form-item label="联系人" >
			  <el-input type="text" v-model="form.linkman"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" >
			  <el-input type="text" v-model="form.linkphone"></el-input>
			</el-form-item>
			<el-form-item label="排序" >
			  <el-input type="text" v-model="form.sort"></el-input>
			</el-form-item>
			<el-form-item label="备注">
			  <el-input type="textarea" v-model="form.remark"></el-input>
			</el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit('form')">{{form.id?'更新':'创建'}}</el-button>
		    <el-button @click="resetForm('form')">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
	import BaseTable from '../../../components/BaseTable.vue';
	import UploadImg from '../../../components/BaseUploadImg.vue'
	import api from '../../../api/api.js'
	import {bus} from '../../../utils/bus.js'
  export default {
		components:{
			UploadImg,
			BaseTable
		},
    data() {
      return {
				orgList:[],
				defaultProps:{
					label:'orgName',
					children:'childrenOrg'
				},
				id:'',
				currentCourse:null,
				orgType:null,
        form: {
					id:null,
          orgCode: '',
					orgName:'',
					orgType:0,
					level:0,
					parentCode:0,
					parentName:'',
					province:'',
					city:'',
					district:'',
					address:'',
					linkman:'',
					linkphone:'',
					sort:'',
					remark:'',
        },
				rulesForm:{
					 orgCode: [{ required: true, message: '请输入机构代码', trigger: 'blur' }],
					 orgName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
					 level: [{ required: true, message: '请选择机构级别', trigger: 'blur' }],
					 parentCode: [{ required: true, message: '请选择所属机构', trigger: 'blur' }],
					 orgType: [{ required: true, message: '请选择机构类型', trigger: 'blur' }],
					 linkman: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
					 linkphone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
					 sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
				},
      }
    },
    methods: {
      onSubmit(formName) {
				 this.$refs[formName].validate((valid) => {
					if (valid) {
						let params = {
							id:this.form.id,
							orgCode:this.form.orgCode,
							orgName:this.form.orgName,
							orgType:this.form.orgType,
							level:this.form.level,
							parentCode:this.form.parentCode,
							parentName:this.form.parentName,
							province:this.form.province,
							city:this.form.city,
							district:this.form.district,
							address:this.form.address,
							linkman:this.form.linkman,
							linkphone:this.form.linkphone,
							sort:this.form.sort,
							remark:this.form.remark,
						}
						if(!this.form.id){
							api.addSysOrgAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'添加成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										message:res.msg,
										type:'warning'
									})
									return false
								}
							})
						}else{
							api.updateSysOrgAPI(params).then(res=>{
								if(res.code==0){
									this.$message({
										message:'更新成功',
										type:'success'
									})
									this.$router.go(-1)
								}else{
									this.$message({
										message:res.msg,
										type:'warning'
									})
								}
							})
						}
					} else {
						this.$message({
							message:'请填写完整的表单',
							type:'warning'
						})
						return false;
					}
				});
      },
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.$router.push('/menu/mechanismManage')
			},
			handleNodeClick(node) {
				// console.log(node);
				this.form.parentCode=node.orgCode
				this.form.parentName=node.orgName
			},
			getSysOrgTree(){
				api.getSysOrgTreeAPI().then(res=>{
					// console.log('tree',res);
					if(res.code==0){
						this.orgList=res.data
					}
				})
			},
    },
		created() {
			this.getSysOrgTree()
		},
		mounted() {
			if(this.$route.query.orgCode){
				api.querySysOrgDetailAPI({orgCode:this.$route.query.orgCode}).then(res=>{
					if(res.code==0){
						// console.log('详情',res);
						this.form.id=res.data.id
						this.form.orgCode=res.data.orgCode
						this.form.orgName=res.data.orgName
						this.form.orgType=parseInt(res.data.orgType)
						this.form.level=parseInt(res.data.level)
						this.form.parentCode=res.data.parentCode
						this.form.parentName=res.data.parentName
						this.form.province=res.data.province
						this.form.city=res.data.city
						this.form.district=res.data.district
						this.form.address=res.data.address
						this.form.linkman=res.data.linkman
						this.form.linkphone=res.data.linkphone
						this.form.sort=res.data.sort
						this.form.remark=res.data.remark
					}
				})
			}
		},
		destroyed() {
			
		}
  }
</script>