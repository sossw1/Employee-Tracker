DROP DATABASE IF EXISTS team_db;
CREATE DATABASE team_db;

USE team_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Accounting");

INSERT INTO departments (name)
VALUES ("Payroll");

INSERT INTO departments (name)
VALUES ("Marketing");

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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Barry", "Downs", 2, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Jenny", "Maven", 4, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Martin", "Roth", 6, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Jerry", "Smith", 1, NULL);
