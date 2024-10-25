using ConcentraClaroTestApi.DTOs;
using ConcentraClaroTestApi.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ConcentraClaroTestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }
        // GET: api/<BooksController>
        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            try
            {
                // Call the service method to get the list of books from the external API
                List<BookDto> books = await _bookService.GetList();

                // If no books are found, return 404 Not Found
                if (books == null || books.Count == 0)
                {
                    return NotFound(new { message = "No books found." });
                }

                // Return the list of books with 200 OK
                return Ok(books);
            }
            catch (Exception ex)
            {
                // If an error occurs, return 400 Bad Request or other status codes as needed
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            try
            {
                // Call the service method to get the book from the external API
                BookDto book = await _bookService.GetId(id);

                // If no book is found, return 404 Not Found
                if (book == null)
                {
                    return NotFound(new { message = "Book not found." });
                }

                // Return the book with 200 OK
                return Ok(book);
            }
            catch (HttpRequestException httpRequestException)
            {
                // If a network or connection error occurs, return 503 Service Unavailable
                return StatusCode(503, new { message = $"Service error: {httpRequestException.Message}" });
            }
            catch (Exception ex)
            {
                // If an error occurs, return 400 Bad Request or other status codes as needed
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST api/<BooksController>
        [HttpPost]
        public async Task<IActionResult> CreateBook([FromBody] BookDto newBook)
        {
            if (newBook == null)
            {
                return BadRequest(new { message = "Invalid book data." });
            }

            try
            {
                // Call the service method to create the book in the external API
                BookDto createdBook = await _bookService.CreateBookAsync(newBook);

                // Return the created book with 201 Created
                return CreatedAtAction(nameof(CreateBook), new { id = createdBook.id }, createdBook);
            }
            catch (Exception ex)
            {
                // If an error occurs, return 400 Bad Request or other status codes as needed
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookToUpdate)
        {
            if (bookToUpdate == null)
            {
                return BadRequest(new { message = "Invalid book data." });
            }

            try
            {
                // Call the service method to update the book in the external API
                BookDto updatedBook = await _bookService.UpdateBookAsync(id, bookToUpdate);

                // Return the updated book with 200 OK
                return Ok(updatedBook);
            }
            catch (Exception ex)
            {
                // If an error occurs, return 400 Bad Request or other status codes as needed
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                // Call the service method to delete the book from the external API
                await _bookService.DeleteBookAsync(id);

                // Return a 204 No Content status to indicate successful deletion
                return NoContent();
            }
            catch (Exception ex)
            {
                // If an error occurs, return 400 Bad Request or other status codes as needed
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
