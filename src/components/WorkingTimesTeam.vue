/* eslint-disable */
<template>
	<div id="calendar">
		<datetime type="datetime" id="beginslot" v-model="begin" format="yyyy-MM-dd HH:mm:ss">
			<label for="startDate" slot="before">Start Date</label>
		</datetime>
		<datetime type="datetime" id="endslot" v-model="end" format="yyyy-MM-dd HH:mm:ss">
			<label for="endDate" slot="before">End Date</label>
		</datetime>
		<b-button @click="getWorkingTimes({begin, end})">Retrieve times</b-button>
	</div>
</template>

<script>
	import moment from 'moment'
	import axios from 'axios'
	import {Datetime} from 'vue-datetime'
	import Cookie from 'js-cookie'

	const SERVER_URL = 'http://localhost:8080/';

	export default {
	name: 'workingtimes',
	props: {
	},
	data() {
			this.userId = null;
      this.workingTimes = null;
      this.teamSize = null;
			return {
				begin: null,
        end: null,
        listTeam: '',
			}
	},
	components: {
		datetime: Datetime
	},
		methods: {
			getWorkingTimes(args) {
				var startParam = 'startTime=' + moment.utc(args.begin).format() + '&';
				var endParam = 'endTime=' + moment.utc(args.end).format();
				var id = Cookie.get("user_id");
				if(id === undefined)
          id = null;
        axios.get('http://localhost:8080/api/users/teams/' + id)
        .then(reponseTeam => {
          this.teamSize = responseTeam.length;
          this.listTeam = reponseTeam.data.data
          listTeam.forEach(element => {
            axios.get(SERVER_URL + 'api/workingtimes/' + element.id + '?' + startParam + endParam)
				    .then(responseUser => {
				  	  this.workingTimes = this.processData(responseUser.data.data);
				  	});
				  })
        });
        this.workingTimes.forEach(element => {
          this.workingTimes.hours[element] = this.workingTimes.hours[element] / teamSize;
        })
        this.$emit("workingTimesArray", this.workingTimes)
		  },

			addDays(currentDate, days) {
    		var date = new Date(currentDate);
				date.setDate(date.getDate() + days);
    		return date;
			},

			initDates(startDate, stopDate) {
				var dates = [];
				var hours = [];
				var currentDate = new Date(startDate);
				var stop = new Date(stopDate);
    		while (currentDate <= stop) {
					dates.push(moment(currentDate).format('YYYY-MM-DD'));
					hours.push(0);
        	currentDate = this.addDays(currentDate, 1);
				}
				return {dates: dates, hours: hours};
			},

			processData(args){
				var data = this.initDates(this.begin, this.end);
				for(var arg = 0; arg < args.length; ++arg) {
					var x = args[arg];
					console.log(x);
					if (moment(x.attributes.startTime).format('YYYY-MM-DD') == moment(x.attributes.endTime).format('YYYY-MM-DD')) {
						var startDay = moment(this.begin);
						var currentDay = moment(x.attributes.startTime) ;
						var dayDiff = currentDay.diff(startDay, "days");
						var currentEnd = moment(x.attributes.endTime);
						data.hours[dayDiff] = data.hours[dayDiff] + currentEnd.diff(currentDay, "hours");
					}
        }
				return {date : data.dates, hours: data.hours};
			},
		},
	}
</script>

<style scoped>
</style>
