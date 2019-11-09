<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/user')" :setUp="'创建账簿'" @click="add()"></top>
		<div class="content">
			<accountBookList :accountBooks="accountBooks" :defaultbook="defaultbook" @set="set($event)" @details="details($event)"></accountBookList>	
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import accountBookList from '../components/accountBookList.vue'
	import axios from 'axios'

	export default {
		name:'accountBook',
		data(){
			return {
				title:'我的账簿',
				accountBooks:'',
				defaultbook:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.getbooks()
		},
		methods:{
			set(id){
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/book/set-default?token=' + this.token,
					params:{book_id:id}
				})
				.then((res)=>{
					res = res.data;
					alert(res.data);
					this.getbooks()
				})
				.catch(err=>console.log(err))
			},
			getbooks(){
				//所有账簿
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/book?token=' + this.token
				})
				.then((res)=>{
					res = res.data;
					this.accountBooks = res.data
				})
				.catch(err=>console.log(err))

				//当前账簿
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/book/get-default?token=' + this.token
				})
				.then((res)=>{
					res = res.data;
					this.defaultbook = res.data
				})
				.catch(err=>console.log(err))
			},
			add(){
				this.$router.push('addBook')
			},
			details(id){
				this.$router.push({'path':'/bookDetails',query:{id:id}});
			}
		},
		components:{
			top,
			accountBookList,
			bottom
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