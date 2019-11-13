<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<label>
					<div>名称:</div>
					<input type="text" placeholder="类别名称" class="name" v-model="name">
				</label>
				<label>
					<div>排序值:</div>
					<input type="text" placeholder="排序值" class="name" v-model="sort">
				</label>
				<div><button class="btn" @click="submit">提交</button></div>
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
		name:'addCategory',
		data(){
			return {
				title:'添加类别',
				name:'',
				sort:0,
				id:'',
				alertShow:false,
				alert:'',
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			var value = this.$route.query;
			this.name = value.name;
			this.id = value.id;
			this.sort = value.sort;

		},
		methods:{
			submit(){
				if(this.name == ''){
					this.alert = '请输入名称';
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
					url:this.$store.state.url + '/api/category/update?id='+ this.id +'&token=' + this.token,
					params:{
						name:this.name,
						sort:parseInt(this.sort)
					}
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
						this.$router.push('/categorySet')
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
	}

	.name,.sort{
		width:calc(100% - 10px);
		height:35px;
		outline:none;
		padding-left:10px;
		margin:10px 0;
		border:solid 1px #ccc;
		&:focus{
			border-color:#08c332;
		}
	}

	.btn{
		width:100%;
		height:35px;
		outline:none;
		border:none;
		background:#08c332;
		color:#fff;
		margin-top:10px;
	}
</style>