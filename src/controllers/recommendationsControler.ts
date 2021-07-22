import joi from "joi"
import {Request, Response} from "express"

import * as recommendationsRepository from "../repositories/recommendationsRepository"
import * as recommendationService from "../services/recommendationService"

export async function songRecommendation(req:Request,res:Response){
    const validation=recommendationSchema.validate(req.body)
    if(validation.error){
        return res.sendStatus(400)
    }
    try{
        const {name, youtubeLink, genreId} = req.body
        await recommendationsRepository.create(name, youtubeLink, genreId)
        return res.sendStatus(201)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function upVote(req:Request,res:Response){
    const songId = parseInt(req.params.id)
    try{
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
        await recommendationService.votingById(songId,false)
        return res.sendStatus(200)
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function randomSong(req:Request,res:Response){
    const sortedSongs = await recommendationService.randomizedSongs()
    const returningSong= recommendationService.randomizeSingleSong(sortedSongs)
    return res.send(returningSong)
}

export async function sortingSongs(req:Request,res:Response){
    const amount = parseInt(req.params.amount)
    const topSongs = await recommendationService.topSongs(amount)
    res.send(topSongs)
}

const recommendationSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().uri().required(),
    genreId: joi.number().required()
})

