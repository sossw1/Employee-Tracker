// Login info stored separately
const login = require('./login.json');

const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: login.username,
    password: login.password,
    database: 'team_db'
});

function init() {
    
}

connection.connect(function(error) {
    if (error) throw error;
    init();
});