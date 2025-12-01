import db from './connection.js'

// gør delete med command: npm run deleteDatabase
const deleteMode = process.argv.includes('delete');

if (deleteMode) {
db.exec(`DROP TABLE IF EXISTS dishes;`);
db.exec(`DROP TABLE IF EXISTS users;`);
}

db.exec(` 
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(60) NOT NULL,
        email VARCHAR(50) NOT NULL,
        role TEXT CHECK(role IN ("ADMIN", "USER"))

    );

    CREATE TABLE IF NOT EXISTS dishes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL, 
        dish_origin VARCHAR(50) NOT NULL,
        dish_image VARCHAR(100),
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
`);

if (deleteMode) {
    db.run(`INSERT INTO users (username, password, email, role) VALUES ('joeCooker', '123', 'joe@cooker.com', 'USER');`);
    db.run(`INSERT INTO users (username, password, email, role) VALUES ('doeCooker', '1234', 'doe@cooker.com', 'USER');`);
    db.run(`INSERT INTO users (username, password, email, role) VALUES ('admin', '12345', 'admin@cooker.com', 'ADMIN');`);

    db.run(`INSERT INTO dishes (name, dish_origin,dish_image, user_id) VALUES (?, ?, ?, ?)`, ['Durum', 'Syria', 'durum.png', 1]);
    db.run(`INSERT INTO dishes (name, dish_origin, dish_image, user_id) VALUES (?, ?, ?, ?)`, ['Dolma', 'Armenia', 'dolma.png', 2]);
}