const inquirer = require('inquirer')
const cTable = require('console.table')
const {  openingQuestions, addDepartmentFunction, addRoleFunction, addEmployeeFunction, updateEmployeeFunction } = require('./src/questions.js')
const { showDepartments, showRoles, showEmployees } = require('./src/tables.js')
const db = require('./config/connection.js')

const askQuestions = async () => {
    const answers = await inquirer.prompt(openingQuestions)

    switch (answers.query) {
        case 'View all departments':
            console.log('\n-------------\n')
            console.table(await showDepartments())
            console.log('-------------\n')
            askQuestions()
            break
        case 'View all roles':
            console.log('\n-------------\n')
            console.table(await showRoles())
            console.log('-------------\n')
            askQuestions()
            break
        case 'View all employees':
            console.log('\n-------------\n')
            console.table(await showEmployees())
            console.log('-------------\n')
            askQuestions()
            break
        case 'Add a department':
            await addDepartmentFunction()
            askQuestions()
            break
        case 'Add a role':
            await addRoleFunction()
            askQuestions()
            break
        case 'Add an employee':
            await addEmployeeFunction()
            askQuestions()
            break
        case 'Update an employee':
            await updateEmployeeFunction()
            askQuestions()
            break
        // Default represents quit
        default:
            // I was wondering why the command line was still active. Turns out we were still connected to the db.
            db.end()
            break
    }
}

const init = () => {
    askQuestions()
}

init()