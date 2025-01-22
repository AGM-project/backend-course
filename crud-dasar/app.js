const sql = require('mssql');

const config = {
    user: 'sa', // Ganti dengan username SQL Server
    password: 'password', // Ganti dengan password
    server: 'LAPTOP-9U3S1TGG', // Nama server atau IP
    database: 'ShoppingCart', // Nama database
    options: {
        encrypt: true, // Aktifkan jika menggunakan Azure SQL
        trustServerCertificate: true // Jika SSL digunakan secara lokal
    }
};

// async function connectToDatabase() {
//     try {
//         let pool = await sql.connect(config);
//         console.log(`Connected to SQL Server`);
//         return pool;
//     } catch (err) {
//         console.error(`Database connection failed!`, err);
//     }
// }
// connectToDatabase();

// async function getUsers() {
//     try {
//     let pool = await sql.connect(config);
//     let result = await pool.request().query('SELECT * FROM Users');
//     console.log(result.recordset);
//     } catch (err) {
//     console.error(err);
//     }
//     }
//     getUsers();

// async function addUser() {
//     try {
//         let pool = await sql.connect(config);
//         await pool.request()
//         .input('Name', sql.NVarChar, 'John Doe')
//         .input('Email', sql.NVarChar, 'john@example.com')
//         .input('Password', sql.NVarChar, '123456')
//         .query('INSERT INTO Users (Name, Email, Password) VALUES (@Name,@Email,@Password)');
//         console.log('User added successfully');
//     } catch (err) {
//         console.error(err);
//     }
// }
// addUser();

// async function updateUser() {
//     try {
//         let pool = await sql.connect(config);
//         await pool.request()
//         .input('UserID', sql.Int, 1)
//         .input('Email', sql.NVarChar, 'newemail@example.com')
//         .query('UPDATE Users SET Email = @Email WHERE UserID = @UserID');
//         console.log('User updated successfully');
//     } catch (err) {
//         console.error(err);
//     }
// }
// updateUser();

async function deleteUser() {
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('id', sql.Int, 1)
        .query('DELETE FROM Users WHERE UserID = @id');
        console.log('User deleted successfully');
    } catch (err) {
        console.error(err);
    }
}
deleteUser();