const sequelize = require('./config/database')
const productsHandler = require('./src/routes/products')
const http = require('http')
const fs = require('fs')
const path = require('path')

//Fn check existing column
const checkColumnExists = async (tableName, columnName) => {
    const [results] = await sequelize.query(`
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${columnName}'
    `)
    return results.length > 0
}

//Fn sync DB
const syncDatabase = async () => {
    try{
        const productHasCreatedAt = await checkColumnExists('Products','CreatedAt')
        const productHasUpdatedAt = await checkColumnExists('Products','UpdatedAt')

        if(productHasCreatedAt && productHasUpdatedAt){
            console.log('Columns CreatedAt and UpdatedAt already exist, skipping column creation.');
        }
        else{
            await sequelize.sync({alter:true})
            console.log('Database synced');
        }
    }
    catch (err){
        console.error('Error syncing DB: ',err)
    }
}

//Syncronize DB when app start
syncDatabase()

//Fn serve SwaggerUI
const serveSwaggerUI = (req,res) => {
    const swaggerUiHtmlPath = path.join(__dirname, 'node_modules', 'swagger-ui-dist', 'index.html');
    const swaggerYamlPath = path.join(__dirname, 'docs', 'openapi.yaml');
    const swaggerUiAssetsPath = path.join(__dirname, 'node_modules', 'swagger-ui-dist');
    
    console.log('Request URL:', req.url);
    
    try {
        if (req.url === '/api-docs') {
        // Baca file index.html dan ubah referensi ke swagger.yaml
        const swaggerUiHtml = fs.readFileSync(swaggerUiHtmlPath, 'utf-8');
        const modifiedHtml = swaggerUiHtml.replace(
            'https://petstore.swagger.io/v2/swagger.json',
            '/swagger.yaml'
        );
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(modifiedHtml);
        } else if (req.url === '/swagger.yaml') {
        // Layani file swagger.yaml
        const swaggerYaml = fs.readFileSync(swaggerYamlPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/yaml' });
        res.end(swaggerYaml);
        } // Menggunakan rute untuk menyajikan file statis Swagger UI
        else if (req.url.startsWith('/swagger-ui/')) {
        const fileName = req.url.replace('/swagger-ui/', '');
        const filePath = path.join(swaggerUiAssetsPath, fileName);
    
        if (fs.existsSync(filePath)) {
            console.log('Serving static file:', filePath);
            const fileContent = fs.readFileSync(filePath);
            const ext = path.extname(filePath).toLowerCase();
    
            const mimeTypes = {
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.svg': 'image/svg+xml',
            '.html': 'text/html',
            '.map': 'application/json',
            };
    
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(fileContent);
        } else {
            console.error('File not found:', filePath);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
        }
        else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        }
    } catch (err) {
        console.error('Error serving Swagger files:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

//Fn penanganan Request HTTP
const requestHandler = async (req,res) => {
    if(req.url.startsWith('/products')) {
        await productsHandler(req,res)
    }
    else if (req.url === '/api-docs' || req.url === '/swagger.yaml' || req.url.startsWith('/swagger-ui')) {
        serveSwaggerUI(req,res)
    }
    else {
        res.statusCode = 404
        res.end('Not Found')
    }
}

//Create server HTTP
const server = http.createServer(requestHandler)

//Jalankan server di port 3000
server.listen(3000,() => {
    console.log('Server running on http://localhost:3000');
    console.log('Swagger documentation available at http://localhost:3000/api-docs');
})