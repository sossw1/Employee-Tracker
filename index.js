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
    }).then(function (answer) {
        switch (answer.action) {
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
        choices: ['Department', 'Role', 'Employee']
    }).then(function (answer) {
        switch (answer.addItem) {
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
    inquirer.prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'Department name:'
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO departments SET ?',
            {
                name: answer.deptName
            },
            function (err) {
                if (err) throw err;
                console.log('Department added successfully.');
                init();
            }
        );
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Role title:'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'Salary:'
        },
        {
            name: 'department_id',
            type: 'number',
            message: 'Department id:'
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO roles SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function (err) {
                if (err) throw err;
                console.log('Role added successfully.');
                init();
            }
        );
    });
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

connection.connect(function (error) {
    if (error) throw error;
    init();
});