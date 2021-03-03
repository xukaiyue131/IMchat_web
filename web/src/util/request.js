import axios from 'axios';
import router from '../router/index.js'

axios.interceptors.request.use(
    config => {
    	//请求成功时，对请求作拦截处理
    	if (localStorage.getItem('Authorization')) {
      		config.headers.Authorization = localStorage.getItem('Authorization');
    		console.log("拦截请求，添加token")
    	}else{
    		console.log('拦截请求,没有token')
    	}
        return config;
    },
    error => {//请求失败时
        console.log(error);
        return Promise.reject();
    }
);

axios.interceptors.response.use(
    response => {
        if (response.data.code ===200 ) {
			console.log(response)
           return response.data;
		   }else{
				console.log(response)
			   if(response.status==202){
				     localStorage.removeItem('Authorization');
					 //直接跳转到登录页面
				  router.push({
				        path: "/login"
				      });
			   }else if(response.status==201){
				   localStorage.setItem('Authorization',response.headers.new_token)
			   }else if(response.status==203){
				 
					router.push({
					      path: "/login",
						  params:{
						        id:203
						      }
					    });
			   }
			   return response
		   }
		   
     
    },
    error => {
        // console.log(error);
        return Promise.reject();
    }
);
