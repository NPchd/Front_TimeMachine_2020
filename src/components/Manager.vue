<template>
    <div class: Manager>
        <h1>Welcome in your manager's dashboard !</h1>
        <ManageTeam/>
        <ModifierInfos/>
    </div>
</template>

<script>
    import ManageTeam from '../components/ManageTeam.vue'
    import ModifierInfos from '../components/ModifierInfos.vue'

    export default {
        name:'Manager',
        components: {
            ManageTeam,
            ModifierInfos
        }
    }
</script>