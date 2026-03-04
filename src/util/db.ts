import mongoose from "mongoose";
import dotenv, { config } from 'dotenv'
import pg, { Client, ClientBase } from 'pg'
dotenv.config();
export function mongodb() {
    const URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`

    mongoose
        .connect(URL)
        .then(() => console.log('connection has been successfully')).
        catch(() => console.log('connection faild ...'))
}

export function postgresDB() {
    const PostgresURL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/postgres`
    const client = new Client({ connectionString: PostgresURL });
    client.connect()
        .then(() => console.log('connection to postgres has been successfully')).
        catch(() => console.log('connection failed ...'))
}