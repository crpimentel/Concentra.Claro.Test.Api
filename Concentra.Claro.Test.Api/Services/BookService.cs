using ConcentraClaroTestApi.DTOs;
using Newtonsoft.Json;
using System.Text;
namespace ConcentraClaroTestApi.Services
{
    public class BookService : IBookService
    {
        private readonly HttpClient _httpClient;
        public BookService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        // Method to get a book using Get
        public async Task<List<BookDto>> GetList()
        {
            string apiUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books";  // External API returning list of books

            try
            {
                // Send the GET request
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                // Handle specific status codes
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new Exception("Books not found.");
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    throw new Exception("Server error. Please try again later.");
                }

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();

                // Read and deserialize the response content into a list of books using Newtonsoft.Json
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var books = JsonConvert.DeserializeObject<List<BookDto>>(jsonResponse);

                return books;
            }
            catch (HttpRequestException httpRequestException)
            {
                // Handle network or connection errors
                throw new Exception($"Request error: {httpRequestException.Message}");
            }
            catch (Exception ex)
            {
                // Handle any other errors
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
        // Method to get a book using Get
        public async Task<BookDto> GetId(int id)
        {
            string apiUrl = $"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}";

            try
            {
                // Send the GET request
                HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

                // Handle specific status codes
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new Exception("Book not found.");
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    throw new Exception("Server error. Please try again later.");
                }

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();

                // Read and deserialize the response content using Newtonsoft.Json
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var book = JsonConvert.DeserializeObject<BookDto>(jsonResponse);

                return book;
            }
            catch (HttpRequestException httpRequestException)
            {
                // Handle network or connection errors
                throw new Exception($"Request error: {httpRequestException.Message}");
            }
            catch (Exception ex)
            {
                // Handle any other errors
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        // Method to create a book using POST
        public async Task<BookDto> CreateBookAsync(BookDto newBook)
        {
                            
            string apiUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books";

            try
            {
                // Serialize the newBook object to JSON
                var bookJson = JsonConvert.SerializeObject(newBook);
                var content = new StringContent(bookJson, Encoding.UTF8, "application/json");

                // Send the POST request
                HttpResponseMessage response = await _httpClient.PostAsync(apiUrl, content);

                // Handle specific status codes
                if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                {
                    throw new Exception("Invalid request. Please check the book details.");
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    throw new Exception("Server error. Please try again later.");
                }

                // If the status code is not successful, throw an error
                response.EnsureSuccessStatusCode();

                // Read and deserialize the response content
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var createdBook = JsonConvert.DeserializeObject<BookDto>(jsonResponse);

                return createdBook;
            }
            catch (HttpRequestException httpRequestException)
            {
                // Handle network errors
                throw new Exception($"Request error: {httpRequestException.Message}");
            }
            catch (Exception ex)
            {
                // Handle any other errors
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        public async Task<BookDto> UpdateBookAsync(int id, BookDto bookToUpdate)
        {
                              
            string apiUrl = $"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}";

            try
            {
                // Serialize the book object to JSON
                var jsonContent = JsonConvert.SerializeObject(bookToUpdate);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Send the PUT request
                HttpResponseMessage response = await _httpClient.PutAsync(apiUrl, content);

                // Handle specific status codes
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new Exception("Book not found.");
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    throw new Exception("Server error. Please try again later.");
                }

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();

                // Read and deserialize the response content
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var updatedBook = JsonConvert.DeserializeObject<BookDto>(jsonResponse);

                return updatedBook;
            }
            catch (HttpRequestException httpRequestException)
            {
                // Handle network or connection errors
                throw new Exception($"Request error: {httpRequestException.Message}");
            }
            catch (Exception ex)
            {
                // Handle any other errors
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
        public async Task DeleteBookAsync(int id)
        {
                             
            string apiUrl = $"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}";

            try
            {
                // Send the DELETE request
                HttpResponseMessage response = await _httpClient.DeleteAsync(apiUrl);

                // Handle specific status codes
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new Exception("Book not found.");
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
                {
                    throw new Exception("Server error. Please try again later.");
                }

                // Ensure the request was successful
                response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException httpRequestException)
            {
                // Handle network or connection errors
                throw new Exception($"Request error: {httpRequestException.Message}");
            }
            catch (Exception ex)
            {
                // Handle any other errors
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
    }
}
