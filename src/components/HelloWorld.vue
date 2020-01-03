<template>
    <el-container>
        <el-header>
                <div>
                    <span>电商后台管理系统</span>
                </div>
                <el-button type="warning" @click="logout()" size="small">退出</el-button>
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

    .el-container{
        height: 100%;
    }

    .el-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color:rgb(84, 92, 100);
        border-right: none;
    }


    .el-header span{
        color: #fff;
        font-size: 24px;
    }

    /*.el-menu-item.logout {*/
    /*  margin-left: auto;*/
    /*}*/


</style>
