<template>
    <div>
        {{msg}}
    </div>
</template>

<style scoped>
</style>

<script>

    export default {
        data() {
            return {msg: 'Welcome'}
        },
        created(){
            sessionStorage.setItem("navStatus", '/home')
        }
    }
</script>