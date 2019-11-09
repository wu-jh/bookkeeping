<template>
	<div class="tab-warp">
		<div class="tab">
			<div :class="['expend',active == 1?'active':'']" @click="$emit('expend')">{{ name_1 }}</div>
			<div :class="['income',active == 2?'active':'']" @click="$emit('income')">{{ name_2 }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'tab',
		props:['active','name_1','name_2']
	}
</script>

<style scoped lang="scss">
	.tab-warp{
		height:35px;
		line-height: 35px;
		border-bottom:solid 1px #ccc;
		font-size:0.9em;
		color:#555;
	}

	.tab{
		width:60%;
		margin:auto;
		text-align:center;
		&:after{
			content:'';
			display:block;
			clear:both;
		}
	}

	.expend{
		width:50%;
		float:left;
	}

	.income{
		width:50%;
		float:left;
	}

	.active{
		color:#08c332;
		border-bottom:solid 1px #08c332;
	}
</style>