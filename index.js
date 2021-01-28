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
    inquirer.prompt({
        name: 'addItem',
        type: 'list',
        message: 'What would you like to add?',
        choices: ['Department','Role','Employee']
    }).then(function(answer) {
        switch(answer.addItem){
            case 'Department':
                return addDepartment();
            case 'Role':
                return addRole();
            case 'Employee':
                return addEmployee();
        }
    });
}

function addDepartment() {
    console.log('add dept');
    return init();
}

function addRole() {
    console.log('add role');
    return init();
}

function addEmployee() {
    console.log('add employee');
    return init();
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