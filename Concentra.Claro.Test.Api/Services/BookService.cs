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

        public Task<BookDto> GetId()
        {
            throw new NotImplementedException();
        }

        public async Task<List<BookDto>> GetList()
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
        public async Task<BookDto> GetId(int id)
        {
            // Build the API URL with the given book id
            string apiUrl = $"https://fakerestapi.azurewebsites.net/api/v1/Books/{id}";

            // Make the GET request
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            // Ensure the request was successful
            response.EnsureSuccessStatusCode();

            // Read the response content as a string
            var jsonContent = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON content into a BookDto object
            var book = JsonConvert.DeserializeObject<BookDto>(jsonContent);

            return book;
        }
    }
}
