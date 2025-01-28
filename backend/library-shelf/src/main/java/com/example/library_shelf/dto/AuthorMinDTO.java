package com.example.library_shelf.dto;

public class AuthorMinDTO {
    private final Long id;
    private final  String name;
    private final String bio;
    private final Long bookCount;

    public AuthorMinDTO(Long id, String name, String bio, Long bookCount) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.bookCount = bookCount;
    }

    public Long getBookCount() {
        return bookCount;
    }

    public String getBio() {
        return bio;
    }

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }
}
