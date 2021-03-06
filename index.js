const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "",
  password: "",
  database: "team_db",
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please select an action.",
      choices: ["View", "Add", "Update", "Exit"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View":
          return view();
        case "Add":
          return add();
        case "Update":
          // Could be expanded later
          return updateEmployeeRole();
        case "Exit":
          console.log("Goodbye.");
          return connection.end();
      }
    });
}

function view() {
  inquirer
    .prompt({
      name: "viewChoice",
      type: "list",
      message: "Which table would you like to view?",
      choices: ["View All Employees", "View All Roles", "View All Departments"],
    })
    .then(function (answer) {
      let query;
      switch (answer.viewChoice) {
        case "View All Employees":
          query = "SELECT * FROM employees";
          break;
        case "View All Roles":
          query = "SELECT * FROM roles";
          break;
        case "View All Departments":
          query = "SELECT * FROM departments";
          break;
      }
      connection.query(query, (err, data) => {
        if (err) throw err;
        console.table(data);
        return init();
      });
    });
}

function add() {
  inquirer
    .prompt({
      name: "addItem",
      type: "list",
      message: "What would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      switch (answer.addItem) {
        case "Department":
          return addDepartment();
        case "Role":
          return addRole();
        case "Employee":
          return addEmployee();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Department name:",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: answer.deptName,
        },
        function (err) {
          if (err) throw err;
          console.log("Department added successfully.");
          init();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Role title:",
      },
      {
        name: "salary",
        type: "number",
        message: "Salary:",
      },
      {
        name: "department_id",
        type: "number",
        message: "Department id:",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Role added successfully.");
          init();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "First name:",
      },
      {
        name: "last_name",
        type: "input",
        message: "Last name:",
      },
      {
        name: "role_id",
        type: "number",
        message: "Role id:",
      },
      {
        name: "manager_id",
        type: "number",
        message: "Manager id:",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added successfully.");
          init();
        }
      );
    });
}

function updateEmployeeRole() {
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "employeeChoice",
          type: "list",
          message: "Which employee would you like to update?",
          choices: function () {
            let choiceArray = [];
            for (result of results) {
              choiceArray.push(`${result.id}: ${result.first_name} ${result.last_name}`);
            }
            return choiceArray;
          },
        },
        {
          name: "roleChoice",
          type: "number",
          message: "What is their role id?",
        },
      ])
      .then(function (answer) {
        let employeeId = answer.employeeChoice.split(":")[0];
        connection.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: answer.roleChoice 
            },
            {
              id: employeeId
            },
          ],
          function (err) {
            if (err) throw err;
            console.log("Employee updated successfully!");
            return init();
          }
        );
      });
  });
}

connection.connect(function (error) {
  if (error) throw error;
  init();
});
