import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const cartdata = JSON.parse(localStorage.getItem('cartdata') || '[]')
const store = new Vuex.Store({
  state: {
    cartdata
  },
  getters: {
    // 查询购物车数量
    getcartnumber (state) {
      var totalnumber = 0
      state.cartdata.forEach(function (item) {
        totalnumber += item.number
      })
      return totalnumber
    },
    // 获取购物车商品id
    getcartids (state) {
      var ids = []
      state.cartdata.forEach(function (item) {
        ids.push(item.id)
      })
      return ids.toString()
    },
    // 获取商品总数量及总价格
    getnumberandprice (state) {
      var number = 0
      var totalprice = 0
      state.cartdata.forEach(function (item) {
        if (item.selected === true) {
          number += item.number
          totalprice += item.number * item.price
        }
      })
      return { number, totalprice }
    },
    // 获取商品数量
    getgoodsnumber (state) {
      var obj = {}
      state.cartdata.forEach(function (item) {
        obj[item.id] = item.number
      })
      return obj
    },
    getgoodsswitch (state) {
      var ids = {}
      state.cartdata.forEach(function (item) {
        ids[item.id] = item.selected
      })
      return ids
    }
  },
  mutations: {
    addgoods (state, goods) {
      var flag = false
      state.cartdata.forEach(function (item, index) {
        if (item.id === goods.id) {
          flag = true
          item.number += parseInt(goods.number)
        }
      })
      if (flag === false) {
        state.cartdata.push(goods)
      }
      localStorage.setItem('cartdata', JSON.stringify(state.cartdata))
    },
    changegoodsnumber (state, goods) {
      state.cartdata.forEach(function (item, index) {
        if (item.id == goods.id) {
          item.number = goods.number
        }
      })
      localStorage.setItem('cartdata', JSON.stringify(state.cartdata))
    },
    // switch状态
    changegoodsswitch (state, goods) {
      state.cartdata.forEach(function (item, index) {
        if (item.id == goods.id) {
          item.selected = goods.checked
        }
      })
      localStorage.setItem('cartdata', JSON.stringify(state.cartdata))
    },
    delgoods (state, id) {
      state.cartdata.forEach(function (item, index) {
        if (item.id == id) {
          state.cartdata.splice(index, 1)
        }
      })
      localStorage.setItem('cartdata', JSON.stringify(state.cartdata))
    }
  }
})

export default store
