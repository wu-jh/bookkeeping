<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div class="warning" v-show="warning"><i class="fa fa-exclamation-triangle"></i>{{ warning }}</div>
				<input type="text" class="uname" maxlength="11" placeholder="新手机号" v-model="tel">
				<input type="password" class="pwd" placeholder="密码" v-model="pwd">
				<input  class="img-code" type="text" placeholder="图片验证码" v-model="imgcode">
				<span  class="img" @click="getImg()"><img :src="img.url" height="100%" width="100%"></span>
				<input class="msg-code" type="text" placeholder="短信验证码" v-model="smscode">
				<span  class="msg" @click="sms">发送验证码</span>
				<button class="btn1" @click="submit">确认修改</button>
			</div>	
			<alert v-if="alertShow">{{ alert }}</alert>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom></bottom>	
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import alert from '../components/alert.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'

	export default {
		name:'telEdit',
		data(){
			return {
				title:'绑定手机',
				img:{
					key:'',
					url:''
				},
				warning:'',
				tel:'',
				pwd:'',
				imgcode:'',
				smscode:'',
				alert:'',
				alertShow:false,
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.getImg();
		},
		methods:{
			getImg(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/captcha',
				})
				.then((res)=>{
					res = res.data;
					this.img = res.data;
				})
				.catch(err=>console.log(err))
			},
			sms(){
				if(this.tel == ''){
					this.warning = '手机号不能为空';
					return;
				}

				var preg = /^1(3\d|4[05-7]|5[0-35-9]|6[25-7]|7[0-35-8]|8[0-9]|9[189])(\d{8})$/;
				if(!preg.test(this.tel)){
					this.warning = '手机号格式不正确';
					return;
				}

				if(this.imgcode == ''){
					this.warning = '图形验证码不能为空';
					return;
				}
				this.delayed = true;
				axios({
					method:'post',
					url:this.$store.state.url + '/api/sms/verify',
					params:{
						mobile: this.tel,
						captcha_code:this.imgcode,
						captcha_key:this.img.key
					}
				})
				.then((res)=>{
					if(res.data.status){
						this.alert = res.data.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
					}else{
						if(res.data.data == "INVALID_CAPTCHA"){
							this.warning = '图形验证码错误';
						}else{
							this.warning = res.data.data;
						}
						this.getImg();
					}
					this.delayed = false;
				})
				.catch((err)=>{
					console.log(err);
					this.delayed = false;
				})
			},
			submit(){
				if(this.tel == ''){
					this.warning = '手机号码不能为空';
					return;
				}
				var preg = /^1(3\d|4[05-7]|5[0-35-9]|6[25-7]|7[0-35-8]|8[0-9]|9[189])(\d{8})$/;
				if(!preg.test(this.tel)){
					this.warning = '手机号格式不正确';
					return;
				}
				if(this.pwd == ''){
					this.warning = '密码不能为空';
					return;
				}
				if(this.imgcode == ''){
					this.warning = '图片验证码不能为空';
					return;
				}
				if(this.smscode == ''){
					this.warning = '短信验证码不能为空';
					return;
				}
				this.delayed = true;
				axios({
					method:'post',
					url:this.$store.state.url + '/api/user/mobile?token='+this.token,
					params:{
						password:this.pwd,
						mobile:this.tel,
						verify:this.smscode
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.alert = res.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
							this.$router.push('/user')
						},500)
					}else{
						this.alert = res.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
					}
					this.delayed = false;
				})
				.catch((err)=>{
					console.log(err);
					this.delayed = false;
				})
			}
		},
		components:{
			top,
			bottom,
			alert,
			delayed,
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height:calc(100vh - 100px);
		margin:50px 0;
		overflow: auto;
	}
	.form{
		width:80%;
		margin:auto;
		margin-top:20px;
		.msg-code,.img-code{
			height:35px;
			width:65%;
			padding-left:20px;
			border:solid 1px #ccc;
			box-sizing:border-box;
			outline:none;
			margin-bottom:5px;
			&:focus{
				border-color:#08c332;
			}
		}

		.uname,.pwd{
			width:100%;
			box-sizing:border-box;
			margin:auto;
			height:35px;
			display:block;
			outline:none;
			border:solid 1px #ccc;
			margin-bottom:5px;
			padding-left:20px;
			&:focus{
				border-color:#08c332;
			}
		}

		.msg{
			width:35%;
			height:35px;
			display:inline-block;
			text-align:center;
			font-size:0.8em;
			background:#08c332;
			color:#fff;
			line-height:37px;
			vertical-align:top;
		}

		.img{
			width:35%;
			height:35px;
			display:inline-block;
			text-align:center;
			font-size:0.8em;
			color:#fff;
			line-height:37px;
			vertical-align:top;
		}

		button{
			display:block;
			box-sizing:border-box;
			width:100%;
			height:35px;
			margin:0 auto 10px;
			border:none;
			outline:none;
			font-size:1.1em;
		}

		.btn1{
			margin-top:10px;
			background:#08c332;
			color:#fff;
		}
		.warning{
			width:calc(90% + 10px);
			margin:auto;
			height:30px;
			line-height:30px;
			border:solid 1px red;
			color:red;
			margin-bottom:5px;
			font-size:0.8em;
			padding-left:10px;
			i{
				margin-right:5px;
			}
		}
	}
</style>