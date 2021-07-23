import connection from "../../src/database"
import faker from "faker"

export async function createSongSettingScore (genreId:number,score:number) {
    const song = {
      id:0,
      name: faker.name.title(),
      youtubeLink: faker.internet.url(),
      genreId:genreId,
      score
    };
  
    const insertedSong = await connection.query( 
      `INSERT INTO songs (name, "youtubeLink", "genreId", score) VALUES ($1, $2, $3, $4) RETURNING *`,
      [song.name, song.youtubeLink, song.genreId, song.score] 
    );
    
    song.id = insertedSong.rows[0].id

    return song
  } 