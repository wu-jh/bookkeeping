<template>
	<div class="top">
		<div v-if="back" class="go-back iconfont" @click="$emit('goback')">&#xeef0; 返回</div>
		<div  class="set iconfont" @click="$emit('click')">{{ setUp }}</div>
		<div class="title">{{title}}</div>
	</div>
</template>

<script>
	export default {
		name:'top',
		props:['title','back','setUp']
	}
</script>

<style scoped lang="scss">
	.top{
		width:100%;
		height:50px;
		line-height:50px;
		background: #08c332;
		color:#fff;
		font-size:1.1em;
		position:fixed;
		top:0;
		left:0;
		z-index:1;
	}

	.go-back{
		float:left;
		margin-left:10px;
		font-size:0.9em;
	}

	.title{
		width: 150px;
		margin:auto;
		text-align: center;
	}

	.set{
		float:right;
		margin-right:15px;
		font-size:0.9em;
	}
</style>