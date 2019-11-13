<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)" ></top>
		<div class="content">
			<div class="form">
				<div>成员手机号:</div>
				<input type="text" v-model="tel" placeholder="需添加成员的手机号" maxlength="11">
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
		name:'addmember',
		data(){
			return {
				title:'添加成员',
				tel:'',
				id:'',
				alert:'',
				alertShow:false,
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id
		},
		methods:{
			submit(){
				if(this.tel == ''){
					this.alert = '请输入需添加成员的手机号';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}

				var preg = /^1(3\d|4[05-7]|5[0-35-9]|6[25-7]|7[0-35-8]|8[0-9]|9[189])(\d{8})$/;
				if(!preg.test(this.tel)){
					this.alert = '手机号格式不正确';
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
					url:this.$store.state.url + '/api/member/add?token=' + this.token,
					params:{
						book_id:this.id,
						mobile:this.tel
					}
				})
				.then((res)=>{
					res = res.data
					if(res.status){
						this.alert = res.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
							this.$router.push({'path':'/bookDetails',query:{id:this.id}})
						},500)
					}else{
						this.alert = '添加失败,该成员可能已经存在';
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