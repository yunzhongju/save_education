<template>
	<div class="contain">
		<div class="login">
			<h1>安全教育云平台</h1>
			<div>
				<el-form :model="form" :rules="rules" ref="form">
					<el-form-item label="" prop="username">
						<el-input 
							placeholder="请输入账号" 
							v-model="form.username" 
							clearable 
							prefix-icon="el-icon-user-solid"></el-input>
					</el-form-item>
					<el-form-item label="" prop="password">
						<el-input 
							placeholder="请输入密码" 
							clearable 
							v-model="form.password" 
							show-password 
							prefix-icon="el-icon-lock"></el-input>
					</el-form-item>
					<el-form-item label="" prop="code">
						<el-row :gutter="30">
							<el-col :span="12">
								<div class="grid-content bg-purple">
									<el-input 
										placeholder="请输入验证码" 
										@keyup.enter.native="submitForm('form')"
										v-model="form.code" clearable></el-input>
								</div>
							</el-col>
							<el-col :span="10">
								<div class="grid-content bg-purple show-code" 
								@click="handleVerifyCode">
									<img :src="'data:image/jpg;base64,' + verifyCodeIO" alt="" /></div>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item label="">
						<el-button 
						type="primary" 
						style="width: 100%;" 
						@click="submitForm('form')">登陆</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../api/api.js';
export default {
	data() {
		return {
			verifyCodeIO: '',
			verifyCodeId: '',
			form: {
				username: '',
				password: '',
				code: ''
			},
			rules: {
				username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = {
						'account': this.form.username,
						'passWord': this.form.password,
						'verifyCodeId': this.verifyCodeId,
						'verifyCode': this.form.code
					};
					api.loginAPI(params).then(res => {
						if (res.code === 0) {
							localStorage.setItem('user_info',JSON.stringify(res.data))
							this.$message({
								type: 'success',
								message: '登陆成功'
							});
							this.$router.push('home');
						} else {
							this.$message({
								type: 'warning',
								message: res.msg
							});
							this._getVerificationCode();
						}
					});
				} else {
					return false;
				}
			});
		},
		handleVerifyCode() {
			this._getVerificationCode();
		},
		_getVerificationCode() {
			api.getVerificationCodeAPI().then(res => {
				if (res.code === 0) {
					this.verifyCodeIO = res.data.verifyCodeIO;
					this.verifyCodeId = res.data.verifyCodeId;
				} else {
					this.$message({
						type: 'error',
						message: res.msg
					});
				}
			});
		}
	},
	created() {
		this._getVerificationCode();
	}
};
</script>

<style lang="less" scoped>
.contain {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background: url(../../assets/images/loginbg.png);
	background-size: 100% 100%;
}
.login {
	width: 30%;
	background-color: white;
	padding: 50px 20px;
	margin-right: 8%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 20px;
}

h1 {
	color: #409eff;
	font-size: 48px;
	margin-bottom: 20px;
}

.show-code {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	border-radius: 5px;
	img {
		width: 200px;
		height: 40px;
		border-radius: 5px;
	}
}
</style>
