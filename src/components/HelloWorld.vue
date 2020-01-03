<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1">电商管理系统</el-menu-item>
                <el-menu-item index="2"  class="logout">
                    <el-button type="warning" @click="logout()" size="small">退出</el-button>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                msg: "Hello",
                activeIndex: '1'

            }
        },
        methods: {
            logout() {
                this.$confirm('你要离开了吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '退出成功!'
                  });
                  if (sessionStorage.getItem('token')) {
                    sessionStorage.removeItem('token')
                    this.$router.replace(
                            '/login'
                    )
                  }
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消登出'
                  });
                });


            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-header {
        background-color: rgb(84, 92, 100);

    }

    .el-menu {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
    }

    .el-menu-item.logout {
      margin-left: auto;
    }


</style>
