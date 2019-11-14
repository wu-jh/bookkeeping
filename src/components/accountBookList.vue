<template>
	<div class="warp">
		<div class="header">
			<div class="name">账簿名称</div>			
			<div class="money">创建者</div>
			<div class="date">创建时间</div>
			<div class="default"></div>
		</div>
		<div v-for="(item,index) in accountBooks" :key="index" class="li" @click="$emit('details',item.id)">
			<div class="name">{{item.name}}</div>			
			<div class="money">{{item.user_name}}</div>
			<div class="date">{{item.created_at}}</div>
			<div v-if="item.id == defaultbook.id" class="default">默认</div>
			<div v-else ><button @click="$emit('set',item.id)" @click.stop>设为默认</button></div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'accountBookList',
		props:['accountBooks','defaultbook']
	}
</script>

<style scoped lang="scss">
	.warp{
		margin-top:10px;
		font-size:0.8em;
		.header{
			height:30px;
			line-height:30px;
			display:flex;
			text-align:center;
			color:#08c332;
			border-bottom:solid 1px #f5f5f5;
			div{
				flex:1;
			}
		}
		.li{
			height:40px;
			line-height:40px;
			display:flex;
			text-align:center;
			border-bottom:solid 1px #f5f5f5;
			overflow:hidden;
			div{
				flex:1;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
	}
	.default{
		color:#08c332;
	}

	button{
		border:none;
		background:none;
		outline:none;
		font-size:0.8em;
	}
</style>