<template>
    <el-container>
        <el-header>
            <div>
                <span>电商后台管理系统</span>
            </div>
            <el-button type="warning" @click="logout()" size="small">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse ? '64px': '200px'">
                <div @click="toggerButton()" class="toggerButton">|||</div>
                <el-menu
                        class="el-menu-vertical-demo"
                        background-color="#404040"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :router="true"
                        :default-active="navStatus"
                >
                    <el-submenu :index="menu.id + ''" v-for="menu in menuList" :key="menu.id">
                        <!--                        一级菜单的模板区域 -->
                        <template slot="title">
                            <!--                            图标 -->
                            <i class="el-icon-location"></i>
                            <!--                            文本                      -->
                            <span>{{menu.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+ subMenu.path" v-for="subMenu in menu.children" :key="subMenu.id"
                                      @click="saveNavStatus(subMenu.path)">
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
            <el-main>
                <router-view/>
            </el-main>
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
                menuList: [],
                isCollapse: false,
                navStatus: ''

            }
        },
        created() {
            var that = this;
            this.$http.get('/api/getMenuList').then(function (response) {
                console.log(response)
                if (response.data.status === "200") {
                    // console.log(response.data.data)
                    // that.menuList.push(response.data.data)
                    that.menuList = response.data.data
                    console.log(that.menuList)
                }
            }).catch();
            this.navStatus = sessionStorage.getItem('navStatus')
        },
        updated(){
            this.navStatus = sessionStorage.getItem('navStatus')
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
                        // sessionStorage.removeItem('token')
                        sessionStorage.clear()
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
            },
            toggerButton() {
                console.log("点击toggerButton")
                this.isCollapse = !this.isCollapse;
            },
            // 保存链接的状态
            saveNavStatus(path) {
                sessionStorage.setItem("navStatus", '/'+path);
                this.navStatus = '/' + path;
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
        background-color: #404040;
        border-right: none;
    }


    .el-header span {
        color: #fff;
        font-size: 24px;
    }

    .el-aside {
        background-color: #404040;
    }

    .el-menu {
        border-right: none;
    }

    /*.el-menu-item.logout {*/
    /*  margin-left: auto;*/
    /*}*/

    .toggerButton {
        background-color: #404040;
        color: #ffecec;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        letter-spacing: 2px;
    }


</style>
