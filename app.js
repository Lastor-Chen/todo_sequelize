// App Server

// import package
// ==============================

// npm package
const express = require('express')                      // framework
const exphbs = require('express-handlebars')            // template engine

const methodOverride = require('method-override')       // 控制 form method
const session = require('express-session')              // session 輔助套件
const passport = require('passport')                    // 處理 user authentication
const flash = require('connect-flash')                  // 產生 flash message

// custom module
const isAuthed = require('./config/auth.js')


// 環境 setting
// ==============================

// 開發模式，使用環境變數
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())

// 設定 session 與 passport
app.use(session({
  secret: '294104fu/ 20 ',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport.js')(passport)

// 設定模板引擎
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  // helpers: { ifEqual: require('./models/lib/helpers.js') }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// 模板引擎公用變數
app.use((req, res, next) => {
  // user 資料
  res.locals.user = req.user

  next()
})


// route 設定
// ==============================

app.get('/', isAuthed, (req, res) => {
  res.render('index')
})
app.use('/users', require('./routes/user.js'))


// start server
// ==============================

app.listen(app.get('port'), () => {
  console.log(
    'Node.js Server with Express is running.',
    '\033[33m',
    `=> http://localhost:${app.get('port')}`,
    '\033[0m'
  )
})