<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.push('/accountBook')" :setUp="'删除账簿'" @click="del()"></top>
		<div class="content">
			<div class="form">
				<div>账簿名称:</div>
				<div class="warp">
					<input type="text" :disabled="active" v-model="information.name">
					<div v-if="active" class="modify active" @click="change">编辑</div>
					<div v-else class="modify" @click="submit">提交</div>
				</div>
				<div>创建者:</div>
				<div class="warp">
					<input type="text" disabled v-model="information.user_name">	
				</div>
				<div>创建时间:</div>
				<div class="warp">
					<input type="text" disabled v-model="information.created_at">
				</div>
			</div>
			<div  class="member">
				<div class="title">账簿成员:</div>
				<memberList v-if="jurisdiction" :members="member" @addmember="addmember" @del="del($event)"></memberList>
				<div v-else class="title">您没有查看成员的权限</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import memberList from '../components/memberList.vue'
	import axios from 'axios'

	export default {
		name:'addbook',
		data(){
			return {
				title:'账簿详情',
				information:'',
				id:'',
				active:true,
				member:'',
				jurisdiction:'',
			}
		},
		mounted(){
			this.$store.commit('isLogin',this);
			this.id = this.$route.query.id;
			this.getinfomation();
			this.getmember();
		},
		methods:{
			change(){
				this.active = false;
			},
			del(){
				if(!confirm('您确定要删除吗?')){
					return;
				}
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/book/delete?token=' + this.token,
					params:{
						book_id:this.id
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						alert('删除成功');
						this.$router.push('/accountBook')
					}else{
						alert(res.data);
					}
				})
				.catch(err=>console.log(err))
			},
			submit(){
				if(this.name == ''){
					alert('请输入账簿名称');
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/book/update?token=' + this.token,
					params:{
						book_id:this.information.id,
						book_name:this.information.name
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						alert('修改成功');
						this.$router.push('/accountBook')
					}else{
						alert(res.data);
						this.getinfomation();
						this.active = true;
					}
				})
				.catch(err=>console.log(err))
			},
			getinfomation(){
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/book/detail?token=' + this.token,
					params:{
						book_id:this.id
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.information = res.data;
					}else{
						alert(res.data);
						this.$router.go(-1)
					}
				})
				.catch(err=>console.log(err))
			},
			getmember(){
				axios({
					method:'get',
					url:'http://jizhang-api-dev.it266.com/api/member?token=' + this.token,
					params:{
						book_id:this.id
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						this.jurisdiction = true;
						this.member = res.data;
					}else{
						this.jurisdiction = false;
					}
				})
				.catch(err=>console.log(err))
			},
			addmember(){
				this.$router.push({'path':'/addmember',query:{id:this.id}})
			},
			del(id){
				if(!confirm('你确定要删除吗?')){
					return;
				}
				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/member/delete?token=' + this.token,
					params:{
						book_id:this.id,
						user_id:id
					}
				})
				.then((res)=>{
					res = res.data;
					alert(res.data)
					if(res.status){
						this.getinfomation();
						this.getmember();
					}
				})
				.catch(err=>console.log(err))
			}
		},
		components:{
			top,
			bottom,
			memberList
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
			display:block;
			margin:10px 0;
			box-sizing: border-box;
			border:solid 1px #ccc;
			height:30px;
			padding-left:10px;
			outline:none;
			background:none;
		}
	}

	.warp{
		position:relative;
	}

	.modify{
		width:50px;
		height:30px;
		text-align:center;
		line-height:30px;
		position:absolute;
		bottom:0;
		right:0;
		background:#08c332;
		color:#fff;
	}

	.active{
		background:#ccc;
	}

	.addmember{
		width:80%;
		margin:auto;
		font-size:0.8em;
	}

	.title{
		width:80%;
		margin:auto;
		font-size:0.8em;
		margin-top:10px;
	}
</style>