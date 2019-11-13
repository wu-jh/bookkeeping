<template>
	<div class="warp">
		<div class="header">
			<!-- <div class="category">分类</div> -->
			<div class="name">账面金额</div>			
			<div class="money">实际金额</div>
			<div class="date">时间</div>
		</div>
		<div v-if="stayList == 1" class="none">暂无账单</div>
		<div v-if="stayList != 1" v-for="(item,index) in stayList"  class="li-warp" @click="show(index)">
			<div :class="['li',active === index?'active':'']">
				<!-- <div class="category">{{ categorys_name[item.category_id] }}</div> -->
				<div class="name">{{ item.total_money }}</div>			
				<div class="money">{{ item.paid_money }}</div>
				<div class="date">{{ item.date }}</div>
				<div class="operation" @click="$emit('click',item.id)">补充</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'stayList',
		props:['stayList'],
		data(){
			return {
				active:'',
				categorys_name:{aa:null},
			}
		},
		methods:{
			show(index){
				this.active = this.active === index?'':index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp{
		width:90%;
		margin:auto;
		margin-top:10px;
		.header{
			height:30px;
			line-height:30px;
			font-size:0.8em;
			display:flex;
			color:#08c332;
			border-bottom:solid 1px #f5f5f5;
		}
	}

	.li-warp{
		width:100%;
		height:40px;
		position:relative;
		overflow:hidden;
	}

	.li{
		width:100%;
		height:39px;
		line-height:40px;
		font-size:0.8em;
		display:flex;
		border-bottom:solid 1px #f5f5f5;
		position:absolute;
		left:0;
		top:0;
		transition:all 0.7s;
	}

	.active{
		left:-40px;
		transition:all 0.7s;
	}

	.name{
		flex:1
	}
	.money{
		flex:1
	}
	.date{
		flex:1;
	}

	.category{
		flex:1
	}

	.operation{
		width:40px;
		position:absolute;
		right:-40px;
		top:0;
		text-align:center;
		background:#08c332;
		color:#fff;
	}

	.page{
		height:30px;
		line-height:30px;
		font-size:0.8em;
		padding:10px 0px;
		color:#08c332;
		.count{
			float:left;
			margin-left:10px;
		}
		.prev{
			float:left;
			margin-right:10px;
		}
		.next{
			float:left;
			margin-right:10px;
		}
		.number{
			float:left;
			margin-right:10px;
			font-size:1.2em;
		}
	}

	.none{
		height:40px;
		line-height:40px;
		font-size:0.8em;
		text-align:center;
	}
</style>