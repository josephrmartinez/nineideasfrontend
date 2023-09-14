import { Configuration, OpenAIApi } from "openai";

// const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiKey = ''


// openAI configuration object
const configuration = new Configuration({
    apiKey: apiKey,
    });         
const openai = new OpenAIApi(configuration);


export async function contentModeration(ideaList) {
    console.log("Calling content moderation")

    const ideaListText = ideaList.map(idea => idea.text)

    try {
    
        const prompt = 
        `You are a content moderation tool that evaluates the ideaList provided by a user. 
        The ideaList is an array of text-based ideas. 
        Your task is to analyze each item in the ideaList and classify it as either 'readable content' or 'unreadable content.'
        'Readable content' should be identified when an idea contains meaningful words, phrases, or sentences that represent genuine ideas or thoughts.
        'Unreadable content' should be detected when an idea is comprised mainly of gibberish, random characters, or nonsense text, such as 'dsafkj dsflkjasdkjlhsa djklsdaf asdkjhf.'

        Please take the ideaList deliniated by three asterisks below as input and return a boolean value indicating whether the list contains 'readable content' (true) or 'unreadable content' (false).
        If there is any unreadable content at all, you should return 'false'.

        Example Input:
        ideaList = [
        "This is a meaningful idea.",
        "dsafkj dsflkjasdkjlhsa djklsdaf asdkjhf",
        "Another valid idea.",
        ];

        Expected Output:
        false

        The goal is to identify whether the text represents genuine ideas or is simply nonsensical.


        ***
        ${ideaListText}
        ***

        `;

        const chatCompletionParams = {
        model: "gpt-3.5-turbo-0613",
        messages: [
            { role: "system", "content": "You are a content moderation tool." },
            { role: "user", content: prompt }
        ]
        };

        console.log("API prompt:", prompt)

        const completion = await openai.createChatCompletion(chatCompletionParams);

        console.log("API completion:", completion)

        const generatedText = completion.data.choices[0].message.content;

        // Parse the generatedText to extract the boolean value (true or false) indicating 'readable content'
        const isReadableContent = generatedText.trim() === "true";


        console.log("isReadableContent:", isReadableContent)

        return isReadableContent

    } catch (error) {
        console.error('Error with content moderation:', error);
        throw error;
    }  
}

