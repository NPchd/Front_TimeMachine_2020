<template>
	<div id="calendar">
		<datetime type="datetime" id="beginslot" v-model="begin" format="yyyy-MM-dd HH:mm:ss">
	  	<label for="startDate" slot="before">Start Date</label>
		</datetime>
		<datetime type="datetime" id="endslot" v-model="end" format="yyyy-MM-dd HH:mm:ss">
	  	<label for="endDate" slot="after">End Date</label>
		</datetime>
		<button @click="getWorkingTimes({begin, end})">Retrieve times</button>
	</div>
</template>

<script>
	import moment from 'moment'
	import axios from 'axios'
	import {Datetime} from 'vue-datetime'
	const SERVER_URL = 'http://localhost:4000/';

	export default {
  	name: 'workingtimes',
  	props: {
  	},
  	data() {
			this.userId = null;
			this.workingTimes = null;
			return {
				begin: '',
				end: '',
				dates: "2013-10-10",
			}
  	},
  	components: {
  		datetime: Datetime
  	},
		methods: {
			getWorkingTimes(args) {
				var utc_begin_date = moment.utc(args.begin).format();
				var utc_end_date = moment.utc(args.end).format();
				var start_time_arg = 'startTime=' + utc_begin_date + '&';
				var end_time_arg = 'endTime=' + utc_end_date;
				var id = this.$route.params.userId;
				if(id === undefined)
					id = null;
				var URL = SERVER_URL + 'api/workingtimes/' + id + '?' + start_time_arg + end_time_arg;
				axios.get(URL).then(response => {
					this.workingTimes = response.data.data;
					this.$emit("workingTimesArray", this.workingTimes);
					this.$router.push({name:'dashboard', params:{userId:id}})
					.catch(error => {
						if(error.name != 'NavigationDuplicated')
							throw error;
					});
				})
				.catch(error => {
 					console.log(error);
				})
			},
  	},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.beginslot {
		position: absolute;
		margin-right: 30%;
		background-color: red;
	}
	.endslot {
		position: absolute;
		margin-left: 30%;
		color: red;
	}
	h3 {
	  margin: 40px 0 0;
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
