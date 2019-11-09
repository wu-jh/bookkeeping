<template>
	<div class="top">
		<div class="img"><img :src="user.avatar_url" height="100%"></div>
		<div class="data">
			<div class="name">{{ user.nickname }}</div>
			<div>手机号: {{ user.mobile }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'mytop',
		props:['user']
	}
</script>

<style scoped lang="scss">
	.top{
		background:#08c332;
		padding:20px 0;
		&:after{
			content:'';
			display:block;
			clear:both;
		}
	}

	.data{
		height:100%;
		line-height:30px;
		float:left;
		margin-left:20px;
		font-size: 0.8em;
	    color:#fff;
	    .name{
	    	font-size:1.5em;
	    	margin-top:10px;
	    }
	}

	.img{
		float:left;
		margin-left:20px;
		height:80px;
		width:80px;
		border-radius:50%;
		overflow:hidden;
		text-align:center;
		background:#fff;
	}
</style>