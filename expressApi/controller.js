'use strict'

const mysql = require('mysql');
var connect = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: 'root',
    database: "vueshop",
});

//进行连接
connect.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('连接数据库成功');
});

var succStatus = 0 // 表示成功
var failStatus = 1 // 表示失败

var mydomain = "http://test.w0824.com/"; // 七牛云存储对象域名

//定义控制器，下面都是控制器的方法
var controller = {};

// 1. 获取首页轮播图数据
controller.getlunbo = (req, res) => {
    var resObj = {
        status: succStatus,
        message: [{
            url: 'http://www.baidu.com',
            img: `${mydomain}banner_1.jpg`
        }, {
            url: 'http://jd.com',
            img: `${mydomain}banner_2.jpg`
        },{
            url: 'https://www.tmall.com/',
            img: `${mydomain}banner_3.jpg`
        }]
    }
    res.json(resObj)
}

// 2. 获取新闻资讯
controller.getnewslist = (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var pagesize = parseInt(req.query.pagesize) || 10;
    var offset = (page-1)*pagesize;
    // 代表返回的数据结构
    var resObj = {
        status: succStatus,
        message: ''
    }
    var sql = " SELECT id,title,add_time,click,concat('" + mydomain + "',img_url) as img_url FROM dt_article where img_url > '' limit " + offset +',' + pagesize + " "
    connect.query(sql, (err, datas) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failStatus
            resObj.message = err.message
            res.end(JSON.stringify(resObj))
            return;
        }

        resObj.message = datas
        res.json(resObj)
    })
}

// 3. 根据资讯id获取资讯详情
controller.getnew = (req, res) => {
    // 代表返回的数据结构
    var resObj = {
        status: succStatus,
        message: ''
    }

    // 1.0 获取参数值
    var newid = req.params.newid

    // 2.0 执行查询操作
    var sql = 'select id,title,click,add_time,content from dt_article  where id=' + newid
    connect.query(sql, (err, data) => {
        // 3.0 判断是否异常
        if (err) {
            resObj.status = failStatus
            resObj.message = err.message
            res.end(JSON.stringify(resObj))
            return
        }

        // 4.0 获取数据成功
        resObj.message = data
        res.json(resObj)
    })
}

// 4.0 获取评论信息
controller.getcomments = (req, res) => {
  // 代表返回的数据结构
  var resObj = {
      status: succStatus,
      message: ''
  }

  // 1.0 获取参数值
  var artid = req.params.artid
  var pageindex = req.query.pageindex
  // var pagesize = 10;
  var pagesize = 5;
  var skipCount = (pageindex - 1) * pagesize

  // 2.0 执行查询操作
  var sql = `select  id,user_name,add_time,content from dt_article_comment where article_id = ${artid} order by add_time desc limit ${skipCount},${pagesize}`
  connect.query(sql, (err, data) => {
      // 3.0 判断是否异常
      if (err) {
          resObj.status = failStatus
          resObj.message = err.message
          res.end(JSON.stringify(resObj))
          return
      }

      // 4.0 获取数据成功
      resObj.message = data
      res.json(resObj)
  })
}

// 5.0 提交评论数据
controller.postcomment = (req, res) => {
  // 返回的数据结构
  var resObj = {
      status: succStatus,
      message: ''
  }

  var artid = req.params.artid
  var content = req.body.content;

  var sql = `insert into  dt_article_comment(article_id,user_name,
                          content,add_time)
            values (${artid},'匿名用户','${content}',NOW())`
  connect.query(sql, (err, data) => {
      if (err) {
          resObj.status = failStatus
          resObj.message = err.message
          res.end(JSON.stringify(resObj))
          return
      }
      resObj.message = '评论提交成功'
      res.json(resObj)
  })


}

// 6.0 商品列表
controller.getgoods = (req, res) => {
    // 代表返回的数据结构
    var resObj = {
        status: succStatus,
        message: ''
    }
    var pageindex = req.query.pageindex
    if (!pageindex) {
        pageindex = 1;
    }
    var pagesize = 10
    var skipcount = (pageindex - 1) * pagesize


    var sql = `SELECT a.id,a.title,a.add_time,left(a.zhaiyao,25) as zhaiyao,a.click,concat('${mydomain}',a.img_url) as img_url,b.sell_price,b.market_price,b.stock_quantity FROM dt_article as a,dt_article_attribute_value b where a.id = b.article_id and a.channel_id = 7 limit ${skipcount},${pagesize} `
    connect.query(sql, (err, datas) => {
        if (err) {
            resObj.status = failStatus
            resObj.message = err.message
            res.end(JSON.stringify(resObj))
            return
        }

        //获取数据成功
        resObj.message = datas
        res.json(resObj)
    })
}

// 7.0 根据商品id获取图片缩略图
controller.getthumbimages = (req, res) => {
  // 代表返回的数据结构
  var resObj = {
      status: succStatus,
      message: ''
  }

  // 1.0 获取路由参数值
  var newid = req.params.id

  // 2.0 执行查询操作
  var sql = 'select concat("' + mydomain + '",thumb_path)  as src  from dt_article_albums where article_id =' + newid;

  connect.query(sql, (err, data) => {
      // 3.0 判断是否异常
      if (err) {
          resObj.status = failStatus
          resObj.message = err.message
          res.json(resObj)
          return
      }

      // 4.0 获取数据成功
      resObj.message = data
      res.json(resObj)
  })
}


// 8.0 获取商品详情：名称，价格，参数区数据
controller.getgoodsinfo = (req, res) => {
    // 代表返回的数据结构
    var resObj = {
        status: succStatus,
        message: ''
    }

    var id = req.params.id;
    var sql = ` SELECT da.id,da.title,da.add_time,daa.goods_no,daa.stock_quantity,daa.market_price,daa.sell_price FROM dt_article da , dt_article_attribute_value daa 
        WHERE  da.id = daa.article_id and da.id = ${id} `
    connect.query(sql, (err, datas, fields) => {
        // 4.0 判断是否异常
        if (err) {
            resObj.status = failStatus
            resObj.message = err.message
            res.json(resObj)
            return
        }

        // 5.0 获取数据成功
        resObj.message = datas
        res.json(resObj)
    })
}

// 9.0 获取购物车列表数据
controller.getshopcarlist = (req, res) => {
    // 代表返回的数据结构
    var resObj = {
        status: succStatus,
        message: ''
    }

    // 1.0 获取参数值
    var ids = req.params.ids

    // 2.0 执行查询操作
    var sql = `
          SELECT count(distinct tb1.id) as cou, tb1.* FROM (
        SELECT  da.id,da.title,daa.sell_price,concat('${mydomain}',alb.thumb_path) as thumb_path
          FROM dt_article da 
          LEFT JOIN dt_article_attribute_value daa ON (da.id = daa.article_id)
          LEFT JOIN dt_article_albums alb ON (da.id = alb.article_id)
        WHERE  da.id IN(${ids}) ) AS tb1 GROUP BY tb1.id
  `

    connect.query(sql, (err, data) => {
        // 3.0 判断是否异常
        if (err) {
            resObj.status = failStatus
            resObj.message = err.message
            res.json(resObj)
            return
        }

        // 4.0 获取数据成功
        resObj.message = data
        res.json(resObj)
    })
}


//导出控制器模块
module.exports = controller;