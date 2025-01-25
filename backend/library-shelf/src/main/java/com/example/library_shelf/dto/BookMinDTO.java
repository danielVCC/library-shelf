package com.example.library_shelf.dto;

import com.example.library_shelf.entity.Book;

public class BookMinDTO {
    private final Long id;
    private final String title;
    private final String description;
    private final String authorName;
    private final String categoryName;

    public BookMinDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.description = book.getDescription();
        this.authorName = book.getAuthor() != null ? book.getAuthor().getName() : null;
        this.categoryName = book.getCategory() != null ? book.getCategory().getName() : null;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
