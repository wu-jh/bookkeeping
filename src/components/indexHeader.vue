<template>
	<div class="header">
		<ul>
			<li>
				<div>{{ time.year }}</div>
				<div class="num">{{ time.month }}<span>月</span></div>
			</li>
			<li>
				<div>收入</div>
				<div class="num">{{ income }}</div>
			</li>
			<li>
				<div>支出</div>
				<div class="num">{{ expend }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'indexHader',
		props:['time','income','expend']
	}
</script>

<style scoped lang="scss">
	.header{
		background:#08c332;
		color:#fff;
		font-size:0.8em;
		padding:15px 0;
		ul{
			display:flex;
			li{
				flex:1;
				overflow:hidden;
				text-align:center;
			}
		}
	}

	.num{
		font-size:1.5em;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		margin-top:5px;
		span{
			font-size:0.7em;
		}
		i{
			font-size:0.5em;
			margin-left:3px;
			vertical-align:top;
		}
	}
</style>