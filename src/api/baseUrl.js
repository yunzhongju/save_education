export default {
	Other: {
		getSimpleUpToken: "getSimpleUpToken.do", //获取简单的文件上传凭证
	},
	Login: {
		getVerificationCode: 'getVerificationCode.do', //获取验证码
		login: 'login.do', //登陆
		loginOut: 'loginOut.do', //退出登陆
		loadUserMenu: 'loadUserMenu.do' //加载当前登录用户的菜单
	},
	Menu: {
		getSysMenuTree: 'getSysMenuTree.do', //获取系统菜单树结构
		addSysMenu: 'addSysMenu.do', //新增菜单信息
		deleteSysMenu: "deleteSysMenu.do", //删除菜单
		updateSysMenu: "updateSysMenu.do", //更新菜单信息
	},
	User: {
		querySysUserByPage: 'querySysUserByPage.do', //分页查询用户信息列表
		getUserList: 'getUserList.do', //查询用户信息列表
		querySysUserDetail: 'querySysUserDetail.do', //查询用户详细信息
		addSysUser: 'addSysUser.do', //新增用户信息
		updateSysUser: 'updateSysUser.do', //修改用户信息
		deleteSysUser: 'deleteSysUser.do', //删除用户信息
		updateSysUserStop: 'updateSysUserStop.do', //用户停用
		updateSysUserStart: 'updateSysUserStart.do', //用户启用
	},
	Role: {
		querySysRoleList: "querySysRoleList.do", //查询角色信息列表
		querySysRoleByPage: "querySysRoleByPage.do", //分页查询角色信息列表
		querySysRoleDetail: "querySysRoleDetail.do", //角色详细信息
		addSysRole: "addSysRole.do", //新增角色信息
		updateSysRole: "updateSysRole.do", //修改角色信息
		deleteSysRole: "deleteSysRole.do", //删除角色信息
	},
	Education: {
		queryExamPlanByPage: "queryExamPlanByPage.do", //分页查询考试计划信息列表
		queryExamPlanDetail: "queryExamPlanDetail.do", //查询考试计划详情	
		addExamPlan: "addExamPlan.do", //新增考试计划
		updateExamPlan: "updateExamPlan.do", //更新考试计划信息
		deleteExamPlan: "deleteExamPlan.do", //删除考试计划
	},
	Students: {
		queryStudentList: "queryStudentList.do", //查询学员信息列表
		queryStudentByPage: "queryStudentByPage.do", //分页查询学员信息列表
		queryStudentDetail: "queryStudentDetail.do", //查询学员详细信息
		addStudent: "addStudent.do", //新增学员信息
		updateStudent: "updateStudent.do", //更新学员信息
		deleteStudent: "deleteStudent.do", //删除学员信息
	},
	Paper: {
		queryPaperList: "queryPaperList.do", //查询试卷列表
		queryPaperByPage: "queryPaperByPage.do", //分页查询试卷列表
		addPaper: "addPaper.do", //新增试卷信息
		queryPaperDetail: "queryPaperDetail.do", //查询试卷详情
		updatePaper: "updatePaper.do", //更新试卷信息
		deletePaper: "deletePaper.do", //删除试卷信息
	},
	Question: {
		queryQuestionByPage: "queryQuestionByPage.do", //分页查询题目信息表	
		addQuestion: "addQuestion.do", //新增题目信息表
		queryQuestionDetail: "queryQuestionDetail.do", //查询题目详情
		deleteQuestion: "deleteQuestion.do", //删除 题目信息表
		updateQuestion: "updateQuestion.do", //更新 题目信息表
	},
	Organization: {
		querySysOrgByPage: "querySysOrgByPage.do", //分页查询机构信息列表	
		getSysOrgTree: "getSysOrgTree.do", //查询机构树结构	
		getSysOrgByOrgType: "getSysOrgByOrgType.do", //根据机构类型查询机构信息列表	
		querySysOrgDetail: "querySysOrgDetail.do", //根据机构编码查询机构详细信息	
		addSysOrg: "addSysOrg.do", //新增机构信息	
		updateSysOrg: "updateSysOrg.do", //更新机构信息	
		deleteSysOrg: "deleteSysOrg.do", //删除机构信息	
		deleteGroup: "deleteGroup.do", //解散小组（会同时清除小组成员关系信息）	
		stopSysOrg: "stopSysOrg.do", //机构/小组停用	
		startSysOrg: "startSysOrg.do", //机构/小组启用	
		addUserToGroup: "addUserToGroup.do", //批量添加小组成员	
		makeUserToSimple: "makeUserToSimple.do", //将小组长设置为普通成员	
		makeUserToMaster: "makeUserToMaster.do", //将小组人员设置为小组长	
		deleteUserGroup: "deleteUserGroup.do", //移除小组成员	
		
	},
	Course: {
		queryCourseByPage: "queryCourseByPage.do", //分页查询课程信息列表
		addCourse: "addCourse.do", //新增课程
		updateCourse: "updateCourse.do", //更新课程
		updateCourseInvalid: "updateCourseInvalid.do", //课程下架
		updateCourseEffective: "updateCourseEffective.do", //课程上架
	},
	CourseType: {
		queryCourseTypeList: "queryCourseTypeList.do", //查询课程分类列表
		addCourseType: "addCourseType.do", //新增课程分类
		updateCourseType: "updateCourseType.do", //更新课程分类
		deleteCourseType: "deleteCourseType.do", //删除课程分类
	},
	Teacher: {
		queryTeacherByPage: "queryTeacherByPage.do", //分页查询讲师信息列表
		queryTeacherList: "queryTeacherList.do", //查询讲师信息列表
		queryTeacherDetail: "queryTeacherDetail.do", //查询讲师详细信息
		addTeacher: "addTeacher.do", //新增讲师信息
		updateTeacher: "updateTeacher.do", //更新讲师信息
		deleteTeacher: "deleteTeacher.do", //删除讲师信息
	},
	CourseSection: {
		queryCourseSectionTree: "queryCourseSectionTree.do", //根据课程编码查询课程章节树结构
		addCourseSection: "addCourseSection.do", //新增 课程章节目录信息表
		updateCourseSection: "updateCourseSection.do", //修改 课程章节目录信息表
		deleteCourseSection: "deleteCourseSection.do", //删除 课程章节目录信息表
	},
	Train: {
		queryTrainPlanByPage: "queryTrainPlanByPage.do", //分页查询培训管理信息列表
		addTrainPlan: "addTrainPlan.do", //新增培训管理
		queryTrainPlanDetail: "queryTrainPlanDetail.do", //查询培训管理详细信息
		deleteTrainPlan: "deleteTrainPlan.do", //删除培训管理
		updateTrainPlan: "updateTrainPlan.do", //更新培训管理
	},
	Book: {
		queryBookByPage: "queryBookByPage.do", //分页查询书籍列表
		queryBookDetail: "queryBookDetail.do", //查询书籍详细信息
		addBook: "addBook.do", //新增书籍信息
		updateBook: "updateBook.do", //更新书籍信息
		deleteBook: "deleteBook.do", //删除书籍信息
	},
	BookType: {
		queryBookTypeList: "queryBookTypeList.do", //查询书籍分类列表
		addBookType: "addBookType.do", //新增书籍分类
		updateBookType: "updateBookType.do", //更新书籍分类
		deleteBookType: "deleteBookType.do", //删除书籍分类
	},
	Dictionary: {
		querySysDictionaryCategoryByPage: "querySysDictionaryCategoryByPage.do", //分页查询字典表大类信息列表
		updateSysDictionaryCategory: "updateSysDictionaryCategory.do", //更新字典表大类信息
		addSysDictionaryCategory: "addSysDictionaryCategory.do", //新增字典表大类信息
		deleteSysDictionaryCategory: "deleteSysDictionaryCategory.do", //删除字典表大类信息
		
		querySysDictionaryByPage: "querySysDictionaryByPage.do", //分页查询字典表小类信息列表
		updateSysDictionary: "updateSysDictionary.do", //更新字典表小类信息
		addSysDictionary: "addSysDictionary.do", //新增字典表小类信息
		deleteSysDictionary: "deleteSysDictionary.do", //删除字典表小类信息
	},
	Notice: {
		noticeByPage: "notice/page.do", //分页查询公告列表
		noticeByDetail: "notice/detail.do", //查询公告详情
		noticeByAdd: "notice/add.do", //新增公告
		noticeByUpdate: "notice/update.do", //更新公告
		noticeByCancel: "notice/cancel.do", //撤销公告
		noticeByDelete: "notice/delete.do", //删除公告
	},
	News: {
		newsAdd: "/news/add.do", //新增资讯
		newsUpdate: "/news/update.do", //更新资讯
		newsDelete: "/news/delete.do", //删除资讯
		newsPage: "/news/page.do", //分页查询资讯列表
		newsDetail: "/news/detail.do", //查询资讯详情
		approveNews: "/news/approveNews.do", //审核资讯
		queryApproveRecord: "/news/queryApproveRecord.do", //获取审核记录列表
	},
	Channel: {
		channelQueryTree: "/channel/queryTree.do", //查询栏目树
		channelAdd: "/channel/add.do", //新增栏目
		channelUpdate: "/channel/update.do", //更新栏目
		channelDelete: "/channel/delete.do", //删除栏目
		channelDetail: "/channel/detail.do", //查询栏目详情
	},
	Banner: {
		bannerAdd: "/banner/add.do", //新增广告
		bannerUpdate: "/banner/update.do", //更新广告
		bannerQuery: "/banner/queryList.do", //查询广告列表
		bannerDelete: "/banner/delete.do", //删除广告
	},
	AttendanceRule: {
		attendanceRuleQueryList: "/attendanceRule/queryList.do", //新增考勤组
		attendanceRuleAdd: "/attendanceRule/add.do", //新增考勤规则
		attendanceRuleUpdate: "/attendanceRule/update.do", //更新考勤规则
		attendanceRuleDelete: "/attendanceRule/delete.do", //删除考勤规则
		attendanceRuleDetail: "/attendanceRule/detail.do", //查询考勤规则详情
	},
	AttendanceGroup: {
		attendanceGroupAdd: "/attendanceGroup/add.do", //新增考勤组
		attendanceGroupUpdate: "/attendanceGroup/update.do", //更新考勤组
		attendanceGroupDelete: "/attendanceGroup/delete.do", //删除考勤组
		attendanceGroupPage: "/attendanceGroup/page.do", //查询考勤组列表
		attendanceGroupDetail: "/attendanceGroup/detail.do", //查询考勤组详情
		attendanceRecoedPage: "/attendanceRecord/page.do", //查询考勤记录
	}
}
