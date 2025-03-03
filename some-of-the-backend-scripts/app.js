const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    const originalHost = req.headers.host;
    const originalProtocol = req.protocol;
    const targetDomain = 'panopticpen.space';
    const targetProtocol = 'https';

    if (
        originalHost !== targetDomain &&
        !originalHost.endsWith(`.${targetDomain}`) &&
        (originalProtocol === 'http' || originalHost.startsWith('www.'))
    ) {
        const targetURL = `${targetProtocol}://${targetDomain}${req.originalUrl}`;
        return res.redirect(301, targetURL);
    }

    next();
});

    
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/book-search', (req, res) => {
    res.render('index');
});

// Search results
app.get('/book-search/search', async (req, res) => {
    const query = req.query.query;

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);

        const books = response.data.items.map(book => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
            infoLink: book.volumeInfo.infoLink
        }));

        res.render('search', { query, books });
    } catch (error) {
        console.error(error);
        res.render('error');
    }
});


app.use((req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
