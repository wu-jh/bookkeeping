<template>
	<div>
		<top :title="title"></top>
		<div class="content" @scroll.passive="getScroll($event)">
			<indexHeader :time="time"  :income="income" :expend="expend"></indexHeader>

			<div class="search-warp">
				<div class="search">
					<input type="text" placeholder="搜索交易对象" v-model="company_name">
					<button class="btn" @click="search()">搜索</button>
				</div>
				<div class="screen" @click="screen"><i class="fa fa-navicon"></i>筛选</div>
				<div v-show="open" class="open">
					<div class="date">
						<div class="start">
							<div>开始日期:</div>
							<input type="date" v-model="firstDay" @change="firstchange">
						</div>
						<div class="ent">
							<div>结束日期:</div>
							<input type="date" v-model="lastDay" @change="lastchange">
						</div>
					</div>

					<div class="option">
						<div class="li">
							<pulldown :options="form" :name="'类型'" :none="'y'" :active="form_value" :value="form_value" @click="formchange($event)"/>
						</div>
						<div class="li">
							<pulldown :options="type" :name="'收支'" :active="type_value" :value="type_value" @click="typechange($event)"/>
						</div>
						<div class="li">
							<pulldown :options="account" :name="'账户'" :active="account_value" :value="account_value" @click="accountchange($event)"/>
						</div>
						<div class="li">
							<pulldown :options="category" :name="'类别'" :active="category_value" :value="category_value" @click="categorychange($event)"/>
						</div>
					</div>
				</div>
			</div>

			<billList v-if="form_value == 1" :billList="bill" @click="details($event)"/>
			<billBook v-else :billList="written" @click="details($event)"/>
			<div id="more" :class="['more',page.currentPage == page.pageCount?'load':'']" >正在加载 <i class="fa fa-spinner fa-pulse"></i></div>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom :active="1"></bottom>
	</div>
	
</template>

