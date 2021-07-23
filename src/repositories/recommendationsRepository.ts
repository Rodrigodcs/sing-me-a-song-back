import connection from "../database"

export async function create(name:String,youtubeLink:String,genreId:number){
    const result = await connection.query(`
        INSERT INTO songs
        (name, "youtubeLink", "genreId",score)
        VALUES ($1, $2, $3, $4)
    `,[name,youtubeLink,genreId,0])
}

export async function getSongById(id:number){
    const result = await connection.query(`
        SELECT id, name, "youtubeLink", score 
        FROM songs
        WHERE id = $1
    `,[id])
    return result.rows[0] 
}

export async function changeScore(id:number,change:number){
    const result = await connection.query(`
        UPDATE songs
        SET score = score + $1
        WHERE id = $2
    `,[change,id])
}

export async function removeSong(id:number){
    const result = await connection.query(`
        DELETE FROM songs
        WHERE id = $1
    `,[id])
}

export async function getAllSongs(){
    const result = await connection.query(`
        SELECT songs.id, songs.name, genres.name AS genre, songs."youtubeLink", songs.score 
        FROM songs 
        JOIN genres 
        ON songs."genreId" = genres.id 
    `)
    return result.rows
}

export async function getSongsSortedByScore(amount:number){
    const result = await connection.query(`
        SELECT songs.id, songs.name, genres.name AS genre, songs."youtubeLink", songs.score 
        FROM songs 
        JOIN genres 
        ON songs."genreId" = genres.id 
        ORDER BY score 
        DESC LIMIT $1;
    `,[amount])
    return result.rows
}