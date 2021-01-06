exports.handler = async (event) => {
    const {headers, body, httpMethod} = event;
    console.log("headers", headers, "body", body);
    if (!headers || !headers.apiKey || headers.apiKey !== "secureKey") {
        if (!headers.apiKey) {
            console.log("no apiKey");
        }
        if (headers.apiKey !== "secureKey") {
            console.log(`api key not match, ${headers.apiKey} received`)
        }
        return {
            statusCode: 400,
            body:JSON.stringify({message: "Bad request"})
        }
    }
    
    if (httpMethod !== "GET" || httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({message: "Method not allowed"})
        }
    }

    if (httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify()
        }
    }

    if (httpMethod === "POST") {
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
        
    }
}