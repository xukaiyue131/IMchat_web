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
			 <el-menu-item @click="show_message">
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
		<!-- 添加好友 -->
		<div>
			<el-dialog title="添加好友" :visible.sync="diaglogfriend">
			  <div>
				  <div>
					  <el-input placeholder="请输入邮箱号或者账号"  style="width: 400px;height: 40px;" v-model="search"></el-input>
					  <el-button style="margin-left: 30px;" @click="add">搜索</el-button>
				  </div>
				  <div>
					  <el-card shadow="hover"  style="margin: 10px auto;" v-if="addFriend!=null&&addFriend!=''">
					      <div style="display: flex;flex-direction: row;">
					  		 <div><img :src="addFriend.avater" style="width: 60px;height: 60px;"/></div>
							 <div><span style="font-weight: 300;font-size: 20px;margin:20px ;">{{addFriend.nickname}}</span></div>
					  		 <div style="margin-left: 320px;margin-top: 10px;">
								 <span v-if="status!=null&&status!=''" style="font-weight: 300;font-size: 20px;margin:20px ;color: #CCCCCC;">已经是好友了</span>
								 <el-button type="success" v-else  @click="add_friend">添加为好友</el-button>
					  		</div>
					  	 </div>
					  </el-card>
				  </div>
			  </div>
			</el-dialog>
		</div>
		<!-- 添加群聊 -->
		<div>
			<el-dialog title="添加群聊" :visible.sync="diagloggroup">
				<div style="height: 400px;overflow-y: scroll;">
			     <el-table
			        ref="multipleTable"
			        :data="list"
			        tooltip-effect="dark"
			        style="width: 65%;margin: auto;overflow-y: scroll;"
			        @selection-change="handleSelectionChange">
			        <el-table-column
			          type="selection"
			          width="100">
			        </el-table-column>
			        <el-table-column
					  prop=""
			          label="头像"
			          width="240">
					 <template slot-scope="scope">
					         <img :src="scope.row.avater" alt="" width="40px" height="40px">
					  </template>
			        </el-table-column>
			        <el-table-column
			          prop="content"
			          label="备注"
			          width="120">
			        </el-table-column>
			        
			      </el-table>
				  <div style="display: flex;flex-direction: column;">
				  <el-input placeholder="请输入群聊昵称" @blur="group_nickname" v-model="user_group" style="width: 40%;margin: 10px auto;"></el-input>
				  <el-button type="success" style="margin: 10px auto;width: 20%;" :disabled="group_name" @click="addGroup">确认</el-button>
				 </div>
			 </div>
			</el-dialog>
		</div>
		<!--好友管理 -->
		<div>
			<el-dialog title="好友管理" :visible.sync="diaglogdelete">
				<div style="height: 400px;overflow-y: scroll;">
			     <el-table
			         :data="list"
					  @selection-change="SelectionChange"
			         style="width: 100%">
			         <el-table-column type="expand">
			           <template slot-scope="props">
			             <el-form label-position="left" inline class="demo-table-expand">
			               <el-form-item label="用户头像">
			                 <div><img :src="props.row.avater" style="width: 20px;height: 20px;" class="distance"/></div>
			               </el-form-item>
			               <el-form-item label="好友账号">
			                 <span class="distance">{{ props.row.number }}</span>
			               </el-form-item>
			               <el-form-item label="备注(可编辑)">
			                 <span style="margin-left: 38px;"><el-input style="width: 140px;"v-model="props.row.content">{{props.row.content}}</el-input></span>
			               </el-form-item>
			              
			             </el-form>
			           </template>
			         </el-table-column>
					 <el-table-column
					   type="selection"
					   width="100">
					 </el-table-column>
			         <el-table-column
			           label="头像"
			           prop="">
					  <template slot-scope="scope">
					          <img :src="scope.row.avater" alt="" width="40px" height="40px">
					   </template>
			         </el-table-column>
			         <el-table-column
			           label="备注"
			           prop="content">
			         </el-table-column>
			         <el-table-column
			           label="昵称"
			           prop="nickname">
			         </el-table-column>
			       </el-table>
				  <el-button type="danger" style="margin-top: 20px;">删除</el-button>
				  <el-button type="success" style="margin-top: 20px;">确定修改</el-button>
			 </div>
			</el-dialog>
		</div>
		<!-- 视频通话界面显示 -->
		<div class="video">
			<el-dialog
			  title="视频通话"
			  :visible.sync="videoShow"
			  width="22%"
			  :modal-append-to-body="false"
			  :modal="false"
			  :close-on-click-modal="false"
			  v-dialogDrag 
			 >
			 <video id="localVideo" autoplay style="width: 100%;height: 100%;"></video>
			 <video id="remoteVideo" autoplay style="width: 100%;height: 100%;"></video>
			 <el-button  type="danger" round @click="stop">挂断</el-button>
			</el-dialog>
		</div>
		<div class="second" >
			<div class="search">
				<el-input v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search" class="inp"></el-input>
				<el-dropdown>
				  <span class="el-dropdown-link">
				    <i class="el-icon-circle-plus-outline" ></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item @click.native="diaglogfriend=true">添加好友</el-dropdown-item>
				    <el-dropdown-item @click.native="getfriendMessage">添加群聊</el-dropdown-item>
					<el-dropdown-item @click.native="ManageFriendTest">好友管理</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="content_text">
				
		
			<div class="content" :class="isactive==index?'bg':''"v-for="(item,index) in friendList" @click="chat(item.friendId,item.nickname,item.avater,item.content,index,item.number)">
				<div>
					<img :src="item.avater" class="img">
					<div id="badge" v-if="item.sum>0" >{{item.sum}}</div>
				</div>
				<div class="text">
					<span class="name" v-if="item.content!=null">{{item.content}}</span>
					<span class="name" v-if="item.content==null">{{item.nickname}}</span>
					<span class="message">131</span>
				</div>
			</div>
			</div>
		</div>
		<div class="thrid" v-if="!show" style="background-color: #EEEBE8;">
			<img src="../../static/img/logo.png" style="width: 40px;height: 40px;margin-top: 200px;"/>
			<div id="middle"></div>
		</div>
		<div class="thrid" v-if="show">
			
			<div class="top">
				<span class="nickname" v-model="friendName">{{friendName}}<label v-if="number>0"style="margin-left: 10px;">{{number}}</label></span>
			</div>
			<div class="middle" id="middle">
				<div v-for=" item in my_message">
					
					<div class="left" v-if="item.userId==id&&item.send==null">
						<div><img :src="friend_avater" class="avater" /></div>
					   <div class="message2" v-html="item.content">{{item.content}}</div>
					</div>	
					<div class="right" v-else>
						<div><img :src="user.avater" class="right_avater" /></div>
						<div class="message1" style="white-space:pre-line" v-html="item.content" >{{item.content}}</div>
					</div>
				</div>
							
			</div>
			<div class="end">
				<div style="position: absolute;top:200px;left: 600px;">
					
					<el-popover
					    width="300"
					    trigger="manual"
					    v-model="mail"
						>
						<div style="word-break: break-all;width: 300px;">
							<ul>
								<a href="#"><li v-for="(item,index) in emailList" @click="send_mail(item.url)"><img :src="item.url" /></li></a>
							</ul>
						</div>
					  </el-popover>
				</div>
				<div class="file">
					<div @click="maillist()"><a href="#"><img src="../../static/img/mail.png" class="file_img"></a></div>
					<div id="file">
						<a href="javascript:void(0)"><img src="../../static/img/file.png" class="file_img"></a>
					</div>
					<div style="margin-left: 10px;margin-top: 10px;font-size: 20px;" @click="video_show">
						<a href="javascript:void(0)"><i class="el-icon-video-camera"></i></a>
					</div>
				</div>
						<div class="editor">
							<div-editable
							  v-model="content"
							  @blurFunc="blurHighLight"
							 >
							</div-editable>
						</div>
					<div class="btn">
						<input type="button" value="发送" style="width: 60px;"@click="send()"/>
					</div>
				</div>
				
			</div>
		</div>
