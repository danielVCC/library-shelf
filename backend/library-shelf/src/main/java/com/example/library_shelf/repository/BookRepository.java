package com.example.library_shelf.repository;

import com.example.library_shelf.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Custom queries
    List<Book> findByAuthorId(Long authorId);
}

