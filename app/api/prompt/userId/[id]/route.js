import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        console.log("API call: Get prompts by userId")
        await connectToDB();
        const prompts = await Prompt.find({creator: params.id}).populate('creator')
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        console.log("Error : ", error);
        return new Response("Failed in fetch prompts by userId", {status: 500});

    }
}