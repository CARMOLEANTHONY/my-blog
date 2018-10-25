const login = require('./login')
const getArticleList = require('./article/getArticleList')
const getUserList = require('./user/getUserList')
const addArticle = require('./article/addArticle')
const getDetail = require('./article/getDetail')
const deleteArticle = require('./article/deleteArticle')
const updateArticle = require('./article/updateArticle')
const toggleLike = require('./toggleLike')
const comment = require('./comment/comment')
const getUserMessage = require('./user/getUserMessage')
const updateUserMessage = require('./user/updateUserMessage.js')
const getCommentList = require('./comment/getCommentList.js')

module.exports = [
  login,
  getArticleList,
  getUserList,
  getUserMessage,
  addArticle,
  getDetail,
  deleteArticle,
  updateArticle,
  toggleLike,
  comment,
  updateUserMessage,
  getCommentList
]