import axios, { AxiosError } from "axios";
export type ChatMessages = { role: string; content: string }[];
import dotenv from "dotenv";
dotenv.config();

export interface OpenAIRequestPayload {
  model: string;
  messages: ChatMessages;
  max_tokens?: number;
  temperature?: number;
}

export async function OpenAIRequest(payload: OpenAIRequestPayload) {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
        },
      }
    );

    const data = res.data;
    const text = data.choices[0].message.content;
    // console.log(text);
    return text;
  } catch (error) {
    const axiosError = error as AxiosError;
    // log the error response
    console.log(axiosError.response);
    // convert the response to a string and throw an error
    throw new Error(
      `Error in OpenAI API request: ${axiosError.response?.data}`
    );
  }
}
