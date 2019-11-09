<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div>账簿名称:</div>
				<input type="text" v-model="name" placeholder="账簿名称">
				<button class="submit" @click="submit">添加</button>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import axios from 'axios'

	export default {
		name:'addbook',
		data(){
			return {
				title:'创建账簿',
				name:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
		},
		methods:{
			submit(){
				if(this.name == ''){
					alert('请输入账簿名称');
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/book/create?token=' + this.token,
					params:{
						name:this.name
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						alert('创建成功');
						this.$router.push('/accountBook')
					}
				})
				.catch(err=>console.log(err))
			}
		},
		components:{
			top,
			bottom
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