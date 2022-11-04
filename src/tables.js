const db = require('../config/connection.js')

const showDepartments = async () => {
    const departments = await db.promise().query(
        'SELECT * FROM department'
    )
    return departments[0]
}

const showRoles = async () => {
    const roles = await db.promise().query(
        'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id'
    )
    return roles[0]
}

const showEmployees = async () => {

    // https://www.youtube.com/watch?v=TGt2xa7EzvI 
    // https://stackoverflow.com/questions/8084571/not-unique-table-alias
    // https://www.folkstalk.com/2022/09/join-first-name-and-last-name-sql-with-code-examples.html 

    const employees = await db.promise().query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, rr.salary, CONCAT(ee.first_name, ' ', ee.last_name) AS manager
        FROM employee e
        INNER JOIN role r
        ON e.role_id = r.id
        INNER JOIN department d
        ON r.department_id = d.id
        INNER JOIN role rr
        ON e.role_id = rr.id
        INNER JOIN employee ee 
        ON ee.id = e.id;`
    )
    return employees[0]
}

module.exports = { showDepartments, showRoles, showEmployees }