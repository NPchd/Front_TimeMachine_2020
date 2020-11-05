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
					yAxes: [{
						ticks: {
							min: 0,
							max: 24,
							stepSize: 4,
							callback: function(label)
							{
								return label + "h";
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
				if (this.options.scales.yAxes[0].ticks.max < 24) {
					this.options.scales.yAxes[0].ticks.max += 1;
					this.renderChart(this.chartData, this.options);
				}
			},

			scaleMinus() {
				if (this.options.scales.yAxes[0].ticks.max > 1) {
					this.options.scales.yAxes[0].ticks.max -= 1;
					this.renderChart(this.chartData, this.options);
				}
			}
		},
	}
</script>
