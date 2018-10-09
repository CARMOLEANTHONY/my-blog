const login  = require('./login')
const getArticleList = require('./getArticleList')
const getUserList = require('./getUserList')
const addArticle = require('./addArticle')
const getDetail = require('./getDetail')
const deleteArticle = require('./deleteArticle')
const updateArticle = require('./updateArticle')
const toggleLike = require('./toggleLike')
const comment = require('./comment')

module.exports = [
  login,
  getArticleList,
  getUserList,
  addArticle,
  getDetail,
  deleteArticle,
  updateArticle,
  toggleLike,
  comment
]
