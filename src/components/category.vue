<template>
	<div class="categorys">
		<ul class="ul">
			<li v-for="li in lis" class="li" @click="$emit('click',li.id)">
				<div class="category iconfont">&#xe610;</div>
				<div class="name">{{ li.name }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'categorys',
		props:['lis']
	}
</script>

<style scoped lang="scss">
	.ul{
		display: flex;
        flex-wrap: wrap;
	}

	.li{
        width: 25%;
        padding:15px 0;
        text-align:center;
	}

	.category{
		width:45px;
		height:45px;
		border-radius:100%;
		color:#fff;
		text-align:center;
		line-height:45px;
		margin:auto;
		background:#08c332;
		font-size:1.5em;
		margin-bottom:10px;
	}

	.name{
        font-size:0.8em;
        color:#666;
        margin:0 10px;
	}
</style>