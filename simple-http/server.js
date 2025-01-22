const http = require("http")

const server = http.createServer((req,res) => {
    if (req.url === "/") {
        res.writeHead(200, {"content-type" : "text/plain"})
        res.end("Welcome to the Home Page!")
    }
    else if (req.url === "/about") {
        res.writeHead(200, {"content-type" : "text/plain"})
        res.end("Ini about page!")
    }
    else {
        res.writeHead(200, {"content-type" : "text/plain"})
        res.end("Welcome to the Home Page!")
    }
})

const PORT = 3000;

server.listen(PORT, () =>{
    console.log(`Server berjalan pada http://localhost:${PORT}`);
})