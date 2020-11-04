/* eslint-disable */
<template>
	<div class="dashBoard">
		<div class="linechart">
			<lineC :width="200" :height="200" ref="linechartref" :chart-data="datacollection"></lineC>
		</div>
		<div class="barchart">
			<bar :width="800" :height="400" :chart-data="datacollection" ref="barchartref" v-if="selectedChartBar === true"></bar>
		<button @click="updateScalePlus" id="plus">Increase Scale </button>
		<button @click="updateScaleMinus" id="minus" >Decrease Scale </button>
		</div>
		<pointer class="pointer"/>
		<workingtimes @workingTimesArray="updateChart" id="workingtimes"/>
		<userView class="userview"/>
	</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'

	import workingtimes from './WorkingTimes.vue'
	import doughnut from './Doughnut.vue'
	import userView from './UserView.vue'
	import pointer from './Pointer.vue'
	import lineC from './Line.vue'
	import bar from './Bar.vue'

	const SERVER_URL = 'http://localhost:4000/' ;

	export default {
	  name: 'dashboard',
	  components: {
			bar,
			doughnut,
			lineC,
			workingtimes,
			userView,
			pointer,
	  },
		props: {
		},

	  data() {
		this.selectedChartBar = true;
			this.selectedChartDoughnut = false;
			return {
				datacollection : {
					labels:[],
					datasets:[]
				},
			}
		},

		mounted() {
			this.update([]);
		},

	  methods: {
		update(args){	

				this.datacollection = {
					labels: args.date_begin,
					datasets: [
					{
						label:'Working time',
						backgroundColor:'#900300',
						data:args.date_diff
					}]
				}
				console.log(this.datacollection);
			},

			updateChart(args) {
				this.update(args);
			},

			changeChart() {
				if(this.selectedChartBar === true) {
					this.selectedChartBar = false;
					this.selectedChartDoughnut = true;
				} else {
					this.selectedChartBar = true;
					this.selectedChartDoughnut = false;
				}
			},

			updateScalePlus() {
				this.$refs.barchartref.scalePlus();
				this.$refs.linechartref.scalePlus();
			},

			updateScaleMinus() {
				this.$refs.barchartref.scaleMinus();
				this.$refs.linechartref.scaleMinus();
			}
	  },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.button-change-chart {
		position: relative;
		right: 60%;
		bottom: 100px;
	}
	.userview {
		position: relative;
		left: 40%;
		bottom: 500px;
	}
	.pointer {
		position: relative;
		top: 150px;
	}
	.barchart {
		position: relative;
		bottom: 20%;
		left: 20%;
	}
	.linechart {
		position: absolute;
		width: min-content;
	}
	button {
		background-color:red;
	}
	ul {
	  list-style-type: none;
	  padding: 0;
	}
	li {
	  display: inline-block;
	  margin: 0 10px;
	}
	a {
	  color: #42b983;
	}
</style>
