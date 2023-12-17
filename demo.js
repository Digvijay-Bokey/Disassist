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
            /*"prompt": "Once upon a time",
            "max_tokens": 5,
            "temperature": 1,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
            "stop": "\n"*/
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Say this is a test!"}],
            "temperature": 0.7
        })


    }).then(response => {

        return response.json()

    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].text)

    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}

OpenaiFetchAPI()