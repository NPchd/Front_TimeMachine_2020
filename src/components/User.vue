<template>
    <div>
        <div class="side_bar">
            <div class="title">
                <img id="img_logo" src="../assets/TimeManager.png" alt="" >
            </div>

            <ul class=nav>
                <button class="button" v-on:click="component_display('WorkingTime')" style="color:#95a5a6; text-decoration:none">
                    <p class="nav_item">
                        <img class="img_sidebar" src="../assets/graph.png" alt="">
                        <label class="workingTimeLabel">Working time</label>
                    </p>
                </button>
                <button class="button" v-on:click="component_display('EditUser')" style="color:#95a5a6; text-decoration:none">
                    <p class="nav_item">
                        <img class="img_sidebar" src="../assets/change_info.png" alt="">
                        <label class="editUserLabel">Edit my informations</label>
                    </p>
                </button>
                <button class="button" v-on:click="component_display('ManageTeam')" style="color:#95a5a6; text-decoration:none">
                    <p class="nav_item">
                        <img class="img_sidebar" src="../assets/liste.png" alt="">
                        <label class="manageTeamLabel">Manage my team</label>
                    </p>
                </button>
                <button class="button" v-on:click="component_display('ManageAll')" style="color:#95a5a6; text-decoration:none">
                    <p class="nav_item">
                        <img class="img_sidebar" src="../assets/liste.png" alt="">
                        <label class="manageAllLabel">Manage all users</label>
                    </p>
                </button>
            </ul>
        </div>
        <div class="header">
            <small class="welcome">Welcome {{ cookie.username }}</small>
            <Pointer class="pointer"></Pointer>
            <a id="log_out" style="color:#95a5a6; text-decoration:none" v-on:click="disconnect()">
                <img class="disconnect" src="../assets/exit.png" alt="">
            </a>
        </div>
        <div class="body">
            <div class="component">
                <p v-if="editUser == true"><EditUser style="display:block"/></p>
                <p v-if="manageTeam == true"><ManageTeam style="display:block"/></p>
                <p v-if="manageAll == true"><ManageAll style="display:block"/></p>
                <p v-if="workingTime == true"><Dashboard style="display:block"/></p>
            </div>
        </div>
    </div>
</template>

<script>
import ManageTeam from '../components/ManageTeam.vue'
import EditUser from '../components/EditUser.vue'
import Dashboard from '../components/Dashboard.vue'
import ManageAll from '../components/GeneralManager.vue'
import Pointer from '../components/Pointer.vue'
import Clock from '../components/Clock.vue'

import Cookies from 'js-cookie'


export default {
    name:'User',
    components: {
        ManageTeam,
        EditUser,
        ManageAll,
        Dashboard,
        Clock,
        Pointer
    },
    data(){
        return{
            workingTime: true,
            editUser: false,
            manageTeam: false,
            manageAll: false,
            cookie: {
                username: Cookies.get("username"),
                user_id: Cookies.get("user_id"),
            }
        }
    },
    methods: {
        component_display(component){
            this.editUser = false;
            this.manageTeam = false;
            this.workingTime = false;
            this.manageAll = false;

            switch (component){
                case "EditUser":
                    this.editUser = true;
                    break;
                case "ManageTeam":
                    this.manageTeam = true;
                    break;
                case "WorkingTime":
                    this.workingTime = true;
                    break;
                case "ManageAll":
                    this.manageAll = true;
                    break;
            }
        },
        disconnect() {
            Cookies.remove("_timemanager_key");
            Cookies.remove("role_id");
            Cookies.remove("user_id");
            Cookies.remove("username");
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
/*sidebar*/
.side_bar {
    width: 15%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #34495e;
    font-family: Arial, Helvetica, sans-serif;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.title {
    width: 100%;
    height: 15%;
    position: absolute;
    background-color:#2ecc71;
    padding:10%;
}

#p_title {
    color: white;
    font-size: size 13px;
    text-transform: uppercase;
    font-family:Arial, Helvetica, sans-serif;
    height: 90px;
    line-height: 90px;
}
#img_logo {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    object-fit: contain;
    float: left;
}
.nav{
    position: absolute ;
    top: 15%;
    font-size: 15px;
}
.img_sidebar{
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.nav_item{
    display: flex;
    justify-content: left;
    margin-top:20px;
    line-height: 30px;
    overflow: hidden;
}
.nav_item:hover{
    background-color: #234342;
    color: white;
}
.button{
    background:inherit;
    border:none;
    outline:none;
    height: min-content;
    font-size: 15px;
    display:flex;
}
/*header*/
.header{
    position: absolute;
    top:0px;
    left:15%;
    right:0;
    height: 15%;
    border-bottom:2px solid #2ecc71;
}
.infos{
    position:relative;
    left:35px;
    text-align: left;
    margin-top: 5px;
    font-size: 12px;
}
.disconnect{
    position: absolute;
    height: 50%;
    top: 0px;
    right: 0px;
}
.welcome{
    position: absolute;
    left:1%;
}
#log_out:hover .p_disc{
    display:block;
}
.pointer{
    position: absolute;
    top:30%;
    width: 90%;
}

.body{
    position:absolute;
    top:15%;
    left:15%;
    width:85%;
    height: auto;
    justify-content: left;
    border-top: 2px solid #34495e;
}
.component {
    width: 85%;
    position: absolute;
}

@media only screen and (max-width: 1026px) {
    .workingTimeLabel, .editUserLabel, .manageTeamLabel, .manageAllLabel {
        display: none;
    }
    .body, .header {
        border:1px solid transparent;
    }
}
</style>
