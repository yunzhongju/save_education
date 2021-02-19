import baseUrl from './baseUrl.js'
import httpRequest from '../utils/request.js'

export default {
	/**
	 * @param {Object} data
	 */
	//七牛云token
	getSimpleUpTokenAPI(data) {
		return httpRequest(baseUrl.Other.getSimpleUpToken, data)
	},

	/**
	 * @param {Object} data
	 * 登陆管理
	 */
	//获取验证码
	getVerificationCodeAPI(data) {
		return httpRequest(baseUrl.Login.getVerificationCode, data)
	},
	//登陆
	loginAPI(data) {
		return httpRequest(baseUrl.Login.login, data, 1)
	},
	//退出登陆
	loginOutAPI(data) {
		return httpRequest(baseUrl.Login.loginOut, data)
	},
	//加载当前登录用户的菜单
	loadUserMenuAPI(data) {
		return httpRequest(baseUrl.Login.loadUserMenu, data)
	},

	/**
	 * @param {Object} data
	 * 用户管理
	 */
	//分页查询用户信息列表
	querySysUserByPageAPI(data) {
		return httpRequest(baseUrl.User.querySysUserByPage, data, 1)
	},
	//查询用户详细信息
	querySysUserDetailAPI(data) {
		return httpRequest(baseUrl.User.querySysUserDetail, data, 1)
	},
	//新增用户信息
	addSysUserAPI(data) {
		return httpRequest(baseUrl.User.addSysUser, data, 1)
	},
	//修改用户信息
	updateSysUserAPI(data) {
		return httpRequest(baseUrl.User.updateSysUser, data, 1)
	},
	//删除用户信息
	deleteSysUserAPI(data) {
		return httpRequest(baseUrl.User.deleteSysUser, data, 1)
	},
	//用户停用
	updateSysUserStopAPI(data) {
		return httpRequest(baseUrl.User.updateSysUserStop, data, 1)
	},
	//用户启用
	updateSysUserStartAPI(data) {
		return httpRequest(baseUrl.User.updateSysUserStart, data, 1)
	},
	//查询用户信息列表
	getUserListAPI(data) {
		return httpRequest(baseUrl.User.getUserList, data,1)
	},

	/**
	 * @param {Object} data
	 * 菜单管理
	 */
	//获取系统菜单树结构
	getSysMenuTreeAPI(data) {
		return httpRequest(baseUrl.Menu.getSysMenuTree, data)
	},
	//新增菜单信息
	addSysMenuAPI(data) {
		return httpRequest(baseUrl.Menu.addSysMenu, data, 1)
	},
	//更新菜单信息
	updateSysMenuAPI(data) {
		return httpRequest(baseUrl.Menu.updateSysMenu, data, 1)
	},
	//删除菜单信息
	deleteSysMenuAPI(data) {
		return httpRequest(baseUrl.Menu.deleteSysMenu, data, 1)
	},

	/**
	 * @param {Object} data
	 * 角色管理
	 */
	//查询角色信息列表
	querySysRoleListAPI(data) {
		return httpRequest(baseUrl.Role.querySysRoleList, data)
	},
	//分页查询角色信息列表
	querySysRoleByPageAPI(data) {
		return httpRequest(baseUrl.Role.querySysRoleByPage, data, 1)
	},
	//角色详情
	querySysRoleDetailAPI(data) {
		return httpRequest(baseUrl.Role.querySysRoleDetail, data, 1)
	},
	//新增角色信息
	addSysRoleAPI(data) {
		return httpRequest(baseUrl.Role.addSysRole, data, 1)
	},
	//修改角色信息
	updateSysRoleAPI(data) {
		return httpRequest(baseUrl.Role.updateSysRole, data, 1)
	},
	//删除角色信息
	deleteSysRoleAPI(data) {
		return httpRequest(baseUrl.Role.deleteSysRole, data, 1)
	},

	/**
	 * @param {Object} data
	 * 考试计划
	 */
	//分页查询考试计划信息列表
	queryExamPlanByPageAPI(data) {
		return httpRequest(baseUrl.Education.queryExamPlanByPage, data, 1)
	},
	//查询考试计划详情
	queryExamPlanDetailAPI(data) {
		return httpRequest(baseUrl.Education.queryExamPlanDetail, data, 1)
	},
	//新增考试计划
	addExamPlanAPI(data) {
		return httpRequest(baseUrl.Education.addExamPlan, data, 1)
	},
	//更新考试计划信息
	updateExamPlanAPI(data) {
		return httpRequest(baseUrl.Education.updateExamPlan, data, 1)
	},
	//删除考试计划
	deleteExamPlanAPI(data) {
		return httpRequest(baseUrl.Education.deleteExamPlan, data, 1)
	},

	/**
	 * @param {Object} data
	 * 学员管理
	 */
	//查询学员信息列表
	queryStudentListAPI(data) {
		return httpRequest(baseUrl.Students.queryStudentList, data)
	},
	//分页查询学员信息列表
	queryStudentByPageAPI(data) {
		return httpRequest(baseUrl.Students.queryStudentByPage, data, 1)
	},
	//查询学员详细信息
	queryStudentDetailAPI(data) {
		return httpRequest(baseUrl.Students.queryStudentDetail, data, 1)
	},
	//新增学员信息
	addStudentAPI(data) {
		return httpRequest(baseUrl.Students.addStudent, data, 1)
	},
	//更新学员信息
	updateStudentAPI(data) {
		return httpRequest(baseUrl.Students.updateStudent, data, 1)
	},
	//删除学员信息
	deleteStudentAPI(data) {
		return httpRequest(baseUrl.Students.deleteStudent, data, 1)
	},

	/**
	 * @param {Object} data
	 * 试卷管理
	 */
	//查询试卷列表
	queryPaperListAPI(data) {
		return httpRequest(baseUrl.Paper.queryPaperList, data)
	},
	//分页查询试卷列表
	queryPaperByPageAPI(data) {
		return httpRequest(baseUrl.Paper.queryPaperByPage, data, 1)
	},
	//查询试卷详情
	queryPaperDetailAPI(data) {
		return httpRequest(baseUrl.Paper.queryPaperDetail, data, 1)
	},
	//更新试卷信息
	updatePaperAPI(data) {
		return httpRequest(baseUrl.Paper.updatePaper, data, 1)
	},
	//删除试卷信息
	deletePaperAPI(data) {
		return httpRequest(baseUrl.Paper.deletePaper, data, 1)
	},
	//新增试卷列表
	addPaperAPI(data) {
		return httpRequest(baseUrl.Paper.addPaper, data, 1)
	},


	/**
	 * @param {Object} data
	 * 题目管理
	 */
	//分页查询 题目信息表
	queryQuestionByPageAPI(data) {
		return httpRequest(baseUrl.Question.queryQuestionByPage, data, 1)
	},
	//新增题目信息表
	addQuestionAPI(data) {
		return httpRequest(baseUrl.Question.addQuestion, data, 1)
	},
	//查询题目详情
	queryQuestionDetailAPI(data) {
		return httpRequest(baseUrl.Question.queryQuestionDetail, data, 1)
	},
	//删除 题目信息表
	deleteQuestionAPI(data) {
		return httpRequest(baseUrl.Question.deleteQuestion, data, 1)
	},
	//更新 题目信息表
	updateQuestionAPI(data) {
		return httpRequest(baseUrl.Question.updateQuestion, data, 1)
	},
	/**
	 * @param {Object} data
	 * 机构管理
	 */
	//分页查询机构信息列表
	querySysOrgByPageAPI(data) {
		return httpRequest(baseUrl.Organization.querySysOrgByPage, data, 1)
	},
	//查询机构树结构
	getSysOrgTreeAPI(data) {
		return httpRequest(baseUrl.Organization.getSysOrgTree, data)
	},
	//根据机构类型查询机构信息列表
	getSysOrgByOrgTypeAPI(data) {
		return httpRequest(baseUrl.Organization.getSysOrgByOrgType, data, 1)
	},
	//根据机构编码查询机构详细信息
	querySysOrgDetailAPI(data) {
		return httpRequest(baseUrl.Organization.querySysOrgDetail, data, 1)
	},
	//新增机构信息
	addSysOrgAPI(data) {
		return httpRequest(baseUrl.Organization.addSysOrg, data, 1)
	},
	//更新机构信息
	updateSysOrgAPI(data) {
		return httpRequest(baseUrl.Organization.updateSysOrg, data, 1)
	},
	//删除机构信息
	deleteSysOrgAPI(data) {
		return httpRequest(baseUrl.Organization.deleteSysOrg, data, 1)
	},
	//解散小组（会同时清除小组成员关系信息）	
	deleteGroupAPI(data) {
		return httpRequest(baseUrl.Organization.deleteGroup, data, 1)
	},
	//机构/小组停用	
	stopSysOrgAPI(data) {
		return httpRequest(baseUrl.Organization.stopSysOrg, data, 1)
	},
	//机构/小组启用	
	startSysOrgAPI(data) {
		return httpRequest(baseUrl.Organization.startSysOrg, data, 1)
	},
	//批量添加小组成员
	addUserToGroupAPI(data) {
		return httpRequest(baseUrl.Organization.addUserToGroup, data, 1)
	},
	//将小组长设置为普通成员
	makeUserToSimpleAPI(data) {
		return httpRequest(baseUrl.Organization.makeUserToSimple, data, 1)
	},
	//将小组人员设置为小组长
	makeUserToMasterAPI(data) {
		return httpRequest(baseUrl.Organization.makeUserToMaster, data, 1)
	},
	//移除小组成员
	deleteUserGroupAPI(data) {
		return httpRequest(baseUrl.Organization.deleteUserGroup, data, 1)
	},


	/**
	 * @param {Object} data
	 * 课程管理
	 */
	//分页查询课程信息列表
	queryCourseByPageAPI(data) {
		return httpRequest(baseUrl.Course.queryCourseByPage, data, 1)
	},
	//新增课程
	addCourseAPI(data) {
		return httpRequest(baseUrl.Course.addCourse, data, 1)
	},
	//更新课程
	updateCourseAPI(data) {
		return httpRequest(baseUrl.Course.updateCourse, data, 1)
	},
	//课程下架
	updateCourseInvalidAPI(data) {
		return httpRequest(baseUrl.Course.updateCourseInvalid, data, 1)
	},
	//课程上架
	updateCourseEffectiveAPI(data) {
		return httpRequest(baseUrl.Course.updateCourseEffective, data, 1)
	},

	/**
	 * @param {Object} data
	 * 课程分类管理
	 */
	//查询课程分类列表
	queryCourseTypeListAPI(data) {
		return httpRequest(baseUrl.CourseType.queryCourseTypeList, data)
	},
	//新增课程分类
	addCourseTypeAPI(data) {
		return httpRequest(baseUrl.CourseType.addCourseType, data, 1)
	},
	//更新课程分类
	updateCourseTypeAPI(data) {
		return httpRequest(baseUrl.CourseType.updateCourseType, data, 1)
	},
	//删除课程分类
	deleteCourseTypeAPI(data) {
		return httpRequest(baseUrl.CourseType.deleteCourseType, data, 1)
	},


	/**
	 * @param {Object} data
	 * 讲师管理
	 */
	//分页查询讲师信息列表
	queryTeacherByPageAPI(data) {
		return httpRequest(baseUrl.Teacher.queryTeacherByPage, data, 1)
	},
	//删除讲师信息
	deleteTeacherAPI(data) {
		return httpRequest(baseUrl.Teacher.deleteTeacher, data, 1)
	},
	//查询讲师详细信息
	queryTeacherDetailAPI(data) {
		return httpRequest(baseUrl.Teacher.queryTeacherDetail, data, 1)
	},
	//新增讲师信息
	addTeacherAPI(data) {
		return httpRequest(baseUrl.Teacher.addTeacher, data, 1)
	},
	//更新讲师信息
	updateTeacherAPI(data) {
		return httpRequest(baseUrl.Teacher.updateTeacher, data, 1)
	},
	//查询讲师信息列表
	queryTeacherListAPI(data) {
		return httpRequest(baseUrl.Teacher.queryTeacherList, data)
	},


	/**
	 * @param {Object} data
	 * 章节管理
	 */
	//根据课程编码查询课程章节树结构
	queryCourseSectionTreeAPI(data) {
		return httpRequest(baseUrl.CourseSection.queryCourseSectionTree, data, 1)
	},
	//新增 课程章节目录信息表
	addCourseSectionAPI(data) {
		return httpRequest(baseUrl.CourseSection.addCourseSection, data, 1)
	},
	//删除 课程章节目录信息表
	deleteCourseSectionAPI(data) {
		return httpRequest(baseUrl.CourseSection.deleteCourseSection, data, 1)
	},
	//修改 课程章节目录信息表
	updateCourseSectionAPI(data) {
		return httpRequest(baseUrl.CourseSection.updateCourseSection, data, 1)
	},


	/**
	 * @param {Object} data
	 * 培训管理
	 */
	//分页查询培训管理信息列表
	queryTrainPlanByPageAPI(data) {
		return httpRequest(baseUrl.Train.queryTrainPlanByPage, data, 1)
	},
	//新增培训管理
	addTrainPlanAPI(data) {
		return httpRequest(baseUrl.Train.addTrainPlan, data, 1)
	},
	//更新培训管理
	updateTrainPlanAPI(data) {
		return httpRequest(baseUrl.Train.updateTrainPlan, data, 1)
	},
	//查询培训管理详细信息
	queryTrainPlanDetailAPI(data) {
		return httpRequest(baseUrl.Train.queryTrainPlanDetail, data, 1)
	},
	//删除培训管理
	deleteTrainPlanAPI(data) {
		return httpRequest(baseUrl.Train.deleteTrainPlan, data, 1)
	},



	/**
	 * @param {Object} data
	 * 图书管理
	 */
	//分页查询书籍列表
	queryBookByPageAPI(data) {
		return httpRequest(baseUrl.Book.queryBookByPage, data, 1)
	},
	//查询书籍详细信息
	queryBookDetailAPI(data) {
		return httpRequest(baseUrl.Book.queryBookDetail, data, 1)
	},
	//新增书籍信息
	addBookAPI(data) {
		return httpRequest(baseUrl.Book.addBook, data, 1)
	},
	//更新书籍信息
	updateBookAPI(data) {
		return httpRequest(baseUrl.Book.updateBook, data, 1)
	},
	//删除书籍信息
	deleteBookAPI(data) {
		return httpRequest(baseUrl.Book.deleteBook, data, 1)
	},


	/**
	 * @param {Object} data
	 * 图书分类管理
	 */
	//查询书籍分类列表
	queryBookTypeListAPI(data) {
		return httpRequest(baseUrl.BookType.queryBookTypeList, data, 1)
	},
	//新增书籍分类
	addBookTypeAPI(data) {
		return httpRequest(baseUrl.BookType.addBookType, data, 1)
	},
	//更新书籍分类
	updateBookTypeAPI(data) {
		return httpRequest(baseUrl.BookType.updateBookType, data, 1)
	},
	//删除书籍分类
	deleteBookTypeAPI(data) {
		return httpRequest(baseUrl.BookType.deleteBookType, data, 1)
	},


	/**
	 * @param {Object} data
	 * 字典管理
	 */
	//分页查询字典表大类信息列表
	querySysDictionaryCategoryByPageAPI(data) {
		return httpRequest(baseUrl.Dictionary.querySysDictionaryCategoryByPage, data, 1)
	},
	//更新字典表大类信息
	updateSysDictionaryCategoryAPI(data) {
		return httpRequest(baseUrl.Dictionary.updateSysDictionaryCategory, data, 1)
	},
	//新增字典表大类信息
	addSysDictionaryCategoryAPI(data) {
		return httpRequest(baseUrl.Dictionary.addSysDictionaryCategory, data, 1)
	},
	//删除字典表大类信息
	deleteSysDictionaryCategoryAPI(data) {
		return httpRequest(baseUrl.Dictionary.deleteSysDictionaryCategory, data, 1)
	},
	//----------------------------------------------------------------------------
	//分页查询字典表小类信息列表
	querySysDictionaryByPageAPI(data) {
		return httpRequest(baseUrl.Dictionary.querySysDictionaryByPage, data, 1)
	},
	//更新字典表小类信息
	updateSysDictionaryAPI(data) {
		return httpRequest(baseUrl.Dictionary.updateSysDictionary, data, 1)
	},
	//新增字典表小类信息
	addSysDictionaryAPI(data) {
		return httpRequest(baseUrl.Dictionary.addSysDictionary, data, 1)
	},
	//删除字典表小类信息
	deleteSysDictionaryAPI(data) {
		return httpRequest(baseUrl.Dictionary.deleteSysDictionary, data, 1)
	},


	/**
	 * @param {Object} data
	 * 公告管理
	 */
	//分页查询公告列表
	noticeByPageAPI(data) {
		return httpRequest(baseUrl.Notice.noticeByPage, data, 1)
	},
	//查询公告详情
	noticeByDetailAPI(data) {
		return httpRequest(baseUrl.Notice.noticeByDetail, data, 1)
	},
	//新增公告
	noticeByAddAPI(data) {
		return httpRequest(baseUrl.Notice.noticeByAdd, data, 1)
	},
	//更新公告
	noticeByUpdateAPI(data) {
		return httpRequest(baseUrl.Notice.noticeByUpdate, data, 1)
	},
	//撤销公告
	noticeByCancelAPI(data) {
		return httpRequest(baseUrl.Notice.noticeByCancel, data, 1)
	},
	//删除公告
	noticeByDeleteAPI(data) {
		return httpRequest(baseUrl.Notice.noticeByDelete, data, 1)
	},


	/**
	 * @param {Object} data
	 * 资讯管理
	 */
	//分页查询资讯列表
	newsPageAPI(data) {
		return httpRequest(baseUrl.News.newsPage, data, 1)
	},
	//查询资讯详情
	newsDetailAPI(data) {
		return httpRequest(baseUrl.News.newsDetail, data, 1)
	},
	//删除资讯
	newsDeleteAPI(data) {
		return httpRequest(baseUrl.News.newsDelete, data, 1)
	},
	//新增资讯
	newsAddAPI(data) {
		return httpRequest(baseUrl.News.newsAdd, data, 1)
	},
	//更新资讯
	newsUpdateAPI(data) {
		return httpRequest(baseUrl.News.newsUpdate, data, 1)
	},
	////审核资讯
	approveNewsAPI(data) {
		return httpRequest(baseUrl.News.approveNews, data, 1)
	},
	//获取审核记录列表
	queryApproveRecordAPI(data) {
		return httpRequest(baseUrl.News.queryApproveRecord, data, 1)
	},

	/**
	 * @param {Object} data
	 * 栏目管理
	 */
	//查询栏目树
	channelPageAPI(data) {
		return httpRequest(baseUrl.Channel.channelQueryTree, data)
	},
	//新增栏目
	channelAddAPI(data) {
		return httpRequest(baseUrl.Channel.channelAdd, data, 1)
	},
	//更新栏目
	channelUpdateAPI(data) {
		return httpRequest(baseUrl.Channel.channelUpdate, data, 1)
	},
	//删除栏目
	channelDeleteAPI(data) {
		return httpRequest(baseUrl.Channel.channelDelete, data, 1)
	},
	//查询栏目详情
	channelDetailAPI(data) {
		return httpRequest(baseUrl.Channel.channelDetail, data, 1)
	},


	/**
	 * @param {Object} data
	 * banner管理
	 */
	//新增广告
	bannerAddAPI(data) {
		return httpRequest(baseUrl.Banner.bannerAdd, data, 1)
	},
	//更新广告
	bannerUpdateAPI(data) {
		return httpRequest(baseUrl.Banner.bannerUpdate, data, 1)
	},
	//查询广告列表
	bannerQueryAPI(data) {
		return httpRequest(baseUrl.Banner.bannerQuery, data)
	},
	//删除广告
	bannerDeleteAPI(data) {
		return httpRequest(baseUrl.Banner.bannerDelete, data, 1)
	},


	/**
	 * @param {Object} data
	 * 考勤规则管理
	 */
	//查询考勤规则列表
	attendanceRuleQueryListAPI(data) {
		return httpRequest(baseUrl.AttendanceRule.attendanceRuleQueryList, data,1)
	},
	//新增考勤规则
	attendanceRuleAddAPI(data) {
		return httpRequest(baseUrl.AttendanceRule.attendanceRuleAdd, data, 1)
	},
	//更新考勤规则
	attendanceRuleUpdateAPI(data) {
		return httpRequest(baseUrl.AttendanceRule.attendanceRuleUpdate, data, 1)
	},
	//删除考勤规则
	attendanceRuleDeleteAPI(data) {
		return httpRequest(baseUrl.AttendanceRule.attendanceRuleDelete, data, 1)
	},
	//查询考勤规则详情
	attendanceRuleDetailAPI(data) {
		return httpRequest(baseUrl.AttendanceRule.attendanceRuleDetail, data, 1)
	},


	/**
	 * @param {Object} data
	 * 考勤组管理
	 */
	//查询考勤组列表
	attendanceGroupPageAPI(data) {
		return httpRequest(baseUrl.AttendanceGroup.attendanceGroupPage, data, 1)
	},
	//新增考勤组
	attendanceGroupAddAPI(data) {
		return httpRequest(baseUrl.AttendanceGroup.attendanceGroupAdd, data, 1)
	},
	//更新考勤组
	attendanceGroupUpdateAPI(data) {
		return httpRequest(baseUrl.AttendanceGroup.attendanceGroupUpdate, data, 1)
	},
	//删除考勤组
	attendanceGroupDeleteAPI(data) {
		return httpRequest(baseUrl.AttendanceGroup.attendanceGroupDelete, data, 1)
	},
	//查询考勤组详情
	attendanceGroupDetailAPI(data) {
		return httpRequest(baseUrl.AttendanceGroup.attendanceGroupDetail, data, 1)
	},
	//查询考勤记录
	attendanceRecoedPageAPI(data) {
		return httpRequest(baseUrl.AttendanceGroup.attendanceRecoedPage, data, 1)
	},
}
