package com.example.library_shelf.dto;

import com.example.library_shelf.entity.Category;

public class CategoryMinDTO {

    private Long id;
    private String name;


    public CategoryMinDTO(Category entity) {
        this.id = entity.getId();
        this.name = entity.getName();
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
}
