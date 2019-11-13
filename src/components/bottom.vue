<template>
	<div class="bottom">
		<ul class="warp">
			<li :class="active == 1?'active':''" @click="active == 1?'return false':home()">
				<div class="iconfont icon-mingxi"></div>
				<div class="text">明细</div>
			</li>
			<li :class="active == 4?'active':''" @click="active == 4?'return false':stay()">
				<div class="iconfont icon-daizhifu"></div>
				<div class="text">待收付</div>
			</li>
			<li :class="active == 2?'active':''" @click="active == 2?'return false':add()">
				<div class="iconfont icon-jizhang"></div>
				<div class="text">记账</div>
			</li>
			<li  :class="active == 3?'active':''" @click="active == 3?'return false':my()">
				<div class="iconfont icon-wode1"></div>
				<div class="text">我的</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'bottom',
		props:['active'],
		methods:{
			home(){
				this.$router.push('/')
			},
			add(){
				this.$router.push('/category')
			},
			my(){
				this.$router.push('/user')
			},
			stay(){
				this.$router.push('/stay')
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom{
		width:100%;
		height:50px;
		font-size:1.1em;
		position:fixed;
		bottom:0;
		left:0;
		border-top:1px solid #dedede;
		z-index:1;
		background:#f5f5f5;
		font-size:0.85em;
		color:#333;
	}

	.warp{
		width:100%;
		display:flex;
		position:absolute;
		left:0;
		top:50%;
		transform: translateY(-50%);
		li{
			flex:1;
			text-align:center;
			margin-top:2px;
		}
	}

	.active{
		color:#08c332;
	}

	.text{
		font-size:0.8em;
		margin-top:5px;			
	}
</style>