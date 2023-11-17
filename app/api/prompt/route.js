import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        console.log("API call: get all posts" )
        await connectToDB;
        // const allPosts = await Prompt.find({});
        const allPosts = await Prompt.find({}).populate('creator');
        // console.log(allPosts);
        return new Response(JSON.stringify(allPosts), {status:200});

    } catch (error) {
        console.log(error);
        return new Response("Failed fetch all posts", { status: 500 });

    }

}