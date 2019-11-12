<template>
	<div class="con-warp">
		<div class="tips-warp">
			<div class="tips">
				<slot></slot>
			</div>
			<div class="confirm">
				<div class="false" @click="$emit('choice',0)">取消</div>
				<div class="true" @click="$emit('choice',1)">确认</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'confirm'
	}
</script>

<style scoped lang="scss">
	.con-warp{
		width:100%;
		height:100vh;
		position:absolute;
		left:0;
		top:0;
		z-index:3;
		background:rgba(0,0,0,0.4);
	}
	.tips-warp{
		width:220px;
		position:absolute;
		left:50%;
		top:50%;
		border-radius:5px;
		transform: translate(-50%,-50%);
		background:#fff;
		font-size:0.8em;
	}

	.tips{
		padding:18px; 
		text-align:center;
		border-bottom:solid 1px #aaa;
	}

	.confirm{
		text-align:center;
		color:#08c332;
		&::after{
			content:'';
			display:block;
			clear:both;
		}

		.false{
			width:50%;
			float:left;
			border-right:solid 1px #aaa;
			margin-left:-1px;
			padding:10px 0;
		}

		.true{
			width:50%;
			float:left;
			padding:10px 0;
		}
	}
</style>