</template>

<script>
	
	import axios from 'axios'
	import DivEditable from '@/components/wangeditor'
	export default{
		data(){
			return{
				mypeerConnect:'',
				mediaStreamTrack:'',
				contains:'',
				localvideo:'',
				remotevideo:'',
				videoShow:false,
				list:[],
				user_group:'',
				group_name:true,
				status:'',
				addFriend:'',
				 innerVisible: false,
				Managefriend:[],
				checkfriend:[],
				diaglogdelete:false,
				search:'',
				diagloggroup:false,
				diaglogfriend:false,
				dialogTableVisible :false,
				number:0,
				isactive : -1,
				user:'',
				videoId:'',
				friendName:'',
				friend_avater:'',
				id:'',
				socket:"",
				path:"ws://localhost:7000/chat",
				input:"",
				activeIndex:'/chat',
				visible: false,
				sex:0,
				show:false,
				my_message:[],
				mail:false,
				content:'',
				friendList:[],
				message:[],
				expression:'',
				emailList:
				[
					{url:'../../static/layui/images/face/0.gif'},
					{url:'../../static/layui/images/face/1.gif'},
					{url:'../../static/layui/images/face/2.gif'},
					{url:'../../static/layui/images/face/3.gif'},
					{url:'../../static/layui/images/face/4.gif'},
					{url:'../../static/layui/images/face/5.gif'},
					{url:'../../static/layui/images/face/6.gif'},
					{url:'../../static/layui/images/face/7.gif'},
					{url:'../../static/layui/images/face/8.gif'},
					{url:'../../static/layui/images/face/9.gif'},
					{url:'../../static/layui/images/face/10.gif'},
					{url:'../../static/layui/images/face/11.gif'},
					{url:'../../static/layui/images/face/12.gif'},
					{url:'../../static/layui/images/face/13.gif'},
					{url:'../../static/layui/images/face/14.gif'},
					{url:'../../static/layui/images/face/15.gif'},
					{url:'../../static/layui/images/face/16.gif'},
					{url:'../../static/layui/images/face/17.gif'},
					{url:'../../static/layui/images/face/18.gif'},
					{url:'../../static/layui/images/face/19.gif'},
					{url:'../../static/layui/images/face/20.gif'},
					{url:'../../static/layui/images/face/21.gif'},
					{url:'../../static/layui/images/face/22.gif'},
					{url:'../../static/layui/images/face/23.gif'},
					{url:'../../static/layui/images/face/24.gif'},
					{url:'../../static/layui/images/face/25.gif'},
					{url:'../../static/layui/images/face/26.gif'},
					{url:'../../static/layui/images/face/27.gif'},
					{url:'../../static/layui/images/face/28.gif'},
					{url:'../../static/layui/images/face/29.gif'},
					{url:'../../static/layui/images/face/30.gif'},
					{url:'../../static/layui/images/face/31.gif'},
					{url:'../../static/layui/images/face/32.gif'},
					{url:'../../static/layui/images/face/33.gif'},
					{url:'../../static/layui/images/face/34.gif'},
					{url:'../../static/layui/images/face/35.gif'},
					{url:'../../static/layui/images/face/36.gif'},
					{url:'../../static/layui/images/face/37.gif'},
					{url:'../../static/layui/images/face/38.gif'},
					{url:'../../static/layui/images/face/39.gif'},
					{url:'../../static/layui/images/face/40.gif'},
					{url:'../../static/layui/images/face/41.gif'},
					{url:'../../static/layui/images/face/42.gif'},
					{url:'../../static/layui/images/face/43.gif'},
					{url:'../../static/layui/images/face/44.gif'},
					{url:'../../static/layui/images/face/45.gif'},
					{url:'../../static/layui/images/face/46.gif'},
					{url:'../../static/layui/images/face/47.gif'},
					{url:'../../static/layui/images/face/48.gif'},
					{url:'../../static/layui/images/face/49.gif'},
					{url:'../../static/layui/images/face/50.gif'},
					{url:'../../static/layui/images/face/51.gif'},
					{url:'../../static/layui/images/face/52.gif'},
					{url:'../../static/layui/images/face/53.gif'},
					{url:'../../static/layui/images/face/54.gif'},
					{url:'../../static/layui/images/face/55.gif'},
					{url:'../../static/layui/images/face/56.gif'},
					{url:'../../static/layui/images/face/57.gif'},
					{url:'../../static/layui/images/face/59.gif'},
					{url:'../../static/layui/images/face/58.gif'},
					{url:'../../static/layui/images/face/60.gif'},
					{url:'../../static/layui/images/face/61.gif'},
					{url:'../../static/layui/images/face/62.gif'},
					{url:'../../static/layui/images/face/63.gif'},
					{url:'../../static/layui/images/face/64.gif'},
					{url:'../../static/layui/images/face/65.gif'},
					{url:'../../static/layui/images/face/66.gif'},
					{url:'../../static/layui/images/face/67.gif'},
					{url:'../../static/layui/images/face/68.gif'},
					{url:'../../static/layui/images/face/69.gif'},
					{url:'../../static/layui/images/face/70.gif'},
					{url:'../../static/layui/images/face/71.gif'},
				]
			}
		},
		
		mounted(){
			this.upload()
			
		},
		updated(){
			 let ele = document.getElementById('middle');
			    ele.scrollTop = ele.scrollHeight;
		},
		components: {
		  DivEditable
		},
		created(){
			this.getUser()
			this.getfriend()
		},
		methods:{
			//视频界面显示
		async video_show(){
			this.videoShow = true
			this.$nextTick(()=>{
				this.localvideo = document.getElementById('localVideo')
				this.remotevideo = document.getElementById('remoteVideo')
				
			})
			this.contains={
				video:true,
				audio:true
			}
			this.createPeerConnection()
			navigator.mediaDevices.getUserMedia(this.contains).then(stream=>{
				this.localvideo.srcObject = stream
				
				//开始传输数据
	             this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
				stream.getAudioTracks().forEach(tarck=>{
					this.mypeerConnect.addTrack(tarck,stream)
				})
				console.log(1231231231)
				console.log(stream)
			})
			this.handleNegotiationNeededEvent()
		},
		//创建peerConnection对象
		createPeerConnection(){
			//信令服务器
			var configuartion = {
				iceServers:[
					{
						url: "stun:stun.l.google.com:19302"
					}
				]
			}
			//类似于websocket的各种函数
			this.mypeerConnect = new RTCPeerConnection(configuartion)
			this.mypeerConnect.onicecandidate = this.handleICECandidateEvent;
			// this.mypeerConnect.ontrack = this.handleTrackEvent;
			this.mypeerConnect.onnegotiationneeded = this.handleNegotiationNeededEvent;
			this.mypeerConnect.onaddstream = this.gotRemoteStream;
			this.mypeerConnect.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
		},
		sendToServer(message){
			
			this.socket.send(JSON.stringify(message))
		},
		//寻找信令的另一方,描述候选者的sdp,发送给信令服务器
		async handleICECandidateEvent(event){
			if(event.candidate){
				this.sendToServer({
					type:4,
					userId:this.user.id,
					friendId:this.videoId,
					candidate:event.candidate
				})
			}
			},
		
		//双方重新协商,表明已经准备完毕开始与其他用户进行协商
		async handleNegotiationNeededEvent(){
				console.log("开始协商")
				this.mypeerConnect.createOffer().then(offer=>{
					return this.mypeerConnect.setLocalDescription(offer)
				})
				.then(()=>{
				this.sendToServer({
						userId:this.user.id,
						friendId:this.id,
						type:2,
						sdp:this.mypeerConnect.localDescription
					})
				})
				.catch(err=>{
					console.log(77777333)
				})
			},
			//轨道移除（断开连接）
		
		//e连接状态的更改
		gotRemoteStream(event){

			this.remotevideo.srcObject=event.stream
		},
		handleVideoAnswerMsg(msg){
				var message = JSON.parse(msg.sdp)
				var desc = new RTCSessionDescription(message);
				this.mypeerConnect.setRemoteDescription(desc)
			},
		
		//当信令状态发生更改的时候，webrtc会提示信息
		handleICEConnectionStateChangeEvent(event){
			 console.log('ICE connection state change: ' + event.target.iceConnectionState);
		},
		async handleVideoOfferMsg(msg){
			console.log("接收邀请")
			var msg1 = msg
			this.videoId=msg.userId
			var message = JSON.parse(msg.sdp)
			var localStream = null
			//创建RTCPeerConnection对象
			this.createPeerConnection()
			//将自己的麦克风和网络摄像头添加到轨道上
			var contain={
				audio:true,
				video:true
			}
			var desc = new RTCSessionDescription(message)
			this.mypeerConnect.setRemoteDescription(desc).then(()=>{
				return	navigator.mediaDevices.getUserMedia(contain)
			}).then(stream=>{
			
				this.localvideo.srcObject = stream
				//将流中的轨道都添加到RTCPeerConnection
				stream.getAudioTracks().forEach(tarck=>{
					this.mypeerConnect.addTrack(tarck,stream)
				})
			}).then(()=>{
				//返回答案
				return this.mypeerConnect.createAnswer()
			}).then(answer=>{
				//与对方交换信条，发送sdp
				return this.mypeerConnect.setLocalDescription(answer)
			}).then(()=>{
				console.log(222288)
				console.log(msg1)
				var msg={
					userId:this.user.id,
					friendId:msg1.userId,
					type:3,
					sdp:this.mypeerConnect.localDescription
				}
				this.sendToServer(msg)
			})
			this.videoShow=true
			this.$nextTick(()=>{
				this.localvideo = document.getElementById('localVideo')
				this.remotevideo = document.getElementById('remoteVideo')
				
			})
		},
		//接收ice候选人
		handleNewICECandidateMsg(msg){
			var candidate = new RTCIceCandidate(JSON.parse(msg.candidate))
			var that = this
			try{
				 that.mypeerConnect.addIceCandidate(candidate)
			}catch(err){
				console.log(err)
			}
		
			
		},
		handleTrackEvent(event){
			this.remotevideo.srcObject = event.streams[0]
		},
		//断开连接
		handleRemoveTrackEvent(event){
			var stream = this.remotevideo.srcObject
			var tarckList = stream.getTracks()
			if(tarckList.length==0){
				this.closeVideoCall()
			}
		},
		closeVideoCall(){
			if(this.mypeerConnect){
				this.mypeerConnect.ontrack = null;
				this.mypeerConnect.onremovetrack = null;
				this.mypeerConnect.onremovestream = null;
				this.mypeerConnect.onicecandidate = null;
				this.mypeerConnect.oniceconnectionstatechange = null;
				this.mypeerConnect.onsignalingstatechange = null;
				this.mypeerConnect.onicegatheringstatechange = null;
				this.mypeerConnect.onnegotiationneeded = null;
				if(this.remotevideo.srcObject){
					this.remotevideo.srcObject.getTracks().forEach(track=>{
						track.stop()
					})
				}
				if(this.localvideo.srcObject){
					this.localvideo.srcObject.getTracks().forEach(track=>{
						track.stop()
					})
				}
				this.mypeerConnect.close()
				this.mypeerConnect = null
			}
			  this.remotevideo.removeAttribute("src");
			  this.remotevideo.removeAttribute("srcObject");
			  this.localvideo.removeAttribute("src");
			  this.localvideo.removeAttribute("srcObject");
		
		},
		handleGetUserMediaError(e) {
			 this.closeVideoCall();
		},
			//关闭摄像头
		stop(){
			  this.closeVideoCall()
			   this.mediaStreamTrack && this.mediaStreamTrack.stop();
			   this.localvideo.srcObject=null
			   this.videoShow=false
			},
			//添加好友
		add_friend(){
			axios.get('/imchat/apply/add',{
				params:{
					id:this.addFriend.id
				}
			}).then(res=>{
				this.$message({
					message:'请求发出成功，请耐心等待对方同意',
					type:'success'
				})
				this.diaglogfriend=false
			})
		},
		//好友管理
		ManageFriendTest(){
			
			this.$axios.get('/imchat/friend/findfriend').then(res=>{
				this.list=res.data.data.list

				this.diaglogdelete=true
			})
		},
		//获取好友信息不包括群聊
		getfriendMessage(){
			this.$axios.get('/imchat/friend/findfriend').then(res=>{
				this.list=res.data.data.list
				this.diagloggroup=true
			})
			
		},
		//添加群聊
		addGroup(){
			var data = []
			for(var i = 0;i<this.checkfriend.length;i++){
				var groupVO={};
				groupVO.id = this.checkfriend[i].friendId
				groupVO.nickname = this.checkfriend[i].nickname
				data.push(groupVO)
			}
			//将自己添加进去
			var groupVO={}
				groupVO.id = this.user.id
				groupVO.nickname = this.user.nickname
				data.push(groupVO)
			var groupVo2 = {
				nickname:this.user_group,
				members:data
			}
			var data1 = JSON.stringify(groupVo2)
			axios.post('/imchat/user_group/add',data1).then(res=>{
				this.$message({
					message:"添加群聊成功",
					type:'successs'
				})
				this.getfriend()
				this.diagloggroup=false
			})
		},
		//添加群聊昵称
		group_nickname(){
			
			if(this.user_group==null||this.user_group==''){
				this.$message({
					message:'请填写群聊昵称',
					type:'warning'
				})
				this.group_name = true
				return
			}else{
				this.group_name = false
			}
		},
		add(){
			if(this.search==this.user.email||this.search==this.user.number){
				this.$message({
					message:'不可以添加你自己喔',
					type:'warning'
				})
				return 
			}
			axios.get('/imchat/user/search',{
				params:{
					content:this.search
				}
			}).then(res=>{
				this.addFriend = res.data.data.user
				if(this.addFriend==null||this.addFriend==''){
					this.$message({
					          message: '用户不存在',
					          type: 'warning'
					});
				}
				this.status = res.data.data.status
				
			})
		},
		SelectionChange(val){
			this.Managefriend=val
		},
		toggleSelection(rows) {
		        if (rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        } else {
		          this.$refs.multipleTable.clearSelection();
		        }
		      },
		 //选择群聊人选
		handleSelectionChange(val) {
		        this.checkfriend = val
		},
		//获取用户信息
		getUser(){
			axios.get("/imchat/user/getUser").then(res=>{
				this.user = res.data.data.user
					this.init()
			})
		},
		//展示聊天记录
		chat(id,nickname,avater,content,index,number){
			this.my_message=[]
			for(var i=0;i<this.friendList.length;i++){
				if(this.friendList[i].friendId==id){
					this.friendList[i].sum=0;
				}
			}
			this.number=number
			this.isactive = index
			this.show=true
			this.id=id
			this.friendName = nickname
			if(content!=null&&content!=""){
				this.friendName = content
			}
			this.friend_avater = avater
			this.my_message=JSON.parse(localStorage.getItem(this.id))
			if(this.my_message==null){
				this.my_message=[]
			}
		},
		//获取好友信息
		getfriend(){
			this.$axios.get('/imchat/friend/findAll').then(res=>{
				this.friendList=res.data.data.list
				for(var i=0;i<this.friendList.length;i++){
					this.friendList[i].sum=0;
				}
			})
		},
		blurHighLight() {
		  // 这里做数据过滤或样式变更操作
		},
		//文件上传
		upload(){
			layui.use('upload', function(){
			  var upload = layui.upload;
			  //执行实例
			  var uploadInst = upload.render({
			    elem: '#file' //绑定元素
			    ,url: '/upload' //上传接口
			    ,done: function(res){
			      //上传完毕回调
			    }
			    ,error: function(){
			      //请求异常回调
			    },
			  });
			});
		},
		//发送表情包
		send_mail(url){
			var img ="<img src="+url+" style='width:20px;height:20px'/>"
			this.content+=img
		},
		//发送给好友或群组
		send(){
			
			const message={content:this.content,userId:this.user.id,friendId:this.id,createTime:null,type:0  }
			//代表是群组消息
			if(this.number>0&&this.number!=null){
				message.type=1
				message.userId=this.id
				message.friendId=this.user.id
			}
			this.socket.send(JSON.stringify(message))
			this.my_message.push(message)
			//消息缓存在浏览器上
			var data = JSON.stringify(this.my_message)
			localStorage.setItem(this.id,data)
			this.content=""
		},
		maillist(){
			this.mail=!this.mail
		},
		show_message(){
			this.visible=!this.visible
		},
		//websocket初始化
		init(){
			if(window.WebSocket){
			    this.socket = new WebSocket("ws://localhost:7000/chat")
			                   // 监听socket连接
			    this.socket.onopen = this.open
			                   // 监听socket错误信息
			    this.socket.onerror = this.error
			                   // 监听socket消息
			    this.socket.onmessage = this.getMessage
			    				
			  }
			
		},
		//初始化连接
		open(){
			var date = new Date()
		
			const message ={content:null,userId:this.user.id,friendId:null,createTime:date.toLocaleString(),type:-1}
			this.socket.send(JSON.stringify(message))
		
		},
		error(){
			},
			//接收消息
		getMessage:function(msg){
				const message = JSON.parse(msg.data)
				switch(message.type){
					case 1:
						this.person(message)
						break
					case 0:
						this.person(message)
						break
					case 2:
					//代表video-offer
					this.handleVideoOfferMsg(message)
						break
					case 3:
						//代表video-answer
						this.handleVideoAnswerMsg(message)
						break
					case 4:
						this.handleNewICECandidateMsg(message)
						break
				}
				
			},
		person(message){
				var id = message.userId
				if(id!=this.id){
					//增加红点
					for(var i=0;i<this.friendList.length;i++){
						if(this.friendList[i].friendId==id){
							var sum = this.friendList[i].sum
							this.$set(this.friendList[i], 'sum', sum+1);
							break
						}
					}
					var message1 = JSON.parse(localStorage.getItem(id))
					if(message1==null){
						var message1=[]
					}
					message1.push(message)
					var data = JSON.stringify(message1)
					localStorage.setItem(id,data)
					 this.$forceUpdate()
				}else{
					this.my_message.push(message)
				}
			},
			//文件上传限制
			beforeAvatarUpload(file){
				const isLt2M = file.size / 1024 / 1024 < 100
				 if(!isLt2M) {    
				        this.$message({      
				        message: '上传文件大小不能超过 10MB!',      
				        type: 'warning'     
				        });  
				    } 
				return isLt2M
			},
			
		}
	}
