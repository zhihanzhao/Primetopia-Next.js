import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

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