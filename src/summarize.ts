import fs from "fs";
import { OpenAIRequest, ChatMessages } from "./OpenAIRequest";

// read all text from the file summaries.txt and save it to a variable called summaries
const summaries = fs.readFileSync("mini_summaries.txt", "utf-8");

const userPrompt = `You will be given a series of summaries from various sections of the book "Sapiens". Each of the summaries will be enclosed in triple backticks (\`\`\`)
Your job is to consolidate these summaries into a single cohesive, interesting, and engaging summary of the book by including the most interesting and relevant aspects from each of the summaries.
Your response should be in the form of a "blinkist" summary, which covers the key points, takeaways, and insights from the book in the most interesting way possible.
The summary should be about 20 to 30 paragraphs long (3,000 - 5,000 words)
SUMMARIES TO CONSOLIDATE:
\`\`\`
${summaries}
\`\`\`
FINAL, CONSOLIDATED SUMMARY:
`;

const messages: ChatMessages = [
  {
    role: "system",
    content:
      "You are an advanced AI that writes summaries of books. You are all-knowing, and an incredible writer. You take in snippets of books, or summaries of book snippets, and respond with full-form, interesting, unique, and engaging full-length summaries.",
  },
  { role: "user", content: userPrompt },
];

async function main() {
  const text = await OpenAIRequest({
    model: "gpt-4",
    messages,
    max_tokens: 2025,
    temperature: 0.1,
  });
  console.log(text);
  return text;
}

// call main function, write the response to a file:
main()
  .then((ir) => {
    fs.writeFileSync("summary.txt", ir);
  })
  .catch((err) => console.log(err));
