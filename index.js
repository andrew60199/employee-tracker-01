const inquirer = require('inquirer')
const cTable = require('console.table')
const {  openingQuestions, addDepartmentFunction, addRoleFunction, addEmployeeFunction, updateEmployeeFunction } = require('./src/questions.js')
const { showDepartments, showRoles, showEmployees } = require('./src/tables.js')

const askQuestions = async () => {
    const answers = await inquirer.prompt(openingQuestions)

    switch (answers.query) {
        case 'View all departments':
            const data = await showDepartments()
            console.table(data[0])
            break;
    
        default:
            break;
    }

    // if (answers.query === 'View all departments') {
    //     showDepartments()

    // } else if (answers.query === 'View all roles') {
    //     showRoles()

    // } else if (answers.query === 'View all employees') {
    //     showEmployees()

    // } else if (answers.query === 'Add a department') {
    //     addDepartmentFunction()

    // } else if (answers.query === 'Add a role') {
    //     addRoleFunction()

    // } else if (answers.query === 'Add an employee') {
    //     addEmployeeFunction()

    // } else if (answers.query === 'Update an employee') {
    //     updateEmployeeFunction()

    // } else {
    //     // Need to get the run time environment to end... 
    //     console.log('See you next time!')
    //     return
    // }

    askQuestions()

}

// Need to add a looping mechanism 
const init = () => {
    askQuestions()
}

init()