</script>

<style scoped>
	.distance{
		margin-left: 60px;
	}
	  .demo-table-expand {
	    font-size: 0;
	  }
	  .demo-table-expand label {
	    width: 120px;
	   color:white
	  }
	  .demo-table-expand .el-form-item {
	    margin-right: 60px;
	    margin-bottom: 0;
	    width: 100%;
	  }
	#badge {
	   /* 不需要定义height与width，添加合适的padding使圆圈随字符长短变化而改变 */
	    line-height: 15px;
	    text-align: center;
	    background-color: red;
	    color: white;
	    font-size: 2px;
	    font-weight: 200;
		width: 30px;
	    border-radius:10px;
	    position: relative;
	    bottom: 50px;
	    left: 40px;
	}
	.content:hover{
		background-color:#C0C0C0;
	}
	.bg{
		background-color: #ccc;
	}
	
	.editor{
		height: 70px;
		width: 90%;
		border: #F5F5F5;
		margin-left: 10px;
		word-break: break-all;
		outline: none;
		user-select: text;
		overflow-y: scroll;
		overflow-x: scroll;
		white-space: pre-wrap;
		text-align: left;
		&[contenteditable=true]{
		      user-modify: read-write-plaintext-only;
		      &:empty:before {
		        content: attr(placeholder);
		        display: block;
		        color: #ccc;
		      }
		    }
	}
	.end ul li{
		list-style-type:none;
		float:left;
		margin-top: 5px;
		margin-left: 5px;
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
	.message1 {
	    float:right;
	    background-color:		#9EEA6A;
	    border-bottom-color: 	#9EEA6A;
	    /*为了给after伪元素自动继承*/
	    color: #000;
	    font-size: 14px;
	   padding: 5px 12px 5px 10px;
	    box-sizing: border-box;
	    border-radius: 4px;
	    position: relative;
	    word-break: break-all;
	}
	.right{
		width: 70%;
		margin-top: 10px;
		margin-left: 136px;
		display: flex;
		flex-direction:row-reverse;
	}
	.right_avater{
		width:28px;
		height: 28px;
		margin-left: 10px;
	}
	.avater{
		width: 28px;
		height: 28px;
		margin-right: 10px;
	}
	.left{
		width: 70%;
		margin-top: 10px;
		margin-left: 20px;
		display: flex;
		flex-direction: row;
	}
	.message2 {
	    float:left;
	    background-color:		#fff;
	    border-bottom-color: 	#FFF;
	    /*为了给after伪元素自动继承*/
	    color: #000;
	    font-size: 14px;
	   padding: 5px 12px 5px 10px;
	    box-sizing: border-box;
	    border-radius: 4px;
	    position: relative;
	    word-break: break-all;
	}
	
.message2::before {
    content: '';
    position:absolute;
    top: 18px;
   left: -4px;
    width: 10px;
    height: 10px;
    margin-top: -10px;
    background: inherit;
    /*自动继承父元素的背景*/
   transform: rotate(45deg);
}

	.btn{
		margin-left: 380px;
		margin-top: px;
	}
	.text_area{
		width: 90%;
		height: 65px;
		resize: none;
		border:#F5F5F5 ;
		background-color:#F5F5F5 ;
		
	}
	.end .file img:hover{
		color: #ffd04b;
	}
.file_img{
	width: 20px;
	height: 20px;
	margin:10px 5px ;
}
.file{
	display: flex;
	flex-direction: row;
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
	margin-top: 10px;
	
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
	margin-left: -10px;
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
  width: 2px;  
}
.thrid{
	width: 540px;
	height: 500px;
}
.top{
	padding-top:15px;
	height: 45px;
	background-color: #F5F5F5;
	width: 100%;
	border-bottom: 1px solid #CCCCCC;
}
.middle{
	width: 100%;
	height: 290px;
	background-color: #F4F4F5;
	overflow-x: hidden;
	overflow-y: scroll;
	padding-bottom: 10px;
}
.end{
	border-top:1px solid #CCCCCC ;
	height: 138px;
	width: 100%;
	background-color: #F5F5F5;
}
</style>