<template>
	<div class="warp">
		<div class="logo"><img src='img/logo.png' height="100%"></div>
		<div class="form">
			<div class="warning" v-show="warning">{{ warning }}</div>
			<input type="text" class="uname" placeholder="手机号" :value="value.tel" @input="$emit('tel', $event.target.value)" @blur="$emit('telblur')">
			<input type="password" class="pwd" placeholder="密码" :value="value.pwd" @input="$emit('pwd', $event.target.value)" @blur="$emit('pwdblur')">
			<input v-if="img" class="img-code" type="text" placeholder="图片验证码" :value="value.img" @input="$emit('imgcode', $event.target.value)" @blur="$emit('imgblur')">
			<span v-if="img" class="img" @click="$emit('img')"><img :src="img.url" height="100%" width="100%"></span>
			<input v-if="sms" class="msg-code" type="text" placeholder="短信验证码" :value="value.sms" @input="$emit('smscode', $event.target.value)" @blur="$emit('smsblur')">
			<span v-if="sms" class="msg" @click="$emit('sms')">发送验证码</span>
			<button class="btn1" @click="$emit('submit')">{{ btn1 }}</button>
			<button v-if="btn2" class="btn2" @click="$emit('register')"><p>{{ btn2 }}</p></button>
			<div class="link" @click="$emit('link')">{{ link }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'captcha',
		props:['img','sms','btn1','btn2','link','value','warning']
	}
</script>

<style scoped lang="scss">
	.logo{
		height:80px;
		text-align: center;
		margin-top:20px;
	}

	.form{
		width:80%;
		margin:auto;
		margin-top:20px;
		.msg-code,.img-code{
			height:35px;
			width:65%;
			box-sizing: border-box;
			padding-left:20px;
			border:solid 1px #ccc;
			outline:none;
			margin-bottom:5px;
			&:focus{
				border-color:#08c332;
			}
		}

		.uname,.pwd{
			width:100%;
			margin:auto;
			box-sizing: border-box;
			height:35px;
			display:block;
			outline:none;
			border:solid 1px #ccc;
			margin-bottom:5px;
			padding-left:20px;
			&:focus{
				border-color:#08c332;
			}
		}

		.msg{
			width:35%;
			height:35px;
			display:inline-block;
			text-align:center;
			font-size:0.8em;
			background:#08c332;
			color:#fff;
			line-height:37px;
			vertical-align:top;
		}

		.img{
			width:35%;
			height:35px;
			box-sizing: border-box;
			display:inline-block;
			text-align:center;
			font-size:0.8em;
			color:#fff;
			line-height:37px;
			vertical-align:top;
		}

		button{
			display:block;
			width:100%;
			box-sizing: border-box;
			height:35px;
			margin:0 auto 10px;
			border:none;
			outline:none;
			font-size:1.1em;
		}

		.btn1{
			margin-top:10px;
			background:#08c332;
			color:#fff;
		}

		.btn2{
			background:#fff;
			border:solid 1px #08c332;
			color:#08c332;
		}

		.link{
			text-align:center;
			font-size:0.9em;
			color:#666;
		}
		.warning{
			width:calc(90% + 10px);
			margin:auto;
			height:20px;
			line-height:20px;
			border:solid 1px red;
			color:red;
			margin-bottom:5px;
			font-size:0.8em;
			padding-left:10px;
			&::before{
				content:'!'
			}
		}
	}


</style>