<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)" :setUp="'修改'" @click="change"></top>
		<div class="content">
			<div class="form">
				<div>记账人昵称:</div>
				<input type="text"  disabled v-model="billData.user_nickname">
				<div>类别名称:</div>
				<input type="text"  disabled v-model="billData.category_name">
				<div>交易对象:</div>
				<input type="text"  disabled  v-model="billData.company_name">
				<div>收支类型:</div>
				<input type="text"  disabled v-model="billData.type_string">
				<div>记账金额:</div>
				<input type="text"  disabled v-model="billData.total_money">
				<div>实收付金额:</div>
				<input type="text"  disabled v-model="billData.paid_money">
				<div>添加时间:</div>
				<input type="text"  disabled v-model="billData.created_at">
				<div>修改时间:</div>
				<input type="text"  disabled v-model="billData.updated_at">
				<div>备注:</div>
				<input type="text"  disabled v-model="billData.remark">
				<div class="record-warp">
					<div>记账记录:</div>
					<div class="warp" v-for="(item,index) in billData.items" @click="show(index)">
						<div :class="['record',active === index?'active':'']" >
							<div class="name">{{ item.account_name }}</div>
							<div class="money"><i class="fa fa-yen"></i>{{ item.money }}</div>
							<div class="date">{{ item.date }}</div>
							<div class="operation" >
								<div class="details" @click="edit(index)" @click.stop>详情</div>
								<div class="del" @click="del(item.id)" @click.stop>删除</div>
							</div>
						</div>
					</div>
				</div>
				<button class="btn" @click="delAll()">删除所有记录</button>
			</div>
			<alert v-if="alertShow">{{ alert }}</alert>
			<confirm v-if="confirmShow" @choice="choice($event)">{{ confirm }}</confirm>
			<confirm v-if="confirmShow1" @choice="choice1($event)">{{ confirm1 }}</confirm>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import alert from '../components/alert.vue'
	import confirm from '../components/confirm.vue'
	import axios from 'axios'

	export default {
		name:'billDetails',
		data(){
			return {
				title:'记账详情',
				id:'',
				billData:'',
				active:'',
				alert:'',
				alertShow:false,
				confirm:'',
				confirmShow:false,
				confirm1:'',
				confirmShow1:false,
				account_id:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			this.initialize()
		},
		methods:{
			show(index){
				this.active = this.active === index?'':index;
				
			},
			change(){
				this.$router.push({'path':'/billModify',query:{id:this.id}})
			},
			delAll(){
				this.confirm = '您确定要删除吗?';
				this.confirmShow = true;
			},
			del(id){
				this.confirm1 = '您确定要删除吗?';
				this.confirmShow1 = true;
				this.account_id = id;
			},
			initialize(){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/record/detail?id='+ this.id +'&token=' + this.token,
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.billData = res.data
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
			edit(index){
				this.$router.push({'path':'/BillEdit',query:{id:this.id,index:index}})
			},

			choice(event){
				if(event){
					axios({
						method:'post',
						url:this.$store.state.url + '/api/record/delete?id='+ this.id +'&token=' + this.token
					})
					.then((res)=>{
						res = res.data;
						if(res.status){
							this.alert = res.data;
							this.alertShow = true;
							let rtime = setTimeout(()=>{
								this.alertShow = false;
								this.alert = '';
								this.$router.push('/')
							},500)
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
					this.confirm = '';
					this.confirmShow = false;
				}else{
					this.confirm = '';
					this.confirmShow = false;
				}
			},

			choice1(event){
				if(event){
					axios({
						method:'post',
						url:this.$store.state.url + '/api/record/item/delete?itemId='+ this.account_id +'&token=' + this.token
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
							this.initialize();
						}
					})
					.catch(err=>console.log(err))
					this.confirm1 = '';
					this.confirmShow1 = false;
				}else{
					this.confirm1 = '';
					this.confirmShow1 = false;
				}
			}

		},
		components:{
			top,
			bottom,
			alert,
			confirm
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
	}

	.record-warp{
		margin-bottom:20px;
	}

	.record{
		width:100%;
		height:40px;
		line-height:40px;
		display:flex;
		text-align:center;
		position:absolute;
		top:0;
		left:0;
		transition: all 0.7s;
		.name{
			flex:1;
		}
		.money{
			flex:1;
		}

		.date{
			flex:1;
		}
	}

	.details{
		width:40px;
		height:40px;
		float:left;
		background:#dedede;
		color:#fff;
	}

	.del{
		float:left;
		width:40px;
		height:40px;
		color:#fff;
		background:#ff4d4d;
	}

	.btn{
		height: 35px;
	    width: 100%;
	    margin-bottom: 20px;
	    margin-top: 10px;
	    color: #08c332;
	    background: none;
	    border: solid 1px #08c332;
	    outline: none;
	    border-radius: 20px;
	}

	.warp{
		height:40px;
		width:100%;
		position:relative;
		top:0;
		left:0;
		overflow:hidden;
		border-bottom:solid 1px #dedede;
	}



	.operation{
		height:40px;
		width:80px;
		line-height:40px;
		text-align:center;
		position:absolute;
		top:0;
		right:-80px;
	}

	.active{
		left:-80px;
		transition: all 0.7s;
	}

</style>