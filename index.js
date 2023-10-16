//Import Node packages and paths
const inquirer = require("inquirer")
const table = require("as-table")
const {menuPrompt,addDepartmentPrompt, addRolePrompt, addEmployeePrompt, updateEmployeePrompt} = require("./utils/prompts")
const db = require("./config/connection")


const viewAllDepartments = async () => {
    const [departmentRows,_] = await db.promise().query(`SELECT * FROM department`)
    const departmentTable = table(departmentRows)
    console.log(`\n`)
    console.log(departmentTable)
    console.log(`\n`)
    mainMenu()
}
const viewAllRoles= async () => {
    const [roleRows,_] = await db.promise().query(
    `SELECT role.id, title, name AS department, salary
     FROM role 
     JOIN department ON role.department_id = department.id;`
    )
    const roleTable = table(roleRows)
    console.log(`\n`)
    console.log(roleTable)
    console.log(`\n`)
    mainMenu()
}

const viewAllEmployees= async () => {
    const [employeeRows,_] = await db.promise().query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager 
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`)
    const employeeTable = table(employeeRows)
    console.log(`\n`)
    console.log(employeeTable)
    console.log(`\n`)
    mainMenu()
}
const addToDepartments = async () => {
    try {
        const {department_name} = await inquirer.prompt(addDepartmentPrompt)
        await db.promise().query(
        `INSERT INTO department (name) 
        VALUES ("${department_name}")`
        )
        viewAllDepartments()
        console.log(`Added ${department_name} to database`)
    } catch (error) {
        console.log(error)
    }
}

const addToRoles = async() => {
    try {
        const {role_title, role_department, role_salary} = await inquirer.prompt(addRolePrompt())
        await db.promise().query(
            `INSERT INTO role (title, salary, department_id) 
            VALUES ("${role_title}","${role_salary}","${role_department}");`)
        viewAllRoles()
        console.log(`Added ${role_title} to database`)
    } catch (error) {
        console.log(error)
    }
}

const addEmployee = async() => {
    try {
        const {employee_firstName, employee_lastName, employee_role, employee_manager} = await inquirer.prompt(addEmployeePrompt())
        await db.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ("${employee_firstName}","${employee_lastName}","${employee_role}", "${employee_manager}");`)
        viewAllEmployees()
        console.log(`Added ${employee_firstName} ${employee_lastName} to the database`)
    } catch (error) {
        console.log(error)
    }
}
const updateEmployee = async() => {
    try {
        const {employee, employee_role} = await inquirer.prompt(updateEmployeePrompt())
        await db.promise().query(
            `UPDATE employee 
            SET role_id = "${employee_role}" 
            WHERE employee.id = "${employee}";`)
        viewAllEmployees()
    } catch (error) {
        console.log(error)
    }
}
const mainMenu = async () =>{
    try {
        const {choices} = await inquirer.prompt(menuPrompt);
            if (choices === "ALL_DEPARTMENTS"){
                viewAllDepartments();
            }
            if (choices === "ALL_ROLES"){
                viewAllRoles();
            }
            if (choices === "ALL_EMPLOYEES"){
                viewAllEmployees();
            }
            if (choices === "ADD_DEPARTMENT"){
                addToDepartments();
            }
            if (choices === "ADD_ROLE"){
                addToRoles();
            }
            if (choices === "ADD_EMPLOYEE"){
                addEmployee();
            }
            if (choices === "UDPATE_EMPLOYEE"){
                updateEmployee();
            }
            if (choices === "EXIT"){
                db.end();
            }
        }catch(error) {
            console.log(error)
        }
    };

mainMenu()