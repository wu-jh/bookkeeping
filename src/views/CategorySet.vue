<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/category')" :setUp="'添加'" @click="addCategory()"></top>
		<div class="content">
			<tab :active="active" @expend="active=1" @income="active=2" :name_1="'支出'" :name_2="'收入'"></tab>
			<categorys :lis="active == 1?expend:income" @change="change($event)" @delete="del($event)"></categorys>
			<alert v-if="alertShow">{{ alert }}</alert>
			<confirm v-if="confirmShow" @choice="choice($event)">{{ confirm }}</confirm>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import tab from '../components/tab.vue'
	import bottom from '../components/bottom.vue'
	import alert from '../components/alert.vue'
	import confirm from '../components/confirm.vue'
	import categorys from '../components/setcategory.vue'
	import axios from 'axios'

	export default {
		name:'categorySet',
		data(){
			return {
				title:'类别设置',
				active:1,
				expend:'',
				income:'',
				alert:'',
				alertShow:false,
				confirm:'',
				confirmShow:false,
				id:'',
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
				this.confirm = '您确定要删除吗?';
				this.confirmShow = true;
				this.id = e;
			},
			getCategory(){
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
			choice(event){
				if(event){
					axios({
						method:'post',
						url:this.$store.state.url + '/api/category/delete?id='+ this.id.id +'&token=' + this.token,
					})
					.then((res)=>{
						res = res.data;
						this.alert = res.data;
						this.alertShow = true;
						let rtime = setTimeout(()=>{
							this.alertShow = false;
							this.alert = '';
						},1500)
						this.getCategory()
					})
					.catch(err=>console.log(err))
					this.confirm = '';
					this.confirmShow = false;
				}else{
					this.confirm = '';
					this.confirmShow = false;
				}
			}
		},
		components:{
			top,
			tab,
			categorys,
			bottom,
			alert,
			confirm
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