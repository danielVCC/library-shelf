package com.example.library_shelf.service;

import com.example.library_shelf.dto.BookDTO;
import com.example.library_shelf.dto.BookMinDTO;
import com.example.library_shelf.dto.BookUpdateDTO;
import com.example.library_shelf.entity.Author;
import com.example.library_shelf.entity.Book;
import com.example.library_shelf.entity.Category;
import com.example.library_shelf.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private CategoryService categoryService;

    public List<BookMinDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookMinDTO::new)
                .toList();
    }

    public List<BookDTO> getBooksByAuthor(Long authorId) {
        return bookRepository.findByAuthorId(authorId)
                .stream()
                .map(BookDTO::new)
                .toList();
    }

    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id)
                .map(BookDTO::new);
    }

    public BookDTO updateBook(Long id, BookUpdateDTO bookUpdateDTO) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found"));

        // update basic fields
        existingBook.setTitle(bookUpdateDTO.getTitle());
        existingBook.setDescription(bookUpdateDTO.getDescription());
        existingBook.setPublishedYear(bookUpdateDTO.getPublishedYear());

        // author validation
        Author author = authorService.getAuthorById(bookUpdateDTO.getAuthorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
        existingBook.setAuthor(author);

        // category validation
        Category category = categoryService.getCategoryById(bookUpdateDTO.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        existingBook.setCategory(category);

        return new BookDTO(bookRepository.save(existingBook));
    }

    public BookDTO createBook(BookDTO bookDTO) {
        Book newBook = new Book();
        newBook.setTitle(bookDTO.getTitle());
        newBook.setDescription(bookDTO.getDescription());
        newBook.setPublishedYear(bookDTO.getPublishedYear());

        // author validation
        Author author = authorService.getAuthorById(bookDTO.getAuthor().getId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
        newBook.setAuthor(author);

        // category validation
        Category category = categoryService.getCategoryById(bookDTO.getCategory().getId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        newBook.setCategory(category);

        return new BookDTO(bookRepository.save(newBook));
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}




