import React, { useState, useEffect } from 'react'
import { IconButton, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import api from '../../utils/axios' // Axios инстансын импорттаңыз

const LikeButton = ({ postId, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(null) // Бастапқыда null

  useEffect(() => {
    // Бастапқы лайктар санын алу (компонент орнатылғанда)
    const fetchInitialLikeCount = async () => {
      try {
        const response = await api.get(`/posts/${postId}`)
        setLikeCount(response.data[0].likes.length) // API жауабындағы лайктар массивінің ұзындығын аламыз
      } catch (error) {
        console.error('Бастапқы лайктар санын алу кезінде қате кетті:', error)
        setLikeCount(0) // Қателік болса, 0 деп қабылдаймыз
      }
    }

    fetchInitialLikeCount()
  }, [postId])

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('authToken') // Токенді алу әдісіңізге байланысты
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      let response
      if (liked) {
        response = await api.delete(`/posts/${postId}/like`, { headers })
        setLiked(false)
        if (likeCount !== null) {
          setLikeCount(likeCount - 1)
        }
      } else {
        response = await api.post(`/posts/${postId}/like`, {}, { headers })
        setLiked(true)
        if (likeCount !== null) {
          setLikeCount(likeCount + 1)
        }
      } // Бекендтен жаңартылған лайктар санын алу (егер API қайтарса)

      if (
        response &&
        response.data &&
        response.data.likes_count !== undefined
      ) {
        setLikeCount(response.data.likes_count)
      }
    } catch (error) {
      console.error('Лайк басу кезінде қате кетті:', error)
    }
  }

  if (likeCount === null) {
    return (
      <>
               {' '}
        <IconButton aria-label="like" disabled>
                    <FavoriteBorderIcon />       {' '}
        </IconButton>
                <Typography sx={{ ml: 1 }}>...</Typography>     {' '}
      </>
    )
  }

  return (
    <>
           {' '}
      <IconButton aria-label="like" onClick={handleLike}>
               {' '}
        {liked ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}     {' '}
      </IconButton>
            <Typography sx={{ ml: 1 }}>{likeCount}</Typography>   {' '}
    </>
  )
}

export default LikeButton
