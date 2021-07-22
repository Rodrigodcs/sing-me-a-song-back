import pg from "pg"

const { Pool }= pg;

const config= {
    host:"localhost",
    port:5423,
    user:"postgres",
    password:"123456",
    database:"testando"
}
const connection = new Pool(config)

export default connection