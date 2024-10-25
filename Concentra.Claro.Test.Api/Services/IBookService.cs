using ConcentraClaroTestApi.DTOs;

namespace ConcentraClaroTestApi.Services
{
    public interface IBookService
    {
        Task<List<BookDto>> GetList();
        Task<BookDto> GetId(int id);
        Task<BookDto> CreateBookAsync(BookDto newBook);
        Task<BookDto> UpdateBookAsync(int id, BookDto bookToUpdate);
        Task DeleteBookAsync(int id);
    }
}
