package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.dto.CommentDTO;
import com.planeteers.planeteers_api.models.Comment;
import com.planeteers.planeteers_api.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public interface CommentService {

    Comment saveComment(CommentDTO commentDTO);

    public List<Comment> getAllComments();

    Optional<Comment> getCommentById(int id);

    Optional<Comment> updateComment(int id, CommentDTO commentDTO);

    public void deleteComment(int id);
}
