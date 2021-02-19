import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/Index.vue') //登陆
	},
	{
			path: '/404.html',
			name: '404.html',
			component: () => import('../views/404.vue') //404
		},
	//系统管理
	{
		path: '/menu',
		name: 'menu',
		component: () => import('../views/Index.vue'),
		children: [{
				path: '/menu/administration',
				name: 'menu_manage',
				component: () => import('../views/menu_manage/Index.vue') //菜单管理
			},
			{
				path: '/menu/roleManage',
				name: 'role_manage',
				component: () => import('../views/user_manage/Index.vue') //角色管理
			},
			{
				path: '/menu/mechanismManage',
				name: 'mechanism_manage',
				component: () => import('../views/mechanism_manage/Index.vue') //机构管理
			},
			{
				path: '/menu/mechanismCreate',
				name: 'mechanism_create',
				component: () => import('../views/mechanism_manage/CreateOrg.vue') //机构创建
			},
			{
				path: '/menu/userManage',
				name: 'user_manage',
				component: () => import('../views/role_manage/Index.vue') //用户管理/角色分配
			},
			{
				path: '/menu/dictManage',
				name: 'dict_manage',
				component: () => import('../views/dict_manage/Index.vue') //字典管理
			},
		]
	},
	//在线教育
	{
		path: '/education',
		name: 'education',
		component: () => import('../views/Index.vue'),
		children: [{
				path: '/education/online_examination',
				name: 'online_examination',
				component: () => import('../views/online_examination/Index.vue') //考试计划
			},
			{
				path: '/education/online_create_exam',
				name: 'online_create_exam',
				component: () => import('../views/online_examination/CreateExamination.vue') //创建考试计划
			},
			{
				path: '/education/test_paper_manage',
				name: 'test_paper_manage',
				component: () => import('../views/test_paper_manage/Index.vue') //试卷管理
			},
			{
				path: '/education/create_test_paper',
				name: 'create_test_paper',
				component: () => import('../views/test_paper_manage/CreateTestPaper.vue') //试卷创建
			},
			{
				path: '/education/question_manage',
				name: 'question_manage',
				component: () => import('../views/question_manage/Index.vue') //题库管理
			},
			{
				path: '/education/create_question',
				name: 'create_question',
				component: () => import('../views/question_manage/CreateQuestion.vue') //题库添加
			},
			{
				path: '/education/course_manage',
				name: 'course_manage',
				component: () => import('../views/course_manage/Index.vue') //课程管理
			},
			{
				path: '/education/create_course',
				name: 'create_course',
				component: () => import('../views/course_manage/CreateCourse.vue') //课程创建
			},
			{
				path: '/education/section_manage',
				name: 'section_manage',
				component: () => import('../views/course_section_manage/Index.vue') //章节管理
			},
			{
				path: '/education/train_manage',
				name: 'train_manage',
				component: () => import('../views/train_manage/Index.vue') //培训管理
			},
			{
				path: '/education/create_train',
				name: 'create_train',
				component: () => import('../views/train_manage/CreateTrain.vue') //培训创建
			},
			{
				path: '/education/books_manage',
				name: 'books_manage',
				component: () => import('../views/books_manage/Index.vue') //图书管理
			},
			{
				path: '/education/create_book',
				name: 'create_book',
				component: () => import('../views/books_manage/CreateBook.vue') //图书创建
			},
		]
	},
	//成员管理
	{
		path: '/member',
		name: 'member',
		component: () => import('../views/Index.vue'),
		children: [{
				path: '/member/student_manage',
				name: 'student_manage',
				component: () => import('../views/student_manage/Index.vue') //学员管理
			},
			{
				path: '/member/teacher_manage',
				name: 'teacher_manage',
				component: () => import('../views/teacher_manage/Index.vue') //教师管理
			},
		]
	},
	//考勤管理
	{
		path: '/attendance',
		name: 'attendance',
		component: () => import('../views/Index.vue'),
		children: [{
				path: '/attendance/attendance_manage',
				name: 'attendance_manage',
				component: () => import('../views/attendance_manage/Index.vue') //考勤管理
			},
			{
				path: '/attendance/attendance_group',
				name: 'attendance_group',
				component: () => import('../views/attendance_manage/AttendanceGroup.vue') //考勤组
			},
			{
				path: '/attendance/attendance_record',
				name: 'attendance_record',
				component: () => import('../views/attendance_manage/AttendanceRecord.vue') //考勤记录
			},
		]
	},
	//商城管理
	{
		path: '/mall',
		name: 'mall',
		component: () => import('../views/Index.vue'),
		children: [{
				path: '/mall/goods_category',
				name: 'goods_category',
				component: () => import('../views/mall_manage/categories/Index.vue') //商品分类
			},
		  {
				path: '/mall/goods_manage',
				name: 'goods_manage',
				component: () => import('../views/mall_manage/goods_manage/Index.vue') //商品管理
			},
			{
				path: '/mall/create_goods',
				name: 'create_goods',
				component: () => import('../views/mall_manage/goods_manage/CreateGoods.vue') //商品添加
			},
			{
				path: '/mall/goods_images',
				name: 'goods_images',
				component: () => import('../views/mall_manage/goods_manage/ImageManag.vue') //商品图片管理
			},
			{
				path: '/mall/goods_detail',
				name: 'goods_detail',
				component: () => import('../views/mall_manage/goods_manage/GoodsDetail.vue') //商品图片管理
			},
			{
				path: '/mall/order',
				name: 'order',
				component: () => import('../views/mall_manage/order_manage/Index.vue') //订单管理
			},
			{
				path: '/mall/integral_type',
				name: 'integral_type',
				component: () => import('../views/mall_manage/integral/Index.vue') //积分类型
			},
		]
	},
	//资讯管理
	{
		path: '/news',
		name: 'news',
		component: () => import('../views/Index.vue'),
		children: [{
				path: '/news/news_manage',
				name: 'news_manage',
				component: () => import('../views/news_manage/Index.vue') //新闻管理
			},
			{
				path: '/news/create_news',
				name: 'create_news',
				component: () => import('../views/news_manage/CreateNews.vue') //新闻创建
			},
			{
				path: '/news/create_channel',
				name: 'create_channel',
				component: () => import('../views/news_manage/CreateChannel.vue') //栏目创建
			},
			{
				path: '/news/news_detail',
				name: 'news_detail',
				component: () => import('../views/news_manage/NewsDetail.vue') //新闻详情
			},
			{
				path: '/news/video_manage',
				name: 'video_manage',
				component: () => import('../views/video_manage/Index.vue') //视频管理
			},
			{
				path: '/news/create_video',
				name: 'create_video',
				component: () => import('../views/video_manage/CreateVideo.vue') //视频创建
			},
			{
				path: '/news/advertisement_manage',
				name: 'advertisement_manage',
				component: () => import('../views/advertisement_manage/Index.vue') //广告管理
			},
			{
				path: '/news/announcement_manage',
				name: 'announcement_manage',
				component: () => import('../views/announcement_manage/Index.vue') //公告信息
			},
			{
				path: '/news/create_announcement',
				name: 'create_announcement',
				component: () => import('../views/announcement_manage/CreateAnnouncement.vue') //公告创建
			},
			{
				path: '/news/announcement_detail',
				name: 'announcement_detail',
				component: () => import('../views/announcement_manage/AnnouncementDetail.vue') //公告详情
			},
		]
	},
	{
		path: '/',
		name: 'Index',
		redirect: '/login',
		component: () => import('../views/Index.vue'),
		children: [{
				path: 'test',
				name: 'test',
				component: () => import('../views/Test.vue') //test code
			},
			{
				path: 'home',
				name: 'home',
				component: () => import('../views/home/Index.vue') //首页
			},
		]
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to,from,next)=>{
	if(!to.name) router.push('/404.html')
	else next()
})
export default router
