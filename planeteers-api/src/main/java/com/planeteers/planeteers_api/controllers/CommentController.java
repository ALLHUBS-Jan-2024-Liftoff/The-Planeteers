package com.planeteers.planeteers_api.controllers;

import com.planeteers.planeteers_api.dto.CommentDTO;
import com.planeteers.planeteers_api.models.Comment;
import com.planeteers.planeteers_api.models.data.CommentRepository;
import com.planeteers.planeteers_api.service.CommentService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import jdk.jfr.Category;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Controller
@RequestMapping("comments")
public class CommentController {


    @Autowired
    private CommentService commentService;


    @GetMapping("/")
    public List<Comment> index(){
        return commentService.getAllComments();
    }

    @PostMapping("create")
    public ResponseEntity<?> createComment(@RequestBody @Valid CommentDTO commentDTO, Errors errors){
        if (errors.hasErrors()){
            List<String> errorMessages = new ArrayList<>();
            for (ObjectError error : errors.getAllErrors()){
                errorMessages.add(error.getDefaultMessage());
            }
          return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
        }

        try{
            commentService.saveComment(commentDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(commentDTO);

        } catch (Exception e){
          return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while creating the comment.");
        }

    }
    @GetMapping("{id}")
    public ResponseEntity<?> findComment(@PathVariable Integer id ){
        Optional<Comment> optComment = commentService.getCommentById(id);
        if(optComment.isPresent()){
            return  ResponseEntity.ok(optComment.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This comment could not me found");
    }


    @PutMapping("edit/{id}")
    public ResponseEntity<?> editComment(@PathVariable Integer id, @RequestBody @Valid CommentDTO commentDTO){
        Optional<Comment> updatedComment = commentService.updateComment(id, commentDTO);
        if (updatedComment.isPresent()){
           return ResponseEntity.ok(updatedComment.get());
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This comment could not be found");
        }

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok("Comment deleted");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the comment");
        }
    }
}
