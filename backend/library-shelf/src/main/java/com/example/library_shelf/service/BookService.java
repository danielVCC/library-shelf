package com.example.library_shelf.service;

import com.example.library_shelf.dto.BookDTO;
import com.example.library_shelf.dto.BookMinDTO;
import com.example.library_shelf.dto.BookUpdateDTO;
import com.example.library_shelf.entity.Author;
import com.example.library_shelf.entity.Book;
import com.example.library_shelf.entity.Category;
import com.example.library_shelf.repository.BookRepository;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional(readOnly = true)
    public List<BookMinDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(BookMinDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookMinDTO> getBooksByAuthor(Long authorId) {
        return bookRepository.findByAuthorId(authorId)
                .stream()
                .map(BookMinDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<BookDTO> getBookById(Long id) {
        return bookRepository.findById(id)
                .map(BookDTO::new);
    }

    @Transactional
    public BookDTO updateBook(Long id, BookUpdateDTO updatedBook) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book not found"));

        // update basic fields
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setDescription(updatedBook.getDescription());
        existingBook.setPublishedYear(updatedBook.getPublishedYear());

        // author validation
        Author author = authorService.getAuthorById(updatedBook.getAuthorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
        existingBook.setAuthor(author);

        // category validation
        Category category = categoryService.getCategoryById(updatedBook.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        existingBook.setCategory(category);

        return new BookDTO(bookRepository.save(existingBook));
    }

    @Transactional
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

    @Transactional
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}




