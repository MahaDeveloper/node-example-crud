var mysql = require('mysql')
const http = require('http')
var cron = require('node-schedule')
require('dotenv').config()
var mysqlExecute = require('./connection.js')
var rule = new cron.RecurrenceRule()
rule.second = 1;
var FCM = require("fcm-push");
const PushServerKey = process.env.FCM_SERVER_KEY
var fcm = new FCM(PushServerKey);

pool = mysql.createPool({
    connectionLimit: process.env.connectionLimit,
    host: '127.0.0.1',
    user: process.env.dbUsername,
    password: process.env.dbPassword,
    database: process.env.dbName,
    debug: false,
    charset: 'utf8mb4'
})

cron.scheduleJob("0 0 */1 * * *", async function() {
    
})
