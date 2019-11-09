<template>
	<div class="warp">
		
		<div class="li header">
			<div class="name">昵称</div>
			<div class="tel">手机号</div>
			<div class="operation">操作</div>
		</div>
		<div v-if="members == ''" class="none">暂时没有任何成员,赶快去添加吧!</div>
		<div v-for="item in members" class="li">
			<div class="name">{{ item.nickname }}</div>
			<div class="tel">{{ item.mobile }}</div>
			<div class="operation"><button @click="$emit('del',item.id)">删除</button></div>
		</div>
		<div class="addmember" @click="$emit('addmember')">添加成员</div>
	</div>
</template>


<script >
	export default {
		name:'memberList',
		props:['members']
	}
</script>

<style scoped lang="scss">
	.warp{
		width:80%;
		margin:auto;
		font-size:0.8em;	
		margin-bottom:20px;
	}
	.title{
		margin:10px 0;
	}
	.name{
		flex:2;
	}

	.tel{
		flex:2;
	}
	.operation{
		text-align:center;
		flex:1;
		button{
			width:80%;
			max-width:60px;
			border:none;
			background:#08c332;
			color:#fff;
			font-size:0.8em;
			padding:2px 5px;
			border-radius:5px;
			outline:none;
		}
	}	
	.li{
		height:35px;
		line-height:35px;
		display:flex;
		text-align:left;
		div{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			border-bottom:solid 1px #ccc;
		}
	}
	.addmember{
		height:30px;
		line-height:30px;
		color:#fff;
		margin-top:10px;
		text-align:center;
		background:#08c332;
	}

	.none{
		height:30px;
		line-height:30px;
		text-align:center;
	}

	
</style>