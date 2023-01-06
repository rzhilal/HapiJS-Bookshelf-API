const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  // define all body
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    return response.code(400);
  }

  // property generated from server side
  const id = nanoid(16);
  let finished = false;
  if (readPage === pageCount) finished = true;
  const insertedAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  // dataBook that will created
  const newDataBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    return response.code(400);
  }
  books.push(newDataBook); // assign to array
  console.log(newDataBook.id);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    return response.code(201);
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  return response.code(500);
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((bookFind) => bookFind
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((bookFind) => bookFind.reading === !!Number(reading));
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((bookFind) => bookFind.finished === !!Number(finished));
  }

  const datasend = filteredBooks.map((element) => (
    {
      id: element.id,
      name: element.name,
      publisher: element.publisher,
    }));

  const response = h.response({
    status: 'success',
    data: {
      books: datasend,
    },
  });
  return response.code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((bookFind) => bookFind.id === bookId)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    return response.code(400);
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    return response.code(400);
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((bookFind) => bookFind.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(200);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((bookFind) => bookFind.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooks,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
