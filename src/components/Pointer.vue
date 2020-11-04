/* eslint-disable */
<template>
	<div>
		<button id="pointer-button" type="button" v-on:click="onClick"> Pointer </button>
		<clock ref="ref_clock" :date="time"/>
	</div>
</template>

<script>
	import axios from 'axios'
	import clock from './Clock.vue'
	import moment from 'moment'
	const SERVER_URL = 'http://localhost:4000/';

	export default {
	  name: 'pointer',
	  components: {
			clock,
	  },
	  props: {
	  },
	  data() {
		this.fetchUser();
		return {
			}
		},
		watch: {
			'$route.params': {
				handler(newVal) {
					var id = newVal;
					console.log(id);
					this.fetchUser();
				},
			},
			immediate: true,
		},

	  methods: {
			fetchUser() {
				//Si l'utilisateur est déja pointé mais que sa session est morte , l'horloge doit afficher le temps écoulé :
				this.time = undefined ;
			this.status_user = undefined;
				axios.get(SERVER_URL + 'api/clocks/' + this.$route.params.userId)
				.then(response => {
					this.status_user = response.data.data.attributes.status;
					var button = document.getElementById('pointer-button');
					if (this.status_user === true) {
						button.style.backgroundColor = 'green';
						var d_date = new Date(response.data.data.attributes.time);
						this.time = d_date;
						this.$refs.ref_clock.dateFromPointer = this.time;
						this.$refs.ref_clock.startTimer();
					} else {
						button.style.backgroundColor = 'red';
						this.$refs.ref_clock.stopTimer();
					}
				})
				.catch(error => {
          console.log(error)
        })
			},
		onClick() {
				axios.get(SERVER_URL + 'api/clocks/' + this.$route.params.userId)
				.then(response => {
					var response_data = response;
					this.status_user = response.data.data.attributes.status;
					var button = document.getElementById('pointer-button');
					console.log(response);
					if (this.status_user === false) {
						var body = {
							clock: {
								status: true,
								time: moment.utc(moment().format()).format()
							}
						};
						var headers = { 'Content-Type' : 'application/json'};
						axios.put(SERVER_URL + 'api/clocks/' + this.$route.params.userId, body,headers)
						.then(response => {
							this.$refs.ref_clock.startTimer();
							button.style.backgroundColor = 'green';
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
						axios.put(SERVER_URL + 'api/clocks/' + this.$route.params.userId, body, headers)
						.then(response => {
							this.$refs.ref_clock.stopTimer();
							button.style.backgroundColor = 'red';
							//post request to add the working time
							var postbody = {
								working_time: {
									startTime: response_data.data.data.attributes.time,
									endTime: body.clock.time
								}
							};
							axios.post(SERVER_URL + 'api/workingtimes/' + this.$route.params.userId,
								postbody,
								headers
							)
							.then(response => {
								console.log(response)
							})
							.catch(error => {
								console.log(error)
							})
						}),
						this.$router.push({name: 'clock', params: {userId: this.$route.params.userId}})
						.catch(error => {
							if (error.name != 'NavigationDuplicated')
								throw error;
						})
					};
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#pointer-button {
		width: min-content ;
		background-color: red;
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
