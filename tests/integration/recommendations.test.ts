import supertest from "supertest";
import "../../src/setup"
import app from "../../src/app";
import faker from "faker"

import * as songFactory from "../factories/songFactory"
import * as genreFactory from "../factories/genreFactory";
import * as database from "../utils/database";


beforeEach(async ()=>{
  await database.clearDatabase()
})

afterAll(async () =>{
  await database.connectionEnd()
})

describe("POST /recommendations", ()=>{
  it("should respond with status 200", async () => {
    const body = {
      name: faker.name.title(),
      youtubeLink: faker.internet.url(),
      genreId: 1,
    };

    const response = await supertest(app).post("/recommendations").send(body)
    
    expect(response.status).toEqual(201);
  });
  it("should respond with status 400 when body in the wrong format", async () => {
    const body = {
      name: 1,
      youtubeLink: "test",
      genreId: "3",
    };

    const response = await supertest(app).post("/recommendations").send(body)
    
    expect(response.status).toEqual(400);
  });
})

describe("POST /recommendations/:id/upvote", ()=>{
  it("should respond with status 200", async () => {
    const genre = await genreFactory.createGenre()
    const song= await songFactory.createSongSettingScore(genre.id,0)

    const response = await supertest(app).post(`/recommendations/${song.id}/upvote`)
    
    expect(response.status).toEqual(200);
  });
  it("should respond with status 404 when there is no song with the given id", async () => {
    const genre = await genreFactory.createGenre()
    const song= await songFactory.createSongSettingScore(genre.id,0)

    const response = await supertest(app).post(`/recommendations/${100}/upvote`)
    
    expect(response.status).toEqual(404);
  });
})

describe("POST /recommendations/:id/downvote", ()=>{
  it("should respond with status 200", async () => {
    const genre = await genreFactory.createGenre()
    const song = await songFactory.createSongSettingScore(genre.id,0)

    const response = await supertest(app).post(`/recommendations/${song.id}/downvote`)
    
    expect(response.status).toEqual(200);
  });
  it("should respond with status 404 when there is no song with the given id", async () => {
    const genre = await genreFactory.createGenre()
    const song= await songFactory.createSongSettingScore(genre.id,0)

    const response = await supertest(app).post(`/recommendations/${100}/upvote`)
    
    expect(response.status).toEqual(404);
  });
})

describe("GET /recommendations/random", ()=>{
  it("should respond with status 200", async () => {
    const genre = await genreFactory.createGenre()
    
    await songFactory.createSongSettingScore(genre.id,0)
    
    const response = await supertest(app).get("/recommendations/random")
    
    expect(response.status).toEqual(200);
  });
  it("should respond with status 404 when there is no songs in the database", async () => {
    
    const response = await supertest(app).get("/recommendations/random")
    
    expect(response.status).toEqual(404);
  });
})

describe("GET /recommendations/top/:amount", ()=>{
  it("should respond with status 200", async () => {
    const genre = await genreFactory.createGenre()
    await songFactory.createSongSettingScore(genre.id,0)

    const amount=1;

    const response = await supertest(app).get(`/recommendations/top/${amount}`)

    expect(response.status).toEqual(200);
  });
  it("should respond with status 404 when there is no songs in the database", async () => {
    const amount=1;

    const response = await supertest(app).get(`/recommendations/top/${amount}`)

    expect(response.status).toEqual(404);
  });
})