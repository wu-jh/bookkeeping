<template>
	<div>
		<top :title="title"></top>
		<div class="content"  @scroll.passive="getScroll($event)">
			<tab :active="type_value" @expend="typechange(1)" @income="typechange(2)" :name_1="'收入'" :name_2="'支出'"></tab>
			<div class="search-warp">
				<div class="search">
					<input type="text" placeholder="搜索交易对象" v-model="company_name">
					<button class="btn" @click="search()"><i class="iconfont icon-sousuo"></i></button>
				</div>
				<div class="screen" @click="screen"><i class="iconfont icon-filter"></i>筛选</div>
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
							<pulldown :options="category" :name="'类别'" :active="category_value" :value="category_value" @click="categorychange($event)"/>
						</div>
					</div>
				</div>
			</div>
			<stayList :stayList="record"  @click="add($event)"></stayList>
			<div id="more" :class="['more',page.currentPage == page.pageCount?'load':'']" >正在加载 <i class="fa fa-spinner fa-pulse"></i></div>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom :active="4"></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import pulldown from '../components/option.vue'
	import stayList from '../components/stayList.vue'
	import tab from '../components/tab.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'

	export default {
		name:'stay',
		data(){
			return {
				title:'待收支',
				record:[],
				page:'',
				date:{
					year:'',
					month:''
				},
				category:'',
				category_value:'',
				open:false,
				type:[
					{id:2,name:'支出'},
					{id:1,name:'收入'},
				],
				type_value:1,
				firstDay:'',
				lastDay:'',
				company_name:'',
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.Initialization();
			this.getcategory({type:1});
			this.getdata({type:1});
		},
		methods:{
			Initialization(){
				let date = new Date();
				this.date.month = date.getMonth() + 1 < 10 ?'0'+(datedate.getMonth()+1):date.getMonth() + 1;
				this.date.year = date.getFullYear();
				let nextMoth = new Date(date.getFullYear(),this.date.month,1)
				let oneDay=1000*60*60*24;
				var lastTime = new Date(nextMoth-oneDay);
				this.firstDay = this.date.year + '-' + this.date.month + '-01';
				this.lastDay = this.date.year + '-' + this.date.month + '-' + lastTime.getDate();
			},

			screen(){
				this.open = !this.open 
			},
			getdata(obj){
				if(this.record.length == 0){
					this.delayed = true;
				}
				axios({
					method:'get',
					url:this.$store.state.url + '/api/record/account/waiting?token=' + this.token,
					params:obj
				})
				.then((res)=>{
					res = res.data;
					if(res.data.list.length != 0){
						this.record = this.record.concat(res.data.list);
					}else{
						this.record = 1;
					}
					this.page = res.data.page;
					this.open = false;
					this.delayed = false;
				})
				.catch((err)=>{
					console.log(err);
					this.delayed = false;
				})
			},

			getcategory(obj){
				axios({
					method:'get',
					url:this.$store.state.url + '/api/category?token=' + this.token,
					params:obj
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.category=res.data;
					}
				})
				.catch(err=>console.log(err))
			},

			search(){
				let obj = {}
				this.record = [];
				this.condition(obj)
			},

			firstchange(){
				let obj = {}
				this.record = [];
				this.condition(obj)
			},

			lastchange(){
				let obj = {}
				this.record = [];
				this.condition(obj)
			},

			typechange(e){
				this.type_value = e;
				this.getcategory({type:e});
				this.category = '';
				this.category_value = '';
				this.Initialization();
				let obj = {};
				this.record = [];
				this.condition(obj);
			},

			categorychange(e){
				this.category_value = e;
				let obj = {}
				this.record = [];
				this.condition(obj)
			},

			paging(e){
				let obj = {}
				obj['page'] = e;
				this.condition(obj)
			},

			getScroll(event){
				let scrollBottom =event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
				if(scrollBottom == 0 && this.page.currentPage != this.page.pageCount){
					let rtime = setTimeout(()=>{
						this.paging(this.page.nextPage)
					},300)
				}
			},

			
			add(e){
				this.$router.push({'path':'/addfollow',query:{id:e}});
			},

			condition(obj){
				this.page = '';
				obj['type'] = this.type_value;

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

				this.getdata(obj)
			},
		},
		components:{
			top,
			bottom,
			tab,
			stayList,
			pulldown,
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
		height:30px;
		width:80%;
		float:left;
		position:relative;
		input{
			width:100%;
			height:100%;
			outline:none;
			border:solid 1px #ccc;
			box-sizing:border-box;
			padding-left:10px;
			border-radius:15px;
			font-size:0.5em;
			&:focus{
				border-color:#08c332;
			}
		}
		.btn{
			width:40px;
			height:100%;
			border:none;
			background:none;
			outline:none;
			color:#ccc;
			border-radius:15px;
			position:absolute;
			right:0;
			top:0;
			color:#666;
		}
	}

	.open{
		width:100%;
		position:absolute;
		top:35px;
		left:0;
		z-index:2;
		background:#fff;
		box-shadow: 0px 10px 10px -7px #ccc;
		box-sizing:border-box;
		padding-left:5%;
	}

	.screen{
		float:right;
		font-size:0.8em;
		line-height:30px;
		color:#08c332;
		i{
			font-size:1.8em;
			vertical-align:middle;
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