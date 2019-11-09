<template>
	<div class="warp">
		<div class="name">{{name}} :</div>
		<ul>
			<li v-if="!none" @click="$emit('click','')" :class="active == ''?'active':''">全部</li>
			<li v-for="item in options" :class="active == item.id?'active':''" @click="$emit('click',item.id)">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'pulldown',
		props:['options','name','value','active','none'],
	}
</script>

<style scoped lang="scss">
	.warp{
		margin:10px 0;
		font-size:0.8em;
		line-height:22px;
		&::after{
			content:'';
			display:block;
			clear:both;
		}
	}
	.name{
		width:40px;
		float:left;
	}
	ul{
		float:left;
		width:calc(100% - 40px);
		&::after{
			content:'';
			display:block;
			clear:both;
		}
		li{
			float:left;
			margin-right:10px;
		}
	}

	.active{
		color:#08c332;
	}

</style>