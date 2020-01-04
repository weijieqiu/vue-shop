<template>
    <el-container>
        <el-header>
            <div>
                <span>电商后台管理系统</span>
            </div>
            <el-button type="warning" @click="logout()" size="small">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                >
                    <el-submenu :index="menu.id + ''" v-for="menu in menuList" :key="menu.id">
                        <!--                        一级菜单的模板区域 -->
                        <template slot="title">
                            <!--                            图标 -->
                            <i class="el-icon-location"></i>
                            <!--                            文本                      -->
                            <span>{{menu.authName}}</span>
                        </template>
                        <el-menu-item :index="subMenu.id + ''" v-for="subMenu in menu.children" :key="subMenu.id">
                            <template slot="title">
                                <!--                            图标 -->
                                <i class="el-icon-location"></i>
                                <!--                            文本                      -->
                                <span>{{subMenu.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
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
                activeIndex: '1',
                menuList: []

            }
        },
        created(){
            var that = this
          this.$http.get('/api/getMenuList').then(function (response) {
              console.log(response)
              if(response.data.status === "200"){
                  // console.log(response.data.data)
                  // that.menuList.push(response.data.data)
                  that.menuList =response.data.data
                console.log(that.menuList)
              }
          }).catch();
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
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .el-container {
        height: 100%;
    }

    .el-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(84, 92, 100);
        border-right: none;
    }


    .el-header span {
        color: #fff;
        font-size: 24px;
    }

    .el-aside {
        background-color: rgb(84, 92, 100);
    }

    .el-menu {
        border-right: none;
    }

    /*.el-menu-item.logout {*/
    /*  margin-left: auto;*/
    /*}*/


</style>
