# FAQ Chatbot with ChromaDB and OpenAI

This project implements a FAQ chatbot using ChromaDB for storing and querying embeddings, and OpenAI for generating responses. The chatbot listens for user questions via standard input and responds with relevant information from the FAQ database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [License](#license)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn or bun
- OpenAI API key

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/avayyyyyyy/faq-chatbot.git
   cd faq-chatbot
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up your environment variables:

   ```sh
   cp .env.example .env
   ```

   Add your OpenAI API key to the `.env` file:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Ensure ChromaDB is running locally on port 8000:
   Follow the installation instructions for ChromaDB on their official site or repository.

## Usage

1. Start the application:

   ```sh
   npm start
   ```

2. Ask a question by typing into the terminal:
   ```sh
   What is the capital of India?
   ```

## Project Structure

- `src/index.ts`: Main file containing the logic for interacting with ChromaDB and OpenAI.
- `src/faqInfo.ts`: Contains the FAQ data to be inserted into the database.
- `.env.example`: Example environment file for storing the OpenAI API key.

### Example `.env` File

```
OPENAI_API_KEY=your_openai_api_key
```

### Example `faqInfo.ts` File

```typescript
export const infoIndia = `
India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by land area, the second-most populous country, and the most populous democracy in the world.
`;
```
