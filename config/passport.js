// config passport.js

// import package
// ==============================

const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

// 載入 User model
const db = require('../models')
const User = db.User


// Local Strategy
// ==============================

const localOption = { 
  usernameField: 'email'
}

async function localCallback(email, password, done) {
  // 確認 Email 帳戶是否已存在
  let user = {}
  try { user = await User.findOne({ where: { email: email } }) }
  catch (err) { console.error(err) }

  if (!user) return done(null, false, { message: 'Email 或 Password 錯誤' }) 

  // 確認 password
  const success = bcrypt.compareSync(password, user.password)
  if (!success) return done(null, false, { message: 'Email 或 Password 錯誤' })

  done(null, user)
}


// Facebook Strategy
// ==============================

const fbOption = {
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}

async function fbCallback(accessToken, refreshToken, profile, cb) {
  // 確認 Email 帳戶是否已存在
  const user = await User.findOne({ where: { email: profile._json.email } })
  if (user) return cb(null, user)

  // 註冊新帳戶
  const newUser = { ...profile._json }
  delete newUser.id

  // 亂數給予一組密碼，並加鹽
  newUser.password = Math.random().toString(36).slice(-8)

  const hash = bcrypt.hashSync(newUser.password, 10)
  newUser.password = hash

  User.create(newUser)
    .then(user => cb(null, user))
    .catch(err => console.error(err))
}


// Strategy 主函式
// ==============================

module.exports = passport => {
  passport.use(new LocalStrategy(localOption, localCallback))
  passport.use(new FacebookStrategy(fbOption, fbCallback))

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