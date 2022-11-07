const db = require('../config/connection.js')

const indexFunction = (arr, itemToFind) => {
    let index = arr.findIndex(item => item === itemToFind)
    index+= 1
    return index
}

const insertDepartment = newDepart => {
    return db.promise().query(
        `INSERT INTO department (name) VALUES ('${newDepart}')`
    )
}

const insertRole = async ( departmentArr, newRName, newRSalary, newRdepart ) => {

    // Find the id of the department 
    const departIndex = await indexFunction(departmentArr, newRdepart)

    // Note to self:
    // DON'T TRY ADD LOGIC INTO THE QUERY... BECAUSE IT WILL END UP FAILING. DO IT BEFORE HAND
    return await db.promise().query(
        `INSERT INTO role (department_id, title, salary) VALUES ('${departIndex}', '${newRName}', '${newRSalary}')`
    )
}

const insertEmployee = async (roleArr, managerArr, FirstName, LastName, Role, Manager) => {

    const roleIndex = await indexFunction(roleArr, Role)
    const managerIndex = await indexFunction(managerArr, Manager)

    console.log(roleIndex)
    console.log(managerIndex)

    // This line isn't waiting for the information above
    return await db.promise().query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${FirstName}', '${LastName}', '${roleIndex}', '${managerIndex}')`
    )
}


module.exports = { insertDepartment, insertRole, insertEmployee }