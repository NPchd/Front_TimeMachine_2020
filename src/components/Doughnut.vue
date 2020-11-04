
/* eslint-disable */
<script>
	import {Doughnut , mixins} from 'vue-chartjs'
	export default {
		name : 'doughnut',
		extends: Doughnut,
		type : Doughnut,
		props: [],
		mounted() {
			this.options = {
				responsive:false ,
			}
			this.renderChart(this.data  ,this.options)
		},
		data() {
			console.log(this.data);
			return {
			}
		},
		methods: {
			onResize(chart , size) {
			},
		}
	}
</script>

