package com.planeteers.planeteers_api.service;

import com.planeteers.planeteers_api.dto.CommentDTO;
import com.planeteers.planeteers_api.models.Comment;
import com.planeteers.planeteers_api.models.User;
import com.planeteers.planeteers_api.models.data.CommentRepository;
import com.planeteers.planeteers_api.models.data.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Comment saveComment(CommentDTO commentDTO){
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + commentDTO.getUserId()));
        Comment comment = new Comment(commentDTO.getDescription(),user);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public Optional<Comment> getCommentById(int id) {
        return commentRepository.findById(id);
    }

    @Override
    public Optional<Comment> updateComment(int id, CommentDTO commentDTO){
        Optional<Comment> optComment = commentRepository.findById(id);
        if (!optComment.isPresent()) {
            return Optional.empty();
        }

        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Comment currentComment = optComment.get();
        currentComment.setDescription(commentDTO.getDescription());
        currentComment.setUser(user);
        try {
          Comment updatedComment =  commentRepository.save(currentComment);
            return Optional.of(updatedComment);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public void deleteComment(int id){
       Optional<Comment> deleteThisComment = commentRepository.findById(id);
       if (deleteThisComment.isPresent()){
           commentRepository.delete(deleteThisComment.get());
       }else {
           throw new EntityNotFoundException("Comment not found");
       }
    }
}
