exports.handler = async (event) => {
    const {headers, body} = event;
    console.log("headers", headers, "body", body);
    if (!headers || !headers.apiKey || headers.apiKey !== "secureKey") {
        return {
            statusCode: 400,
            body:JSON.stringify({message: "Bad request"})
        }
    }
    
    let content;

    try {
        content = parseContent(body);
    } catch (error) {
        return {
            statusCode: 500,
            body:JSON.stringify({message: `${error}`})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({data:{content:`${content}`, headers:`${headers}`}})
    }
}