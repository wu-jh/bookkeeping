<template>
	<div>
		<top :title="title"></top>
		<div class="content">
			<captcha :img="img" :btn1="btn1" :sms="true" :link="link" :value="value" @img="getImg()" @imgcode="value.img=$event" @imgblur="imgblur" :warning="warning" @tel="value.tel=$event" @pwd="value.pwd=$event" @smscode="value.sms=$event" @sms="sms()" @telblur="telblur" @pwdblur="pwdblur" @smsblur="smsblur" @submit="submit()" @link="golink()"/>
		</div>	
	</div>
</template>

<script>
	import top	from '../components/top.vue';
	import captcha	from '../components/code.vue';
	import axios	from 'axios';

	export default {
		name:'changepwd',
		data(){
			return {
				title:'修改密码',
				img:'',
				btn1:'确认修改并登陆',
				link:'账号密码登录',
				value:{
					tel:'',
					pwd:'',
					sms:''
				},
				warning:''
			}
		},
		mounted(){
			this.getImg()
		},
		methods:{
			getImg(){
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/captcha',
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
					url:'http://jizhang-api-dev.it266.com/api/sms/verify',
					params:{
						mobile: this.value.tel,
						captcha_code:this.value.img,
						captcha_key:this.img.key
					}
				})
				.then((res)=>{
					if(res.data.status){
						sessionStorage.setItem('token',res.data.data.token);
						this.$router.push('/');
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
					this.warning = '图形验证码不能为空';
					return;
				}
				if(this.value.sms == ''){
					this.warning = '短信验证码不能为空';
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/user/token/sms',
					params:{
						mobile:this.value.tel,
						password:this.value.pwd,
						verify:this.value.sms,
					}
				})
				.then((res)=>{
					if(res.data.status){
					}else{
						alert(res.data.data)
					}
				})
				.catch((res)=>{alert('修改失败,请稍后再试')});
			},
			golink(){
				this.$router.push('/login')
			}
		},
		components:{
			top,
			captcha,
			axios
		}
	}
</script>

<style scoped lang="scss">
	.content{
		margin:50px 0;
		overflow: auto;
	}
</style>