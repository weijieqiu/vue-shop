<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png"/>
            </div>
            <el-form :model="formLabel" ref="formLabel" class="login-form" :rules="rules">
                <el-form-item prop="name">
                    <el-input v-model="formLabel.name" placeholder="请输入用户名"
                              @keyup.enter.native="loginForm('formLabel', statusButton)"
                              prefix-icon="iconfont icon-yonghu"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formLabel.password" placeholder="请输入密码" show-password
                              @keyup.enter.native="loginForm('formLabel', statusButton)"
                              prefix-icon="iconfont icon-mima"></el-input>
                </el-form-item>
                <el-form-item class="login-box-btn">
                    <el-button type="primary" @click="loginForm('formLabel', statusButton)" :loading="statusButton">登录
                    </el-button>
                    <el-button @click="resetForm('formLabel')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>

    export default {
        data() {
            return {
                msg: '登录组件',
                formLabel: {
                    name: 'Admin',
                    password: 'Admin123.',
                },
                statusButton: false,
                rules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }

            }
        },
        methods: {
            loginForm(formLabel, statusButton) {
                console.log(formLabel);
                console.log(statusButton)
                this.statusButton = true
                var that = this;
                this.$refs[formLabel].validate((valid) => {

                    // this.data.statusButton = true
                    if (valid) {
                        this.$http.post('/api/loginByUserName', {
                            username: this.formLabel.name,
                            password: this.formLabel.password
                        }, {timeout: 4000})
                            .then(function (response) {

                                if (response.data.status === '200') {
                                    that.statusButton = false
                                    that.$message({
                                        message: '恭喜你，登录成功',
                                        type: 'success'
                                    });
                                    sessionStorage.setItem("token", response.data.data.token);
                                    that.$router.push("hello");
                                } else {
                                    that.$message({
                                        message: '请检查用户名和密码',
                                        type: 'error'
                                    });
                                    that.statusButton = false
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                                that.$message({
                                    message: '服务器炸了,叫爸爸',
                                    type: 'error',
                                    duration: 3000
                                });
                                that.statusButton = false
                            });
                        // alert('submit!');
                        // this.$router.push("hello");
                    } else {
                        console.log('error submit!!');
                        that.statusButton = false
                        return false;
                    }
                });
            },
            resetForm(formLabel) {
                this.$refs[formLabel].model.name = '';
                this.$refs[formLabel].model.password = '';
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        height: 130px;
        width: 130px;
        border: 1px solid #fff;
        border-radius: 50%;
        padding: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px 0;
        background-color: #fff;
    }

    .avatar_box img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px solid #fff;

    }

    .login-box-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }

    .login-form {
        padding: 16px;
        margin-top: 80px;
    }
</style>