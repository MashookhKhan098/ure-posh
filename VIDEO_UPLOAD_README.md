# Video Upload Functionality

This document describes the video upload functionality that has been added to the blog system.

## Features Added

### 1. Database Schema Updates
- Added `videoUrl` field to store the path to uploaded video files
- Added `videoTitle` field to store the title of the video
- Added `videoDescription` field to store the description of the video

### 2. API Updates
- **POST /api/posts**: Now handles video file uploads along with image uploads
- **GET /api/posts**: Returns video metadata in post listings
- **GET /api/posts/[slug]**: Returns video metadata for individual posts
- **DELETE /api/posts/[slug]**: Now deletes video files when posts are deleted

### 3. Admin Interface Updates
- **CreatePostForm**: Added video upload section with:
  - Video file upload (drag & drop or click to select)
  - Video title input field
  - Video description textarea
  - File validation (video files only, max 100MB)
  - Video preview with controls
- **PostsList**: Added video indicators to show which posts contain videos

### 4. Frontend Display Updates
- **Individual Post Page**: 
  - Video player with controls
  - Video title and description display
  - Responsive video container
- **Posts Listing Page**: 
  - Video indicators on post cards
  - Video play button overlay on featured images
  - Video badges in post metadata

## File Structure

```
app/
├── api/posts/
│   ├── route.ts (updated for video upload)
│   └── [slug]/route.ts (updated for video handling)
├── admin/components/
│   ├── CreatePostForm.tsx (added video upload)
│   └── PostsList.tsx (added video indicators)
├── posts/
│   ├── page.tsx (added video indicators)
│   └── [slug]/page.tsx (added video player)
└── types/post.ts (updated interfaces)

prisma/
└── schema.prisma (added video fields)

public/
└── uploads/ (stores uploaded videos and images)
```

## Usage

### Creating a Post with Video

1. Go to the admin panel (`/admin`)
2. Click "New Post" to create a new post
3. Fill in the basic post information (title, content, etc.)
4. In the "Video Upload" section:
   - Click or drag a video file (supports common video formats)
   - Add a video title (optional)
   - Add a video description (optional)
5. Click "Publish Post"

### Video File Requirements

- **Supported Formats**: All common video formats (MP4, AVI, MOV, etc.)
- **Maximum Size**: 100MB
- **Storage**: Videos are stored in `/public/uploads/` directory

### Display Features

- **Video Player**: HTML5 video player with controls
- **Responsive Design**: Videos adapt to different screen sizes
- **Poster Image**: Featured image is used as video poster
- **Video Metadata**: Title and description are displayed below the video

## Technical Implementation

### Video Upload Process

1. **File Validation**: Checks file type and size
2. **File Storage**: Saves to `/public/uploads/` with unique filename
3. **Database Storage**: Stores file path and metadata in database
4. **FormData Handling**: Uses FormData for multipart file uploads

### Video Display Process

1. **API Response**: Video metadata included in post data
2. **Frontend Rendering**: Video player rendered conditionally
3. **Responsive Design**: CSS ensures proper video display
4. **Fallback Handling**: Graceful handling when videos are missing

## Security Considerations

- File type validation prevents malicious uploads
- File size limits prevent server overload
- Unique filenames prevent conflicts
- Proper file deletion when posts are removed

## Future Enhancements

Potential improvements that could be added:

1. **Video Processing**: Automatic video compression and format conversion
2. **Thumbnail Generation**: Automatic video thumbnail creation
3. **Video Streaming**: Implement proper video streaming for large files
4. **Video Analytics**: Track video views and engagement
5. **Video Categories**: Organize videos by type or category
6. **Video Search**: Search functionality for video content

## Troubleshooting

### Common Issues

1. **Video Not Playing**: Check if video format is supported by the browser
2. **Upload Fails**: Verify file size is under 100MB and format is valid
3. **Video Not Displaying**: Check if videoUrl field is properly set in database
4. **Performance Issues**: Large video files may affect page load times

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify video file exists in `/public/uploads/` directory
3. Check database for correct videoUrl values
4. Test with different video formats and sizes 