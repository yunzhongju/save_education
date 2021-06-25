<template>
  <div class="m-auto">
    <el-form ref="form" :model="form" :rules="rulesForm" label-width="100px">
      <el-form-item
          label="试卷名称"
          prop="name">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item
          label="试卷说明"
          prop="desc">
        <el-input v-model="form.desc" clearable></el-input>
      </el-form-item>
      <el-form-item
          label="答卷时长"
          prop="time">
        <el-input v-model.number="form.time" type="number" clearable>
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item
          label="满分"
          prop="full_score">
        <el-input v-model.number="form.full_score" type="number" clearable>
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
      <el-form-item
          label="及格分数"
          prop="pass_score">
        <el-input v-model.number="form.pass_score" type="number" clearable>
          <template slot="append">分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="分数构成" prop="score_constrc">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item
                  label="单选题数量">
                <el-input v-model="form.single_num" type="number" clearable>
                  <template slot="append">道</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item
                  label="每题分数">
                <el-input v-model="form.single_score" type="number" clearable>
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item
                  label="多选题数量">
                <el-input v-model="form.multiple_num" type="number" clearable>
                  <template slot="append">道</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item
                  label="每题分数">
                <el-input v-model="form.multiple_score" type="number" clearable>
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item
                  label="判断题数量">
                <el-input v-model="form.t_or_f_num" type="number" clearable>
                  <template slot="append">道</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item
                  label="每题分数">
                <el-input v-model="form.t_or_f_score" type="number" clearable>
                  <template slot="append">分</template>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" prop="desc">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <span>单选题:{{ single_count }}/{{ form.single_num ? form.single_num : 0 }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <span>多选题:{{ multiple_count }}/{{ form.multiple_num ? form.multiple_num : 0 }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <span>判断题:{{ t_or_f_count }}/{{ form.t_or_f_num ? form.t_or_f_num : 0 }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
							<span>
								总分数:{{ leftSum }}/{{ rightSum }}
							</span>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="关联题目" prop="">
        <el-tabs type="border-card">
          <el-tab-pane label="待选题库">
            <div class="d-flex align-items-center">
              <el-input v-model="serachForm.context" clearable size="mini" class="w-50" placeholder="请输入内容"></el-input>
              <el-button type="primary" class="ml-auto" size="mini" @click="queryQuestionByPage(serachForm)">搜索
              </el-button>
            </div>
            <base-table
                :total="total"
                :showFoot="isShowFoot"
                @getCurrentPage="getCurrentPage">
              <el-table
                  :data="questions_list"
                  border
                  height="500"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  @selection-change="handleSelectionChange">
                <el-table-column
                    type="index"
                    align="center"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="questionName"
                    label="题干">
                </el-table-column>
                <el-table-column
                    label="题型"
                    prop="questionType"
                    column-key="questionType"
                    :filters="[{text:'单选题',value:'1'},{text:'多选题',value:'2'},{text:'判断题',value:'3'}]"
                    :filter-method="filterHandler"
                    align="center"
                    width="120">
                  <template slot-scope="scope">
                    <span>{{
                        scope.row.questionType == '1' ? '单选题' : scope.row.questionType == '2' ? '多选题' : '判断题'
                      }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="是否已选"
                    align="center"
                    width="120">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.isChoose">未选</span>
                    <span v-else style="color: green;">已选</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="150">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        v-if="!scope.row.isChoose"
                        @click="handleAddQuestion(scope.$index, scope.row)">添加
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        v-if="scope.row.isChoose"
                        @click="handleCanleQuestion(scope.$index, scope.row)">取消
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </base-table>
          </el-tab-pane>
          <el-tab-pane :label="'单选('+single_count+'/'+form.single_num+')'">
            <base-table
                :showFoot="false">
              <el-table
                  :data="singleList"
                  height="500"
                  tooltip-effect="dark"
                  style="width: 100%;">
                <el-table-column
                    prop="questionName"
                    label="试题信息">
                  <template slot-scope="scope">
                    <div>
                      <p>{{ scope.$index + 1 }}.{{ scope.row.questionName }}</p>
                      <div class="ml-3 d-flex flex-column" v-if="scope.row.optionsList">
												<span
                            class="mb-2"
                            v-for="(label,labelIndex) in scope.row.optionsList"
                            :key="labelIndex">
													{{ label.optionIndex }}.{{ label.optionContext }}</span>
                      </div>
                      <div v-else>暂无</div>
                      <p>答案：{{ scope.row.answer }}</p>
                      <p>解析：{{ scope.row.remark }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    label="是否已选"
                    align="center"
                    width="80">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.isChoose">未选</span>
                    <span v-else style="color: green;">已选</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="80">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        v-if="!scope.row.isChoose"
                        @click="handleAddQuestion(scope.$index, scope.row)">添加
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        v-if="scope.row.isChoose"
                        @click="handleCanleQuestion(scope.$index, scope.row)">取消
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </base-table>
          </el-tab-pane>
          <el-tab-pane :label="'多选('+multiple_count+'/'+form.multiple_num+')'">
            <base-table
                :showFoot="false">
              <el-table
                  :data="muitlList"
                  height="500"
                  tooltip-effect="dark"
                  style="width: 100%;">
                <el-table-column
                    prop="questionName"
                    label="试题信息">
                  <template slot-scope="scope">
                    <div>
                      <p>{{ scope.$index + 1 }}.{{ scope.row.questionName }}</p>
                      <div class="ml-3 d-flex flex-column" v-if="scope.row.optionsList">
												<span
                            class="mb-2"
                            v-for="(label,labelIndex) in scope.row.optionsList"
                            :key="labelIndex">
													{{ label.optionIndex }}.{{ label.optionContext }}</span>
                      </div>
                      <div v-else>暂无</div>
                      <p>答案：{{ scope.row.answer }}</p>
                      <p>解析：{{ scope.row.remark }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    label="是否已选"
                    align="center"
                    width="80">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.isChoose">未选</span>
                    <span v-else style="color: green;">已选</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="80">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        v-if="!scope.row.isChoose"
                        @click="handleAddQuestion(scope.$index, scope.row)">添加
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        v-if="scope.row.isChoose"
                        @click="handleCanleQuestion(scope.$index, scope.row)">取消
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </base-table>
          </el-tab-pane>
          <el-tab-pane :label="'判断('+t_or_f_count+'/'+form.t_or_f_num+')'">
            <base-table
                :showFoot="false">
              <el-table
                  :data="panduanList"
                  height="500"
                  tooltip-effect="dark"
                  style="width: 100%;">
                <el-table-column
                    prop="questionName"
                    label="试题信息">
                  <template slot-scope="scope">
                    <div>
                      <p>{{ scope.$index + 1 }}.{{ scope.row.questionName }}</p>
                      <div class="ml-3 d-flex flex-column" v-if="scope.row.optionsList">
												<span
                            class="mb-2"
                            v-for="(label,labelIndex) in scope.row.optionsList"
                            :key="labelIndex">
													{{ label.optionIndex }}.{{ label.optionContext }}</span>
                      </div>
                      <div v-else>暂无</div>
                      <p>答案：{{ scope.row.answer }}</p>
                      <p>解析：{{ scope.row.remark }}</p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    label="是否已选"
                    align="center"
                    width="80">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.isChoose">未选</span>
                    <span v-else style="color: green;">已选</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center"
                    width="80">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        v-if="!scope.row.isChoose"
                        @click="handleAddQuestion(scope.$index, scope.row)">添加
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        v-if="scope.row.isChoose"
                        @click="handleCanleQuestion(scope.$index, scope.row)">取消
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </base-table>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{ id ? '更新' : '创建' }}</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import api from '@/api/api.js'

export default {
  components: {
    BaseTable
  },
  props: {},
  data() {
    return {
      id: '',
      total: 0,
      questions_list: [],
      ischoose: 0,
      allChooseList: [],
      single_count: 0,
      multiple_count: 0,
      t_or_f_count: 0,
      form: {
        name: '',
        desc: '',
        time: 0,
        full_score: 0,
        pass_score: 0,
        single_num: 0,
        single_score: 0,
        multiple_score: 0,
        multiple_num: 0,
        t_or_f_num: 0,
        t_or_f_score: 0,
        rel_test: [],
        score_constrc: 0
      },
      serachForm: {
        pageNo: 1,
        pageSize: 10,
        context: ''
      },
      rulesForm: {
        name: [{required: true, message: '请输入试卷名称', trigger: 'blur'}],
        desc: [{required: true, message: '请输入试卷简介', trigger: 'blur'}],
        time: [{required: true, message: '请输入答卷时长', trigger: 'blur'}],
        full_score: [{required: true, message: '请输入试卷满分值', trigger: 'blur'},
          {type: 'number', message: '满分值必须为数字值'}],
        pass_score: [{required: true, message: '请设置及格分数', trigger: 'blur'},
          {type: 'number', message: '及格分数必须为数字值'}],
        rel_test: [{required: true, message: '请选中题目', trigger: 'change'}],
        score_constrc: [{required: true, message: '请输入分数构成', trigger: 'blur'}]
      }
    };
  },
  methods: {
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    queryQuestionByPage(params) {
      this.loading = true
      api.queryQuestionByPageAPI(params).then(res => {
        // // console.log('试题列表',res);
        if (res.code == 0) {
          this.questions_list = res.data.records.map(v => {
            v.isChoose = false
            return v
          })
          this.total = res.data.total
          this.loading = false

          this.questions_list.forEach((item, index) => {
            this.form.rel_test.forEach((each, j) => {
              if (item.questionCode === each) {
                item.isChoose = true
              }
            })
          })
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.form.rel_test.length===0) return this.$message({type:'warning',message:'请添加试题'})
          if (this.form.full_score != this.rightSum || this.leftSum != this.rightSum) {
            this.$message({
              message: '分数构成不合理,请重新设置',
              type: 'warning'
            });
            return false
          }
          if ((Number(this.single_count) + Number(this.multiple_count) + Number(this.t_or_f_count)) !== this.form.rel_test.length) return this.$message({
            message: '题目数量构成不合理,请重新设置',
            type: 'warning'
          });

          let scoreBuild = `1-${this.form.single_num}-${this.form.single_score}|2-${this.form.multiple_num}-${this.form.multiple_score}|3-${this.form.t_or_f_num}-${
              this.form.t_or_f_score
          }`;

          let params = {
            paperName: this.form.name,
            remark: this.form.desc,
            sumScore: this.form.full_score,
            passScore: this.form.pass_score,
            paperTime: this.form.time,
            scoreBuild: scoreBuild,
            questionCodeList: this.form.rel_test
          };
          // // console.log('提交的', params);
          if (!this.id) {
            api.addPaperAPI(params).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.$router.push('test_paper_manage')
              } else {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            })
          } else {
            params['id'] = this.id
            api.updatePaperAPI(params).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                });
                this.$router.push('test_paper_manage')
              } else {
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            })
          }

        } else {
          this.$message({
            message: '请填写完整的表单',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    },
    handleAddQuestion(index, row) {
      let rel_test = this.form.rel_test;
      if (rel_test.includes(row.questionCode)) {
        row.isChoose = true
        this.$message({
          message: '请勿重复添加',
          type: 'warning'
        });
        return;
      } else if (row.questionType == 1) {
        if (this.single_count == this.form.single_num) return this.$message({
          message: '单选题数量已到达最大',
          type: 'warning'
        });
        this.single_count++;
      } else if (row.questionType == 2) {
        if (this.multiple_count == this.form.multiple_num) return this.$message({
          message: '多选题数量已到达最大',
          type: 'warning'
        });
        this.multiple_count++;
      } else if (row.questionType == 3) {
        if (this.t_or_f_count == this.form.t_or_f_num) return this.$message({
          message: '判断题数量已到达最大',
          type: 'warning'
        });
        this.t_or_f_count++;
      }
      if (!row.isChoose) row.isChoose = true
      rel_test.push(row.questionCode);
      this.allChooseList.push(row)
      this.$message({
        message: '添加成功',
        type: 'success'
      });
    },
    handleCanleQuestion(index, row) {
      let rel_test = this.form.rel_test;
      if (!rel_test.includes(row.questionCode)) return this.$message({
        message: '该题目还没添加',
        type: 'warning'
      });

      if (row.questionType == 1) {
        this.single_count -= 1
      } else if (row.questionType == 2) {
        this.multiple_count -= 1
      } else if (row.questionType == 3) {
        this.t_or_f_count -= 1
      }
      if (row.isChoose) row.isChoose = false
      if (this.ischoose == 4) {
        this.allChooseList.splice(index, 1)
      }
      let i = this.allChooseList.findIndex(v => v.questionCode === row.questionCode)
      if (i !== -1) {
        this.allChooseList.splice(i, 1)
      }
      this.form.rel_test = rel_test.filter(item => item != row.questionCode);
      this.$message({
        message: '取消成功',
        type: 'success'
      });
    },
    getCurrentPage(val) {
      // let label=this.ischoose?this.ischoose:''
      this.serachForm.pageNo = val
      this.queryQuestionByPage(this.serachForm)
    },
    handleSelectionChange() {
    },
    handleChoose(label) {
      if (label == 4) {
        this.questions_list = this.allChooseList
        return
      }
      this.queryQuestionByPage({pageNo: 1, pageSize: 10})
    },
    handleQuestionList(arr) {
      let list = []
      arr.forEach(item => {
        list.push(item.questionCode)
      })
      return list
    },
    handleScore(scoreBuild, type) {
      let score = scoreBuild
      if (score) {
        let scoreList = score.split('|')
        if (type == 1) {
          return scoreList[0].split('-')[1]
        } else if (type == 11) {
          return scoreList[0].split('-')[2]
        } else if (type == 2) {
          return scoreList[1].split('-')[1]
        } else if (type == 21) {
          return scoreList[1].split('-')[2]
        } else if (type == 3) {
          return scoreList[2].split('-')[1]
        } else if (type == 31) {
          return scoreList[2].split('-')[2]
        }
      } else {
        return 0
      }
    },
    getDetail() {
      api.queryPaperDetailAPI({id: this.id}).then(res => {
        // // console.log(res);
        this.form.name = res.data.paperName
        this.form.desc = res.data.remark
        this.form.time = res.data.paperTime
        this.form.full_score = res.data.sumScore
        this.form.pass_score = res.data.passScore
        this.form.rel_test = this.handleQuestionList(res.data.questionQueryList)
        this.form.single_num = this.handleScore(res.data.scoreBuild, 1)
        this.form.single_score = this.handleScore(res.data.scoreBuild, 11)
        this.form.multiple_num = this.handleScore(res.data.scoreBuild, 2)
        this.form.multiple_score = this.handleScore(res.data.scoreBuild, 21)
        this.form.t_or_f_num = this.handleScore(res.data.scoreBuild, 3)
        this.form.t_or_f_score = this.handleScore(res.data.scoreBuild, 31)
        this.single_count = this.handleScore(res.data.scoreBuild, 1)
        this.multiple_count = this.handleScore(res.data.scoreBuild, 2)
        this.t_or_f_count = this.handleScore(res.data.scoreBuild, 3)
        this.allChooseList = res.data.questionQueryList.map(v => {
          v.isChoose = true
          v.optionsList = v.optionList
          return v
        })
      })
    }
  },
  created() {
    this.queryQuestionByPage(this.serachForm)
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  },
  computed: {
    leftSum() {
      return (this.single_count * this.form.single_score) + (this.multiple_count * this.form.multiple_score) + (this.t_or_f_count * this.form.t_or_f_score)
    },
    rightSum() {
      return (this.form.single_num * this.form.single_score) + (this.form.multiple_num * this.form.multiple_score) + (this.form.t_or_f_num * this.form.t_or_f_score)
    },
    isShowFoot() {
      return this.ischoose === 4 ? false : true
    },
    singleList() {
      return this.allChooseList.filter(v => v.questionType == 1)
    },
    muitlList() {
      return this.allChooseList.filter(v => v.questionType == 2)
    },
    panduanList() {
      return this.allChooseList.filter(v => v.questionType == 3)
    },
  }
};
</script>
