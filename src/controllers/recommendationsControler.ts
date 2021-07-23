import joi from "joi"
import {Request, Response} from "express"

import * as recommendationService from "../services/recommendationService"

export async function songRecommendation(req:Request,res:Response){
    const validation=recommendationSchema.validate(req.body)

    if(validation.error){
        return res.sendStatus(400)
    }
    try{
        const {name, youtubeLink, genreId} = req.body
        await recommendationService.createNewSong(name, youtubeLink, genreId)
        return res.sendStatus(201)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function upVote(req:Request,res:Response){
    const songId = parseInt(req.params.id)
    try{
        const validSong = await recommendationService.verifyIfSongExists(songId)
        if(!validSong){
            return res.sendStatus(404)
        }
        await recommendationService.votingById(songId,true)
        return res.sendStatus(200)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function downVote(req:Request,res:Response){
    const songId = parseInt(req.params.id)
    try{
        const validSong = await recommendationService.verifyIfSongExists(songId)
        if(!validSong){
            return res.sendStatus(404)
        }
        await recommendationService.votingById(songId,false)
        return res.sendStatus(200)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function randomSong(req:Request,res:Response){
    try{
        const validSongs = await recommendationService.verifySongs()
        if(validSongs.length===0){
            res.sendStatus(404)
        }
        const sortedSongs = await recommendationService.randomizedSongs()
        const returningSong= recommendationService.randomizeSingleSong(sortedSongs)
        return res.send(returningSong)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function sortingSongs(req:Request,res:Response){
    const amount = parseInt(req.params.amount)
    try{
        const validSongs = await recommendationService.verifySongs()
        if(validSongs.length===0){
            res.sendStatus(404) 
        }
        const topSongs = await recommendationService.topSongs(amount)
        res.send(topSongs)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

const recommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required(),
    genreId: joi.number().required()
})

