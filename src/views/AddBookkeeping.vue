<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				
					<div>记账金额:</div>
					<input type="number" v-model="money">
				
					<div>实付金额:</div>
					<input type="number" v-model="realityMoney">

					<div>账户:</div>
					<select v-model="account_id">
						<option disabled value="">请选择</option>
						<option v-for="item in account" :value="item.id">{{ item.name }}</option>
					</select>

					<div>日期:</div>
					<input type="date" v-model="date">
				
					<div>交易对象:</div>
					<input type="text" v-model="obj">
				
					<div>备注:</div>
					<input type="text" v-model="remarks">
				
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
			<alert v-if="alertShow">{{ alert }}</alert>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom></bottom>
	</div>
</template>

<script >
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import alert from '../components/alert.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'

	export default {
		name:'addBookkeeping',
		data(){
			return {
				title:'添加记账',
				id:'',
				money:'',
				realityMoney:'',
				date:'',
				obj:'',
				remarks:'',
				image_keys:[],
				avatar_url:[],
				account:'',
				account_id:'',
				alert:'',
				alertShow:false,
				delayed:false,
			}
		},
		mounted(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			month  = (month+1) < 10 ? '0' + (month+1) : (month+1);
			var day = date.getDate();
			day  = day < 10 ? '0' + day : day;
			this.date = year + '-' + month + '-' + day;
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			axios({
				method:'get',
				url:this.$store.state.url + '/api/account?token=' + this.token
			})
			.then((res)=>{
				res = res.data;
				if(res.status){
					this.account = res.data;
				}else{
					this.alert = res.data;
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
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
						url: this.$store.state.url + '/api/upload/image?token='+ this.token,
						data: fd
					})
					.then((res)=>{
						res = res.data;
						if(res.status){
							if(res.data.status){
								this.image_keys.push(res.data.file.fileKey);
								this.avatar_url.push(res.data.file.thumbnailUrl._temp);
							}else{
								this.alert = res.data.message;
								this.alertShow = true;
								let rtime = setTimeout(()=>{
									this.alertShow = false;
									this.alert = '';
								},1500)
							}
							
						}else{
							this.alert = '上传失败';
							this.alertShow = true;
							let rtime = setTimeout(()=>{
								this.alertShow = false;
								this.alert = '';
							},1500);
						}
					})
					.catch(err => console.log(err))
		        }
			},
			submit(){
				var str = this.image_keys.join(',')
				var preg = /^(\d+)(\.?)(\d*)$/;
				if(!preg.test(this.money) || !preg.test(this.realityMoney)){
					this.alert = '请输入正确金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}
				if(this.money == ""){
					this.alert = '请输入记账金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}

				if(this.account_id == ""){
					this.alert = '请选择一个账户';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}

				if(this.realityMoney == ""){
					this.alert = '请输入实付金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}
				if(this.date == ""){
					this.alert = '请输入日期';
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
					url:this.$store.state.url + '/api/record/create?token='+ this.token,
					params:{
						total_money:this.money,
						money:this.realityMoney,
						account_id:this.account_id,
						category_id:this.id,
						date:this.date,
						company_name:this.obj,
						remark:this.remarks,
						image_keys:str
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
								this.$router.push('/category');
								this.delayed = false;
							},500)
						}else{
							this.alert = res.data;
							this.alertShow = true;
							let rtime = setTimeout(()=>{
								this.alertShow = false;
								this.alert = '';
								this.delayed = false;
							},1500)
						}
						
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
		margin:30px auto;
		font-size:0.8em;
		input{
			width:100%;
			margin:10px 0;
			height:33px;
			box-sizing:border-box;
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
			height:33px;
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
		height:33px;
		border:none;
		color:#fff;
		background:#08c332;
		outline:none;
		margin-top:20px;
	}
</style>