const { scrapeSite } = require('../utils/scraper');

async function routes(fastify, options) {

    fastify.get('/', async (request, reply) => {
        reply
            .code(200)
            .type('text/html')
            .send(`This is a sample implementation of web scraping with fastify`);
    })

    fastify.get('/scrape', async (request, reply) => {
        const prodTitle = request.query["title"];
        if(!prodTitle || prodTitle==""){
            throw new Error("Invalid Query Param");
        }
        const products = await scrapeSite(prodTitle);
        const resBody = {
            data: products
        };;
        products.length > 0 ? resBody.status = "Success" : resBody.status = "No Item Found";
        reply
            .code(200)
            .send(resBody);
    })

    fastify.get('/*', async (request, reply) => {
        reply
            .redirect('/');
    })

}

module.exports = routes;
