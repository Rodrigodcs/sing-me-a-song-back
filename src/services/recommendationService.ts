

import * as recommendationsRepository from "../repositories/recommendationsRepository"

export async function votingById(id:number,upvote:boolean){
    if(upvote){
        await recommendationsRepository.changeScore(id,1)
    }else{
        await recommendationsRepository.changeScore(id,-1)
    }
}