import Vue from 'vue'
export const bus = new Vue({
  data () {
    return {
      // 定义数据
      course_info: {},
    }
  },
  created () {
    // 绑定监听
    this.$on('getCourseDetail', (value)=>{
      this.course_info = value
    })
  }
})