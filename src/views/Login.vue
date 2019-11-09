<template>
	<div>
		<top :title="title" ></top>
		<div class="content">
			<captcha :img="img" :btn1="btn1" :btn2="btn2" :warning="warning" :link="link" @img="getImg()" :value="value" @tel="value.tel=$event" @pwd="value.pwd=$event" @imgcode="value.img=$event"  @telblur="telblur" @pwdblur="pwdblur" @imgblur="imgblur" @submit="submit()" @register="register()" @link="changepwd()"/>
		</div>
	</div>
</template>

<script>
	import top	from '../components/top.vue';
	import captcha	from '../components/code.vue';
	import axios	from 'axios';

	export default {
		name:'login',
		data(){
			return {
				title:'登录',
				img:'',
				sms:true,
				btn1:'登录',
				btn2:'去注册',
				link:'忘记密码',
				value:{
					tel:'',
					pwd:'',
					img:''
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
					url:'http://jizhang-api-dev.it266.com/api/captcha'
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
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/user/token/mobile',
					params:{
						mobile:this.value.tel,
						password:this.value.pwd,
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
				.catch((err)=>{alert('登录失败,请稍后重试')})
			},
			register(){
				this.$router.push('/register')
			},
			changepwd(){
				this.$router.push('/changepwd')
			}
		},
		components:{
			top,
			captcha
		}
	}
</script>

<style scoped lang="scss">
	.content{
		margin:50px 0;
		overflow: auto;
	}
</style>