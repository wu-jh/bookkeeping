<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div>账簿名称:</div>
				<input type="text" v-model="name" placeholder="账簿名称">
				<button class="submit" @click="submit">添加</button>
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
		name:'addbook',
		data(){
			return {
				title:'创建账簿',
				name:'',
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
				if(this.name == ''){
					this.alert = '请输入账簿名称';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}
				this.delayed = true;
				axios({
					method:'post',
					url:this.$store.state.url + '/api/book/create?token=' + this.token,
					params:{
						name:this.name
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.alert = '创建成功';
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
							this.$router.push('/accountBook')
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
		input{
			width:100%;
			display:block;
			margin-top:10px;
			box-sizing: border-box;
			border:solid 1px #ccc;
			height:35px;
			padding-left:10px;
			outline:none;
			&:focus{
				border-color:#08c332;
			}
		}
	}

	.submit{
		width:100%;
		border:none;
		margin-top:20px;
		color:#fff;
		background:#08c332;
		height:35px;
		outline:none;
	}
</style>