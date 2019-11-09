<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div class="warning" v-show="warning">{{ warning }}</div>
				<input type="password" class="tel" placeholder="联系方式" v-model="tel" >
				<textarea   class="feedback" placeholder="说说您的建议" v-model="feedback"></textarea>
				<button class="btn1" @click="submit">提交</button>
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
		name:'pwdEdit',
		data(){
			return {
				title:'意见反馈',
				warning:'',
				tel:'',
				feedback:''
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
		},
		methods:{
			submit(){
				if(this.feedback == ''){
					alert('您还没有写出您的建议呢!');
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/feedback/add?token=' + this.token,
					params:{
						content:this.feedback,
						contact:this.tel
					}
				})
				.then((res)=>{
					res=res.data;
					alert(res.data);
					this.$router.push('/user')
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
	}

	.tel{
		width:90%;
		margin:auto;
		height:35px;
		display:block;
		outline:none;
		border:solid 1px #ccc;
		margin-bottom:5px;
		padding-left:10px;
		&:focus{
			border-color:#08c332;
		}
	}

	.btn1{
		display:block;
		width:calc(90% + 24px);
		height:35px;
		margin:0 auto 10px;
		border:none;
		outline:none;
		font-size:1.1em;
		margin-top:10px;
		background:#08c332;
		color:#fff;
	}

	.feedback{
		width:90%;
		height:150px;
		margin:auto;
		display:block;
		outline:none;
		border:solid 1px #ccc;
		margin-bottom:5px;
		padding-left:10px;
		padding-top:10px;
		resize:none;
		&:focus{
			border-color:#08c332;
		}
	}
</style>