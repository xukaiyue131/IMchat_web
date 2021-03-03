<template>
	<div class="contain">
	
		<div class="layui-tab layui-tab-card " >
		  <ul class="layui-tab-title">
		    <li class="layui-this" style="width: 271px;">登录</li>
		    <li style="width: 271px;">注册</li>
		  </ul>
		    <div class="layui-tab-content">
		      <div class="layui-tab-item layui-show distance">
				<div class="login">
					<div class="layui-form-item">
					    <label class="layui-form-label">账号</label>
					    <div class="layui-input-block">
					      <input type="text" name="title" v-model="email" required  lay-verify="required" placeholder="请输入邮箱号" autocomplete="off" class="layui-input">
					    </div>
					</div>
					 <div class="layui-form-item ">
					    <label class="layui-form-label">密码</label>
					    <div class="layui-input-block">
					      <input type="password" name="password" v-model="password" required lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
					    </div>
					  </div>
					   <div class="layui-form-item">
					      <div class="layui-input-block">
					        <button class="layui-btn" lay-submit @click="handlerLogin" lay-filter="formDemo" style="width: 200px;">登录</button>
					      </div>
					    </div>
							   <Vcode
							       :show="isShow"
							        @success="login"
							        @close="close"
							        :canvasWidth="300"
							        :canvasHeight="200"
							        />
				</div>
			  </div>
		      <div class="layui-tab-item distance">
				<el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm">
				 <el-form-item label="昵称" prop="nickname">
				    <el-input v-model="user.nickname"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password" >
				    <el-input v-model="user.password" type="password"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="password">
				    <el-input v-model="again_psw" @blur="equals()" type="password"></el-input>
				  </el-form-item>
				  <el-form-item label="头像" >
					<el-upload
					 :action="upload"
					  list-type="picture-card"
					  multiple 
					  :limit="1"
					  :on-success="image_success"
					  
					  >
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="user.avater" alt="">
					</el-dialog>
				  </el-form-item>
				  <el-form-item label="地址" prop="adress">
				    <el-select v-model="user.address" placeholder="请选择你的地址">
				      <el-option label="区域一" value="shanghai"></el-option>
				      <el-option label="区域二" value="beijing"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="性别" prop="sex">
				    <el-radio-group v-model="user.sex">
				      <el-radio label="0">男</el-radio>
				      <el-radio label="1">女</el-radio>
				    </el-radio-group>
				  </el-form-item>
				    <el-form-item
				      prop="email"
				      label="邮箱"
				      :rules="[
				        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
				        { type: 'email', message: '请输入正确的邮箱地址', trigger:  'blur'  }
				      ]"
				    >
				      <el-input v-model="user.email" ></el-input>
				    </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('user')">注册</el-button>
				    <el-button @click="resetForm('user')">重置</el-button>
				  </el-form-item>
				</el-form>
			  </div>
		      
		    </div>
		</div>		
		 
	</div>
	
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations } from '../store/index.js';
import Vcode from "vue-puzzle-vcode";
export default {
  data () {
    return {
			showmessage:'',
			loading:false,
			isShow: false,
			upload:axios.defaults.baseURL+'/imchat/user/image',
			dialogImageUrl:'',
		  dialogVisible: false,
		  user:{},
		  again_psw:'',
		  check:'',
		  password:'',
		  email:'',
		 user:{},
		  rules: {
		   nickname: [
		               { required: true, message: '请填写昵称', trigger: 'blur' }
		             ], 
					url: [
					            { required: true, message: '请上传图片', trigger: 'blur' }
					          ], 
				 password: [
										 { required: true, message: '请填写密码', trigger: 'blur' }
									 ],
				address: [
										{ required: true, message: '请选择您的住址', trigger: 'blur' }
									],
				address: [
										{ required: true, message: '请选择您的性别', trigger: 'blur' }
									]
								 }
				}
  },
   components: {
              Vcode
          },
  created(){
	  layui.use('element',function(){
			var elemnet = layui.element
	  })
	layui.use('form',function(){
				var form = layui.form
	})
	console.log(this.$route.params.id)
	if(this.$route.params.id==203){
		this.$message({
		          message: '已经在其他地方登录，请重新登录',
		          type: 'warning'
		});
	}
  },
  methods:{
	 changeLogin(){
		 this.$store.commit('changeLogin')
	 },
	  image_success(response){
		  this.user.avater=response.data.url
	  },
	  login(){
		  this.loading=true
		  var that =this
		 let data = JSON.stringify({
			 email:this.email,
			 password:this.password
		 })
		  axios.get('/imchat/user/login',{
			  params:{
				  password:this.password,
				  email:this.email
			  }
		  }).then(res=>{
			  if(res.data.code=="20001"){
				  this.$message({
				            message: '用户名或者密码错误',
				            type: 'warning'
				  });
				  
			  }else{
				  //存入token
				  if(res.data.code=="20000"){
					localStorage.setItem('Authorization',res.data.data.token)
					 this.$router.push("/chat")
				  }
				  
			  }
			  
		  })
		  this.loading=false
		  this.isShow=false
	  },
	  handlerLogin(){
		  this.isShow=true
	  },
	  submitForm(formName) {
	             this.$refs[formName].validate((valid) => {
	               if (valid) {
						let data = JSON.stringify(this.user)
					axios.post('/imchat/user/register',data,{
							headers: {
							         "Content-Type": "application/json;charset=utf-8"  //头部信息
							          }
						}).then(res=>{
							this.$message({
							          message: '恭喜你，注册成功',
							          type: 'success'
							 });
							 location.reload()
						})
	                 
	               } else {
	               
	                 return false;
	               }
	             });
	           },
	           resetForm(formName) {
	             this.$refs[formName].resetFields();
	           },
	  equals(){
		if(this.user.password!=this.again_psw){
			 this.$message.error('错了哦，前后密码不一致');
			 this.again_psw=''
		}
	  },
	  close(){
		  this.isShow=false
	  }
	  
  }
}
</script>

<style scoped>
	.img_avater{
		margin-left: 100px;
	}
.contain{
	margin:20px auto;
	width: 600px;
	height: 400px;

}
.distance{
	margin-left: -20px;
	
}
.mail{
	display: flex;
	flex-direction: row;
}

</style>
