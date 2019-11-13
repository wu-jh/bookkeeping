<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="imgEdit">
				<label>
					<div class="img"><img :src="user.avatar_url" height="100%"></div>
					<div>
						<i class="fa fa-pencil"></i>
						<span>点击修改图片</span>
						<input type="file"  style="display:none" @change="imgEdit($event)">
					</div>
				</label>
			</div>
			<div class="name">
				<div class="tips">请输入新的昵称:</div>
				<input type="text" v-model="user.nickname">
			</div>
			<div class="submit"><button @click="submit()">提交修改</button></div>
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
		name:'dataEdit',
		data(){
			return {
				title:'修改资料',
				token:'',
				fileKey:'',
				user:{},
				alert:'',
				alertShow:false,
				delayed:false,
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
			imgEdit(e){
				const file = e.target.files[0];
				const fd = new FormData();
				fd.append('file', file);
				this.delayed = true;
				axios({
					method: 'post',
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					url: this.$store.state.url + '/api/upload/image?token='+ this.token,
					data: fd
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.fileKey = res.data.file.fileKey;
						this.user.avatar_url = res.data.file.thumbnailUrl._temp;
					}else{
						this.alert = '上传失败';
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
					}
					this.delayed = false;
				})
				.catch((err) => {
					console.log(err);
					this.delayed = false;
				})
			},
			submit(){
				this.delayed = true;
				axios({
					method:'post',
					url:this.$store.state.url + '/api/user/profile/update?token='+ this.token,
					params:{
						nickname:this.user.nickname,
						avatar:this.fileKey
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
						this.$router.push('/user')
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
		.img{
			width:100px;
			height:100px;
			margin:auto;
			border-radius:50%;
			overflow:hidden;
			margin-top:50px;
			border: solid 1px #ddd;
   	 		margin-bottom: 5px;
		}
		.imgEdit{
			width:100px;
			margin:auto;
			font-size:0.7em;
			text-align:center;
			color:#08c332;
			i{
				margin-right:5px;
			}
		}
		.name{
			width:80%;
			margin:auto;
			font-size:0.8em;
			margin-top:20px;
			color:#333;
			span{
				display:inline-block;
				width:50px;
				font-size:1em;
			}

			.tips{
				margin-left:5px;
			}

			input{
				width:100%;
				height:35px;
				padding-left:10px;
				box-sizing:border-box;
				border:solid 1px #ccc;
				margin-top:10px;
				outline:none;
			}
		}
		.submit{
			width:80%;
			margin:auto;
			text-align:center;
			button{
				width:100%;
				height:35px;
				background:#08c332;
				font-size:0.9em;
				border:none;
				margin-top:10px;
				border:solid 1px #08c332;
				color:#fff;
				outline:none;
			}
		}
	}
</style>