<script>
	import top from '../components/top.vue'
	import indexHeader from '../components/indexHeader.vue'
	import billList from '../components/billList.vue'
	import billBook from '../components/billBook.vue'
	import pulldown from '../components/option.vue'
	import bottom from '../components/bottom.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'
	export default {
		name:'inedx',
		data(){
			return {
				token:'',
				title:'每日记账',
				income:'0.00',
				expend:'0.00',
				bill:[],
				written:{},
				time:{
					year:'',
					month:''
				},
				firstDay:'',
				lastDay:'',
				page:[],
				account:'',
				account_value:'',
				type:[
					{id:1,name:'收入'},
					{id:2,name:'支出'},
				],
				form:[
					{id:1,name:'实收实付'},
					{id:2,name:'账面'},
				],
				form_value:1,
				type_value:'',
				category:'',
				category_value:'',
		    	company_name:'',
		    	open:false,
		    	delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.getbill({});
			let date = new Date();
			this.time.month = date.getMonth() + 1 < 10 ?'0'+(datedate.getMonth()+1):date.getMonth() + 1;
			this.time.year = date.getFullYear();
			let nextMoth = new Date(date.getFullYear(),this.time.month,1)
			let oneDay=1000*60*60*24;
			var lastTime = new Date(nextMoth-oneDay);
			this.firstDay = this.time.year + '-' + this.time.month + '-01';
			this.lastDay = this.time.year + '-' + this.time.month + '-' + lastTime.getDate();
			axios({
					method:'get',
					url:this.$store.state.url + '/api/account?token=' + this.token
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.account = res.data;
					}
				})
				.catch(err=>console.log(err))

			axios({
				method:'get',
				url:this.$store.state.url + '/api/view/home?token=' + this.token,
			})
			.then((res)=>{
				res = res.data;
				if(res.status){
					var date = res.data.cash.month.split('-')
					this.time.year = date[0];
					this.time.month = date[1];
					this.income = res.data.cash.in;
					this.expend = res.data.cash.out;

				}
			})
			.catch(err=>console.log(err))
		},

		methods:{

			screen(){
				this.open = !this.open 
			},

			search(){
				let obj = {}
				this.bill = [];
				this.written = [];
				this.condition(obj)
			},

			firstchange(){
				let obj = {}
				this.bill = [];
				this.written = [];
				this.condition(obj)
			},

			lastchange(){
				this.bill = [];
				let obj = {}
				this.written = [];
				this.condition(obj)
			},

			typechange(e){
				this.type_value = e;
				if(e == 1){
					this.getCategory_1();
				}else if(e == 2){
					this.getCategory_2()
				}
				this.bill = [];
				this.written = [];
				this.category = '';
				this.category_value = ''
				
				let obj = {}
				this.condition(obj)
			},
			accountchange(e){
				this.account_value = e;
				let obj = {}
				this.bill = [];
				this.written = [];
				this.condition(obj)
			},
			categorychange(e){
				this.category_value = e;
				let obj = {}
				this.bill = [];
				this.written = [];
				this.condition(obj)
			},

			formchange(e){
				this.form_value = e;
				let obj = {}
				this.bill = [];
				this.written = [];
				this.condition(obj)
			},

			paging(e){
				let obj = {}
				obj['page'] = e;
				this.condition(obj);
			},

			getScroll(event){
				let scrollBottom =event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
				if(scrollBottom == 0 && this.page.currentPage != this.page.pageCount){
					let rtime = setTimeout(()=>{
						this.paging(this.page.nextPage)
					},500)
				}
			},

			details(e){
				this.$router.push({'path':'/billDetails',query:{id:e}})
			},
			//收入
			getCategory_1(){
				axios({
					url:this.$store.state.url + '/api/category?token=' + this.token,
					method:'get',
					params:{
						type:1,
						dataType:1
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.category=res.data;
					}
				})
				.catch(err=>console.log(err))
			},
			//支出
			getCategory_2(){
				axios({
					url:this.$store.state.url + '/api/category?token=' + this.token,
					method:'get',
					params:{
						type:2,
						dataType:1
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.category=res.data;
					}
				})
				.catch(err=>console.log(err))
			},

			//实收实付
			getbill(obj){
				if(this.bill.length == 0){
					this.delayed = true;
				}
				axios({
					method:'get',
					url:this.$store.state.url + '/api/record/real?token=' + this.token,
					params:obj
				})
				.then((res)=>{
					res = res.data;
					if(res.data.list.length != 0){
						this.bill = this.bill.concat(res.data.list);
					}else{
						this.bill = 1;
					}
					this.page = res.data.page;
					this.open = false;
					this.delayed = false;
				})
				.catch((res)=>{
					console.log(res);
					this.delayed = false;
				})
			},

			//账面
			accountBook(obj){
				if(this.written.length == 0){
					this.delayed = true;
				}
				axios({
					method:'get',
					url:this.$store.state.url + '/api/record/account?token=' + this.token,
					params:obj
				})
				.then((res)=>{
					res = res.data;
					if(res.data.list.length !=0){
						this.written = this.written.concat(res.data.list);
					}else{
						this.written = 1;
					}
					this.page = res.data.page;
					this.open = false;
					this.delayed = false;
				})
				.catch((res)=>{
					console.log(res);
					this.delayed = false;
				})
			},

			condition(obj){
				this.page = [];
				if(this.type_value){
					obj['type'] = this.type_value;
				}

				if(this.account_value){
					obj[' account_id'] = this.account_value;
				}

				if(this.category_value){
					obj[' category_id'] = this.category_value;
				}
				if(this.company_name){
					obj['company_name'] = this.company_name;
				}
				if(this.firstDay){
					obj['begin_date'] = this.firstDay;
				}
				if(this.lastDay){
					obj['end_date'] = this.lastDay;
				}
				
				if(this.form_value == 1){
					this.getbill(obj);
				}else{
					this.accountBook(obj);
				}
			},
			
		},
		components:{
			top,
			indexHeader,
			bottom,
			billList,
			pulldown,
			billBook,
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
	.search-warp{
		width:100%;
		height:35px;
		margin:10px auto;
		box-sizing:border-box;
		padding:0 5%;
		position:relative;
		&::after{
			content:'';
			display:block;
			clear:both;
		}
	}
	.search{
		height:35px;
		width:80%;
		float:left;
		position:relative;
		input{
			width:100%;
			height:35px;
			outline:none;
			border:solid 1px #ccc;
			box-sizing:border-box;
			padding-left:10px;
			&:focus{
				border-color:#08c332;
			}
		}
		.btn{
			width:50px;
			height:100%;
			border:none;
			background:#08c332;
			outline:none;
			color:#fff;
			position:absolute;
			right:0;
			top:0;
		}
	}

	.open{
		width:100%;
		position:absolute;
		box-sizing:border-box;
		padding-left:5%;
		top:35px;
		left:0;
		background:#fff;
		box-shadow: 0px 10px 10px -7px #ccc;
	}

	.screen{
		float:right;
		font-size:0.8em;
		line-height:35px;
		color:#08c332;
		i{
			margin-right:3px;
		}
	}

	.option{
		width:100%;
		margin:auto;
		margin-top:10px;
	}

	.date{
		width:100%;
		line-height:25px;
		margin:auto;
		font-size:0.8em;
		margin-top:10px;
		.start,.ent{
			display:flex;
			margin-top:10px;
		}
		input{
			height:25px;
			border:solid 1px #ccc;
			background:none;
			color:#000;
			text-align:center;
			line-height:25px;
			padding:0 10px;
			margin-left:5px;
			outline:none;
		}
	}

	.more{
		font-size:0.8em;
		color:#666;
		text-align:center;
		padding:10px 0;
	}

	.load{
		display:none;
	}
</style>