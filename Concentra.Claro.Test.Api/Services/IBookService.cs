﻿using ConcentraClaroTestApi.DTOs;

namespace ConcentraClaroTestApi.Services
{
    public interface IBookService
    {
        Task<List<BookDto>> CallExternalApiAsync();
    }
}