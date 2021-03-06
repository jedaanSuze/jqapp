const express = require('express');
const bodyParser = require('body-parser');

function getModel () {
    return require(`./model-${require('../config').get('DATA_BACKEND')}`);
}

const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({ extended: false }));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    next();
});

/**
 * GET /books
 *
 * Display a page of books (up to ten at a time).
 */
router.get('/books', (req, res, next) => {
    getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.render('books/list.pug', {
            books: entities,
            nextPageToken: cursor
        });
    });
});

/**
 * GET /books/add
 *
 * Display a form for creating a book.
 */
// [START add_get]
router.get('/books/add', (req, res) => {
    res.render('books/form.pug', {
        book: {},
        action: 'Add'
    });
});
// [END add_get]

/**
 * POST /books/add
 *
 * Create a book.
 */
// [START add_post]
router.post('/books/add', (req, res, next) => {
    const data = req.body;

    // Save the data to the database.
    getModel().create(data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
});
// [END add_post]

/**
 * GET /books/:id/edit
 *
 * Display a book for editing.
 */
router.get('/books/:book/edit', (req, res, next) => {
    getModel().read(req.params.book, (err, entity) => {
        if (err) {
            next(err);
            return;
        }
        res.render('books/form.pug', {
            book: entity,
            action: 'Edit'
        });
    });
});

/**
 * POST /books/:id/edit
 *
 * Update a book.
 */
router.post('/books/:book/edit', (req, res, next) => {
    const data = req.body;

    getModel().update(req.params.book, data, (err, savedData) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
});

/**
 * GET /books/:id
 *
 * Display a book.
 */
router.get('/books/:book', (req, res, next) => {
    getModel().read(req.params.book, (err, entity) => {
        if (err) {
            next(err);
            return;
        }
        res.render('books/view.pug', {
            book: entity
        });
    });
});

/**
 * GET /books/:id/delete
 *
 * Delete a book.
 */
router.get('/books/:book/delete', (req, res, next) => {
    getModel().delete(req.params.book, (err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect(req.baseUrl);
    });
});

/**
 * Errors on "/books/*" routes.
 */
router.use((err, req, res, next) => {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = err.message;
    next(err);
});
