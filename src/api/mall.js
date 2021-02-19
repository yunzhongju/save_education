import httpRequest from '../utils/request.js'

// 查询积分类型列表
export const queryIntegralTypeByPageAPI = data => {
	return httpRequest('/queryIntegralTypeByPage.do', data, 1)
}
// 添加积分类型
export const addIntegralTypeAPI = data => {
	return httpRequest('/addIntegralType.do', data, 1)
}
// 修改积分类型
export const updateIntegralTypeAPI = data => {
	return httpRequest('/updateIntegralType.do', data, 1)
}
// 删除积分类型
export const deleteIntegralTypeAPI = data => {
	return httpRequest('/deleteIntegralType.do', data, 1)
}
// 查询商品分类树结构
export const queryGoodsCategoryTreeAPI = data => {
	return httpRequest('/queryGoodsCategoryTree.do', data, 1)
}
// 添加商品分类
export const addGoodsCategoryAPI = data => {
	return httpRequest('/addGoodsCategory.do', data, 1)
}
// 修改商品分类
export const updateGoodsCategoryAPI = data => {
	return httpRequest('/updateGoodsCategory.do', data, 1)
}
// 删除商品分类
export const deleteGoodsCategoryAPI = data => {
	return httpRequest('/deleteGoodsCategory.do', data, 1)
}
// 分页查询商品列表
export const queryGoodsByPageAPI = data => {
	return httpRequest('/queryGoodsByPage.do', data, 1)
}
// 查询商品详情
export const queryGoodsDetailAPI = data => {
	return httpRequest('/queryGoodsDetail.do', data, 1)
}
// 添加商品
export const addGoodsAPI = data => {
	return httpRequest('/addGoods.do', data, 1)
}
// 修改商品
export const updateGoodsAPI = data => {
	return httpRequest('/updateGoods.do', data, 1)
}
// 删除商品
export const deleteGoodsAPI = data => {
	return httpRequest('/deleteGoods.do', data, 1)
}
// 下架商品
export const updateGoodsInvalidAPI = data => {
	return httpRequest('/updateGoodsInvalid.do', data, 1)
}
// 上架商品
export const updateGoodsEffectiveAPI = data => {
	return httpRequest('/updateGoodsEffective.do', data, 1)
}
// 添加商品图片
export const addGoodsPicAPI = data => {
	return httpRequest('/addGoodsPic.do', data, 1)
}
// 修改商品图片
export const updateGoodsPicAPI = data => {
	return httpRequest('/updateGoodsPic.do', data, 1)
}
// 删除商品图片
export const deleteGoodsPicAPI = data => {
	return httpRequest('/deleteGoodsPic.do', data, 1)
}
// 分页查询商品图片
export const queryGoodsPicByPageAPI = data => {
	return httpRequest('/queryGoodsPicByPage.do', data, 1)
}
// 分页查询订单列表
export const queryOrderByPageAPI = data => {
	return httpRequest('/queryOrderByPage.do', data, 1)
}
// 查询订单详情
export const queryOrderDetailAPI = data => {
	return httpRequest('/queryOrderDetail.do', data, 1)
}
// 将用户设为核销员
export const updateSysUserIsVerifierAPI = data => {
	return httpRequest('/updateSysUserIsVerifier.do', data, 1)
}
// 取消核销员
export const updateSysUserIsNotVerifierAPI = data => {
	return httpRequest('/updateSysUserIsNotVerifier.do', data, 1)
}
