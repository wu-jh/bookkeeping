<template>
	<div class="categorys">
		<ul class="ul">
			<li v-for="(li,index) in lis" class="li" @click="show(index)" >
				<div class="warp">
					<div class="name">{{ li.name }}</div>
					<div :class="['operation',active === index?'active':'']">
						<div class="change" @click="$emit('change',li)" @click.stop>修改</div>
						<div class="delete" @click="$emit('delete',li)" @click.stop>删除</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'categorys',
		props:['lis'],
		data(){
			return {
				active:''
			}
		},
		methods:{
			show(index){
				this.active = this.active === index?'':index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.li{
		height:50px;
		line-height:50px;
		border-bottom:solid 1px #eee;
		width:100%;
		overflow:hidden;
		position:relative;
	}
	.warp{
		width:100%;
		font-size:1em;
		color:#666;
		overflow:hidden;
		position:absolute;
		left:0;
		top:0;
	}

	.name{
		width:100%;
		padding-left:20px;
		box-sizing:border-box;
		float:left;
	}

	.operation{
		width:100px;
		height:50px;
		position:absolute;
		right:-100px;
		top:0;
		transition:all 0.7s;
	}

	.change,.delete{
        width:50px;
        text-align:center;
        float:left;
        font-size:0.8em;
        color:#fff;
	}

	.change{
		background:#bbb;
	}

	.delete{
		background:#ff4d4d;
	}

	.active{
		right:0;
		transition:all 0.7s;
	}

</style>