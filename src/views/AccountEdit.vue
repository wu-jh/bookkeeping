<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div>账户名称:</div>
				<input type="text" v-model="name">
				<div>账户类型:</div>
				<select v-model="selected">
					<option disabled value="">请选择</option>
					<option value="1">现金</option>
					<option value="2">银行</option>
					<option value="3">支付平台</option>
					<option value="4">其他</option>
				</select>
				<div>备注:</div>
				<input type="text" v-model="remark">
				<div>排序值:</div>
				<input type="number" v-model="sort">
				<input type="submit" value="修改" class="submit" @click="submit">
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
		name:'accountEdit',
		data(){
			return {
				title:'修改账户',
				name:'',
				selected:'',
				initial_balance:'',
				remark:'',
				sort:'',
				id:'',
				alertShow:false,
				alert:'',
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			axios({
				method:'get',
				url:this.$store.state.url + '/api/account/detail?id='+ this.id +'&token=' + this.token
			})
			.then((res)=>{
				res = res.data;
				if(res.status){
					this.name = res.data.name,
					this.selected = res.data.type,
					this.initial_balance = res.data.initial_balance,
					this.remark = res.data.remark,
					this.sort = res.data.sort
				}else{
					this.alert = res.data;
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
						this.$router.go(-1)
					},1500)
				}
			})
			.catch(err=>console.log(err));
		},
		methods:{
			submit(){
				if(this.name == ""){
					this.alert = '账户名称不能为空';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}

				if(this.selected == ""){
					this.alert = '账户类型不能为空';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}
				this.initial_balance = this.initial_balance ==''?0:this.initial_balance;
				this.sort = this.sort ==''?10:this.sort;

				var preg = /^(\d+)(\.?)(\d*)$/;
				if(!preg.test(this.initial_balance)){
					this.alert = '请输入正确的金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}
				this.delayed = true;
				axios({
					method:"post",
					url:this.$store.state.url + '/api/account/update?id='+ this.id +'&token=' + this.token,
					params:{
						name:this.name,
						type:parseInt(this.selected),
						remark:this.remark,
						sort:parseInt(this.sort)
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.alert = '修改成功';
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
							this.$router.push('/accountList')
						},1500)
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
			&:focus{
				border-color:#08c332;
			}
		}
		.submit{
			background:#08c332;
			padding:0;
			border:none;
			color:#fff;
		}
	}


</style>