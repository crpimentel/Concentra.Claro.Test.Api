using ConcentraClaroTestApi.DTOs;
using Newtonsoft.Json;
namespace ConcentraClaroTestApi.Services
{
    public class BookService : IBookService
    {
        private readonly HttpClient _httpClient;
        public BookService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<BookDto>> CallExternalApiAsync()
        {
            string apiUrl = "";
            // Make the GET request
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            // Ensure success status code
            response.EnsureSuccessStatusCode();

            // Read the response content as a string
            var jsonContent = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON content into BookDto
            // Deserialize the JSON content into a List<BookDto>
            var books = JsonConvert.DeserializeObject<List<BookDto>>(jsonContent);

            return books;
        }
    }
}
