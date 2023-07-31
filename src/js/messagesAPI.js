import axios from 'axios'

//default export
export default {
    getChatCompletions  : async function getChatCompletions( messages) {
        console.log('in messagesapi getChatCompletions');
        var url = '/api/chatcompletions'
        var clonnedMessages = JSON.parse(JSON.stringify(messages));
        clonnedMessages.forEach(object => {
            delete object['type'];
            delete object['templateData'];
        });
        try {
            var headersObj = {
                "Content-Type": "application/json"
            }
            const response = await axios.post(url,JSON.stringify({model:"gpt-3.5-turbo", messages : clonnedMessages}), 
                                                {headers : headersObj});
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getButtonOptions : async function getButtonOptions() {
        var url = '/api/buttonoptions'
        try {
            const response = await axios.get(url);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
//named export
/*export async function getChatCompletions ( messages )  {
    var url = '/api/chatCompletions'
    var clonnedMessages = JSON.parse(JSON.stringify(messages));
    clonnedMessages.forEach(object => {
        delete object['type'];
      });
    try {
        var headersObj = {
            "Content-Type": "application/json"
        }
        const response = await axios.post(url,JSON.stringify({model:"gpt-3.5-turbo", messages : clonnedMessages}), 
                                            {headers : headersObj});
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}*/