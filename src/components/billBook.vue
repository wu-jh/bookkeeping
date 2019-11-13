<template>
	<div class="warp">
		<div class="header">
			<div class="name">类型</div>			
			<div class="total-money">账面金额</div>
			<div class="paid-money">实收付金额</div>
			<div class="date">时间</div>
		</div>
		<div v-if="billList == 1" class="no">暂无账单</div>
		<div v-for="item in billList" class="li" @click="$emit('click',item.id)">
			<div class="name">{{ item.type == 1?'收入':'支出' }}</div>			
			<div class="total-money">{{ item.total_money }}</div>
			<div class="paid-money">{{ item.paid_money }}</div>
			<div class="date">{{ item.date }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'billList',
		props:['billList']
	}
</script>

<style scoped lang="scss">
	.warp{
		width:90%;
		margin:auto;
		margin-top:10px;
		font-size:0.8em;
		.header{
			height:30px;
			line-height:30px;
			display:flex;
			color:#08c332;
			border-bottom:solid 1px #f5f5f5;
		}
		.li{
			height:40px;
			line-height:40px;
			display:flex;
			border-bottom:solid 1px #f5f5f5;
		}
		
	}

	.name{
		flex:1;
	}
	.total-money{
		flex:1;
	}
	.paid-money{
		flex:1;
	}
	.date{
		flex:1;
		text-align:center;
	}

	.page{
		height:30px;
		line-height:30px;
		font-size:0.9em;
		padding:10px 0;
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

	.no{
		height:40px;
		line-height:40px;
		font-size:0.8em;
		text-align:center;
	}
</style>