//Import Node packages
const mysql = require("mysql2");
const figlet = require("figlet")

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_db",
    },
    console.log(figlet.textSync('Employee Tracker\n', {
        font: "Standard",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
        width: 75,
        whitespaceBreak: true,
    })
    )
);

module.exports = db