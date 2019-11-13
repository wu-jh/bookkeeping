<template>
	<div>
		<top :title="title"></top>
		<div class="content">
			<mytop :user="user"></mytop>
			<myli v-for="ul in uls" :ul="ul" @dataEdit="dataEdit()" @telEdit="telEdit()" @pwdEdit="pwdEdit()" @feedback="feedback" @exit="exit()" @accountList="accountList()" @accountBook="accountBook()"></myli>
			<alert v-if="alertShow">{{ alert }}</alert>
		</div>
		<bottom :active="3"></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import mytop from '../components/mytop.vue'
	import bottom from '../components/bottom.vue'
	import myli from '../components/myli.vue'
	import alert from '../components/alert.vue'
	import axios from 'axios'

	export default {
		name:'my',
		data(){
			return {
				title:'个人中心',
				user:{},
				uls:[
						[
							{text:'我的账户',icon:'icon-shujuku',event:'accountList'},
							{text:'我的账簿',icon:'icon-zhangbu',event:'accountBook'}
						],
						[
							{text:'修改资料',icon:"icon-xiugaiziliao",event:'dataEdit'},
							{text:'绑定手机',icon:"icon-xiugaishoujihao1",event:'telEdit'},
							{text:'修改密码',icon:"icon-mima",event:'pwdEdit'},
						],
						[
							{text:'意见反馈',icon:"icon-yijianfankui1",event:'feedback'}
						],
						[
							{text:'退出登录',icon:"icon-084tuichu",event:'exit'}
						]
				],
				alertShow:false,
				alert:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			axios({
				url:this.$store.state.url + '/api/user/profile?token=' + this.token,
				method:'get'
			})
			.then((res)=>{
				var res = res.data;
				if(res.status){
					this.user = res.data
				}else{
					this.$router.push('/login');
				}
			})
			.catch(err => console.log(err))
		},
		methods:{
			dataEdit(){
				this.$router.push('/dataEdit');
			},
			telEdit(){
				this.$router.push('/telEdit');
			},
			pwdEdit(){
				this.$router.push('/pwdEdit');
			},
			feedback(){
				this.$router.push('/feedback');
			},
			exit(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/user/logout?token=' + this.token,

				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						sessionStorage.removeItem('token');
						this.$router.push('/login');
					}else{
						this.alert = '退出失败';
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
					}
				})
				.catch(err => console.log(err))
				
			},
			accountList(){
				this.$router.push('/accountList');
			},

			accountBook(){
				this.$router.push('/accountBook')
			}
		},
		components:{
			top,
			mytop,
			bottom,
			myli,
			alert
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height:calc(100vh - 100px);
		margin:50px 0;
		overflow: auto;
		background:#EDEDED;
	}
</style>