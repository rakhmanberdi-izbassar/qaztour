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
        avatar={<Avatar aria-label="recipe">{post.author.charAt(0)}</Avatar>}
        title={post.author}
        subheader={post.date}
      />
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{ width: '100%', display: 'block' }}
        />
      )}
      <CardContent>
        <Typography variant="h6" color="textSecondary">
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
