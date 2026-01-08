import db from './connection.js'

// delete command: npm run deleteDatabase
const deleteMode = process.argv.includes('delete');

if (deleteMode) {
    db.exec(`DROP TABLE IF EXISTS recipes;`);
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

    CREATE TABLE IF NOT EXISTS recipes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dish_name VARCHAR(50),
        total_time_minutes INTEGER NOT NULL,
        working_time INTEGER NOT NULL,
        procedure VARCHAR(2500) NOT NULL,
        FOREIGN KEY (dish_name) REFERENCES dishes (name)
    );
`);

if (deleteMode) {
    //users
    db.run(`INSERT INTO users (username, password, email, role) VALUES ('joeCooker', '123', 'joe@cooker.com', 'USER');`);
    db.run(`INSERT INTO users (username, password, email, role) VALUES ('doeCooker', '1234', 'doe@cooker.com', 'USER');`);
    db.run(`INSERT INTO users (username, password, email, role) VALUES ('admin', '12345', 'admin@cooker.com', 'ADMIN');`);

    //dishes
    db.run(`INSERT INTO dishes (name, dish_origin,dish_image, user_id) VALUES (?, ?, ?, ?)`, ['Durum', 'Syria', 'durum.png', 1]);
    db.run(`INSERT INTO dishes (name, dish_origin, dish_image, user_id) VALUES (?, ?, ?, ?)`, ['Dolma', 'Armenia', 'dolma.png', 2]);

    //recipes
    db.run(`INSERT INTO recipes (dish_name, total_time_minutes, working_time, procedure) VALUES(?,?,?,?)`, ['Durum', '25', '20', `Start med at klargøre grøntsagerne. Skyl salat og skær den i fine strimler. Hak tomater og agurk i små tern og pres eventuelt lidt overskydende væske fra, så durumrullen ikke bliver for våd. Skær rødløg i tynde skiver og sæt alle grøntsagerne til side, så de er klar ved servering.

    Forbered dressingen. Rør en hvidløgsdressing af yoghurt eller creme fraiche, presset hvidløg, citronsaft, salt og peber. Smag til og sæt den på køl, så den får tid til at trække.

    Til kødet varmes en pande eller grillpande op med lidt olie. Kødet (typisk strimlet okse eller kylling) marineres eller krydres med en krydderiblanding som fx paprika, spidskommen, chili, salt og peber. Steg det ved god varme, indtil det får farve og er mørt. Hvis der bruges færdig kebab, skal det blot varmes igennem og få lidt sprødhed.

    Varm tortillapandekagerne kort på tør pande, så de bliver bløde og nemme at rulle uden at knække. Læg herefter et lag dressing på midten af wrap’en, efterfulgt af kød, grøntsager og eventuelt chili og ekstra sauce. Sørg for ikke at overfylde, da det gør rullen svær at lukke.

    Fold først siderne ind, og rul derefter tightly fra bunden op mod toppen, så du får en lukket durum. Læg den færdige rulle på en varm pande eller grillpresse, så den får lidt farve og bliver varmet jævnt igennem. Dette hjælper også med at forsegle rullen, så den holder formen.`
    ]); 
}