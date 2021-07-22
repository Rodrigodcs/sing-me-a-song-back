import connection from "../database"

export async function create(name:Text,youtubeLink:Text,genreId:number){
    const result = await connection.query(`
        INSERT INTO songs
        (name, "youtubeLink", "genreId",score)
        VALUES ($1, $2, $3, $4)
    `,[name,youtubeLink,genreId,0])
}

export async function changeScore(id:number,change:number){
    const result = await connection.query(`
        UPDATE songs
        SET score = score + $1
        WHERE id = $2
    `,[change,id])
}