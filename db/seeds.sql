INSERT INTO department (name)
VALUES ("Administration/operations"),
       ("Accounting and finance"),
       ("Research and development"),
       ("Customer service"),
       ("Marketing and sales"),
       ("Human resources");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Chief Executive Officer (CEO)", 200000),
       (2, "Chief Financial Officer (CFO)", 140000),
       (5, "Chief Marketing Officer (CMO)", 140000),
       (3, "Chief Technology Officer (CTO)", 140000),
       (4, "Customer Service Representative", 105000),
       (1, "Chief Legal Officer", 160000),
       (3, "Full Stack Developer", 120000),
       (3, "UI / UX Designer", 100000),
       (6, "Human Resources Officer", 95000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Remm", 1, NULL),
       ("Jim", "Stevens", 9, 1),
       ("Sarah", "Gawar", 2, 1),
       ("Charlie", "Schmidt", 4, 1),
       ("Anthony", "Bernard", 7, 4),
       ("Timothy", "Hansen", 3, 1),
       ("Victoria", "Davies", 8, 4),
       ("Bobby", "Young", 5, 1),
       ("Beverly", "Rose", 6, 1);
