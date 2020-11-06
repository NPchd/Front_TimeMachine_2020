<template>
  <div class="container-fluid">
    <div class="row">
      <b-form class="col-sm-8 col-md-6 col-lg-4" id="form">
        <h1>Sign Up</h1>
        <b-form-group
          id="input-group-1"
          label="Username"
          label-for="input-1"
          label-align="left"
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="username"
            required
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Email"
          label-for="input-2"
          label-align="left"
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Password"
          label-for="input-3"
          label-align="left"
        >
          <b-form-input
            type="password"
            id="input-3"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button block v-on:click="checkForm" id="button">Continue</b-button>
      <hr class="solid">
      <a href='http://localhost:8080/'>Already have an account ? Log In</a>
      </b-form>
    </div>
  </div>
</template>

<style scoped>
  #form {
    margin: auto;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 5%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  b-button {
    background-color: rgb(19, 112, 112);
  }
  a {
    color: rgb(19, 112, 112);
  }
</style>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import Cookies from 'js-cookie'

  Vue.use(VueAxios, axios)

  export default {
    name: 'app',
    data() {
      return {
        form : {
          username:null,
          email:null,
          password:null
        }
      }
    },
    methods: {
      submitUser: function() {
        Vue.axios.post('http://localhost:8080/api/users',
        {
          user : {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          }
        },
        {
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
          console.log("User created !");
          Vue.axios.post('http://localhost:8080/api/users/login',
          {
            email: this.form.email,
            password: this.form.password
          },
          {
            headers: {
              "Content-type": "application/json"
            }
          })
          .then(responseLogin => {
            console.log("Log in");
            console.log(responseLogin);
            if (responseLogin.status == 200) {
              Cookies.set("username", responseLogin.data.data.attributes.username);
              Cookies.set("role_id", responseLogin.data.data.attributes["role-id"]);
              Cookies.set("user_id", responseLogin.data.data.id)
              this.$router.push('/user')
            }
          })
        })
        .catch(e => {
          console.error(e);
        })
      },
      checkForm: function() {
        this.errors= [];

        if(this.form.username && this.validEmail(this.form.email) && this.form.password) {
          this.submitUser();
        }
      },
      validEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
    }
  }
</script>
