import { MongoClient,ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";


export default function MeetupDetails(props) {
    return (
       
       <Fragment>
       <Head>
        <title>{props.meetupData.title}</title>
        <meta
            name="description"
            content={props.meetupData.description}
        />
       </Head>
       <MeetupDetail
            title={props.meetupData.title}
            image={props.meetupData.image}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    )
}


export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://siyapandeybluelupin:siyapandeybluelupin@cluster0.ksgia.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();//only fetch id and nothing else 
   
   client.close();
    return {
        fallback: blocking,//all supported values existt , other than ths 404 error if true , generate dynamically on the server for somthing not existing currently 
        //true or blocking : if cant find immediately , geneerate the page on demand and cache after
        // true : immediately return empty page -> handle on own
        // blocking : user will not see untill finished page is served
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://siyapandeybluelupin:siyapandeybluelupin@cluster0.ksgia.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

const selectedMeetup= await meetupsCollection.findOne({
    _id:ObjectId.createFromHexString(meetupId),
});
   client.close();    
    return {
        props: {
            meetupData: {
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                image:selectedMeetup.image,
                address:selectedMeetup.address,
                description:selectedMeetup.description,
            },
        }
    }
}