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
    inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'Please select an action.',
            choices: ['Add', 'View', 'Update', 'Exit']
        }).then(function(answer) {
            switch(answer.action) {
                case 'Add':
                    return add();
                case 'View':
                    return view();
                case 'Update':
                    return update();
                case 'Exit':
                    console.log('Goodbye.');
                    return connection.end();
            }
        });
}

function add() {
    
    init();
}

function view() {
    
    init();
}

function update() {
    
    init();
}

connection.connect(function(error) {
    if (error) throw error;
    init();
});