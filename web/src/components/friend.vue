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
						<span>{{user.nickname}}</span>
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
			    <img :src="user.avater" style="width: 35px;width: 35px;margin-left: -8px;"/>
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
		<div >
			<el-dialog title="好友申请列表" :visible.sync="dialogTableVisible"  class="list">
			     <el-card shadow="hover"  style="margin: 10px auto;" v-for="(item,index) in applyList" :key="index">
			         <div style="display: flex;flex-direction: row;">
						 <div><img :src="item.avater" style="width: 60px;height: 60px;"/></div>
						 <div style="width: 150px;"><span style="font-weight: 300;font-size: 20px;margin:20px ;">{{item.nickname}}</span></div>
						<div style="margin-left: 300px;margin-top: 10px;">
							<div v-if="item.status==0">
								 <el-button type="success" @click="accept(item.id,item.applyId)">接收</el-button>
								 <el-button type="danger" @click="reject(item.id)" >拒绝</el-button>
							 </div>
							 <div v-if="item.status==1">
							 	 <span style="color: #CCCCCC;font-weight: 300;font-size: 20px;">已接受</span>
							  </div>
							  <div v-if="item.status==-1">
							  	 <span style="color: #CCCCCC;font-weight: 300;font-size: 20px;">已经拒绝</span>
							  </div>
						</div>
					 </div>
			      </el-card>
			</el-dialog>
		</div>
		<div class="second">
			<div class="search">
				<a href="javascript:void(0)" @click="get">
				 <div class="apply"><div style="margin-top: 4px;">好友申请记录</div></div>
				 </a>
			</div>
			<div class="content_text">
				
		
			<div class="content" v-for="(item,index) in friendList":class="isactive==index?'bg':''" @click="getmessage(index,item.friendId,item.content)">
				<div>
					<img :src="item.avater" class="img">
				</div>
				<div class="text">
					<span class="name" v-if="item.content!=null">{{item.content}}</span>
					<span class="name" v-if="item.content==null">{{item.nickname}}</span>
				</div>
			</div>
			</div>
		</div>
		<div class="thrid">
			<div v-if="message">
				<img src="../../static/img/logo.png" class="logo">
			</div>
			<div v-if="!message">
				<div class="top">
					<div class="include">
						<span class="text">{{friend.nickname}}</span>
						<div v-if="friend.sex==0">
							<img src="../../static/img/boy.png" class="img">
						</div>
						<div v-if="friend.sex==1">
							<img src="../../static/img/gril.png" class="img">
						</div>
					</div>
					<div>
						<img :src="friend.avater"class="avater_img">
					</div>
				</div>
				<div class="friend_message">
					<ul>
						<li class="content"><span class="text">备  注</span>
							<span class="text1"v-if="content!=null">{{content}}</span>
							<span class="text1"v-if="content==null">{{friend.nickname}}</span>
						</li>
						<li class="content"><span class="text">地  区</span><span class="text1">{{friend.address}}</span></li>
						<li class="content"><span class="text">账  号</span><span class="text1">{{friend.number}}</span></li>
					</ul>
				</div>
			</div>
		</div>
				
   </div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				dialogTableVisible :false,
				isactive:-1,
				message:true,
				sex:0,
				input:"",
				activeIndex:'/friend',
				visible: false,
				friendList:[],
				user:'',
				friend:'',
				content:'',
				applyList:[],
			}
		},
		created(){
			this.getUser()
			this.getfriend()
		},
			
		methods:{
			get(){
				this.dialogTableVisible=true
				this.getApply()
			},
			//拒绝好友申请
			reject(id){
				axios.get('/imchat/apply/reject',{
					params:{
						id:id,
						status:-1
					}
				}).then(res=>{
					this.getApply()
				})
			},
			//接收好友申请
			accept(id,applyId){
				console.log(id,applyId)
				axios.get('/imchat/apply/accept',{
					params:{
						id:id,
						applyId:applyId,
						status:1
					}
				}).then(res=>{
					this.getApply()
				})
			},
				
			//获取好友申请记录
			getApply(){
				axios.get('/imchat/apply/getApply').then(res=>{
					this.applyList = res.data.data.list
					console.log(res.data.data.list)
				})
			},
			//获取好友记录
			getfriend(){
				this.$axios.get('/imchat/friend/findfriend').then(res=>{
					this.friendList=res.data.data.list
				})
			},
			//获取当前用户信息
			getUser(){
				axios.get("/imchat/user/getUser").then(res=>{
					this.user = res.data.data.user
				})
			},
			//获取点击的用户的信息
			getmessage(index,id,content){
				this.friend=""
				this.isactive=index
				this.content=content
				this.message=false
				axios.get("imchat/user/getFriend",{
					params:{
						id:id
					}
				}).then(res=>{
					this.friend=res.data.data.friend
				})
			},
			//展示信息
			show_message(){
			
				this.visible=!this.visible
			},
		}
	}
</script>

<style scoped>
	.list{
		height: 400px;
		overflow-y: scroll;
	}
	.apply{
		width: 200px;
		height: 30px;
		margin: 15px 17px;
		background-color:white;
		position: fixed;
	}
	.second .content:hover{
		background-color: #C0C0C0;
	}
	.bg{
		background-color: #ccc;
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
	.friend_message .text1{
		font-size: 15px;
		margin-top: 10px;
	}
	.friend_message .text{
		font-size: 15px;
		color: #999;
		margin-right: 40px;
	}
	.friend_message .content{
		margin-top: -20px;
	}
	.friend_message{
		margin-top: 25px;
		margin-left: 80px;
		border-bottom: 1px solid #ccc;
		width: 70%;
	}
	.top .avater_img{
		width: 60px;
		height: 60px;
		margin-bottom: 40px;
	}
	.include .img{
		width: 20px;
		height: 20px;
		margin-top: 23px;
	}
	.include .text{
		font-size: 30px;
		font-family: 微软雅黑;
	}
	.include{
		display: flex;
		flex-direction: row;
		width: 80%;
	}
.top{
	display:flex;
	flex-direction: row;
	margin-top:60px;
	margin-left:80px;
	margin-right: 80px;
	border-bottom: 1px solid #CCCCCC;
}
.logo{
	width: 100px;
	height: 100px;
	margin: 200px auto;
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
.second{
	width: 240px;
	height: 500px;
	background-color:#F0F0F0;
}
.search{
	height: 60px;
	background-color: #EEEBE8;
}

/deep/ .el-input__inner{
          height: 30px;
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
.name{
	font-family: Helvetica Neue;
	font-size: 16px;
	margin-bottom: 4px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 140px;
}
.message{
	color: #999999;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100px;
	margin-left: -30px;
}
.content_text{
	height: 440px;
	overflow-x: hidden;
	overflow-y: scroll;
}
::-webkit-scrollbar-thumb {
  border-radius: 2px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: #F0F0F0;
}
::-webkit-scrollbar {
  width: 0px;  
}
.thrid{
	width: 540px;
	height: 500px;
	background-color:#F5F5F5 ;
}
</style>