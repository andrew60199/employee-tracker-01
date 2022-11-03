const db = require('../config/connection.js')

const showDepartments = () => {
    return db.promise().query(
        'SELECT * FROM department'
    )
}

const showRoles = () => {
    db.promise().query(
        'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id'
    )
    .then(data => {
        console.table(data[0])
    })
}

const showEmployees = () => {
    db.promise().query(
        ''
    )
    .then(data => {
        console.table(data[0])
    })
}

module.exports = { showDepartments, showRoles, showEmployees }