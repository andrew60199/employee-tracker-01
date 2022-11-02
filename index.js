const mysql = require('mysql2')
const inquirer = require('inquirer')
const {  openingQuestions, addDepartmentFunction, addRoleFunction, addEmployeeFunction, updateEmployeeFunction } = require('./src/questions.js')

const init = () => {

    inquirer.prompt(openingQuestions)
        .then((answers) => {
            console.log(answers)

            if (answers.query === 'View all departments') {
                

            } else if (answers.query === 'View all roles') {
                

            } else if (answers.query === 'View all employees') {
                

            } else if (answers.query === 'Add a department') {
                addDepartmentFunction()

            } else if (answers.query === 'Add a role') {
                addRoleFunction()

            } else if (answers.query === 'Add an employee') {
                addEmployeeFunction()

            } else if (answers.query === 'Update an employee') {
                console.log('before')
                updateEmployeeFunction()
                console.log('after')

            } else {
                return
            }

        })
        .catch((error) => {
            console.log(error)
        })

}

init()