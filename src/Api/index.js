import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api'

export const getlunbo = async function () {
  const result = await axios.get('/getlunbo')
  return result.data
}

export const getnewslist = async function () {
  const result = await axios.get('/getnewslist')
  return result.data
}

export const getnews = async function (id) {
  const result = await axios.get('/getnew/' + id)
  return result.data
}

export const getNewsComments = async function (id, pageindex) {
  const result = await axios.get('/getcomments/' + id + '?pageindex=' + pageindex)
  return result.data
}

export const sendNewsComments = async function (id, content) {
  const params = new URLSearchParams()
  params.append('content', content)
  const result = await axios.post('/postcomment/' + id, params)
  return result.data
}
