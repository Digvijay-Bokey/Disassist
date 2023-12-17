//const openai = new OpenAI();


const {openAiKey} = require("./creds");

function OpenaiFetchAPI() {
    console.log("Calling gpt-3.5-turbo")
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + openAiKey
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-4",
            //enter prompt here:
            "messages": [{"role": "user", "content": "Take this following text and make it easier to read for dyslexic people by not changing words, but bolding the first word in compound words, such as apple in applesauce, or differentiating commonly confused words, such as bolding pre in prefect and per in perfect. Please do this for any word where it may become more readable. Here is the prompt - "}],
            "temperature": 0.5

        })


    }).then(response => {

        return response.json()

    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].message)

    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}

OpenaiFetchAPI()