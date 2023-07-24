export function onRequest(context) {
    //return new Response('test buttons');
    const buttonOpts = {
        questionText : "What do you like",
        buttons : [
            {
                buttonLabel :"Pizza",
                buttonValue :"pizza",
                url : "" 
                
            },
            {
                buttonLabel :"Burger",
                buttonValue :"burger",
                url : "" 
                
            }
        ]
    }
    return new Response(JSON.stringify(buttonOpts));
}