'use strict'

const express = require('express')
const router = express.Router();
const controller = require('./controller.js')

//0.0请求首页轮播图数据
router.get('/api/getlunbo', controller.getlunbo)

// 1.0 请求图文资讯
router.get('/api/getnewslist', controller.getnewslist)

// 2.0 根据资讯id获取资讯详细内容
router.get('/api/getnew/:newid', controller.getnew)

// 3.0 图片分享详情中的缩略图数组
router.get('/api/getthumbimages/:id', controller.getthumbimages) 

// 4.0 获取评论内容
router.get('/api/getcomments/:artid', controller.getcomments)
// 5.0 提交评论数据
router.post('/api/postcomment/:artid', controller.postcomment)

// 6.0 获取商品列表数据
router.get('/api/getgoods', controller.getgoods)

// 7.0 获取商品详情
router.get('/api/getgoodsinfo/:id', controller.getgoodsinfo)

// 8.0 获取购物车商品
router.get('/api/getshopcarlist/:ids', controller.getshopcarlist)

module.exports = router

