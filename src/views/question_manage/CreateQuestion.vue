<template>
  <div class="in-animate">
    <el-tabs type="border-card">
      <el-tab-pane label="单题录入">
        <el-form ref="form" :model="addQuestionForm" :rules="rulesForm" label-width="100px" class="w-50">
          <el-form-item label="题干" prop="questionName">
            <el-input type="textarea" v-model="addQuestionForm.questionName"></el-input>
          </el-form-item>
          <el-form-item label="解析" prop="remark">
            <el-input type="textarea" v-model="addQuestionForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="题型" prop="questionType">
            <el-select v-model="addQuestionForm.questionType" placeholder="请选择题型" size="small"
                       @change="handleChangeType">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程分类">
            <el-select
                v-model="courseType"
                placeholder="课程分类"
                size="small"
                clearable
                class="ml-auto mr-3"
                @change="handleChangeCourseCate">
              <el-option
                  v-for="(item,index) in courseCateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程" prop="courseCode">
            <el-select
                v-model="addQuestionForm.courseCode"
                placeholder="课程"
                @change="handleChangeCourse"
                size="small"
                class="mr-3">
              <el-option
                  v-for="(item,index) in courseList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="章节" prop="sectionCode">
            <el-cascader
                v-model="addQuestionForm.sectionCode"
                ref="section"
                class="mr-3"
                @change="handleChangeSection"
                :options="sectionList"
                size="small"
                :show-all-levels="false"
                placeholder="章节"
                :props="{ expandTrigger: 'hover',label:'sectionName',value:'sectionCode',children:'childrenSectionList', checkStrictly:true, emitPath:false }">
            </el-cascader>
          </el-form-item>
          <el-form-item label="选项与答案" prop="">
            <div v-show="addQuestionForm.questionType!=2">
              <el-radio-group
                  v-model="addQuestionForm.answer"
                  @change="handleChangeRadio"
                  class="flex-column">
                <el-radio
                    :label="item.optionIndex" v-for="(item,index) in radioChooseList">
                  {{ item.optionIndex }}
                  <el-input clearable v-model="item.optionContext" size="mini" style="width: 50%;"></el-input>
                  <i class="el-icon-delete" @click.stop="onHandleDel(index)" style="margin-left: 10px;"></i>
                </el-radio>
              </el-radio-group>
            </div>
            <div v-show="addQuestionForm.questionType==2">
              <el-checkbox-group
                  v-model="checkList"
                  v-for="(item,index) in checkChooseList"
                  @change="handleChangeCheckBox"
                  class="flex-column">
                <el-checkbox :label="item.optionIndex">{{ item.optionIndex }}
                  <el-input clearable v-model="item.optionContext" size="mini" style="width: 100%;"></el-input>
                  <i class="el-icon-delete" @click.stop="onHandleDel(index)" style="margin-left: 10px;"></i>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <el-row>
              <el-col :span="24">
                <div class="d-flex align-items-center marg-top10">
                  <el-button type="primary" size="mini" @click="handleAddChoose">添加选项</el-button>
                  <el-tooltip placement="right" effect="light">
                    <div slot="content">1.判断题格式:A.正确，B.错误<br/>2.添加选项后单击选项前面的单选或复选框作为正确答案</div>
                    <i class="el-icon-question ml-1" style="font-size: 20px;color: #049eff;"></i>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitAddQuestion('form')">{{ id ? '更新' : '创建' }}</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="导入试题" v-loading="downloadLoading" v-if="!id">
        <div class="d-flex" style="height: 750px;">
          <div class="d-flex flex-column w-50 px-4">
            <div class="d-flex">
              <el-button
                  :loading="downloadLoading"
                  class="ml-auto"
                  type="primary"
                  size="small"
                  icon="el-icon-document"
                  @click="handleDownload">下载模板
              </el-button>
              <el-button
                  type="primary"
                  size="small"
                  @click="$router.go(-1)">返回
              </el-button>
            </div>
            <el-form :model="excelForm" ref="questionForm" label-width="50px" class="mt-3">
              <el-form-item label="分类">
                <el-select
                    v-model="courseType"
                    placeholder="课程分类"
                    size="small"
                    clearable
                    class="ml-auto mr-3"
                    @change="handleChangeCourseCate">
                  <el-option
                      v-for="(item,index) in courseCateList"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                  label="课程"
                  :rules="[ { required: true, message: '请选择课程', trigger: 'blur' }]"
                  prop="courseCode">
                <el-select
                    v-model="excelForm.courseCode"
                    placeholder="课程"
                    @change="handleChangeCourse"
                    size="small"
                    class="mr-3">
                  <el-option
                      v-for="(item,index) in courseList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                  label="章节"
                  :rules="[ { required: true, message: '请选择章节', trigger: 'blur' }]"
                  prop="sectionCode">
                <el-cascader
                    v-model="excelForm.sectionCode"
                    ref="section"
                    class="mr-3"
                    @change="handleChangeSection"
                    :options="sectionList"
                    size="small"
                    :show-all-levels="false"
                    placeholder="章节"
                    :props="{ expandTrigger: 'hover',label:'sectionName',value:'sectionCode',children:'childrenSectionList', checkStrictly:true, emitPath:false }">
                </el-cascader>
              </el-form-item>
              <el-form-item>
                <a :href="url" ref="download"></a>
                <div class="mt-2">
                  <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('questionForm')" class="w-100 mt-4" size="large">提交
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="d-flex flex-column w-100 p-3 border hide-scollBar" style="height: 750px;">
            <span class="text-muted" v-if="list.length===0">请导入试题进行预览</span>
            <div v-else class="d-flex flex-column" v-for="(item,index) in list" :key="index">
              <p class="text-muted">{{ item.title }}</p>
              <ul>
                <li
                    class="py-2 px-3 mt-3"
                    v-for="(question,qindex) in item.list"
                    :key="qindex"
                    :style="{'border-color':question.otherAnswer?'':'red'}"
                    style="border: 1px solid #eaeaea;">
                  <p>{{ qindex + 1 }}.{{ question.name }}</p>
                  <el-radio-group v-model="question.otherAnswer" v-if="index!=1" class="d-flex flex-column ml-4">
                    <el-radio
                        v-for="(label,j) in question.labelList"
                        :label="label.labelName"
                        :disabled="label.labelName!==question.otherAnswer"
                        :key="j">
                      <span>{{ label.labelName }}.{{ label.value }}</span>
                    </el-radio>
                  </el-radio-group>
                  <el-checkbox-group v-model="question.answer" @change="handleCheckBox" v-if="index==1"
                                     class="d-flex flex-column ml-4">
                    <el-checkbox
                        :label="label.labelName"
                        v-for="(label,j) in question.labelList"
                        :key="j">
                      <span>{{ label.labelName }}.{{ label.value }}</span>
                    </el-checkbox>
                  </el-checkbox-group>
                  <p class="mt-2">答案：{{ question.otherAnswer }}</p>
                  <p>解析：{{ question.desc || '无' }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加选项对话框 -->
    <el-dialog
        title="添加选项"
        :visible.sync="dialogVisible"
        center
        width="30%"
        :before-close="handleClose">
      <div>
        <el-form ref="formchoose" :model="chooseForm" :rules="chooseRule" label-width="80px">
          <el-form-item label="" prop="optionIndex">
            <div class="d-flex align-items-center w-100">
              <el-radio-group v-model="chooseForm.optionIndex" size="small">
                <el-radio
                    :label="label"
                    v-for="(label,index) in chooseLabelList"
                    :key="index">{{ label }}
                </el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item label="选项值" prop="optionContext">
            <el-input type="textarea" v-model="chooseForm.optionContext" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitChoose('formchoose')">添加</el-button>
            <el-button @click="resetFormChoose('formchoose')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>


</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import api from '@/api/api.js'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {queryCourseList} from '@/api/course.js'
import {uploadMethod} from '@/utils/index.js'

export default {
  inject: ['app'],
  components: {
    UploadExcelComponent,
    BaseTable
  },
  data() {
    //自定义校验选项label
    var checkLabel = (rule, value, callback) => {
      let answer = ['A', 'B', 'C', 'D', 'E', 'F']
      if (!value) {
        return callback(new Error('选项标签不能为空'));
      }
      if (!answer.includes(value)) {
        return callback(new Error('请输入选项/A或B或C或D或E或...'))
      }
      callback();
    };
    return {
      downloadLoading: false,
      loading: null,
      list: [],
      chooseLabelList: ['A', 'B', 'C', 'D', 'E', 'F'],
      excelForm: {
        courseCode: '',
        courseName: '',
        sectionCode: '',
        sectionName: '',
      },
      fd: new FormData(),
      url: 'https://education.quweiquwei.com/%E8%AF%95%E9%A2%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx',
      addQuestionForm: {
        sectionCode: '',
        sectionName: '',
        courseCode: '',
        courseName: '',
        questionName: '',
        questionType: 1,
        answer: '',
        remark: '',
        optionList: []
      },
      courseType: '',
      courseCateList: [],
      courseList: [],  //课程列表
      sectionList: [],
      rulesForm: {
        questionName: [{required: true, message: '请输入题干', trigger: 'blur'}],
        questionType: [{required: true, message: '请选择题型', trigger: 'blur'}],
        sectionCode: [{required: true, message: '请选择章节', trigger: 'blur'}],
        courseCode: [{required: true, message: '请选择课程', trigger: 'blur'}],
      },
      chooseForm: {
        optionIndex: 'A',
        optionContext: ''
      },
      chooseRule: {
        optionIndex: [{validator: checkLabel, trigger: 'blur'}],
        optionContext: [{required: true, message: '请输入值', trigger: 'blur'}],
      },
      id: '',
      options: [
        {
          value: 1,
          label: '单选题'
        },
        {
          value: 2,
          label: '多选题'
        },
        {
          value: 3,
          label: '判断题'
        }
      ],
      radio: '1',
      dialogVisible: false,
      checkList: [],
      checked: '',
      radioChooseList: [],
      checkChooseList: [],
      flag: false
    }
  },
  methods: {
    handleChangeCheckBox(e){
      this.addQuestionForm.answer=e.sort().join('')
    },
    //处理多选框
    handleCheckBox(e) {
      console.log(e);
    },
    //选择单选答案
    handleChangeRadio(e) {
      this.addQuestionForm.answer = e
    },
    // 选择类型
    handleChangeType(e) {
      this.addQuestionForm.answer = ''
      this.radioChooseList = []
      this.checkChooseList = []
    },
    //选择章节
    handleChangeSection(e) {
      if (this.sectionList.length !== 0) {
        let item = this.sectionList.find(v => v.sectionCode === e)
        if (item !== 'undefined') {
          this.addQuestionForm.sectionName = item.sectionName
          this.excelForm.sectionName = item.sectionName
        }
      }

    },
    //获取章节
    queryCourseSectionTree(args) {
      api.queryCourseSectionTreeAPI(args).then(res => {
        if(res.data.length===0){
          this.addQuestionForm.sectionCode=''
        }
        this.sectionList = res.data
      })
    },
    //获取课程列表
    queryCourseList(args) {
      queryCourseList(args).then(res => {
        if(res.data.length===0){
          this.addQuestionForm.courseCode=''
          this.addQuestionForm.sectionCode=''
        }
        this.courseList = res.data.map(v => {
          return {
            label: v.courseName,
            value: v.courseCode,
            courseType:v.courseType
          }
        })
      })
    },
    //选择课程分类
    handleChangeCourseCate(e) {
      this.addQuestionForm.courseCode=''
      this.queryCourseList({courseType: e})
    },
    //选择课程
    handleChangeCourse(e) {
      this.addQuestionForm.sectionCode=''
      if (this.courseList.length !== 0) {
        let item = this.courseList.find(v => v.value === e)
        if (item !== 'undefined') {
          this.addQuestionForm.courseName = item.label
          this.excelForm.courseName = item.label
          this.queryCourseSectionTree({courseCode: e})
        }
      }
    },
    //获取课程分类列表
    getCourseCate() {
      api.queryCourseTypeListAPI().then(res => {
        this.courseCateList = res.data.map(v => {
          return {
            label: v.courseTypeName,
            value: v.courseType
          }
        })
      })
    },
    // 提交导入试题
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.flag) return this.$message({type: 'warning', message: '试题答案不能为空!'})
          console.log(this.list);
          this.fd.append('courseCode', this.excelForm.courseCode)
          this.fd.append('courseName', this.excelForm.courseName)
          this.fd.append('sectionCode', this.excelForm.sectionCode)
          this.fd.append('sectionName', this.excelForm.sectionName)
          uploadMethod({
            url: 'uploadQuestionExcel.do',
            params: this.fd,
            success: res => {
              this.$router.go(-1)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //校验试题
    checkQuestion(arr) {
      if (!Array.isArray(arr)) return
      arr.forEach(item => {
        if (!item.hasOwnProperty('answer')) {
          return this.flag = false
        }
        return this.flag = true
      })
    },
    // 下载模板
    handleDownload() {
      this.downloadLoading = true
      this.$refs.download.click()
      this.downloadLoading = false
    },
    // 上传之前处理
    beforeUpload(file) {
      this.downloadLoading = true
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    //上传成功
    handleSuccess({results, header, rawFile}) {
      this.fd.append('file', rawFile)
      this.$message({type: 'success', message: '上传成功!'})
      try {
        this.list = this.formateData(results)
        this.checkQuestion(results)
      } catch (e) {
        //TODO handle the exception
        this.$message.error('格式错误,请检查excel文档格式!')
      }
      this.downloadLoading = false
    },
    //格式化数据
    formateData(arr) {
      let res = [
        {'title': '单选题', list: []},
        {'title': '多选题', list: []},
        {'title': '判断题', list: []},
      ]
      arr.map(v => {
        res.forEach((item, index) => {
          if (item.title === v.type) {
            if (v.labelC) {
              res[index].list.push({
                name: v.title,
                answer: index == 1 && v.hasOwnProperty('answer') ? v.answer.split('') : [],
                otherAnswer: v.answer,
                desc: v.desc,
                labelList: [
                  {labelName: "A", value: v.labelA},
                  {labelName: "B", value: v.labelB},
                  {labelName: "C", value: v.labelC},
                  {labelName: "D", value: v.labelD},
                ]
              })
            } else {
              res[index].list.push({
                name: v.title,
                answer: v.answer,
                otherAnswer: v.answer,
                desc: v.desc,
                labelList: [
                  {labelName: "A", value: v.labelA},
                  {labelName: "B", value: v.labelB},
                ]
              })
            }
          }
        })
      })
      return res
    },
    // 删除选项
    onHandleDel(index) {
      if (this.addQuestionForm.questionType != 2) {
        this.radioChooseList.splice(index, 1)
      } else {
        this.checkChooseList.splice(index, 1)
      }
    },
    resetFormChoose(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
    },
    // 添加选项
    onSubmitChoose(formName) {
      let type = this.addQuestionForm.questionType
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let item = {optionIndex: this.chooseForm.optionIndex, optionContext: this.chooseForm.optionContext}
          if (type != 2) {
            let index = this.radioChooseList.findIndex(v => v.optionIndex == item.optionIndex)
            if (index !== -1) {
              return this.$message({type: 'warning', message: '请勿重复添加相同选项!'})
            }
            this.radioChooseList.push(item)
          } else {
            let index1 = this.checkChooseList.findIndex(v => v.optionIndex == item.optionIndex)
            if (index1 !== -1) {
              return this.$message({type: 'warning', message: '请勿重复添加相同选项!'})
            }
            this.checkChooseList.push(item)
          }
          this.$refs[formName].resetFields();
          this.dialogVisible = false
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    handleAddChoose() {
      this.dialogVisible = true
    },
    //提交试题更新
    onSubmitAddQuestion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addQuestionForm.answer) {
            if (this.addQuestionForm.questionType == 2) {
              this.addQuestionForm.answer = this.checkList.sort().join("")
            } else {
              this.addQuestionForm.answer = this.addQuestionForm.answer
            }
          }
          this.addQuestionForm.optionList = this.addQuestionForm.questionType != 2 ? this.radioChooseList : this.checkChooseList
          if (!this.addQuestionForm.answer) return this.$message({type: 'warning', message: '请选择答案!'})
          console.log(this.addQuestionForm)
          if (!this.id) {
            api.addQuestionAPI(this.addQuestionForm).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            })
          } else {
            api.updateQuestionAPI(this.addQuestionForm).then(res => {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
            })
          }
          this.$router.go(-1)
        } else {
          // // console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    },

    // 获取详情
    getDetail() {
      if (this.id) {
        this.app.showLoading()
        api.queryQuestionDetailAPI({id: this.id}).then(res => {
          let detail = res.data
          this.courseType=this.courseList.find(v=>v.value===detail.courseCode).courseType
          this.queryCourseSectionTree({courseCode: detail.courseCode})
          this.addQuestionForm.id = detail.id
          this.addQuestionForm.questionName = detail.questionName
          this.addQuestionForm.questionType = Number(detail.questionType)
          this.addQuestionForm.courseName = detail.courseName
          this.addQuestionForm.courseCode = detail.courseCode
          this.addQuestionForm.sectionName = detail.sectionName
          this.addQuestionForm.sectionCode = detail.sectionCode
          this.addQuestionForm.remark = detail.remark
          this.addQuestionForm.answer = detail.answer
          if (detail.questionType == 2) {
            this.checkChooseList = detail.optionList ? detail.optionList.map(v => {
              return {optionIndex: v.optionIndex, optionContext: v.optionContext}
            }) : []
            this.checkList = detail.answer ? detail.answer.split('') : []
          } else {
            this.radioChooseList = detail.optionList ? res.data.optionList.map(v => {
              return {optionIndex: v.optionIndex, optionContext: v.optionContext}
            }) : []
          }
          this.app.hideLoading()
        })
      }
    }
  },
  computed: {},
  created() {
    this.getCourseCate()
    this.queryCourseList({courseType: ''})
    let query = this.$route.query
    this.id = query.id
    if (query.courseCode !== 'undefined') {
      this.courseType = query.courseType
      // this.queryCourseList({courseType: query.courseType})
      this.addQuestionForm.courseCode = query.courseCode
      this.addQuestionForm.courseName = query.courseName
      this.excelForm.courseCode = query.courseCode
      this.excelForm.courseName = query.courseName
      this.queryCourseSectionTree({courseCode: query.courseCode})
    }
    setTimeout(()=>{
      this.getDetail()
    },300)
  }
}
</script>

<style scoped="scoped">
.el-form-item__content {
  margin-left: 0 !important;
}
</style>
