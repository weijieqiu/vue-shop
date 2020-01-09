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
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
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
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tooltip :content="'状态: ' + scope.row.status" placement="top">
                            <el-switch v-model="scope.row.status" active-value="启用"
                                       inactive-value="禁用" active-color="#13ce66"
                                       inactive-color="#ff4949" @change="change($event,scope.row)"></el-switch>
                        </el-tooltip>
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
            <el-row :gutter="20">
                <el-col :span="8" :offset="14">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="queryInfo.pageNum"
                            :page-sizes="[1, 2, 5, 10]"
                            :page-size="queryInfo.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<style scoped>
    .el-table {
        margin-top: 15px;
        font-size: 12px;
        margin-bottom: 15px
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
                    pageSize: 2
                },
                userList: [],
                total: 0,
                currentPage: 1
            }
        },
        created() {
            sessionStorage.setItem("navStatus", '/userList')
            this.getUserList();
        },
        methods: {
            async getUserList() {
                const {data: res} = await this.$http.get('/api/getUserList', {params: this.queryInfo})
                console.log(res)
                if (res.status === "200") {
                    this.userList = res.data.userList;
                    this.total = res.data.total;
                } else {
                    return this.$message.error('获取用户列表失败');
                }
            },
            async updateUserList(id, status) {
                const {data: res} = await this.$http.get('/api/updateUserStatus', {params: {id: id, status: status}})
                console.log(res)
                if (res.status === "200") {
                    console.log(res)
                    this.$message.success('更改状态成功')
                } else {
                    this.$message.error('更改状态失败')

                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.queryInfo.pageSize = val;
                this.getUserList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.queryInfo.pageNum = val;
                this.getUserList();
            },
            change($event, data) {
                console.log("id:" + data.id + "status:" + data.status);
                this.updateUserList(data.id, data.status);
                this.getUserList();
            },
            queryName(){
                console.log(this.queryInfo.query)
                this.getUserList()
            }
        }
    }
</script>