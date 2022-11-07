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
    // https://dba.stackexchange.com/questions/151201/how-to-join-with-null-value 

    const employees = await db.promise().query(
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, rr.salary, CONCAT(ee.first_name, ' ', ee.last_name) AS manager
        FROM employee e
        LEFT OUTER JOIN role r
        ON e.role_id = r.id
        LEFT OUTER JOIN department d
        ON r.department_id = d.id
        LEFT OUTER JOIN role rr
        ON e.role_id = rr.id
        LEFT OUTER JOIN employee ee 
        ON ee.id = e.manager_id;`
    )
    return employees[0]
}

module.exports = { showDepartments, showRoles, showEmployees }