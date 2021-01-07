exports.handler = async (event) => {
    const {headers, body, httpMethod} = event;
    console.log("headers", headers, "body", body);
    if (!headers || !headers.api_key || headers.api_key !== "secureKey") {
        return {
            statusCode: 400,
            body:JSON.stringify({message: "Bad request"})
        }
    }
    
    switch (httpMethod) {
        case "GET":
            return {
                statusCode: 200,
                body: JSON.stringify()
            }
        case "POST":
            let content;
            try {
                content = parseContent(body);
                return {
                    statusCode: 200,
                    body: JSON.stringify()
                }
            } catch (error) {
                    return {
                        statusCode: 500,
                        body:JSON.stringify({message: `${error}`})
                    }
                }
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({message: `Method ${httpMethod} not allowed`})
            }
    }   
}