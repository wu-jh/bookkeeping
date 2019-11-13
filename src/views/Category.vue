<template>
	<div>
		<top :title="title"  :setUp="'设置'" @click="setUp()"></top>
		<div class="content">
			<tab :active="active" @expend="active=1" @income="active=2" :name_1="'支出'" :name_2="'收入'"></tab>
			<categorys :lis="active == 1?expend:income" @click="add($event)"></categorys>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom :active="2"></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import categorys from '../components/category.vue'
	import tab from '../components/tab.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'

	export default {
		name:'category',
		data(){
			return {
				title:'记一笔',
				active:1,
				expend:'',
				income:'',
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
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
					this.income=res.data;
				}
			})
			.catch(err=>console.log(err))

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
					this.expend=res.data;
				}
			})
			.catch(err=>console.log(err))
		},
		methods:{
			setUp(){
				this.$router.push('/categorySet')
			},
			add(e){
				this.$router.push({'path':'/addBookkeeping',query:{id:e}})
			}
		},
		components:{
			top,
			categorys,
			tab,
			bottom,
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
</style>