# Post Module Backend-Frontend Integration

This document explains the complete integration of the post module between the backend and frontend of the DevGluck application.

## Overview

The post module allows users to:
- Create new posts with text content and media
- View all posts in a feed
- Like/unlike posts
- Add comments to posts
- Delete their own posts
- View user-specific posts

## Backend Implementation

### 1. Models

#### Post Model (`backend/src/models/postModel.mjs`)
```javascript
{
  author: ObjectId (ref: User),
  content: String (max 1000 chars),
  media: String (image/video URL),
  likes: Number (default: 0),
  comments: Number (default: 0),
  isDeleted: Boolean (default: false),
  timestamps: true
}
```

#### Comment Model (`backend/src/models/commentModel.mjs`)
```javascript
{
  postId: ObjectId (ref: Post),
  userId: ObjectId (ref: User),
  text: String (max 500 chars),
  isDeleted: Boolean (default: false),
  timestamps: true
}
```

### 2. Controllers (`backend/src/controllers/postController.mjs`)

#### Available Functions:
- `addNewPost`: Create a new post
- `getAllPosts`: Get all posts (with author info)
- `getUserPosts`: Get posts by specific user
- `likePost`: Like/unlike a post
- `addComment`: Add comment to a post
- `getCommentsOfPost`: Get all comments for a post
- `deletePost`: Soft delete a post

### 3. Routes (`backend/src/routes/postRoute.mjs`)

#### API Endpoints:
- `POST /api/posts/addpost` - Create new post
- `GET /api/posts/all` - Get all posts
- `GET /api/posts/userpost/:userId?` - Get user posts
- `POST /api/posts/:postId/like` - Like/unlike post
- `POST /api/posts/:postId/comment` - Add comment
- `GET /api/posts/:postId/comment/all` - Get comments
- `DELETE /api/posts/delete/:postId` - Delete post

## Frontend Implementation

### 1. API Service (`frontend/src/api/postApi.js`)

Centralized API service for all post-related operations with error handling.

### 2. Redux State Management (`frontend/src/slices/PostSlice.js`)

#### State Structure:
```javascript
{
  posts: [], // All posts
  userPosts: [], // User-specific posts
  comments: {}, // Comments by post ID
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  likeLoading: {}, // Loading state per post
  commentLoading: {} // Loading state per post
}
```

#### Async Thunks:
- `fetchAllPosts`: Get all posts
- `fetchUserPosts`: Get user posts
- `createPost`: Create new post
- `likePost`: Like/unlike post
- `addComment`: Add comment
- `fetchComments`: Get comments
- `deletePost`: Delete post

### 3. Components

#### PostInput (`frontend/src/components/feed/PostInput.jsx`)
- Form for creating new posts
- Text input with character limit (1000 chars)
- Image upload with preview
- Real-time character count
- Loading states and error handling

#### Post (`frontend/src/components/feed/Post.jsx`)
- Display individual post
- Like/unlike functionality
- Comment system
- Delete option (for post author)
- Responsive design
- Click outside handlers

#### Feed (`frontend/src/components/feed/Feed.jsx`)
- Main feed component
- Fetches and displays all posts
- Loading and error states
- Empty state handling

#### UserPosts (`frontend/src/components/feed/UserPosts.jsx`)
- Display posts for specific user
- Used in profile pages

## Features

### 1. Post Creation
- Text content with 1000 character limit
- Image upload support
- Real-time preview
- Form validation
- Loading states

### 2. Post Display
- Author information with avatar
- Formatted timestamps
- Media display
- Like count and status
- Comment count

### 3. Interactions
- Like/unlike with optimistic updates
- Comment system with real-time updates
- Delete functionality (author only)
- Loading states for all interactions

### 4. User Experience
- Responsive design
- Loading spinners
- Error handling
- Empty states
- Click outside handlers
- Character limits with visual feedback

## Security Features

1. **Authentication Required**: All post operations require authentication
2. **Authorization**: Users can only delete their own posts
3. **Input Validation**: Content length limits enforced
4. **Soft Delete**: Posts are soft deleted (not permanently removed)

## Error Handling

### Backend
- Proper HTTP status codes
- Descriptive error messages
- Try-catch blocks for all operations

### Frontend
- Redux error states
- User-friendly error messages
- Loading states to prevent multiple requests
- Graceful fallbacks

## Performance Optimizations

1. **Pagination Ready**: Backend supports pagination (can be implemented)
2. **Optimistic Updates**: Like/unlike updates immediately in UI
3. **Conditional Loading**: Comments only loaded when needed
4. **Efficient State Management**: Minimal re-renders with Redux

## Usage Examples

### Creating a Post
```javascript
const postData = {
  content: "Hello world!",
  media: "https://example.com/image.jpg"
};
await dispatch(createPost(postData));
```

### Liking a Post
```javascript
await dispatch(likePost(postId));
```

### Adding a Comment
```javascript
await dispatch(addComment({ postId, commentText: "Great post!" }));
```

## Future Enhancements

1. **Pagination**: Implement infinite scroll
2. **Real-time Updates**: WebSocket integration for live updates
3. **Media Upload**: Cloud storage integration
4. **Post Sharing**: Share posts functionality
5. **Post Categories**: Add tags/categories
6. **Advanced Search**: Search posts by content
7. **Post Analytics**: View counts, engagement metrics

## Testing

### Backend Testing
- Test all API endpoints
- Verify authentication/authorization
- Test error scenarios
- Validate data constraints

### Frontend Testing
- Test all user interactions
- Verify loading states
- Test error handling
- Test responsive design

## Deployment Considerations

1. **Environment Variables**: Configure API URLs
2. **CORS**: Ensure proper CORS configuration
3. **File Upload**: Configure media storage
4. **Database**: Ensure proper indexing for performance
5. **Caching**: Consider Redis for caching

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Issues**: Verify token handling
3. **Image Upload**: Check file size limits and storage
4. **Performance**: Monitor database queries and add indexes

### Debug Tips:
1. Check browser network tab for API calls
2. Verify Redux state in DevTools
3. Check backend logs for errors
4. Validate API responses

This integration provides a complete, production-ready post system with proper error handling, security, and user experience considerations. 