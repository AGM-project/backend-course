const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./auth')

const app = express()
const PORT = 3000

// Middleware
app.use(bodyParser.json())
app.use(cors())

app.use('/auth', auth);

//Endpoint komunikasi dua arah
app.post("/api/message", (req, res) => {
    const { message } = req.body;
    console.log({ message: `Pesan diterima dari client: ${message}` });
  
    // Kirim respon ke client
    res.json({ reply: `Pesan Anda "${message}" telah diterima.` });
});

//start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})