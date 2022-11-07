const db = require('../config/connection.js')

const indexFunction = (arr, itemToFind) => {
    let index = arr.findIndex(item => item === itemToFind)
    const filter = arr.findIndex(item => item === 'None')

    // If the array does not include none, then add one to its index
    // So that we can filter out the managers array that was causing problems
    if (filter === -1) {
        index+= 1
    }

    return index
}

const insertDepartment = newDepart => {
    return db.promise().query(
        `INSERT INTO department (name) VALUES ('${newDepart}')`
    )
}

const insertRole = ( departmentArr, newRName, newRSalary, newRdepart ) => {

    // Find the id of the department 
    const departIndex = indexFunction(departmentArr, newRdepart)

    // Note to self:
    // DON'T TRY ADD LOGIC INTO THE QUERY... BECAUSE IT WILL END UP FAILING. DO IT BEFORE HAND
    return db.promise().query(
        `INSERT INTO role (department_id, title, salary) VALUES ('${departIndex}', '${newRName}', '${newRSalary}')`
    )
}

const insertEmployee = (roleArr, managerArr, firstName, lastName, role, manager) => {

    const roleIndex = indexFunction(roleArr, role)
    const managerIndex = indexFunction(managerArr, manager)

    return db.promise().query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleIndex}', '${managerIndex}')`
    )
}

const alterEmployee = (employeeArr, roleArr, employee, newRole) => {

    const employeeIndex = indexFunction(employeeArr, employee)
    const roleIndex = indexFunction(roleArr, newRole)

    return db.promise().query(
        `UPDATE employee SET role_id = ${roleIndex} WHERE id = ${employeeIndex}`
    )
}


module.exports = { insertDepartment, insertRole, insertEmployee, alterEmployee }