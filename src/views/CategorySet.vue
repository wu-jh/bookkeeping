<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/category')" :setUp="'添加'" @click="addCategory()"></top>
		<div class="content">
			<tab :active="active" @expend="active=1" @income="active=2" :name_1="'支出'" :name_2="'收入'"></tab>
			<categorys :lis="active == 1?expend:income" @change="change($event)" @delete="del($event)"></categorys>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import tab from '../components/tab.vue'
	import bottom from '../components/bottom.vue'
	import categorys from '../components/setcategory.vue'
	import axios from 'axios'

	export default {
		name:'categorySet',
		data(){
			return {
				title:'类别设置',
				active:1,
				expend:'',
				income:''
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.getCategory()
		},
		methods:{
			addCategory(){
				this.$router.push('/addCategory');
			},
			change(e){
				this.$router.push({'path':'/categoryEdit',query:{id:e.id,name:e.name,sort:e.sort}})
			},

			del(e){
				var tmp = confirm('您确认要删除吗?')
				if(!tmp){
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/category/delete?id='+ e.id +'&token=' + this.token,
				})
				.then((res)=>{
					res = res.data;
					alert(res.data)
					this.getCategory()
				})
				.catch(err=>console.log(err))
			},
			getCategory(){
				axios({
					url:'http://jizhang-api-dev.it266.com/api/category?token=' + this.token,
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
					url:'http://jizhang-api-dev.it266.com/api/category?token=' + this.token,
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
			}
		},
		components:{
			top,
			tab,
			categorys,
			bottom
		}
	}
</script>

<style scoped lang="scss">
	.content{
		overflow:auto;
		height:calc(100vh - 100px);
		margin:50px 0;
	}

	.content::-webkit-scrollbar{ display: none;  }
</style>