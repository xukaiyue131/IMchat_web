<template>

	<div class="contain">
		<div class="frist">
			<div style="position: absolute;left:410px;top:80px">
			<el-popover
			    placement="bottom"
			    width="220"
			    trigger="manual"
			    v-model="visible"
				style="margin: 30px;">
				<div class="user">
					<div style="display: flex;flex-direction: row;width: 80%;">
						<span>昵称</span>
						<div v-if="user.sex==0">
							<img src="../../static/img/boy.png" class="img">
						</div>
						<div v-if="user.sex==1">
							<img src="../../static/img/gril.png" class="img">
						</div>
					</div>
					<div >
						<img :src="user.avater" style="width: 40px;height: 40px;margin-bottom: 10px;"/>
					</div>
				</div>
				<div class="address">
					<span style="color:#808080;margin-right: 20px;">地   区</span>
					<span>{{user.address}}</span>
				</div>
			  </el-popover>
			 </div> 
			<el-menu :default-active="activeIndex" router class="el-menu-vertical-demo"
			 style="height: 500px;background-color: #282B2D;margin-left:-10px"
				text-color="#fff"
			  active-text-color="#ffd04b"
			   background-color="#282B2D"
			>
			 <el-menu-item  @click="show_message">
			    <img :src="user.avater"  style="width: 35px;width: 35px;margin-left: -8px;"/>
			  </el-menu-item>
			  <el-menu-item index="/chat">
			   <i class="el-icon-chat-dot-round"></i>
			  </el-menu-item>
			  <el-menu-item index="/friend" >
			    <i class="el-icon-s-custom"></i>
			  </el-menu-item>
			  <el-menu-item index="/collect">
			    <i class="el-icon-collection"></i>
			  </el-menu-item>
			  <el-menu-item index="/Set">
			    <i class="el-icon-s-tools"></i>
			  </el-menu-item>
			</el-menu>
		</div>
		<div class="second">
			<div style="margin:20px auto;width: 60%;">
			<el-form  label-width="100px" class="demo-ruleForm">
			 <el-form-item label="昵称" prop="nickname">
			    <el-input v-model="user.nickname"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			    <el-input v-model="user.password" type="password"></el-input>
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
				  <img width="100%" :src="user.avater" >
				</el-dialog>
			  </el-form-item>
			  <el-form-item label="地址" prop="adress">
				  <el-input v-model="user.address"></el-input>
			  </el-form-item>
			 
			    <el-form-item
			      prop="email"
			      label="邮箱"
			    >
			      <el-input v-model="user.email" ></el-input>
			    </el-form-item>
			  <el-form-item>
			    <el-button type="success" @click="submitForm()">确定修改</el-button>
			  </el-form-item>
			</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				user:"",
				sex:0,
				activeIndex:'/Set',
				visible:false,
				upload:axios.defaults.baseURL+'/imchat/user/image',
				dialogVisible: false,
			}
		},
		created(){
			this.getMessage()
		},
		methods:{
			show_message(){
				this.visible=!this.visible
			},
			image_success(response){
				 this.user.avater=response.data.url
			},
			// 提交更改用户的信息
			submitForm(){
				let data = JSON.stringify(this.user)
				console.log(data)
				axios.post('/imchat/user/update',data).then(res=>{
					this.$message({
					          message: '修改成功',
					          type: 'success'
					 });
				})
			},
			//获取用户信息
			getMessage(){
				axios.get('/imchat/user/getUser').then(res=>{
					this.user = res.data.data.user
				})
			}
				
		}
			
	}
</script>

<style scoped>
	.second{
		height: 500px;
		width: 780px;
		background-color: #F0F0F0;
	}
	.address{
			display: flex;
			flex-direction: row;
			margin: 20px 20px;
		}
	.user .img{
		width: 15px;
		height: 15px;
		margin-top: 1px;
	}
	.user{
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #CCCCCC;
		margin-top: 10px;
	}
	.top .text{
		margin-left: -360px;
		margin-top: 20px;
		font-weight: 700;
		font-size: 20px;
	}
	.nickname{
		font-size: 30px;
		font-family: 微软雅黑;
		margin-top: 20px;
	}
	.contain{
		margin:40px auto;
		width: 800px;
		height: 500px;
		display: flex;
		flex-direction: row;
	}
	.img{
		width: 30px;
		height: 30px;
		margin-left: -10px;
	}
	.frist{
		width: 50px;
		height: 500px;
	}
	.search{
		height: 60px;
		background-color: #EEEBE8;
		
	}
	.inp{
		width: 180px;
		height: 30px;
		margin-top: 15px;
	}
	.content{
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		overflow-x:hidden ;
	}
	.img{
		width: 40px;
		height: 40px;
		margin:10px 10px ;
	}
	.text{
		display: flex;
		flex-direction: column;
		margin: 10px 0px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	::-webkit-scrollbar-thumb {
	  border-radius: 2px;
	  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
	  background: #F0F0F0;
	}
	::-webkit-scrollbar {
	  width: 0px;  
	}
</style>
