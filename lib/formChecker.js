// lib formChecker.js

const db = require('../models')
const User = db.User

/**
 * 檢查註冊表單，回傳 error message as Array
 * @param {Object} input user input
 */
async function checkSignUp(input) {
  // 確認未填
  if (!input.email || !input.password) return ['Email 與 Password 為必填']

  // 確認已註冊
  try {
    const user = await User.findOne({ where: { email: input.email } })
    if (user) return ['此 Email 已被註冊']
  } catch (err) {
    console.error('checkSignUp', err)
    return ['伺服器發生錯誤']
  }

  // 確認密碼二次輸入
  if (input.password !== input.password2) return ['密碼不一致']
}


// export
// ==============================

module.exports = { checkSignUp }