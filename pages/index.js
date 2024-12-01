import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import {useEffect, useState} from "react";
import {MongoClient} from "mongodb";
import Head from "next/head";

const url="mongodb+srv://indrahas:1234@cluster0.la7tk.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"


function HomePage(props)
{

    return (
            <>
                <Head>
                    <title> React Meetups</title>
                    <meta
                        name="description"
                        content="Find the huge list of highly active React Meetups" />
                </Head>
                <MeetupList meetups={props.meetups} />
            </>
    )
}



export async function getStaticProps(context) {

    const client = await MongoClient.connect(url)
    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

export  default  HomePage;