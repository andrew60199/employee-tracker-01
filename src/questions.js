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

const roleQuery = () => {
    return new Promise((resolve) => {

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

// This function was a pain! We got there in the end. Not the best but it works
const employeeAndRoleQuery = () => {

    return db.promise().query(

        'SELECT first_name , last_name FROM employee'
    )
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

// Not the best since there is a bit of repeating myself in the next two functions. But it works which is the main thing
// I can always work with someone to look over it and come up with a better approach
const addEmployeeFunction = () => {
    employeeAndRoleQuery()
        .then((results) => {

            const [ possibleManagers ] = results

            // Push to array here
            possibleManagers.forEach(item => {
            
                managerArray.push(`${item.first_name} ${item.last_name}`)            
            })
                
            console.log(managerArray)

            roleQuery()

            inquirer.prompt(addEmployeeQuestion)
        })
}

const updateEmployeeFunction = () => {
    employeeAndRoleQuery()
        .then((results) => {

            const [ employeesFullNames ] = results

            employeesFullNames.forEach(item => {
            
                employeeArray.push(`${item.first_name} ${item.last_name}`)           
            })

            console.log(employeeArray)

            roleQuery()

            inquirer.prompt(updateEmployee)
                .then(data => {
                    console.log(data)
                })
        })
}

module.exports = { openingQuestions, addDepartmentFunction, addRoleFunction, addEmployeeFunction, updateEmployeeFunction }