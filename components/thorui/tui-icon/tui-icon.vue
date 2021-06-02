<template>
	<text class="tui-icon-class tui-icon" :class="'tui-icon-' + name" :style="{ color: color || '#999', fontSize: size + unit, fontWeight: bold ? 'bold' : 'normal',margin:margin }"
	 @tap="handleClick"></text>

</template>

<script>
	export default {
		name: 'tuiIcon',
		props: {
			name: {
				type: String,
				default: ''
			},
			size: {
				type: [Number,String],
				default: 32
			},
			//px或者rpx
			unit:{
				type: String,
				default: 'rpx'
			},
			color: {
				type: String,
				default: '#999'
			},
			bold: {
				type: Boolean,
				default: false
			},
			margin: {
				type: String,
				default: "0"
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleClick() {
				this.$emit('click', {
					index: this.index
				});
			}
		}
	};
</script>

<style scoped>
	@import './icon.css';
</style>
