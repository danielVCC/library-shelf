package com.example.library_shelf.dto;

import com.example.library_shelf.entity.Author;

public class AuthorUpdateDTO {
    private String name;
    private String bio;

    public AuthorUpdateDTO() {}

    public AuthorUpdateDTO(Author entity) {
        this.name = entity.getName();
        this.bio = entity.getBio();
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
