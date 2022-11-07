// So that we can use environment variables 
const db = require('../config/connection.js')
const inquirer = require('inquirer')
const { insertDepartment, insertRole, insertEmployee, alterEmployee } = require('./insert.js')

// Starting arrays
const departmentArray = []
const roleArray = []
const employeeArray = []
const managerArray = ['None']

// Promises to dynamically populate the arrays above 
// Initially I had it in the wrong order trying to nest items together. Needed to separate them and make sure to return!!
const departmentQuery = async () => {
    const [departments] = await db.promise().query(
        'SELECT name FROM department'
    )

    departments.forEach(department => {
        return departmentArray.push(department.name)
    })
    
    return departmentArray
}

const roleQuery = async () => {
    const [roles] = await db.promise().query(
        'SELECT title FROM role'
    )
    
    roles.forEach(role => {
        return roleArray.push(role.title)
    })
    
    return roleArray
}

const employeeQuery = async () => {
    const [employees] = await db.promise().query(
        'SELECT first_name , last_name FROM employee'
        // 'SELECT CONCAT(first_name , \' \', last_name) FROM employee'
    )
    return employees
}

const employeeArrayBuilder = async () => {
    const employees = await employeeQuery()

    employees.forEach(employee => {
        return employeeArray.push(`${employee.first_name} ${employee.last_name}`)
    })

    return employeeArray
}

const managerArrayBuilder = async () => {
    const employees = await employeeQuery()

    employees.forEach(employee => {
        return managerArray.push(`${employee.first_name} ${employee.last_name}`)
    })

    return managerArray
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
const addDepartmentFunction = async () => {
    const { departmentName } = await inquirer.prompt(addDepartmentQuestion)

    // Add to database
    insertDepartment(departmentName)

    console.log('\n-------------\n')
    console.log(`The department '${departmentName}' has been added to the database!`)
    console.log('\n-------------\n')
    return 
}

const addRoleFunction = async () => {
    await departmentQuery()
    const { roleName, roleSalary, roleDepartment } = await inquirer.prompt(addRoleQuestions)

    // Add to database
    insertRole(departmentArray, roleName, roleSalary, roleDepartment)
    
    console.log('\n-------------\n')
    console.log(`${roleName} has been added to the database!`)
    console.log('\n-------------\n')
    return
}

// Struggled here so this is the best I can do
const addEmployeeFunction = async () => {
    await managerArrayBuilder()
    await roleQuery()
    const { employeeFirstName, employeeLastName, employeeRole, employeeManager } = await inquirer.prompt(addEmployeeQuestion)

    // Add to database
    insertEmployee(roleArray, managerArray, employeeFirstName, employeeLastName, employeeRole, employeeManager)

    console.log('\n-------------\n')
    console.log(`${employeeFirstName} ${employeeLastName} has been added to the database!`)
    console.log('\n-------------\n')
    return
}

const updateEmployeeFunction = async () => {
    await employeeArrayBuilder()
    await roleQuery()
    const { whichEmployee, newRole } = await inquirer.prompt(updateEmployee)

    // Add to database
    alterEmployee(employeeArray, roleArray, whichEmployee, newRole)

    console.log('\n-------------\n')
    console.log(`${whichEmployee} has been updated!`)
    console.log('\n-------------\n')
    return 
}

module.exports = { openingQuestions, addDepartmentFunction, addRoleFunction, addEmployeeFunction, updateEmployeeFunction }