import net from "net";

const server = net.createServer((client) => {
    console.info("Client connected");

    let data = "Agam"

    client.addListener("data", (data) => {
        console.info(`Receive data ${data.toString()}`);
        client.write(`Hello ${data.toString()}\r\n`); // r n adalah enter
    })

});

server.listen(3000, "localhost");
