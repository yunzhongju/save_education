<template>
  <div class="in-animate">
    <base-tabs :baseTabs="baseTabs">
      <template v-slot:1>
        <div class="">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                <ul class="flex-end">
                  <li class="marg-right30">
                    <el-input
                        size="mini"
                        placeholder="搜索用户名称"
                        clearable
                        suffix-icon="el-icon-search"
                        v-model="searchForm.userName"></el-input>
                  </li>
                  <li class="marg-right30">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-search"
                        @click="handleSerach">搜索
                    </el-button>
                  </li>
                  <li class="marg-right30">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-plus"
                        @click="handleAddUser">新建用户
                    </el-button>
                  </li>
                  <li class="marg-right30">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-download"
                        @click="openExcelModel">导出
                    </el-button>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
          <el-row class="marg-top20" :gutter="20">
            <el-col :span="5">
              <div class="grid-content bg-purple-dark">
                <el-card class="card" shadow="never">
                  <el-tree
                      :data="orgList"
                      node-key="orgCode"
                      accordion
                      :default-expanded-keys="['ZGS']"
                      :props="{children:'childrenOrg',label:'orgName'}"
                      @node-click="handleNodeClick">
                    <div class="showname" slot-scope="{ node, data }">
                      <el-tooltip
                          class="item"
                          effect="light"
                          :visible-arrow="false"
                          :content="node.label" placement="right">
												<span>
													<img
                              src="../../assets/images/org.png"
                              style="width: 12px;height: 12px;">
													{{ node.label }}</span>
                      </el-tooltip>
                    </div>
                  </el-tree>
                </el-card>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple-dark">
                <base-table
                    :total="total"
                    @getCurrentPage="getCurrentPage">
                  <el-table
                      ref="multipleTable"
                      :data="userList"
                      border
                      v-loading="loading"
                      tooltip-effect="dark"
                      height="650"
                      max-height="650">
                    <el-table-column
                        label="编号"
                        align="center"
                        width="55"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.$index + 1 }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="userCode"
                        label="用户头像"
                        width="100"
                        align="center"
                        show-overflow-tooltip>
                      <template slot-scope="scoped">
                        <el-avatar
                            size="large"
                            icon="el-icon-user-solid"
                            :src="scoped.row.avatar"></el-avatar>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        width="100"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="mobileNo"
                        label="手机号"
                        align="center"
                        show-overflow-tooltip></el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        width="80"
                        align="center"
                        show-overflow-tooltip>
                      <template slot-scope="scope">
                        <span>{{ scope.row.status == 1 ? '有效' : '无效' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="orgName"
                        label="机构"
                        align="center"
                        show-overflow-tooltip></el-table-column>
                    <el-table-column
                        label="操作"
                        fixed="right"
                        align="center">
                      <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleUsreInfo(scope.$index, scope.row)">详情
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEditUser(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleDeleteUser(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button
                            size="mini"
                            v-show="scope.row.status!=1"
                            type="text"
                            @click="handleStartUser(scope.$index, scope.row)">恢复
                        </el-button>
                        <el-button
                            size="mini"
                            v-show="scope.row.status==1"
                            type="text"
                            @click="handleStopUser(scope.$index, scope.row)">停用
                        </el-button>
                        <el-button
                            size="mini"
                            v-show="scope.row.isVerifier==0"
                            @click="handleUpdateSysUserIsVerifier(scope.$index, scope.row)"
                            type="text">设为核销员
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handleUpdateSysUserIsNotVerifier(scope.$index, scope.row)"
                            v-show="scope.row.isVerifier==1"
                            type="text">撤销核销员
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </base-table>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
    </base-tabs>

    <el-dialog
        title="添加/修改用户"
        :visible.sync="dialogVisible"
        center
        :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
          <el-form-item label="头像" prop="">
            <upload-img @getImgUrl="getImgUrl" :url="form.avatar"></upload-img>
          </el-form-item>
          <el-form-item label="用户名" prop="userCode">
            <el-input v-model="form.userCode"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="等级">
            <el-input v-model.number="form.level"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="">
            <el-date-picker
                v-model="form.birth"
                value-format="yyyy-mm-dd"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登陆权限" prop="loginAuthor">
            <el-radio-group v-model="form.loginAuthor">
              <el-radio :label="1">PC权限(管理员)</el-radio>
              <el-radio :label="0">APP权限(学员)</el-radio>
              <el-radio :label="2">PC与APP权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性别" prop="">
            <el-radio-group v-model="form.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="mobileNo">
            <el-input v-model="form.mobileNo"></el-input>
          </el-form-item>
          <el-form-item label="机构" prop="orgCode">
            <el-cascader
                :options="orgList"
                v-model="form.orgCode"
                :props="{label:'orgName',children:'childrenOrg',value:'orgCode'}"
                @change="handleChooseOrg"
                :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="角色添加" prop="" v-if="user.projectDepartment==='admin'">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark marg-top20">
                  <el-checkbox-group v-model="form.roleCodes">
                    <el-checkbox
                        :label="item.roleCode"
                        :key="item.roleCode"
                        v-for="(item,index) in roleList">{{ item.roleName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">{{ form.id ? '更新' : '创建' }}</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>


    <el-dialog
        title="详情"
        :visible.sync="dialogVisibleDetail"
        width="30%"
        center
        :before-close="handleClose1">
		  <span>
				<base-detail
            :detail="userDetail"
        ></base-detail>
			</span>
    </el-dialog>

<!--    导出对话框-->
    <el-dialog
        :visible.sync="ExcelModel"
        :before-close="handleClose1">
      <el-form
          :model="excelForm"
          ref="excelFormRule"
          label-width="200">
        <el-form-item
            label="部门">
          <el-cascader
              :options="orgList"
              collapse-tags
              ref="excelPanl"
              @change="handleChangeOrg"
              v-model="excelForm.orgCode"
              placeholder="选择机构(非必选)"
              style="width: 50%;"
              :props="{value:'orgCode',label:'orgName',children:'childrenOrg',expandTrigger: 'hover',multiple:true,emitPath:false}"
              clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button @click="ExcelModel = false">取 消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="submitExport('excelFormRule')">导 出</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import BaseTabs from '@/components/BaseTabs.vue';
import BaseTable from '@/components/BaseTable.vue';
import BaseDetail from './components/BaseDetail.vue'
import UploadImg from '@/components/BaseUploadImg.vue'
import api from '@/api/api.js'
import {updateSysUserIsNotVerifierAPI, updateSysUserIsVerifierAPI} from '@/api/mall.js'
import {exportMethod} from '@/utils/index.js'
import {mapState} from 'vuex'

export default {
  components: {
    BaseTabs,
    BaseTable,
    BaseDetail,
    UploadImg
  },

  data() {
    return {
      btnLoading: false,
      excelForm: {
        orgCode: []
      },
      orgList: [],
      ExcelModel: false,
      roleList: [],
      searchForm: {
        pageNo: 1,
        pageSize: 10,
        orgCode: '',
        orgType: 0,
        userName: ''
      },
      form: {
        userCode: '',
        sex: 0,
        birth: '',
        avatar: '',
        level: '',
        loginAuthor: 0,
        userName: '',
        mobileNo: '',
        orgCode: '',
        orgName: '',
        roleCodes: [],
      },
      rulesForm: {
        userCode: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        userName: [{required: true, message: '请输入用户姓名', trigger: 'blur'}],
        mobileNo: [{required: true, message: '请输入用户手机号', trigger: 'blur'}],
        orgCode: [{required: true, message: '请选择机构', trigger: 'change'}],
        roleCodes: [{required: true, message: '请添加角色', trigger: 'change'}],
        loginAuthor: [{required: true, message: '请选择登陆权限', trigger: 'blur'}],
        level: [{type: 'number', message: '等级必须为数字值'}],
      },
      loading: false,
      userDetail: null,
      dialogVisibleDetail: false,
      dialogVisible: false,
      userList: [],
      total: 0,
      serachValue: '',
      dateTimer: '', //按时间筛选
      baseTabs: [
        {
          label: '用户管理',
          value: '1'
        }
      ],
    };
  },
  methods: {
    handleChangeOrg(e){
      let nodes=this.$refs.excelPanl.getCheckedNodes()
      this.excelForm.orgCode=nodes.map(v=>v.value)
    },
    openExcelModel() {
      this.ExcelModel = true
    },
    submitExport(formName) {
      this.btnLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          exportMethod({
            method: 'post',
            url: '/downloadSysUserExcel.do',
            params: this.excelForm,
            success: res => {
              // console.log(res);
              this.btnLoading = false
            },
            fail: err => {
              this.btnLoading = false
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.form.orgCode=this.form.orgCode[this.form.orgCode.length-1]
          if (!this.form.id) {
            api.addSysUserAPI(this.form).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            })
          } else {
            api.updateSysUserAPI(this.form).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            })
          }
          this.getData()
          this.dialogVisible = false
        } else {
          that.$message({
            message: '请填写表单',
            type: 'warning'
          })
          return false;
        }
      });
    },
    handleChooseOrg(node) {
      // console.log(node);
      this.form.orgCode = node[node.length - 1]
    },
    getImgUrl(url) {
      this.form.avatar = url
    },
    // 设为核销员
    handleUpdateSysUserIsVerifier(index, row) {
      updateSysUserIsVerifierAPI({userCode: row.userCode}).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '设为核销员成功'
          })
          this.getData()
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      })
    },
    // 撤销核销员
    handleUpdateSysUserIsNotVerifier(index, row) {
      updateSysUserIsNotVerifierAPI({userCode: row.userCode}).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '撤销成功'
          })
          this.getData()
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      })
    },
    // 选择机构
    handleNodeClick(node) {
      // console.log(node);
      this.currentOrg = node
      this.searchForm.orgCode = node.orgCode
      this.searchForm.pageNo = 1
      this.getData()
    },
    //启用
    handleStartUser(index, row) {
      api.updateSysUserStartAPI({id: row.id}).then(res => {
        if (res.code == 0) {
          this.$message({
            type: 'success',
            message: '启用成功!'
          });
          this.getData()
        }
      })
    },
    //停用用户
    handleStopUser(index, row) {
      this.$confirm('此操作将停用该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            api.updateSysUserStopAPI({id: row.id}).then(res => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '停用成功!'
                });
                this.getData()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
    },
    resetForm() {
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handleClose1(done) {
      done();
    },
    //编辑
    handleEditUser(index, row) {
      api.querySysUserDetailAPI({userCode: row.userCode}).then(res => {
        // console.log('用户详情',res);
        if (res.code == 0) {
          this.form = {
            id: res.data.id,
            userCode: res.data.userCode,
            sex: Number(res.data.sex),
            birth: res.data.birth,
            avatar: res.data.avatar,
            level: res.data.level,
            loginAuthor: Number(res.data.loginAuthor),
            userName: res.data.userName,
            mobileNo: res.data.mobileNo,
            orgCode: res.data.orgCode,
            orgName: res.data.orgName,
            roleCodes: res.data.roleCodes,
          }
          this.dialogVisible = true
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          });
        }
      })
    },
    //用户详情
    handleUsreInfo(index, row) {
      api.querySysUserDetailAPI({userCode: row.userCode}).then(res => {
        // console.log('用户详情',res);
        if (res.code == 0) {
          this.userDetail = res.data
          this.dialogVisibleDetail = true
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          });
        }
      })
    },
    //删除
    handleDeleteUser(index, row) {
      // // console.log(row);
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            api.deleteSysUserAPI({id: row.id}).then(res => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getData()
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
    },
    //搜索
    handleSerach(val) {
      this.searchForm.orgCode = ''
      this.searchForm.pageNo = 1
      this.getData()
    },
    //创建人员
    handleAddUser() {
      this.form = {
        userCode: '',
        sex: 0,
        birth: '',
        avatar: '',
        level: '',
        loginAuthor: 0,
        userName: '',
        mobileNo: '',
        orgCode: '',
        orgName: '',
        roleCodes: [],
      },
          this.dialogVisible = true
    },
    //获取当前页
    getCurrentPage(val) {
      this.searchForm.pageNo = val
      this.getData()
    },
    querySysUserByPage(params) {
      this.loading = true
      api.querySysUserByPageAPI(params).then(res => {
        if (res.code == 0) {
          // // console.log('用户列表',res);
          this.userList = res.data.records
          this.total = res.data.total
          this.loading = false
        }
      })
    },
    getSysOrgTree() {
      api.getSysOrgTreeAPI({orgCode: this.orgCode}).then(res => {
        // console.log(res);
        if (res.code == 0) {
          this.orgList = res.data
        }
      })
    },
    querySysRoleList() {
      api.querySysRoleListAPI().then(res => {
        if (res.code == 0) {
          // console.log('角色列表',res);
          this.roleList = res.data
        }
      })
    },
    getData() {
      // this.searchForm.orgCode=this.user.projectDepartment
      api.querySysUserByOrgCodeAPI(this.searchForm).then(res => {
        if (res.code == 0) {
          // // console.log('用户列表',res);
          this.userList = res.data.records
          this.total = res.data.total
          this.loading = false
        }
      })
    }
  },
  computed: {
    ...mapState({
      user: s => s.userInfo
    }),
    orgCode() {
      return this.user.projectDepartment === 'admin' ? 'ZGS' : this.user.projectDepartment
    }
  },
  created() {
    this.searchForm.orgCode = this.orgCode
    this.getData()
    this.getSysOrgTree()
    this.querySysRoleList()
  }
};
</script>

<style scoped>
.card {
  height: 650px;
  overflow: auto;
}
</style>
