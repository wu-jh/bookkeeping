<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/user')" :setUp="'添加'" @click="addAccount()"></top>
		<div class="content">
			<account :account="account" :active="active" @show="show($event)" @del='del($event)' @details="details($event)"></account>
			<alert v-if="alertShow">{{ alert }}</alert>
			<confirm v-if="confirmShow" @choice="choice($event)">{{ confirm }}</confirm>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import account from '../components/account.vue'
	import alert from '../components/alert.vue'
	import confirm from '../components/confirm.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'

	export default {
		name:'accountList',
		data(){
			return {
				title:'我的账户',
				account:'',
				alert:'',
				alertShow:false,
				confirm:'',
				confirmShow:false,
				id:'',
				active:'',
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.getAccount();
		},
		methods:{

			details(e){
				this.$router.push({'path':'/accountDetails',query:{id:e}});
			},
			
			addAccount(){
				this.$router.push('/addAccount')
			},
			del(e){
				this.confirm = '您确定要删除吗?';
				this.confirmShow = true;
				this.id = e;
			},
			getAccount(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/account?token=' + this.token
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.account = res.data;
					}else{
						this.alert = res.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
					}
				})
				.catch(err=>console.log(err))
			},

			choice(e){
				if(e){
					this.delayed = true;
					axios({
						method:'post',
						url:this.$store.state.url + '/api/account/delete?id='+ this.id +'&token=' + this.token,
					})
					.then((res)=>{
						res = res.data;
						if(res.status){
							this.alert = res.data;
							this.alertShow = true;
							let rtime = setTimeout(()=>{
								this.alertShow = false;
								this.alert = '';
							},1500)
							this.getAccount();
							this.confirm = '';
							this.confirmShow = false;
							this.active = '';
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
				}else{
					this.confirm = '';
					this.confirmShow = false;
				}
			},
			show(index){
				this.active = this.active === index?'1':index;
			}
		},
		components:{
			top,
			bottom,
			account,
			alert,
			confirm,
			delayed,
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height:calc(100vh - 100px);
		margin:50px 0;
		overflow:auto;
	}
</style>