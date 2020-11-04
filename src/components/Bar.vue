/* eslint-disable */
<script>
	import {Bar,mixins} from 'vue-chartjs'

	export default {
		name: 'bar',
		extends: Bar,
		type: Bar,
		props: [],
		mixins: [mixins.reactiveProp],
		mounted() {
			this.options = {
				responsive: false,
				scales: {
					yAxes: [
					{
						ticks: {
							min: 0,
							max: 50,
							stepSize: 4,
							callback: function(label)
							{
								return label + "H";
							}
						}
					}]
				},
				layout: {
				padding: {
						left: 1,
						right: 0,
						bottom: 0,
						top: 0,
				}
				}
			}
			this.renderChart(this.chartData, this.options)
		},
		data() {
			return {
			}
		},
		methods: {

			scalePlus() {
				this.options.scales.yAxes[0].ticks.max += 1;
				this.renderChart(this.chartData, this.options);
			},

			scaleMinus() {
				this.options.scales.yAxes[0].ticks.max -= 1;
				this.renderChart(this.chartData, this.options);
			}
		},
	}
</script>
