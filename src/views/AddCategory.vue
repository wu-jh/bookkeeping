<template>
	<div>
		<top :title="title" :back="'ok'" @goback="$router.go(-1)"></top>
		<div class="content">
			<div class="form">
				<label>
					<div>名称:</div>
					<input type="text" placeholder="类别名称" class="name" v-model="name">
				</label>
				<label>
					<div>类型:</div>
					<select class="type" v-model="selected">
						<option disabled value="">请选择</option>
						<option value="1">收入</option>
						<option value="2">支出</option>
					</select>
				</label>
				<label>
					<div>排序值:</div>
					<input type="text" placeholder="排序值" class="name" v-model="sort">
				</label>
				<div><button class="btn" @click="submit">提交</button></div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>

<script>
	import top from '../components/top.vue'
	import bottom from '../components/bottom.vue'
	import axios from 'axios'

	export default {
		name:'addCategory',
		data(){
			return {
				title:'添加类别',
				name:'',
				selected:'',
				sort:0
			}
		},
		mounted(){
			this.$store.commit('isLogin',this)
		},
		methods:{
			submit(){
				if(this.name == ''){
					alert('名称不能为空');
					return;
				}
				if(this.selected == ''){
					alert('类型不能为空');
					return;
				}

				axios({
					method:'post',
					url:'http://jizhang-api-dev.it266.com/api/category/create?token=' + this.token,
					params:{
						parent_id:0,
						type:parseInt(this.selected),
						name:this.name,
						sort:parseInt(this.sort)
					}
				})
				.then((res)=>{
					res = res.data;
					if(res.status){
						alert('添加成功');
						this.$router.push('/categorySet')
					}else{
						console.log(res.data)
					}
				})
				.catch(err=>console.log(err))
			}
		},
		components:{
			top,
			bottom
		}
	}
</script>

<style scoped lang="scss">
	.content{
		height:calc(100vh - 100px);
		margin:50px 0;
		overflow:auto;
	}

	.form{
		width:80%;
		margin:auto;
		margin-top:30px;
	}

	.name,.sort{
		width:calc(100% - 10px);
		height:35px;
		outline:none;
		padding-left:10px;
		margin:10px 0;
		border:solid 1px #ccc;
		&:focus{
			border-color:#08c332;
		}
	}

	.type{
		width:100%;
		height:37px;
		margin:10px 0;
		padding-left:10px;
		outline:none;
		border:solid 1px #ccc;
		background:none;
	}

	.btn{
		width:100%;
		height:35px;
		outline:none;
		border:none;
		background:#08c332;
		color:#fff;
		margin-top:10px;
	}
</style>