INSERT INTO department (name)




VALUES ("Sales"),
        ("Engineering"),
        ( "Finance"),
        ( "Legal");





INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 70000, 1),

        ("Sales Lead", 85000, 1),

        ("Software Engineer", 120000, 2),

        ( "Lead Engineer", 150000,2),

        ( "Accountant", 100000, 3),

        ( "Account Manager", 120000, 3),

        ( "Legal Assistant", 90000, 4),

        ( "Lawyer", 150000, 4);




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Tommy", "Dimitri", 1, 2),
         ("Eli", "Tony", 2, null),
        ("Julia", "Manny", 3, 4),
        ("Kevin", "Trahan", 4, null),
        ("Kyle", "Leo", 5, 6),
        ("Ken", "Tran", 6, null),
        ("Angela", "Allen", 7, 8),
         ("Nikolai", "Manny", 8, null);