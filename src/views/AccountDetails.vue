<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)" :setUp="'修改'" @click="edit()"></top>
		<div class="content">
			<div class="form">
				<div>账户名称:</div>
				<input type="text" disabled v-model="account.name">
				<div>初期余额:</div>
				<input type="number"  disabled v-model="account.initial_balance">
				<div>当前余额:</div>
				<input type="number"  disabled v-model="account.balance">
				<div>创建时间:</div>
				<input type="text" disabled v-model="account.created_at">
				<div>修改时间:</div>
				<input type="text" disabled v-model="account.updated_at">
				<div>备注:</div>
				<input type="text" disabled v-model="account.remark">
				<div>排序值:</div>
				<input type="number" disabled v-model="account.sort">
				<div>月金额变化汇总:</div>
				<input type="month"  v-model="date" @change="change()">
				<div class="money">
					<div>支出:<span class="num">{{ summary.out }}</span></div>
					<div>收入:<span  class="num">{{ summary.in }}</span></div>
				</div>
			</div>
			<transition name="fade">
				<alert v-if="alertShow">{{ alert }}</alert>
			</transition>
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
		name:'accountDetails',
		data(){
			return {
				title:'账户详情',
				id:'',
				account:'',
				date:'',
				summary:'',
				alert:'',
				alertShow:false,
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			let year = new Date().getFullYear();
			let month = new Date().getMonth() + 1 <10 ? '0' + (new Date().getMonth() + 1):new Date().getMonth() + 1;
			this.date = year + '-' + month;
			this.getMoney();
			axios({
				method:'get',
				url:this.$store.state.url + '/api/account/detail?id='+ this.id +'&token=' + this.token
			})
			.then((res)=>{
				res = res.data;
				if(res.status){
					this.account = res.data
				}else{
					this.alert = res.data;
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
						this.$router.push('/accountList')
					},1500)
				}
			})
			.catch(err=>console.log(err));
		},
		methods:{
			getMoney(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/account/change?id='+this.id+'&token=' + this.token,
					params:{
						month:this.date
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.summary = res.data;
					}
				})
				.catch(err=>console.log(err))
			},
			change(){
				this.getMoney()
			},
			edit(){
				this.$router.push({'path':'/accountEdit',query:{id:this.id}});
			},
		},
		components:{
			top,
			bottom,
			alert
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height:calc(100vh - 100px);
		margin:50px 0;
		overflow:auto;
	}

	.form{
		width:80%;
		margin:auto;
		margin-top:30px;
		font-size:0.9em;
		select{
			display:block;
			box-sizing:border-box;
			width:100%;
			height:35px;
			border:solid 1px #ccc;
			margin:10px 0;
			padding-left:10px;
			outline:none;
			background:none;
			&:focus{
				border-color:#08c332;
			}
		}
		input{
			display:block;
			box-sizing:border-box;
			width:100%;
			height:35px;
			border:solid 1px #ccc;
			margin:10px 0;
			padding-left:10px;
			outline:none;
			background:none;
			&:focus{
				border-color:#08c332;
			}
		}
	}

	.money{
		margin:10px 0;
	}

	.num{
		margin-left:5px;
		font-size:1.2em;
		color:red;
	}
</style>