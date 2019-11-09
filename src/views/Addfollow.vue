<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				
					<div>金额:</div>
					<input type="number" v-model="money">

					<div>账户:</div>
					<select v-model="account_id">
						<option disabled value="">请选择</option>
						<option v-for="item in account" :value="item.id">{{ item.name }}</option>
					</select>

					<div>日期:</div>
					<input type="date" v-model="date">
				
				<div>图片:</div>
				<div class="img">
					<div v-for="(item,index) in avatar_url" class="img-warp">
						<img  :src="item" width="100%">
						<div class="cha fa fa-times" @click="cha(index)"></div>
					</div>
					<label>
					<span class="addImg iconfont ">&#xe649;</span>
					<input type="file" class="file" @change="img($event)" multiple>
				</label>
				<div><button class="btn" @click="submit">添加</button></div>
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script >
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import axios from 'axios'

	export default {
		name:'addBookkeeping',
		data(){
			return {
				title:'添加后续记账',
				id:'',
				money:'',
				date:'',
				image_keys:[],
				avatar_url:[],
				account:'',
				account_id:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
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
		},
		methods:{
			cha(index){
				this.avatar_url.splice(index,1);
			},
			img(e){
				const files = e.target.files;
		        for(var i=0;i<files.length;i++){
		        	const fd = new FormData();
		        	fd.append('file', files[i]);
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
							if(res.data.status){
								this.image_keys.push(res.data.file.fileKey);
								this.avatar_url.push(res.data.file.thumbnailUrl._temp);
							}else{
								alert(res.data.message)
							}
							
						}else{
							alert('上传失败');
						}
					})
					.catch(err => console.log(err))
		        }
			},
			submit(){
				var preg = /^(\d+)(\.?)(\d*)$/;
				if(!preg.test(this.money)){
					alert('请输入正确的金额');
					return;
				}

				if(this.account_id == ""){
					alert('请选择一个账户');
					return;
				}

				if(this.money == ""){
					alert('请输入金额');
					return;
				}
				if(this.date == ""){
					alert('请输入日期');
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/record/sequel?token='+ this.token,
					params:{
						record_id:this.id,
						money:this.money,
						account_id:this.account_id,
						date:this.date,
						image_keys:this.image_keys.join(',')
					}
				})
				.then((res)=>{
						res = res.data;
						if(res.status){
							alert(res.data);
							this.$router.push('/');
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
		overflow:auto;
	}

	.form{
		width:70%;
		margin:30px auto;
		font-size:0.8em;
		input{
			width:calc(100% - 10px);
			margin:10px 0;
			height:30px;
			outline:none;
			padding-left:10px;
			border:solid 1px #ccc;
			background:none;
			&:focus{
				border-color:#08c332;
			}

		}

		select{
			width:100%	;
			margin:10px 0;
			height:30px;
			outline:none;
			padding-left:10px;
			border:solid 1px #ccc;
			background:none;
			&:focus{
				border-color:#08c332;
			}
		}

		.addImg{
			width:50px;
			height:50px;
			line-height:50px;
			text-align:center;
			font-size:60px;
			vertical-align:top;
		}

		.file{
			display:none;
		}

		.img{
			margin-top:10px;
			.img-warp{
				display:inline-block;
				width:50px;
				position:relative;
				.cha{
					width:10px;
					height:10px;
					position:absolute;
					left:0;
					top:0;
					color:red;
				}
			}
		}
	}

	.btn{
		width:100%;
		height:30px;
		border:none;
		color:#fff;
		background:#08c332;
		outline:none;
		margin-top:20px;
	}
</style>