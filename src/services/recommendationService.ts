

import * as recommendationsRepository from "../repositories/recommendationsRepository"

export async function votingById(id:number,upvote:boolean){
    if(upvote){
        await recommendationsRepository.changeScore(id,1)
    }else{
        const song = await recommendationsRepository.getSongById(id)
        if(song.score<=-5){
            await recommendationsRepository.removeSong(id)
        }else{
            await recommendationsRepository.changeScore(id,-1)
        }
    }
}

export async function randomizedSongs(){
    const songs = await recommendationsRepository.getAllSongs()
    const highScored:object[] = []
    const lowScored:object[] = []
    songs.forEach(song=>{
        song.score>10?highScored.push(song):lowScored.push(song)
    })
    return Math.random()<0.7?highScored:lowScored
}

export function randomizeSingleSong(sortedSongs:object[]){
    const sort = Math.floor(Math.random()*sortedSongs.length)
    return sortedSongs[sort]
}

export async function topSongs(amount:number){
    const songs = await recommendationsRepository.getAllSongs()
    const sorted = songs.sort((song1,song2)=>{
        if(song1.score>song2.score){
            return -1;
        }else{
            return 1;
        }
    })
    const sortedAmount = sorted.filter((song,songIndex)=> songIndex<amount)
    return sortedAmount
}