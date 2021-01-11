exports.handler = async (event) => {
    const {headers, body, httpMethod, queryStringParameters} = event;
    console.log("headers", headers, "body", body, "queryStringParameters", queryStringParameters);
    if (!headers || !headers.api_key || headers.api_key !== "secureKey") {
        return {
            statusCode: 401,
            body:JSON.stringify({error: "Incorrect authentication"})
        }
    }
    
    switch (httpMethod) {
        case "GET":
            try {
                const {orderId} = queryStringParameters;
                console.log("orderId", orderId);
                console.log("typeof orderId", typeof orderId);
                if (!orderId || typeof orderId !== "number" || orderId < 1000 || orderId > 99999) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({error: "Order Id not valid"})
                    }
                }
                return {
                    statusCode: 200,
                    body: JSON.stringify(
                            {
                                orderId,
                                transaction_status: "Pending"
                            }    
                        )
                }

            } catch (error) {
                return {
                        statusCode: 500,
                        body:JSON.stringify({error: `${error}`})
                    }
            }

        case "POST":
            let content;
            try {
                content = JSON.parse(body);

                const {amount, currency, country_code} = content;

                if (amount < 0 || amount > 1000) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({error: "Amount not allowed"})
                    }
                }

                if (country_code === "DE") {
                    const orderId = Math.floor(Math.random()*100000);
                    if (currency === "EUR") {
                        return {
                            statusCode: 200, 
                            body: JSON.stringify(
                                {
                                    data: [
                                        {
                                            orderId,
                                            sessionId: `test-${orderId}`,
                                            amount: amount,
                                            status: true,
                                            message: "Transaction succeeded"
                                        },
                                    ],
                                        responseCode: "0",
                                    }
                            )
                        }
                    } else {
                        return {
                            statusCode: 400,
                            body: JSON.stringify({error: `Currency not allowed on selected country`})
                        }
                    }
                } else if (country_code === "AU") {
                    if (currency === "AUD") {
                        return {
                            statusCode: 200, 
                            body: JSON.stringify(
                                {
                                    data: [
                                        {
                                            orderId,
                                            sessionId: `test-${orderId}`,
                                            amount: amount,
                                            status: true,
                                            message: "Transaction succeeded"
                                        },
                                    ],
                                    responseCode: "0",         
                                }
                                )
                            }
                    } else {
                        return {
                            statusCode: 400,
                            body: JSON.stringify({error: `Currency not allowed on selected country`})
                        }
                    }
                } else if (country_code === "SG") {
                    if (currency === "SGD") {
                        return {
                            statusCode: 200, 
                            body: JSON.stringify(
                                {
                                    data: [
                                        {
                                            orderId,
                                            sessionId: `test-${orderId}`,
                                            amount: amount,
                                            status: true,
                                            message: "Transaction succeeded"
                                        },
                                    ],
                                    responseCode: "0",                                    
                                }
                                )
                            }
                    } else {
                        return {
                            statusCode: 400,
                            body: JSON.stringify({error: `Currency not allowed on selected country`})
                        }
                    }
                } else {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({error: "Country not allowed"})
                    }
                }

            } catch (error) {
                    return {
                        statusCode: 500,
                        body:JSON.stringify({error: `${error}`})
                    }
                }
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({message: `Method ${httpMethod} not allowed`})
            }
    }   
}