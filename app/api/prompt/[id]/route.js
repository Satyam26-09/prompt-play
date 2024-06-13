import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    console.log("working 1");
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found.", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompt. ERROR: " + error, {
      status: 500,
    });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    console.log("working 2");

    const existingprompt = await Prompt.findById(params.id);

    if (!existingprompt)
      return new Response("Prompt not found.", { status: 404 });

    existingprompt.prompt = prompt;
    existingprompt.tag = tag;

    await existingprompt.save();

    return new Response(JSON.stringify(existingprompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt. ERROR: " + error, {
      status: 500,
    });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    console.log("working 3");

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt. ERROR: " + error, {
      status: 500,
    });
  }
};
