import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Link as MuiLink, // Mui Material-дің Link компонентін басқаша атау
  styled,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import ShareButton from './ShareButton'

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}))

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  '& .post-title': {
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
  },
  '& .post-content': {
    color: theme.palette.text.secondary,
  },
  '& .read-more': {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.grey[100],
}))

const PostCard = ({ post }) => {
  const theme = useTheme()

  return (
    <>
      <StyledCard>
        <StyledCardHeader
          avatar={
            <StyledAvatar aria-label="author">
              {post.user.name.charAt(0).toUpperCase()}
            </StyledAvatar>
          }
          title={post.user.name}
          subheader={new Date(post.created_at).toLocaleDateString()}
        />
        {post.images && post.images.length > 0 && (
          <img
            src={`http://localhost:8000/storage/${post.images[0].path}`}
            alt={post.title}
            style={{
              width: '100%',
              display: 'block',
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        )}
        <StyledCardContent>
          <Typography variant="h6" className="post-title">
            {post.title}
          </Typography>
          <Typography variant="body2" className="post-content" component="p">
            {post.content.substring(0, 100)}...
            <Link to={`/blog/${post.id}`} className="read-more">
              Толығырақ
            </Link>
          </Typography>
        </StyledCardContent>
        <StyledCardActions disableSpacing>
          <LikeButton postId={post.id} initialLiked={post.liked} />
          <ShareButton postId={post.id} />
        </StyledCardActions>
      </StyledCard>
    </>
  )
}

export default PostCard
