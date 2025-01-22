import https from "https";

const endpoint = "https://fullstackdev.free.beeceptor.com/";
const request = https.request(endpoint, {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
    }
}, (response) => {
    response.addListener("data", (data) => {
        console.info(`Receive data : ${data.toString()}`);
    })
});

const body = JSON.stringify({
    firstName: "Feri",
    lastName: "Lauw",
})

request.write(body);
request.end();
