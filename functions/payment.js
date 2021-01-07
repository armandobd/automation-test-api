exports.handler = async (event) => {
    const {headers, body, httpMethod} = event;
    console.log("headers", headers, "body", body);
    if (!headers || !headers.api_key || headers.api_key !== "secureKey") {
        return {
            statusCode: 401,
            body:JSON.stringify({error: "Incorrect authentication"})
        }
    }
    
    switch (httpMethod) {
        case "GET":
            let content;
            try {
                content = JSON.parse(body);
                const {orderId} = content;
                if (typeof orderId !== Number || orderId < 1000 || orderId > 99999) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({error: "Order Id not valid"})
                    }
                }
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        data: [
                            {
                                orderId,
                                transaction_status: "Pending"
                            }
                        ]
                    })
                }

            } catch (error) {
                return {
                        statusCode: 500,
                        body:JSON.stringify({error: `${error}`})
                    }
            }
            return {
                statusCode: 200,
                body: JSON.stringify()
            }
        case "POST":
            let content;
            try {
                content = JSON.parse(body);

                const {amount, currency, country} = content;

                if (amount < 0 || amount > 1000) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({error: "Amount not allowed"})
                    }
                }

                if (country === "DE") {
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
                                    ]},
                                    {
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
                } else if (country === "AU") {
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
                                    ]},
                                    {
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
                } else if (country === "SG") {
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
                                    ]},
                                    {
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