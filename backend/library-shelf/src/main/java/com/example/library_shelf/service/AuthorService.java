package com.example.library_shelf.service;

import com.example.library_shelf.dto.AuthorDTO;
import com.example.library_shelf.dto.AuthorMinDTO;
import com.example.library_shelf.dto.AuthorUpdateDTO;
import com.example.library_shelf.entity.Author;
import com.example.library_shelf.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    @Transactional(readOnly = true)
    public List<AuthorMinDTO> getAllAuthors() {
        return authorRepository.findAllAuthorsWithBookCount();
    }

    // service use method
    @Transactional(readOnly = true)
    public Optional<Author> getAuthorById(Long id) {
        return authorRepository.findById(id);
    }

    // controller use method
    @Transactional(readOnly = true)
    public Optional<AuthorDTO> getAuthorByIdAsDTO(Long id) {
        return authorRepository.findById(id)
                .map(AuthorDTO::new);
    }

    @Transactional
    public AuthorDTO createAuthor(AuthorDTO authorDTO) {
        Author newAuthor = new Author();
        newAuthor.setName(authorDTO.getName());
        newAuthor.setBio(authorDTO.getBio());
        return new AuthorDTO(authorRepository.save(newAuthor));
    }

    @Transactional
    public AuthorDTO updateAuthor(Long id, AuthorUpdateDTO updatedAuthor) {
        Author existingAuthor = authorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));

        // update fields
        existingAuthor.setName(updatedAuthor.getName());
        existingAuthor.setBio(updatedAuthor.getBio());

        return new AuthorDTO(authorRepository.save(existingAuthor));
    }

    @Transactional
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }
}

