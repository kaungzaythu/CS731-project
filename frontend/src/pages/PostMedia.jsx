import React, { useState } from 'react';
import "../style.css";
import Grid from '@mui/material/Grid';

function PostMedia(){
  const [postText, setPostText] = useState('');
  const [postMedia, setPostMedia] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePostMediaChange = (event) => {
    const file = event.target.files[0];
    setPostMedia(file);
  };

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: Date.now(),
      text: postText,
      media: postMedia,
      comments: [],
    };

    setPostText('');
    setPostMedia(null);
    setComments([...comments, newPost]);
  };

  const handleCommentSubmit = (event, postId) => {
    event.preventDefault();

    const newComment = {
      id: Date.now(),
      postId: postId,
      text: commentText,
    };

    const updatedComments = comments.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
        };
      }
      return post;
    });

    setComments(updatedComments);
    setCommentText('');
  };

  return (
    <div class="post-media">
      <h1>Post Page</h1>

      <form onSubmit={handlePostSubmit}>
        <textarea
          value={postText}
          onChange={handlePostTextChange}
          placeholder="Write your post..."
        />
        <input type="file" accept="image/*" onChange={handlePostMediaChange} />
        <button type="submit">Post</button>
      </form>

      <h2>Posts</h2>
      {comments.map((post) => (
        <div key={post.id}>
          <p>{post.text}</p>
          {post.media && <img src={URL.createObjectURL(post.media)} alt="Post Media" />}
          <form onSubmit={(event) => handleCommentSubmit(event, post.id)}>
            <input
              type="text"
              value={commentText}
              onChange={handleCommentTextChange}
              placeholder="Add a comment..."
            />
            <button type="submit">Comment</button>
          </form>
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    
  );
};

export default PostMedia;
