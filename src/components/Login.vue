<template>
  <div class="container-fluid">
    <div class="row">
      <b-form class="col-sm-8 col-md-6 col-lg-4" id="form">
        <h1>Log In</h1>
        <b-form-group
          id="input-group-1"
          label="Email"
          label-for="input-1"
          label-align="left"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Password"
          label-for="input-2"
          label-align="left"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button block v-on:click="onSubmit" id="button">Continue</b-button>
      <hr class="solid">
      <a href='https://localhost:4001/signup'>Sign Up for an account</a>
      </b-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Cookies from 'js-cookie'

Vue.use(VueAxios,axios)
export default {
  data() {
    return {
      form : {
        email:null,
        password:null
        },
      user : {
        email:null,
        username:null,
        role:null,
        id:null
      }
    }
  },

  methods: {
    onSubmit: function() {
      Vue.axios.post('https://localhost:4001/api/users/login',
      {
        email: this.form.email,
        password: this.form.password
      },
      {
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          Cookies.set("username", response.data.data.attributes.username);
          Cookies.set("role_id", response.data.data.attributes["role-id"]);
          Cookies.set("user_id", response.data.data.id)
          this.$router.push('/user')
        }
      })
      .catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

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