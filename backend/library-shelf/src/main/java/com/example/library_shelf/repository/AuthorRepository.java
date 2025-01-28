package com.example.library_shelf.repository;

import com.example.library_shelf.dto.AuthorMinDTO;
import com.example.library_shelf.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    // Custom queries
    @Query("SELECT new com.example.library_shelf.dto.AuthorMinDTO(a.id, a.name, a.bio, COUNT(b)) " +
            "FROM Author a LEFT JOIN a.books b GROUP BY a.id, a.name, a.bio")
    List<AuthorMinDTO> findAllAuthorsWithBookCount();

}

