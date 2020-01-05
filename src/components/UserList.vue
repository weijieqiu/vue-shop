<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--    卡片视图区 -->

        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table border stripe :data="userList">
                <el-table-column
                        type="index">
                </el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="telephone"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <!--{{scope.row.status}}-->
                        <el-switch v-model="scope.row.status === '启用' ? true : false"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <!--     修改按钮 -->
                        <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<style scoped>
.el-table{
    margin-top: 15px;
    font-size: 12px;
}
</style>

<script>

    export default {
        data() {
            return {
                msg: '用户列表组件',
                queryInfo: {
                    query: '',
                    pageNum: 1,
                    pageSize:2
                },
                userList:[],
                total:0
            }
        },
        created() {
            sessionStorage.setItem("navStatus", '/userList')
            this.getUserList();
        },
        methods:{
            // getUserList(){
            //     this.$http.get('/api/getUserList',{ params: this.queryInfo}).then(function (response) {
            //         console.log(response)
            //     }).catch(function (response) {
            //         console.log(response)
            //     })
            // }
            async getUserList() {
                const {data : res} = await this.$http.get('/api/getUserList', { params: this.queryInfo})
                console.log(res)
                if(res.status === "200"){
                    this.userList = res.data;
                    this.total = res.data.length;
                }else {
                    return this.$message.error('获取用户列表失败');
                }
            }
        }
    }
</script>