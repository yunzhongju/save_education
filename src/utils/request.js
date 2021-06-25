import axios from 'axios'
import {
	Message
} from 'element-ui';
import router from '../router'

// 默认超时设置
axios.defaults.timeout = 50000;


if(process.env.NODE_ENV==='development'){
	// 相对路径设置
	axios.defaults.baseURL = '/test';
	// axios.defaults.baseURL = '/api';
}else{
	// alert("生产环境");
	axios.defaults.baseURL = '/api';
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export default function post(url, data, type = 0) {
	const token = JSON.parse(localStorage.getItem('user_info')) ? JSON.parse(localStorage.getItem('user_info')).sessionId :
		''
	return new Promise((resolve, reject) => {
		axios({
			url: url,
			method: 'post',
			params: type === 0 ? data : {},
			data: type === 1 ? data : {},
			headers: {
				'Content-Type': 'application/json',
				'token': token,
			}
		}).then(res => {
				// // console.log('post', res);
				if(res.data.code==401){
					localStorage.removeItem('user_info')
					router.push('/login')
				}
				if(res.data.code==404){
					router.push('/404.html')
				}
				if(res.data.code==500){
					Message({
						type: 'error',
						message: res.data.msg
					})
				}
				if (res.data.code == 0) {
					resolve(res.data)
				} else {
					Message({
						type: 'error',
						message: res.data.msg
					})
				}
			},
			err => {
				reject(err);
				let message = '请求失败！请检查网络';
				if (err.res) message = err.res.data.message;
				Message(message)
			})
	})

}
