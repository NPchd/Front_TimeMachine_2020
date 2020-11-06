/* eslint-disable */
<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<b-button id="pointerButton" type="button" v-on:click="onClick"> Pointer </b-button>
			</div>
			<div class="col-sm-6">
				<Clock id="pointerClock" ref="ref_clock" :date="time"/>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Clock from './Clock.vue'
	import Cookies from 'js-cookie'
	import moment from 'moment'
	const SERVER_URL = 'http://localhost:8080/';

	export default {
	  name: 'pointer',
	  components: {
			Clock,
	  },
	  props: {
	  },
	  data() {
		this.fetchUser();
		return {
			}
		},
	  immediate: true,

	  methods: {
			fetchUser() {
				//Si l'utilisateur est déja pointé mais que sa session est morte , l'horloge doit afficher le temps écoulé :
				this.time = undefined ;
				this.status_user = undefined;
				axios.get(SERVER_URL + 'api/clocks/' + Cookies.get("user_id"))
				.then(response => {
					this.status_user = response.data.data.attributes.status;
					//var button = document.getElementById('pointer-button');
					if (this.status_user === true) {
						//button.style.backgroundColor = 'green';
						var d_date = new Date(response.data.data.attributes.time);
						this.time = d_date;
						this.$refs.ref_clock.dateFromPointer = this.time;
						this.$refs.ref_clock.startTimer();
					} else {
						//button.style.backgroundColor = 'red';
						this.$refs.ref_clock.stopTimer();
					}
				})
				.catch(error => {console.log(error)});
			},
		onClick() {
				axios.get(SERVER_URL + 'api/clocks/' + Cookies.get("user_id"))
				.then(response => {
					var response_data = response;
					this.status_user = response.data.data.attributes.status;
					var button = document.getElementById('pointer-button');
					if (this.status_user === false) {
						var body = {
							clock: {
								status: true,
								time: moment.utc(moment().format()).format()
							}
						};
						var headers = { 'Content-Type' : 'application/json'};
						axios.put(SERVER_URL + 'api/clocks/' + Cookies.get("user_id"), body, headers)
						.then(response => {
							this.$refs.ref_clock.startTimer();
						})
						.catch(error => {
							console.log(error);
						})
					} else {
						var body = {
							clock: {
								status: false,
								time: moment.utc(moment().format()).format()
							}
						};
						var headers = {'Content-Type': 'application/json'};
						console.log(body);
						axios.put(SERVER_URL + 'api/clocks/' + Cookies.get("user_id"), body, headers)
						.then(response => {
							this.$refs.ref_clock.stopTimer();
							//button.style.backgroundColor = 'red';
							//post request to add the working time
							var postbody = {
								working_time: {
									startTime: response_data.data.data.attributes.time,
									endTime: body.clock.time
								}
							};
							axios.post(SERVER_URL + 'api/workingtimes/' + Cookies.get("user_id"),
								postbody,
								headers
							)
							.then(response => {
							})
							.catch(error => {
								console.log(error)
							})
						})
					};
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#pointerButton {
		width: 100%;
		height: 100%;
	}
	#pointerClock {
		width: 100%;
		height: 100%;
		border: 1px solid black;
		border-radius: 5px;
		font-size: 50px;
	}
</style>
