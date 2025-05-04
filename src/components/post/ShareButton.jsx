import React from 'react'
import { IconButton } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'

const ShareButton = ({ shareUrl, title, text }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url: shareUrl,
          title: title,
          text: text,
        })
        console.log('Shared successfully')
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      alert(
        `Бөлісу мүмкіндігі сіздің браузеріңізде қол жетімді емес. Сілтемені көшіріп алыңыз: ${shareUrl}`
      )
    }
  }

  return (
    <IconButton aria-label="share" onClick={handleShare}>
      <ShareIcon />
    </IconButton>
  )
}

export default ShareButton
