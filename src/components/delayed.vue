<template>
	<div class="load-warp">
		<div class="load"><i class="fa fa-spinner fa-pulse"></i></div>
	</div>
</template>

<script>
	export default {
		name:'delayed'
	}
</script>

<style scoped lang="scss">
	.load-warp{
		width:100%;
		height:calc(100vh - 100px);
		margin:50px 0;
		position:absolute;
		left:0;
		top:0;
		z-index:3;
		background:rgba(0,0,0,0);
	}

	.load{
		width:60px;
		height:60px;
		text-align:center;
		line-height:75px;
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		i{
			font-size:40px;
			color:#666;
		}
	}
</style>