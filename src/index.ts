import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const db = new ChromaClient({
  path: "http://localhost:8000",
});

const embeddingFunction = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: "text-embedding-3-small",
});

const main = async () => {
  try {
    const collection = await db.createCollection({
      name: "Test-Collection",
    });
  } catch (e) {
    console.log("DB Already Exists");
    process.exit(1);
  }
};

const insertDummyData = async () => {
  const dataCollection = await db.getCollection({
    name: "Test-Collection",
    embeddingFunction,
  });

  const data = await dataCollection.add({
    ids: Date.now().toString(),
    documents: "Hello World!",
  });

  console.log(data);
};

main().then(() => insertDummyData());
