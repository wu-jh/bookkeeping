<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/user')" :setUp="'创建账簿'" @click="add()"></top>
		<div class="content">
			<accountBookList :accountBooks="accountBooks" :defaultbook="defaultbook" @set="set($event)" @details="details($event)"></accountBookList>	
			<transition name="fade">
				<alert v-if="alertShow">{{ alert }}</alert>
			</transition>
			<delayed v-if="delayed"></delayed>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import accountBookList from '../components/accountBookList.vue'
	import alert from '../components/alert.vue'
	import delayed from '../components/delayed.vue'
	import axios from 'axios'

	export default {
		name:'accountBook',
		data(){
			return {
				title:'我的账簿',
				accountBooks:'',
				defaultbook:'',
				alert:'',
				alertShow:false,
				delayed:false,
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.getbooks()
		},
		methods:{
			set(id){
				this.delayed = true;
				axios({
					method:'post',
					url:this.$store.state.url + '/api/book/set-default?token=' + this.token,
					params:{book_id:id}
				})
				.then((res)=>{
					res = res.data;
					this.alert = res.data;
					this.alertShow = true;
					let rtime = setTimeout(()=>{
						this.alertShow = false;
						this.alert = '';
					},1500)
					this.getbooks()
					this.delayed = false;
				})
				.catch((err)=>{
					console.log(err);
					this.delayed = false;
				})
			},
			getbooks(){
				//所有账簿
				axios({
					method:'get',
					url:this.$store.state.url + '/api/book?token=' + this.token
				})
				.then((res)=>{
					res = res.data;
					this.accountBooks = res.data
				})
				.catch(err=>console.log(err))

				//当前账簿
				axios({
					method:'get',
					url:this.$store.state.url + '/api/book/get-default?token=' + this.token
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
			bottom,
			alert,
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

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}

</style>