package com.example.library_shelf.service;

import com.example.library_shelf.dto.CategoryDTO;
import com.example.library_shelf.dto.CategoryMinDTO;
import com.example.library_shelf.dto.CategoryUpdateDTO;
import com.example.library_shelf.entity.Category;
import com.example.library_shelf.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryMinDTO> getAllCategories() {

        return categoryRepository.findAll().stream()
                .map(CategoryMinDTO::new)
                .toList();
    }

    // controller use
    public Optional<CategoryDTO> getCategoryByIdAsDTO(Long id) {
        return categoryRepository.findById(id)
                .map(CategoryDTO::new);
    }

    // service use
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    public CategoryDTO updateCategory(Long id, CategoryUpdateDTO updatedCategory) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        existingCategory.setName(updatedCategory.getName());
        return new CategoryDTO(categoryRepository.save(existingCategory));
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category newCategory = new Category();
        newCategory.setName(categoryDTO.getName());
        return new CategoryDTO(categoryRepository.save(newCategory));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}

