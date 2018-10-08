const login  = require('./login')
const getArticleList = require('./getArticleList')
const addArticle = require('./addArticle')
const getDetail = require('./getDetail')
const deleteArticle = require('./deleteArticle')
const updateArticle = require('./updateArticle')

module.exports = [
  login,
  getArticleList,
  addArticle,
  getDetail,
  deleteArticle,
  updateArticle
]
