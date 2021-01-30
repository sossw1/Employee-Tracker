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
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'First name:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Last name:'
        },
        {
            name: 'role_id',
            type: 'number',
            message: 'Role id:'
        },
        {
            name: 'manager_id',
            type: 'number',
            message: 'Manager id:'
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO employees SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function (err) {
                if (err) throw err;
                console.log('Employee added successfully.');
                init();
            }
        );
    });
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