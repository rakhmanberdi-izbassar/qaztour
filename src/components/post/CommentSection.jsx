import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material'

const API_BASE = 'http://127.0.0.1:8000/api/comments'

const CommentSection = ({ postId, currentUserId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_BASE}?post_id=${postId}`)
      setComments(res.data)
    } catch (error) {
      console.error('Пікірлерді жүктеу қатесі:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const authToken = localStorage.getItem('authToken')
    const token = authToken ? JSON.parse(authToken).token : null
    console.log('authToken:', authToken)

    if (!token) {
      console.error('Токен табылмады. Қайта кіріңіз.')
      return
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/comments',
        {
          newComment,

          post_id: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      console.log('Пікір жіберілді:', response.data)
      setNewComment('')

      // Егер success болған жағдайда пікірлерді жаңарту қажет болса, оны осында қосуға болады
    } catch (error) {
      console.error('Пікір жіберу қатесі:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`)
      setComments(comments.filter((comment) => comment.id !== id))
    } catch (error) {
      console.error('Пікірді жою қатесі:', error)
    }
  }

  return (
    <Box mt={4}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Пікір жазыңыз..."
          multiline
          fullWidth
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Жіберу
        </Button>
      </form>

      <Box mt={4}>
        {comments.map((comment) => (
          <Card key={comment.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {comment.user?.name || 'Аноним'}
                  </Typography>
                  <Typography variant="body2">{comment.content}</Typography>
                </Box>
                {comment.user_id === currentUserId && (
                  <Button
                    color="error"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Жою
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default CommentSection
