import { MongoClient } from 'mongodb'



class DbConnectionSingleleton {
    private static _instance: DbConnectionSingleleton
    private _client
    private _clientPromise
    private constructor() {
        if (process.env.MONGODB_URI) {
            const client = new MongoClient(process.env.MONGODB_URI)
            this._client = client;
            this._clientPromise = client.connect();
        } else {
            throw Error('Database uri invalid')
        }

    }

    public static get clientPromise() {
        if (!this._instance) {
            this._instance = new DbConnectionSingleleton();
        }
        return this._instance._clientPromise
    }
}


const clientPromise = DbConnectionSingleleton.clientPromise
const getChatDBConnection = () => clientPromise.then(conn => conn.db('chat'))

export default clientPromise
export { getChatDBConnection }
