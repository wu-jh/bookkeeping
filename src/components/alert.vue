<template>
	<div class="alert-warp">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name:'alert'
	}
</script>

<style scoped lang="scss">
	.alert-warp{
		padding:10px 25px;
		border-radius:5px;
		position:absolute;
		text-align:center;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		background:rgba(0,0,0,0.7);
		color:#fff;
		font-size:0.8em;
	}
</style>