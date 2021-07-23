import connection from "../../src/database";

export async function clearDatabase () {
    await connection.query('TRUNCATE songs RESTART IDENTITY')
    await connection.query('TRUNCATE genres RESTART IDENTITY')
}

export async function connectionEnd () {
    await clearDatabase();
    await connection.end();
}