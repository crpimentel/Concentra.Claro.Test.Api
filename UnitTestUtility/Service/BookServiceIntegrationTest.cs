using ConcentraClaroTestApi.DTOs;
using ConcentraClaroTestApi.Services;
using FluentAssertions;


namespace UnitTestUtility.Service
{
    public class BookServiceIntegrationTests
    {
        private readonly BookService _bookService;

        public BookServiceIntegrationTests()
        {
            // Usar HttpClient real para conectar a la API externa.
            var httpClient = new HttpClient();
            _bookService = new BookService(httpClient);
        }

        [Fact]
        public async Task GetList_ShouldReturnBooks_WhenResponseIsSuccessful()
        {
            // Act
            var result = await _bookService.GetList();

            // Assert
            result.Should().NotBeNull();
            result.Should().AllBeOfType<BookDto>();
        }

        [Fact]
        public async Task GetId_ShouldReturnBook_WhenResponseIsSuccessful()
        {
            // Arrange
            int bookId = 1; 

            // Act
            var result = await _bookService.GetId(bookId);

            // Assert
            result.Should().NotBeNull();
            result.id.Should().Be(bookId);
        }

        [Fact]
        public async Task GetId_ShouldThrowException_WhenBookNotFound()
        {
            // Arrange
            int bookId = -1;

            // Act
            Func<Task> act = async () => await _bookService.GetId(bookId);

            // Assert
            await act.Should().ThrowAsync<Exception>()
                .WithMessage("An error occurred: Book not found.");
        }

        [Fact]
        public async Task CreateBookAsync_ShouldReturnCreatedBook_WhenResponseIsSuccessful()
        {
            // Arrange
            var newBook = new BookDto
            {
                title = "New Book",
                description = "New Description",
                pageCount = 100,
                excerpt = "",
                publishDate = DateTime.Now
            };

            // Act
            var result = await _bookService.CreateBookAsync(newBook);

            // Assert
            result.Should().NotBeNull();
            result.title.Should().Be("New Book");
        }

        [Fact]
        public async Task UpdateBookAsync_ShouldReturnUpdatedBook_WhenResponseIsSuccessful()
        {
            // Arrange
            var bookToUpdate = new BookDto
            {
                title = "Updated Book",
                description = "Updated Description",
                pageCount = 200,
                excerpt = "",
                publishDate = DateTime.Now
            };
            int bookId = 1; 

            // Act
            var result = await _bookService.UpdateBookAsync(bookId, bookToUpdate);

            // Assert
            result.Should().NotBeNull();
            result.title.Should().Be("Updated Book");
        }

        [Fact]
        public async Task DeleteBookAsync_ShouldCompleteWithoutException_WhenResponseIsSuccessful()
        {
            // Arrange
            int bookId = 1; 

            // Act
            Func<Task> act = async () => await _bookService.DeleteBookAsync(bookId);

            // Assert
            await act.Should().NotThrowAsync();
        }
    }
}
