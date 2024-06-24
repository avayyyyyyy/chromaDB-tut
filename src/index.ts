import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import { infoIndia } from "./faqInfo";
import OpenAI from "openai";

const db = new ChromaClient({
  path: "http://localhost:8000",
});

const embeddingFunction = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: "text-embedding-3-small",
});

const main = async () => {
  try {
    await db.createCollection({ name: "Faq_DB" });
  } catch (e) {
    console.error("Error creating collection:", e);
  }
};

const insertData = async () => {
  try {
    const dataCollection = await db.getCollection({
      name: "Faq_DB",
      embeddingFunction,
    });
    const data = await dataCollection.add({
      ids: ["India"],
      documents: [infoIndia],
    });
    console.log("Data inserted:", data);
  } catch (e) {
    console.error("Error inserting data:", e);
  }
};

const askQuestion = async (question: string) => {
  try {
    const dataCollection = await db.getCollection({
      name: "Faq_DB",
      embeddingFunction,
    });

    const result = await dataCollection.query({
      queryTexts: question,
      nResults: 1,
    });

    const relevantInfo = result.documents[0][0];

    if (relevantInfo) {
      const model = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

      const res = await model.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 100,
        messages: [
          {
            role: "assistant",
            content: `Answer the user's question with the information provided: ${relevantInfo}`,
          },
          {
            role: "user",
            content: question,
          },
        ],
      });
      console.log("Answer:", res.choices[0].message);
    }
  } catch (e) {
    console.error("Error asking question:", e);
  }
};

main()
  .then(() => insertData())
  .then(() => {
    process.stdin.addListener("data", async (data) => {
      const question = data.toString().trim();
      await askQuestion(question);
    });
  })
  .catch((e) => {
    console.error("Error in main function chain:", e);
  });
