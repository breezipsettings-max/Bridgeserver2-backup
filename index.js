// Netlify does not support 'ws' library. 
// This uses an HTTP POST relay instead.
// You must connect a database to 'MESSAGES' to actually sync across servers.

exports.handler = async (event, context) => {
    // Headers to allow Roblox to communicate
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    // Health Check (Prevents the 404)
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ status: "Bridge is Active", mode: "Serverless" })
        };
    }

    // Receiving a message from Roblox
    if (event.httpMethod === "POST") {
        try {
            const payload = JSON.parse(event.body);
            
            // In a real Netlify bridge, you would save 'payload' to a Database here.
            // Because there is no persistent memory, we just echo it back.
            
            console.log("Message Received: ", payload);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "Sent to Relay", data: payload })
            };
        } catch (err) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: "Invalid JSON" })
            };
        }
    }

    return {
        statusCode: 405,
        headers,
        body: "Method Not Allowed"
    };
};
