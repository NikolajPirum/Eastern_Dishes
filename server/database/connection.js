import sqlite3 from 'sqlite3' //db driver - callback-baseret 
import { open } from 'sqlite' //moderne promise-wrapper som gør det sql querys kald lettere 

const connection = await open({
    
    filename: "EasternDishes.db",
    driver: sqlite3.Database
});

export default connection;