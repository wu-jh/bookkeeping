<template>
	<div>
		<top :title="title" ></top>
		<div class="content">
			<captcha :img="img" :btn1="btn1" :warning="warning" :link="link" @img="getImg()" @sms="sms()" :value="value" @tel="value.tel=$event" @pwd="value.pwd=$event" @imgcode="value.img=$event" @smscode="value.sms=$event" @telblur="telblur" @pwdblur="pwdblur" @imgblur="imgblur" @smsblur="smsblur" @submit="submit()" @link="golink()"  :sms="true"/>
		</div>
		<alert v-if="alertShow">{{ alert }}</alert>
	</div>
</template>

<script>
	import top	from '../components/top.vue';
	import captcha	from '../components/code.vue';
	import axios	from 'axios';

	export default {
		name:'register',
		data(){
			return {
				title:'注册',
				img:'',
				btn1:'注册',
				link:'已有账号,去登录',
				value:{
					tel:'',
					pwd:'',
					img:'',
					sms:''
				},
				warning:'',
				alertShow:false,
				alert:'',
			}
		},
		mounted(){
			this.getImg()
		},
		methods:{
			getImg(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/captcha',
				})
				.then((res)=>{
					this.img = res.data.data;
				})
				.catch(err=>console.log(err))
			},

			telblur(){
				if(this.value.tel == ''){
					this.warning = '电话号码不能为空';
				}else{
					this.warning = ''
				}
			},

			pwdblur(){
				if(this.value.pwd == ''){
					this.warning = '密码不能为空';
				}else{
					this.warning = ''
				}
			},

			imgblur(){
				if(this.value.img == ''){
					this.warning = '图形验证码不能为空';
				}else{
					this.warning = ''
				}
			},

			smsblur(){
				if(this.value.sms == ''){
					this.warning = '短信验证码不能为空';
				}else{
					this.warning = ''
				}
			},

			sms(){
				if(this.value.tel == ''){
					this.warning = '手机号不能为空';
					return;
				}

				var preg = /^1(3\d|4[05-7]|5[0-35-9]|6[25-7]|7[0-35-8]|8[0-9]|9[189])(\d{8})$/;
				if(!preg.test(this.value.tel)){
					this.warning = '手机号格式不正确';
					return;
				}

				if(this.value.img == ''){
					this.warning = '图形验证码不能为空';
					return;
				}

				axios({
					method:'post',
					url:this.$store.state.url + '/api/sms/verify',
					params:{
						mobile: this.value.tel,
						captcha_code:this.value.img,
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
				})
				.catch(err=>console.log(err))
			},

			submit(){
				if(this.value.tel == ''){
					this.warning = '电话号码不能为空';
					return;
				}
				var preg = /^1(3\d|4[05-7]|5[0-35-9]|6[25-7]|7[0-35-8]|8[0-9]|9[189])(\d{8})$/;
				if(!preg.test(this.value.tel)){
					this.warning = '手机号格式不正确';
					return;
				}
				if(this.value.pwd == ''){
					this.warning = '密码不能为空';
					return;
				}
				if(this.value.img == ''){
					this.warning = '图片验证码不能为空';
					return;
				}
				if(this.value.sms == ''){
					this.warning = '短信验证码不能为空';
					return;
				}

				axios({
					method:'post',
					url:this.$store.state.url + '/api/user/register',
					params:{
						mobile:this.value.tel,
						verify:this.value.sms,
						password:this.value.pwd
					}
				})
				.then((res)=>{
					if(res.data.status){
						this.alert = '注册成功快去登录吧';
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
							this.$router.push('/login');
						},500)
					}else{
						this.alert = res.data.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
					}
				})
				.catch((res)=>{
					this.alert = '注册失败,请稍后再试';
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
				});
			},
			golink(){
				this.$router.push('/login');
			}
		},
		components:{
			top,
			captcha,
			alert
		}
	}
</script>

<style scoped lang="scss">
	.content{
		margin:50px 0;
		overflow: auto;
	}
</style>