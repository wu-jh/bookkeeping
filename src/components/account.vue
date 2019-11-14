<template>
	<div class="warp">
		<div class="header">
			<div class="account-name">账户名</div>
			<div class="initial-balance">初始余额</div>
			<div class="balance">当前余额</div>
		</div>
		<div class="account-warp" v-for="(item,index) in account" :key="index" @click="$emit('show',index)">
			<div :class="['account',active === index?'active':active === ''?'':'active1']">
				<div class="account-name">{{ item.name }}</div>
				<div class="initial-balance">{{ item.initial_balance }}</div>
				<div class="balance">{{ item.balance }}</div>
				<div class="operation">
					<div class="details" @click="$emit('details',item.id)" @click.stop>详情</div>
					<div class="delete" @click="$emit('del',item.id)" @click.stop>删除</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name:'account',
		props:['account','active'],
		data(){
			return {
				// active:''
			}
		},
		methods:{
			show(index){
				// this.active = this.active === index?'':index;
			}
		}
	}
</script>

<style scoped lang="scss">
	$border:solid 1px;

	.header{
		height:35px;
		border-bottom:$border #ccc;
		display:flex;
		line-height:35px;
		text-align:center;
		font-size:0.8em;
		color:#08c332;
	}


	.account-warp{
		width:100%;
		height:45px;
		overflow:hidden;
		border-bottom:$border #ccc; 
		position:relative;
	}

	.account{
		width:100%;
		height:45px;
		display:flex;
		text-align:center;
		line-height:45px;
		font-size:0.8em;
		position:absolute;
		left:0px;
		top:0;
		
	}

	.active{
		left:-90px;
		transition:all 0.7s;
	}

	.active1{
		left:0;
		transition:all 0.7s;
	}

	.account-name{
		flex:1;
	}

	.balance{
		flex:1;
	}

	.initial-balance{
		flex:1;
	}

	.operation{
		width:90px;
		height:45px;
		position:absolute;
		right:-90px;
		top:0;
	}

	.details,.delete{
        width:45px;
        height:45px;
        text-align:center;
        line-height:45px;
        float:left;
        font-size:0.8em;
        color:#fff;
	}

	.details{
		background:#bbb;
	}

	.delete{
		background:#ff4d4d;
	}

</style>