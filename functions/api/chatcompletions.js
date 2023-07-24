const getData = async (data) => {
	console.log('req body', data);
    const url = "https://api.openai.com/v1/chat/completions";
	const options = {
	  method: "POST",
	  
	  headers: {
		"Content-Type": "application/json",
		//Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
		Authorization: "Bearer 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",
        "OpenAI-Organization": "org-YQLk2edO3q48OWG8mtgl17d7"
	  },
	  body: data,
	};
  
	try {
	  const result = await fetch(url, options);
	  console.log("result", await result.text()      );
	  return result;
	} catch (e) {
	  console.log(e);
	}
}

export async function onRequestPost({request, env}) {
   // let bodyObject = Object.fromEntries(request.body);
//let requestbody = JSON.stringify(bodyObject, null, 2);
//console.log('req body 2',await request.text());
const reqbody = await request.json()
console.log(' body 1',reqbody);
    console.log('model:', reqbody.model);
    console.log('messages:', reqbody.messages);
    var reqData = JSON.stringify({model:reqbody.model, messages : reqbody.messages});
	try {
	  const resp = await getData(reqData);
	  return new Response(JSON.stringify(resp.data));
	  //res.send(resp.data);
	} catch (e) {
	  //wrap your error object and send it
	  console.log("error: ", e);
	}

   // return new Response('hi')
  }
