/* eslint-disable */
<template>
	<div class="dashBoard">
		<div class="barchart">
			<bar :width="800" :height="400" :chart-data="datacollection" ref="barchartref"></bar>
		<button @click="updateScalePlus" id="plus">Increase Scale</button>
		<button @click="updateScaleMinus" id="minus">Decrease Scale</button>
		</div>
		<workingtimes @workingTimesArray="updateChart" id="workingtimes"/>
	</div>
</template>

<script>
	import axios from 'axios'
	import moment from 'moment'

	import workingtimes from './WorkingTimes.vue'
	import userView from './UserView.vue'
	import pointer from './Pointer.vue'
	import bar from './Bar.vue'

	const SERVER_URL = 'http://localhost:8080/' ;

	export default {
	  name: 'dashboard',
	  components: {
			bar,
			workingtimes,
			userView,
			pointer,
	  },
		props: {
		},

	  data() {
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
					labels: args.date,
					datasets: [
					{
						label:'Working time',
						backgroundColor:'#900300',
						data:args.hours
					}]
				}
				console.log(this.datacollection);
			},

			updateChart(args) {
				this.update(args);
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
		background-color:rgb(19, 112, 112);
	}
</style>
