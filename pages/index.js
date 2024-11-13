import { Fragment, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tomb_of_Nakht_%286%29.jpg/330px-Tomb_of_Nakht_%286%29.jpg',
        address: 'Some address 5, w485y3jnrg',
        description: 'This is a first meetup'

    },
    {
        id: 'm2',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tomb_of_Nakht_%286%29.jpg/330px-Tomb_of_Nakht_%286%29.jpg',
        address: 'Some address 5, w485y3jnrg',
        description: 'This is a first meetup'

    },
    {
        id: 'm3',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tomb_of_Nakht_%286%29.jpg/330px-Tomb_of_Nakht_%286%29.jpg',
        address: 'Some address 5, w485y3jnrg',
        description: 'This is a first meetup'

    },
    {
        id: 'm4',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tomb_of_Nakht_%286%29.jpg/330px-Tomb_of_Nakht_%286%29.jpg',
        address: 'Some address 5, w485y3jnrg',
        description: 'This is a first meetup'

    },
    {
        id: 'm5',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tomb_of_Nakht_%286%29.jpg/330px-Tomb_of_Nakht_%286%29.jpg',
        address: 'Some address 5, w485y3jnrg',
        description: 'This is a first meetup'

    },
]
export default function HomePage(props) {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React Meetups"
                />
               
            </Head>
            <MeetupList meetups={props.meetups} />

        </Fragment>
    )
}

export async function getStaticProps() {//helps with cachingfetch('/api/meetups')
    const client = await MongoClient.connect('mongodb+srv://siyapandeybluelupin:siyapandeybluelupin@cluster0.ksgia.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();//by default finds all the documents id entries 
    client.close();


    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    }
}


// export async function getServerSideProps(context) {
//     const req=context.req;
//     const res=context.res;

//     //fetch data from api
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }