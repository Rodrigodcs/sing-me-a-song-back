import connection from "../../src/database"
import faker from "faker"

export async function createGenre () {
    const genre = {
      id:0,
      name: faker.name.title()
    };
  
    const insertedGenre = await connection.query(
      `INSERT INTO genres (name) VALUES ($1) RETURNING *`,
      [genre.name] 
    );

    genre.id = insertedGenre.rows[0].id 

    return genre
  } 