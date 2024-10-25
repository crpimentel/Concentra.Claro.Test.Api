using ConcentraClaroTestApi.Controllers;
using ConcentraClaroTestApi.DTOs;
using ConcentraClaroTestApi.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
namespace UnitTestUtility.Controller
{
    public class BooksControllerIntegrationTests
    {
        private readonly BooksController _controller;

        public BooksControllerIntegrationTests()
        {
            var httpClient = new HttpClient();
            var bookService = new BookService(httpClient);
            _controller = new BooksController(bookService);
        }

        [Fact]
        public async Task GetAllBooks_ShouldReturnOkResult_WithListOfBooks()
        {
            // Act
            var result = await _controller.GetAllBooks();

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeOfType<List<BookDto>>();
            ((List<BookDto>)okResult.Value).Should().NotBeEmpty();
        }

        [Fact]
        public async Task GetBookById_ShouldReturnOkResult_WithBook_WhenBookExists()
        {
            // Arrange
            int bookId = 1; 

            // Act
            var result = await _controller.GetBookById(bookId);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeOfType<BookDto>();
            ((BookDto)okResult.Value).id.Should().Be(bookId);
        }

        [Fact]
        public async Task GetBookById_ShouldReturnNotFound_WhenBookDoesNotExist()
        {
            // Arrange
            int bookId = -1; 

            // Act
            var result = await _controller.GetBookById(bookId);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task CreateBook_ShouldReturnCreatedResult_WithCreatedBook()
        {
            // Arrange
            var newBook = new BookDto
            {
                title = "Integration Test Book",
                description = "Created by integration test",
                pageCount = 123,
                excerpt = "",
                publishDate = DateTime.Now
            };

            // Act
            var result = await _controller.CreateBook(newBook);

            // Assert
            result.Should().BeOfType<CreatedAtActionResult>();
            var createdResult = result as CreatedAtActionResult;
            createdResult.Value.Should().BeOfType<BookDto>();
            ((BookDto)createdResult.Value).title.Should().Be("Integration Test Book");
        }

        [Fact]
        public async Task UpdateBook_ShouldReturnOkResult_WithUpdatedBook()
        {
            // Arrange
            int bookId = 1; 
            var bookToUpdate = new BookDto
            {
                title = "Updated Book Title",
                description = "Updated Description",
                pageCount = 150,
                excerpt = "",
                publishDate = DateTime.Now
            };

            // Act
            var result = await _controller.UpdateBook(bookId, bookToUpdate);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeOfType<BookDto>();
            ((BookDto)okResult.Value).title.Should().Be("Updated Book Title");
        }

        [Fact]
        public async Task DeleteBook_ShouldReturnNoContentResult_WhenBookIsDeleted()
        {
            // Arrange
            int bookId = 1; 

            // Act
            var result = await _controller.DeleteBook(bookId);

            // Assert
            result.Should().BeOfType<NoContentResult>();
        }
    }
}
