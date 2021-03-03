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
						<div v-if="sex==0">
							<img src="../../static/img/boy.png" class="img">
						</div>
						<div v-if="sex==1">
							<img src="../../static/img/gril.png" class="img">
						</div>
					</div>
					<div >
						<img src="../../static/img/1.jpg" style="width: 40px;height: 40px;margin-bottom: 10px;"/>
					</div>
				</div>
				<div class="address">
					<span style="color:#808080;margin-right: 20px;">地   区</span>
					<span>广东揭阳</span>
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
			    <img src="../../static/layui/images/face/16.gif"/>
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
			<div class="search">
				<el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search" class="inp"></el-input>
			</div>
		</div>
		<div class="thrid">
			<div class="top">
				<span class="text">全部收藏</span>
			</div>
			<div class="ct">
				<div class="content" v-for="count in 8">
					<div class="text"><span>https://waylau.com/essential-netty-in-act</span></div>
					<div class="time">
						<div class="day"><span>2020-22-10</span></div>
					</div>
				</div>
			</div>
		</div>
				
   </div>
</template>

<script>
	export default{
		data(){
			return{
				input:"",
				activeIndex:'/collect',
				visible: false,
				sex:0
			}
		},
		mounted(){
			
		},
		methods:{
		 show_message(){
		 	this.visible=!this.visible
		 },
		 
		}
	}
</script>

<style scoped>
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
.thrid .ct{
	height: 440px;
	overflow-x: hidden;
	overflow-y: scroll;
}
.time .day{
	font-size: 10px;
	color: #C9C5C5;
	margin-top: 12px;
}
.thrid .content .text{
	width: 82%;
	    white-space: nowrap;
		overflow:inherit;
}
.thrid .content{
	width: 70%;
	border-bottom: 1px solid #C0C4CC;
	margin: 10px auto;
	display: flex;
	flex-direction: row;

}
.top .text{
	margin-left: -360px;
	margin-top: 20px;
	font-weight: 700;
	font-size: 20px;
}
.thrid .top{
	height: 40px;
	width: 100%;
	background-color: #F5F5F5;
	border-bottom: 1px solid #CCCCCC;
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
.inp{
	width: 180px;
	height: 30px;
	margin-top: 15px;
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
