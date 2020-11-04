<template>
    <div>
        <h1>Welcome in the Time Manager App !</h1>
        <h2>To reach your account, enter your username and email</h2>
        <Center>
            <tr>
                Username:
                <input type="text" v-model="username_req" placeholder="MartinM">
            </tr>
            <tr>
                email:
                <input type="text" v-model="email_req" placeholder="martin.matin@mleh.com">
            </tr>
            <tr>
                <button v-on:click="Login({username_req, email_req})">Login</button>
            </tr>
            <router-link to="/signup">
	    <tr>
                Don't have an account yet ? Create my account !</a>
            </tr>
	    </router-link>

        </Center>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Cookies from 'js-cookie'

    Vue.use(VueAxios,axios)
    export default {
  	name: 'login',  	
        data(){
            return{
                email:'',
                username:'',
                username_req:'',
                email_req:'',
                role:'',
                id:''
            }
        },
        methods:{
            async Login(a){

                Vue.axios.get('http://localhost:4000/api/users?email='+a.email_req+'&username='+a.username_req)
                .then(reponse1 => {
                    console.log(reponse1)
                    this.username=reponse1.data.data.attributes.username
                    this.email=reponse1.data.data.attributes.email
                    this.role=reponse1.data.data.attributes['role-id']
                    this.id=reponse1.data.data.id
                    if (this.username === a.username_req && this.email === a.email_req)
                    {
                        if (this.role === 1) {
                            Cookies.set("id_cookies", this.id);
                            document.location.href = "http://localhost:8080/general_manager", "_blank";
                        } else if (this.role === 2) {
                            Cookies.set("id_cookies", this.id);
                            document.location.href = "http://localhost:8080/manager", "_blank";
                        } else if(this.role === 3) {
                            Cookies.set("id_cookies", this.id);
                            document.location.href = "http://localhost:8080/user", "_blank";
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                    alert("Wrong username or email, retry.")
                })
            }
        }
    }
</script>
