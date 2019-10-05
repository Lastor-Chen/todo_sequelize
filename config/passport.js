// config passport.js

// import package
// ==============================

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

// 載入 User model
const db = require('../models')
const User = db.User


// Local Strategy
// ==============================

function localCallback(email, password, done) {
  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) return done(null, false, { message: 'Email 或 Password 錯誤' })
      
      // check password
      const success = bcrypt.compareSync(password, user.password)
      if (!success) return done(null, false, { message: 'Email 或 Password 錯誤' })

      done(null, user)
    })
    .catch(err => console.error(err))
}

const localStrategy = new LocalStrategy({ usernameField: 'email' }, localCallback)


// Strategy 主函式
// ==============================

module.exports = passport => {
  passport.use(localStrategy)

  // 序列化 session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // 反序列化 session
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}