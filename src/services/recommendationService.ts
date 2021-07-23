

import * as recommendationsRepository from "../repositories/recommendationsRepository"

export async function createNewSong(name:String,youtubeLink:String,genreId:number){
    await recommendationsRepository.create(name, youtubeLink, genreId)
}

export async function verifyIfSongExists(id:number){
    return await recommendationsRepository.getSongById(id)
}

export async function votingById(id:number,upvote:boolean){
    if(upvote){
        const teste = await recommendationsRepository.changeScore(id,1)
    }else{
        const song = await recommendationsRepository.getSongById(id)
        if(song.score<=-5){
            await recommendationsRepository.removeSong(id)
        }else{
            await recommendationsRepository.changeScore(id,-1)
        }
    }
}

export async function verifySongs(){
    return await recommendationsRepository.getAllSongs();
}

export async function randomizedSongs(){
    const songs = await recommendationsRepository.getAllSongs()
    const highScored:object[] = []
    const lowScored:object[] = []
    songs.forEach(song=>{
        song.score>10?highScored.push(song):lowScored.push(song)
    })
    if(highScored.length===0){
        return lowScored
    }
    if(lowScored.length===0){
        return highScored
    }
    return Math.random()<0.7?highScored:lowScored
}

export function randomizeSingleSong(sortedSongs:object[]){
    const sort = Math.floor(Math.random()*sortedSongs.length)
    return sortedSongs[sort]
}

export async function topSongs(amount:number){
    const sortedSongs = await recommendationsRepository.getSongsSortedByScore(amount)
    return sortedSongs
}