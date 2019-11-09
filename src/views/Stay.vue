<template>
	<div>
		<top :title="title"></top>
		<div class="content">
			<tab :active="type_value" @expend="typechange(1)" @income="typechange(2)" :name_1="'收入'" :name_2="'支出'"></tab>
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
							<pulldown :options="category" :name="'类别'" :active="category_value" :value="category_value" @click="categorychange($event)"/>
						</div>
					</div>
				</div>
			</div>
			<stayList :stay="record"  :page="page" @prev="paging($event)" @next="paging($event)" @click="add($event)"></stayList>
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
	import axios from 'axios'

	export default {
		name:'stay',
		data(){
			return {
				title:'待收支',
				record:'',
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
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/record/account/waiting?token=' + this.token,
					params:obj
				})
				.then((res)=>{
					res = res.data;
					this.record = res.data;
					this.page = res.data.page;
					this.open = false;
				})
				.catch(err=>console.log(err))
			},

			getcategory(obj){
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/category?token=' + this.token,
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
				this.condition(obj)
			},

			firstchange(){
				let obj = {}
				this.condition(obj)
			},

			lastchange(){
				let obj = {}
				this.condition(obj)
			},

			typechange(e){
				this.type_value = e;
				this.getcategory({type:e});
				this.category = '';
				this.category_value = '';
				this.Initialization();
				let obj = {};
				this.condition(obj);
			},

			categorychange(e){
				this.category_value = e;
				let obj = {}
				this.condition(obj)
			},

			paging(e){
				let obj = {}
				if(this.category_value){
					 obj['category_id'] = this.category_value;
				}
				obj['type'] = this.active == 1? 2:1;
				obj['page'] = e;
				this.getdata(obj)
			},
			
			add(e){
				this.$router.push({'path':'/addfollow',query:{id:e}});
			},

			condition(obj){
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
			pulldown
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

</style>