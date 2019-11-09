<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/user')" :setUp="'添加'" @click="addAccount()"></top>
		<div class="content">
			<account :account="account" @del='del($event)' @details="details($event)"></account>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import account from '../components/account.vue'
	import axios from 'axios'

	export default {
		name:'accountList',
		data(){
			return {
				title:'我的账户',
				account:'',
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
				var tmp = confirm('您确定要删除吗');
				if(!tmp){
					return false;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/account/delete?id='+ e +'&token=' + this.token,
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.getAccount();
					}else{
						alert(res.data)
					}
				})
				.catch(err=>console.log(err))
				return false;
			},
			getAccount(){
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/account?token=' + this.token
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.account = res.data;
					}else{
						alert(res.data);
					}
				})
				.catch(err=>console.log(err))
			}
		},
		components:{
			top,
			bottom,
			account
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