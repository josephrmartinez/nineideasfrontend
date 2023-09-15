// import OpenAI from "openai";
        
// const openai = new OpenAI({apiKey:'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', dangerouslyAllowBrowser: true});


// export async function contentModeration(ideaList) {
//     console.log("Calling content moderation")

//     const ideaListText = ideaList.map(idea => idea.text)

//     try {
    
//         const prompt = 
//         `You are a content moderation tool that evaluates the ideaList provided by a user. 
//         The ideaList is an array of text-based ideas. 
//         Your task is to analyze the ideaList below and classify it as either 'readable content' or 'unreadable content.'
//         'Readable content' should be identified when all of the ideaList contains meaningful words, phrases, or sentences that represent genuine ideas or thoughts.
//         'Unreadable content' should be detected when the ideaList is comprised of gibberish, random characters, or nonsense text, such as 'dsafkj dsflkjasdkjlhsa djklsdaf asdkjhf.'

//         Please take the ideaList deliniated by three asterisks below as input and return a boolean value indicating whether the list contains 'readable content' (true) or 'unreadable content' (false).
//         If there is any unreadable content at all, you should return 'false'.

//         The goal is to identify whether the text represents genuine ideas or is simply nonsensical.

//         ***
//         ${ideaListText}
//         ***

//         `;

        

//         console.log("API prompt:", prompt)

//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo-0613",
//             messages: [
//                 { role: "user", content: prompt }
//             ]
//             });

//         console.log("API completion:", completion)

//         const generatedText = completion.choices[0].message.content;

//         // Parse the generatedText to extract the boolean value (true or false) indicating 'readable content'
//         const isReadableContent = generatedText.trim().toLowerCase() === "true";


//         console.log("isReadableContent:", isReadableContent)

//         return isReadableContent

//     } catch (error) {
//         console.error('Error with content moderation:', error);
//         throw error;
//     }  
// }

