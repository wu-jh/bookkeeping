<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<div>交易对象:</div>
				<input type="text"  v-model="billData.company_name">
				<div>记账金额:</div>
				<input type="text" v-model="billData.total_money">
				<div>备注:</div>
				<input type="text" v-model="billData.remark">
				<button class="btn" @click="change()">提交修改</button>
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
		name:'billChange',
		data(){
			return {
				title:'修改记账',
				id:'',
				billData:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			this.initialize()
		},
		methods:{
			change(){
				var preg = /^(\d+)(\.?)(\d*)$/;
				if(!preg.test(this.billData.total_money)){
					this.alert = '请输入正确金额';
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500);
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

				axios({
					method:'post',
					url:this.$store.state.url + '/api/record/update?id='+ this.id +'&token=' + this.token,
					params:{
						total_money:this.billData.total_money,
						company_name:this.billData.company_name,
						remark:this.billData.remark
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
						this.$router.go(-1)
					}
				})
				.catch(err=>console.log(err))
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
	}

	.btn{
		height: 35px;
	    width: 100%;
	    margin-bottom: 20px;
	    margin-top: 10px;
	    color: #fff;
	    background: #08c332;
	    border:none;
	    outline: none;
	}
</style>