import {MongoClient} from 'mongodb';

const url="mongodb+srv://indrahas:1234@cluster0.la7tk.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"

async function handler(req, res){

    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect(url)
        const db = client.db();

        const meetupCollection = db.collection("meetups");

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: "Message successfully inserted"});

        // res.send(JSON.stringify(result));
    }

}

export default handler;