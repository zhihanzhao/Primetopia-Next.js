import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        return new Response(JSON.stringify(prompt), {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Falied delete the prompt", {status:500});

    }

}

export const PATCH = async (request, {params}) => {
    console.log("API call: Update prompt by id" );
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        console.log(params.id);
        const post = await Prompt.findById(params.id);


        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        // Update the prompt with new data
        post.prompt = prompt;
        post.tag = tag;

        await post.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Falied delete the prompt", {status:500});

    }

}

export const DELETE = async (request, {params}) => {
    try {
        // console.log(params.id);
        await connectToDB();
        // await Prompt.deleteOne({id : params.id});
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully", {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Falied delete the prompt", {status:500});

    }

}