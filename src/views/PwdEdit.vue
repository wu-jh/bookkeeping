<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div class="warning" v-show="warning">{{ warning }}</div>
				<input type="password" class="pwd" placeholder="原密码" v-model="oldpwd" >
				<input type="password" class="pwd" placeholder="新密码" v-model="newpwd" >
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
		name:'pwdEdit',
		data(){
			return {
				title:'修改密码',
				warning:'',
				oldpwd:'',
				newpwd:'',
				alert:'',
				alertShow:false,
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
		},
		methods:{
			submit(){
				if(this.oldpwd == ''){
					this.warning = '原密码不能为空';
					return;
				}

				if(this.newpwd == ''){
					this.warning = '新密码不能为空';
					return;
				}
				this.delayed = true;
				axios({
					method:'post',
					url:this.$store.state.url + '/api/user/password?token=' + this.token,
					params:{
						password:this.oldpwd,
						new_password:this.newpwd
					}
				})
				.then((res)=>{
					res = res.data;
					// console.log(res);
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
		.pwd{
			width:90%;
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

		button{
			display:block;
			width:calc(90% + 24px);
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
			height:20px;
			line-height:20px;
			border:solid 1px red;
			color:red;
			margin-bottom:5px;
			font-size:0.8em;
			padding-left:10px;
			&::before{
				content:'!'
			}
		}
	}
</style>