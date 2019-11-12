<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)" :setUp="setUp" @click="edit()"></top>
		<div class="content">
			<div class="form">
				<div>账户:</div>
				<input type="text" disabled v-model="billData.account_name">
				<div>创建时间:</div>
				<input type="text" disabled v-model="billData.created_at">
				<div>修改时间:</div>
				<input type="text" disabled v-model="billData.updated_at">
				<div>日期:</div>
				<input type="date" :disabled="isdisabled" v-model="billData.date">
				<div>金额:</div>
				<input type="text" :disabled="isdisabled" v-model="billData.money">
				<div>图片:</div>
				<div class="img">
					<div v-for="(item,index) in billData.images" class="img-warp">
						<img  :src="item.thumbnail" width="100%">
					</div>
					<div v-if="billData.images == ''">暂无图片</div>
				</div>
				<div v-if="!isdisabled">添加图片:</div>
				<div v-if="!isdisabled" class="img">
					<div v-for="(item,index) in avatar_url" class="img-warp">
						<img  :src="item" width="100%">
						<div class="cha fa fa-times" @click="cha(index)"></div>
					</div>
					<label>
						<span class="addImg iconfont ">&#xe649;</span>
						<input type="file" class="file" @change="img($event)" multiple>
					</label>
					<div v-if="!isdisabled"><button class="btn" @click="submit">确认修改</button></div>
				</div>
			</div>
			<alert v-if="alertShow">{{ alert }}</alert>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import alert from '../components/alert.vue'
	import axios from 'axios'

	export default {
		name:'billEdit',
		data(){
			return {
				title:'单条记账明细',
				billData:'',
				index:'',
				id:'',
				avatar_url:'',
				isdisabled:true,
				avatar_url:[],
				image_keys:[],
				setUp:'修改'
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			this.index = this.$route.query.index;
			this.Initialization()
		},
		methods:{
			Initialization(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/record/detail?id='+ this.id +'&token=' + this.token,
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.billData = res.data.items[this.index];
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
							},1500)
						}
					})
					.catch(err => console.log(err))
		        }
			},
			edit(){
				if(this.setUp == '修改'){
					this.isdisabled = false;
					this.setUp = '取消'
				}else{
					this.isdisabled = true;
					this.setUp = '修改'
				}
				
			},
			submit(){
				var preg = /^(\d+)(\.?)(\d*)$/;
				if(!preg.test(this.billData.money)){
					this.alert = '请输入正确金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}
				if(this.billData.money == ""){
					this.alert = '请输入记账金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}

				if(this.billData.date == ""){
					this.alert = '请输入日期';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					return;
				}

				axios({
					method:'post',
					url:this.$store.state.url + '/api/record/item/update?itemId='+ this.billData.id +'&token=' + this.token,
					params:{
						money:this.billData.money,
						account_id:this.billData.account_id,
						date:this.billData.date,
						image_keys:this.image_keys.join(',')
					}
				})
				.then((res)=>{
						res = res.data;
						this.alert = res.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
						if(res.status){
							this.$router.push({'path':'/billDetails',query:{id:this.id}})
						}
					})
					.catch(err=>console.log(err))
			}
		},
		components:{
			top,
			bottom,
			alert
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
		font-size:0.8em;
		input{
			width:100%;
			height:35px;
			box-sizing:border-box;
			padding-left:10px;
			display:block;
			margin:10px 0;
			border:solid 1px #ccc;
			outline:none;
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
			margin-bottom:10px;
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