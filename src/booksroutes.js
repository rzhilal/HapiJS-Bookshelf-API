const Joi = require('joi'); // https://hapi.dev/tutorials/validation/?lang=en_US
const {
  addBookHandler,
  getAllBooks,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./bookshandler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          year: Joi.number(),
          author: Joi.string(),
          summary: Joi.string(),
          publisher: Joi.string(),
          pageCount: Joi.number(),
          readPage: Joi.number(),
          reading: Joi.boolean(),
        }),
      },
    },
  },

  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          year: Joi.number(),
          author: Joi.string(),
          summary: Joi.string(),
          publisher: Joi.string(),
          pageCount: Joi.number(),
          readPage: Joi.number(),
          reading: Joi.boolean(),
        }),
        params: Joi.object({
          bookId: Joi.required(),
        }),
      },
    },
  },

  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
    options: {
      validate: {
        params: Joi.object({
          bookId: Joi.required(),
        }),
      },
    },
  },
];

module.exports = routes;
