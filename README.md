# Todo List by sequelize
A todo list app. <br>
This is a student project that built on Node.js with Express framework. <br>
Database used MySQL.

簡易的 todo 清單 App。 <br>
這是一個用 Node.js 架設網站的練習專案。

#### 練習目標
* 學習使用 MySQL + sequelize 重構 mongoDB 版本的 app
* 意識 JS 非同步特性，使用 Promise 與 async / await
* 學習利用 sequelize-cli 與 migration 管理 database 版本
* 優化 UX

## Preview Pages
<img src="./public/img/preview.jpg" alt="preview" width="500px" target="_blank">

#### 功能
* 使用者認證系統，可註冊/登入/登出
* 可透過 Facebook 進行登入 (localhost限定)
* 可對 todo 進行 CRUD 操作

## Usage
* 可前往 [Heroku](https://todo-ver-sequelize.herokuapp.com/) 瀏覽佈署版本。 (無法使用 Facebook 登入)
* 或在本機端執行 (需下載，並安裝依賴套件)

安裝方法，請參考下方 [Dependency packages](#Dependency-packages) 與 [Installation](#Installation) 項目。 <br>
安裝完成後，使用以下步驟於本機端啟動專案。

1. 於 cmd 啟動 MySQL。 
    
    * macOS
    ```
    1. 開啟「系統偏好設定介面」並點擊 MySQL 圖標
    2. 點擊 GUI 中的 Start MySQL Server
    ```
    
    * windows(需用系統管理員執行)
    ```
    $ net start mysql80
    ```

1. 使用 MySQL Workbench 工具，新建 database
    ```
    # SQL code
    CREATE DATABASE `your_database_name`;
    ```
1. 在 cmd 進入專案目錄，執行 migration 設定 database
    ```
    $ npx sequelize db:migrate
    ```

1. 執行 seeder，用於 MySQL 建立基本資料 (非必須)
    ```
    $ npm run seeder
    ```

    * 執行 seed 後可使用假帳戶進行快速測試
    ```
    // file path: /seeders/users.json
    
    email: "user1@demo.com",
    password: "12345678"
    
    email: "user2@demo.com",
    password: "12345678"
    ```
    
    * 如有需要，可使用 remover 快速清空資料庫
    ```
    $ npm run remover
    ```


1. 於專案根目錄中新建 .env 檔案，設置環境變數。
    ```
    // Facebook developer App 帳戶資料
    FACEBOOK_ID = ***
    FACEBOOK_SECRET = ***
    FACEBOOK_CALLBACK = http://localhost:3000/auth/facebook/callback
    
    // MySQL Server 帳戶資料
    MYSQL_USER = *** (your_user_name)
	MYSQL_KEY = *** (your_password)
	MYSQL_DATABASE = *** (your_database_name)
	MYSQL_HOST = 127.0.0.1
    ```

1. 啟動 Node.js Server
    
    * 有安裝 nodemon，於專案根目錄執行
    ```
    $ npm run dev
    ```

    * 未安裝 nodemon，於專案根目錄執行
    ```
    $ npm run start
    ```

1. 於瀏覽器開啟網頁
    ```
    http://localhost:3000
    ```

1. 瀏覽完畢後，關閉 Node.js Server
    ```
    回到 cmd 按下 Ctrl + C
    ```

1. 關閉 MySQL
    * macOS
    ```
    1. 開啟「系統偏好設定介面」並點擊 MySQL 圖標
    2. 點擊 GUI 中的 Stop MySQL Server
    ```
    
    * windows(需用系統管理員執行)
    ```
    $ net stop mysql80
    ```

## Dependency packages
#### main
* [Node.js](https://nodejs.org/en/) v10.16.3
* [MySQL](https://www.mongodb.com/) v8.0.17

#### npm package
```
"devDependencies": {
    "nodemon": "^1.19.2"
},
"dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "express-handlebars": "^3.1.0",
    "express-session": "^1.16.2",
    "method-override": "^3.0.0",
    "mysql2": "^1.7.0",
    "passport": "^0.4.0",
    "passport-facebook": "^3.0.0",
    "passport-local": "^1.0.0",
    "sequelize": "^5.19.2",
    "sequelize-cli": "^5.5.1"
}
```

#### front-end package (imported from CDN)
* [Bootstrap](https://getbootstrap.com/) v4.3.1
  * jQuery v3.4.1
  * popper v1.14.7
* [Font-Awesome](https://fontawesome.com/) v5.10.2


## Installation
於本機端執行前，請確認是否已安裝下列內容。

#### Download Project
1. 直接於 Github 上用瀏覽器下載 ZIP file
2. 用 Git clone 專案 (推薦)
```
$ git clone https://github.com/Lastor-Chen/todo_sequelize.git [資料夾名稱]
```

#### Install Node.js
本機端必須安裝 Node.js 與相關 package 才能執行此專案。 <br>
如尚未安裝 Node.js，建議使用 nvm toolkit 下載指定版本的 Node.js

| OS | URL |
| -------- | -------- |
| nvm-windows     | [Link to](https://github.com/coreybutler/nvm-windows) |
| nvm-macOS     | [Link to](https://github.com/nvm-sh/nvm) |

#### Install dependency npm packages
已在 package.json 中登入相關訊息，可直接執行下列指令安裝所需套件。
```
$ npm install
```

#### Download MySQL
本機端必須安裝 MySQL 才能執行此專案。 <br>
請連結到 MySQL 官方網站[下載](https://dev.mysql.com/downloads/mysql/)。


#### 選擇安裝 nodemon
本專案推薦使用 [nodemon](https://github.com/remy/nodemon) 來取代原生的 Node.js 啟動方法。
```
$ npm install -g nodemon
```