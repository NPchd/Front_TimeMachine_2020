<template>
  <div id="app">
    <form id="newUser" v-on:submit.prevent="checkForm">
      <h1> Create User </h1>
      <p>
        <label for="username"> Username </label>
        <input type="text" name="username" id="username" v-model="form.username"/>
      </p>
      <p>
        <label for="email"> Email </label>
        <input type="text" name="email" id="email" v-model="form.email"/>
      </p>
      <p>
        <input type="submit" value="Submit"/>
      </p>
    </form>
  </div>
</template>

<style>
</style>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)

  export default {
    name: 'SignUp',
    data() {
      return {
        form: {
          username: null,
          email: null
        }
      }
    },
    methods: {
      submitUser: function() {
        Vue.axios.post('http://localhost:4000/api/users',
        {
          user: {
            username: this.form.username,
            email: this.form.email,
            role_id: 3
          }
        },
        {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          console.log("User created !" + response)
        })
        .catch(e => {
          console.error(e);
        })
      },
      checkForm: function() {
        this.errors = [];

        if (!this.form.username) {
          this.errors.push("Username required.")
        }
        if (!this.form.email) {
          this.errors.push("Email required.")
        } else if (!this.validEmail(this.form.email)) {
          this.errors.push("Valid email required.");
        }
        if (!this.errors.length) {
          this.submitUser();
        } else {
          console.log(this.errors)
        }
      },
      validEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    }
  }
</script>

