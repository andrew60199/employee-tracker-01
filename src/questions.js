// So that we can use environment variables 
require('dotenv').config()
const mysql = require('mysql2')
const inquirer = require('inquirer')

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Start arrays
const departmentArray = []
const roleArray = []
const employeeArray = []
const managerArray = ['None']

// Promises to dynamically populate the arrays above 
const departmentQuery = () => {
    return new Promise((resolve) => {

        db.query(
            'SELECT name FROM department',
            function(err, results) {
                results.forEach(item => {
                    departmentArray.push(item.name)
                })
                return departmentArray
            }
        )

        resolve()
    })
}

// This function isn't waiting for the query to be finished before resolving! - Need to fix
const employeeAndRoleQuery = () => {
    return new Promise((resolve) => {

        db.query(
            'SELECT first_name , last_name FROM employee',
            function(err, results) {
                results.forEach(item => {

                    const fullNames = `${item.first_name} ${item.last_name}`
                    employeeArray.push(fullNames)
                    managerArray.push(fullNames)

                })
                // Return two arrays through an object
                return {employeeArray, managerArray}

            }
        )

        db.query(
            'SELECT title FROM role',
            function(err, results) {
                results.forEach(item => {
                    roleArray.push(item.title)
        
                })
                return roleArray
            }
        )

        resolve()
    })
}

// Questions for the user
const openingQuestions = [
    {
        type: 'list',
        name: 'query',
        message: 'What would you like to do? ',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee',
            'Quit'
        ]
    }
] 

const addDepartmentQuestion = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What\'s the name of the department you would like to add? '
    }
]

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role? '
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the role? '
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Which department does the role belong to? ',
        choices: 
            // We need to query the database to ensure that the dynamically updated departments are there
            departmentArray
    }
]

const addEmployeeQuestion = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the employee\'s first name? '
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the employee\'s last name? '
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employee\'s role? ',
        choices: roleArray
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'What is the employee\'s manager? ',
        choices: managerArray
    }
]

const updateEmployee = [
    {
        type: 'list',
        name: 'whichEmployee',
        message: 'Which employee\'s role do you want to update? ',
        choices: employeeArray
    },
    {
        type: 'list',
        name: 'newRole',
        message: 'Which role do you want to assign to the selected employee? ',
        choices: roleArray
    }
]

// Functions that await for the queries to be complete before continuing
const addDepartmentFunction = () => {
    inquirer.prompt(addDepartmentQuestion)
        .then(data => {
            console.log(`The department ${data.departmentName} has been added to the database!`)
        })
}

const addRoleFunction = () => {
    departmentQuery()
        .then(() => {
            inquirer.prompt(addRoleQuestions)
        })
}

const addEmployeeFunction = () => {
    employeeAndRoleQuery()
        .then(() => {
            inquirer.prompt(addEmployeeQuestion)
        })
}

const updateEmployeeFunction = () => {
    employeeAndRoleQuery()
        .then(() => {
            console.log('during')
            inquirer.prompt(updateEmployee)
        })
}

module.exports = { openingQuestions, addDepartmentFunction, addRoleFunction, addEmployeeFunction, updateEmployeeFunction }