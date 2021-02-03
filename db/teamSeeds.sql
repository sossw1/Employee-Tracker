USE team_db;

-- Departments

INSERT INTO departments (name)
VALUES ("Accounting");

INSERT INTO departments (name)
VALUES ("Payroll");

INSERT INTO departments (name)
VALUES ("Marketing");

-- Roles

INSERT INTO roles (title, salary, department_id)
VALUES ("Jr. Accountant", 45000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 55000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Payroll Specialist", 45000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Payroll Manager", 60000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Graphic Designer", 50000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Project Manager", 70000, 3);

-- Employees

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Barry", "Downs", 2, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Jenny", "Maven", 4, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Martin", "Roth", 6, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Jerry", "Smith", 1, NULL);