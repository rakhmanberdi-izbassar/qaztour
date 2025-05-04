import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const LikeButton = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false) // Нақты күйді API-ден алу керек
  const [likeCount, setLikeCount] = useState(0) // Нақты санды API-ден алу керек

  const handleLike = () => {
    // API-ге лайк басу/жою туралы сұрау жіберу логикасы
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    console.log(`Post ${postId} liked: ${!isLiked}`)
  }

  return (
    <>
      <IconButton aria-label="like" onClick={handleLike}>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography sx={{ ml: 1 }}>{likeCount}</Typography>
    </>
  )
}

export default LikeButton
