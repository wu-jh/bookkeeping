<template>
	<div class="warp">
		<div v-for="li in ul" class="li" @click="$emit(li.event)">
			<div class="name"><i :class="'iconfont '+li.icon"></i>{{ li.text }}</div>
			<div class="see iconfont">&#xe6ab;</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'myli',
		props:['ul']
	}
</script>

<style scoped lang="scss">
	.warp{
		margin:10px 0;
		padding:0 15px;
		background:#fff;
	}
	.li{
		height:45px;
		line-height:45px;
		color:#999;
		overflow:hidden;
		border-bottom:solid 1px #e5e5e5;
		margin-bottom:-1px;
		&:last-child{
			border-bottom:none;
		}
	}

	.see{
		float:right;
	}

	.name{
		float:left;
		font-size:0.8em;
		.iconfont{
			margin-right:5px;
			color:#08c332;
			font-size:1em;
		}
	}
</style>