const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method

    const markup = {
        head: '<html><head><title>Node Exercise!</title></head>',
        foot: '<html>'
    };

    if (url === '/') {
        res.write(markup.head);
        res.write('<body><h1>Greeting, welcome to Exercise 1</h1></body>');
        res.write('<form action="/create-user" method="POST"><label>Enter Name</label><input type="text" placeholder="Username" name="user" /><button type="submit">Send</button></form>');
        res.write(markup.foot);
        return res.end();
    } 

    if (url == '/users') {
        res.write(markup.head);
        res.write('<ul><li>Jonthedagda:   2 kdr</li><li>NotLilFish:   7 kdr</li><li>Phalpin:  6 kdr</li></ul>');
        res.write(markup.foot);
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody= Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
};

exports.handler = requestHandler;