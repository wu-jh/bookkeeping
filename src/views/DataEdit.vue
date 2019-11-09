<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="imgEdit">
				<label>
					<div class="img"><img :src="user.avatar_url" height="100%"></div>
					<i class=" fa fa-pencil"></i>点击修改图片<input type="file"  style="display:none" @change="imgEdit($event)">
				</label>
			</div>
			<div class="name">
				<label><span>昵称:</span><input type="text" v-model="user.nickname"></label>
			</div>
			<div class="submit"><button @click="submit()">提交修改</button></div>
		</div>
		<bottom></bottom>	
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import axios from 'axios'
	export default {
		name:'dataEdit',
		data(){
			return {
				title:'修改资料',
				token:'',
				fileKey:'',
				user:{}
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			axios({
				url:'http://jizhang-api-dev.it266.com/api/user/profile?token=' + this.token,
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
				axios({
					method: 'post',
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					url: 'http://jizhang-api-dev.it266.com/api/upload/image?token='+ this.token,
					data: fd
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.fileKey = res.data.file.fileKey;
						this.user.avatar_url = res.data.file.thumbnailUrl._temp;
					}else{
						alert('上传失败');
					}
				})
				.catch(err => console.log(err))
			},
			submit(){
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/user/profile/update?token='+ this.token,
					params:{
						nickname:this.user.nickname,
						avatar:this.fileKey
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						alert(res.data);
						this.$router.push('/user')
					}else{
						alert(res.data)
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
		.img{
			width:100px;
			height:100px;
			margin:auto;
			border-radius:50%;
			overflow:hidden;
			margin-top:50px;
		}
		.imgEdit{
			width:100px;
			margin:auto;
			font-size:0.7em;
			text-align:center;
		}
		.name{
			text-align:center;
			margin-top:20px;
			span{
				display:inline-block;
				width:50px;
				font-size:1em;
			}
			input{
				width:150px;
				height:30px;
				padding-left:10px;
				border:solid 1px #ccc;
				outline:none;
			}
		}
		.submit{
			text-align:center;
			button{
				width:162px;
				height:30px;
				background:#08c332;
				font-size:0.9em;
				border:none;
				margin-left:50px;
				margin-top:10px;
				border:solid 1px #08c332;
				color:#fff;
				outline:none;
			}
		}
	}
</style>