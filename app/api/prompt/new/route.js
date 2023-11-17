import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request, res) => {
    console.log("API call: post new prompt" )
    const {userId, prompt, tag} = await request.json();
    //save in the database
    try {
        await connectToDB();
        const newPrompt = new Prompt({creator: userId, prompt: prompt, tag: tag});
        await newPrompt.save();
        // res.send(JSON.stringify(newPrompt));
        // res.status(201).json(newPrompt);
        console.log("NEW Prmopt :" ,newPrompt);
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.log("Error occurred:", error);
        // res.status(500).json({error : 'Failed to create a new prompt'});
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}