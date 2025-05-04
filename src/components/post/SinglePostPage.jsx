import React, { useState, useEffect } from 'react'
import { Container, Typography, Box, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ShareIcon from '@mui/icons-material/Share'
import { useParams } from 'react-router-dom'

const SinglePostPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock деректер (API-ден алынғандай етіп)
  useEffect(() => {
    setTimeout(() => {
      const mockPosts = [
        {
          id: '1',
          author: 'Айбек',
          date: '2025-05-04',
          title: 'Алматының керемет табиғаты',
          content:
            'Бүгін мен Іле Алатауының баурайында серуендедім. Ауасы таза, көрінісі ғажап! Күннің ыстығына қарамастан, таудың салқын самалы бетімді сипап өтті. Жолда кездескен гүлдер мен шөптердің хош иісі айналаны кернеп тұр. Фотоаппаратыма талай керемет сурет түсірдім. Кешке қарай қалаға қайтып, таудың әсем көрінісін есімнен шығара алмай жүрмін.',
          image: 'https://source.unsplash.com/random/1200x600?nature',
        },
        {
          id: '2',
          author: 'Салтанат',
          date: '2025-05-03',
          title: 'Бурабайға саяхат',
          content:
            'Бурабай - Қазақстанның інжу-маржаны. Көлдерінің мөлдірлігі, қарағайлы ормандарының жасылдығы көз тартады. "Жұмбақтас" пен "Оқжетпес" жартастарының аңыздары қандай қызық! Атпен серуендеу, қайықпен жүзу - бәрі де ұмытылмас әсер қалдырды.',
          image: 'https://source.unsplash.com/random/1200x600?lake',
        },
        {
          id: '3',
          author: 'Ерлан',
          date: '2025-05-02',
          title: 'Маңғыстаудың ғажайыптары',
          content:
            'Маңғыстаудың ландшафты ерекше әсер қалдырды. Ұлан-байтақ дала, әртүрлі түсті жартастар, Каспий теңізінің шексіздігі... Бұл жердегі әрбір тас пен құмның өзіндік тарихы бар сияқты. Бекет-Ата мешітіне бару - рухани байыған сәт болды.',
          image: 'https://source.unsplash.com/random/1200x600?desert',
        },
      ]
      const foundPost = mockPosts.find((p) => p.id === postId)
      setPost(foundPost)
      setLoading(false)
    }, 1000)
  }, [postId])

  if (loading) {
    return <Typography variant="h6">Жазба жүктелуде...</Typography>
  }

  if (error) {
    return <Typography color="error">Қате: {error}</Typography>
  }

  if (!post) {
    return <Typography variant="h6">Жазба табылмады.</Typography>
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Автор: {post.author} | Жарияланған күні: {post.date}
      </Typography>
      {post.image && (
        <Box sx={{ mb: 3 }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', display: 'block', borderRadius: 8 }}
          />
        </Box>
      )}
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Typography sx={{ ml: 1 }}>0</Typography> {/* Лайктар санын көрсету */}
        <IconButton aria-label="save" sx={{ ml: 2 }}>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton aria-label="share" sx={{ ml: 2 }}>
          <ShareIcon />
        </IconButton>
      </Box>
    </Container>
  )
}

export default SinglePostPage
