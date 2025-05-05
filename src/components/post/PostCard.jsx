import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="author">{post.user.name.charAt(0)}</Avatar>}
        title={post.user.name}
        subheader={new Date(post.created_at).toLocaleDateString()}
      />
      {post.images && post.images.length > 0 && (
        <img
          src={`http://localhost:8000/storage/${post.images[0].path}`}
          alt={post.title}
          style={{ width: '100%', display: 'block' }}
        />
      )}
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content.substring(0, 100)}...{' '}
          <Link to={`/blog/${post.id}`}>Толығырақ</Link>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="save">
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard
