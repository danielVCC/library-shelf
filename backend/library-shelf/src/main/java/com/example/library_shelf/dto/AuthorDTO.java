package com.example.library_shelf.dto;

import com.example.library_shelf.entity.Author;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;


public class AuthorDTO {

    private Long id;
    private String name;
    private String bio;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AuthorDTO() {
    }

    public AuthorDTO(Author entity) {
        BeanUtils.copyProperties(entity, this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
