import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  styled,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next'; // ✅ useTranslation импорттау

// --- Styled Components (бұрынғыдай қалады) ---
const FABWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  zIndex: 1500,
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ChatDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[10],
    width: '100%',
    maxWidth: '500px',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      width: 'calc(100% - 16px)',
      height: 'calc(100vh - 16px)',
      maxHeight: 'none',
    },
  },
}));

const ChatWindow = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  overflowY: 'auto',
  backgroundColor: theme.palette.grey[50],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  maxHeight: '400px',
}));

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  maxWidth: '85%',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  backgroundColor:
      sender === 'user' ? theme.palette.primary.light : theme.palette.grey[200],
  color:
      sender === 'user'
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
  boxShadow: theme.shadows[1],
  wordBreak: 'break-word',
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AIAdvisor = () => {
  const [open, setOpen] = useState(false);
  // ✅ Тек UI-ді көрсету үшін Mock хабарламалар (Өзгеріссіз қалады)
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Сәлеметсіз бе! Мен сіздің Қазақстан бойынша саяхат кеңесшіңізбін. Қалай көмектесе аламын?',
    },
    { sender: 'user', text: 'Алматыда қай жерлерге баруға болады?' },
    {
      sender: 'ai',
      text: 'Алматыда Көктөбеге, Медеуге, Шарын каньонына, Қайыңды көліне, Үлкен Алматы көліне баруға болады. Қала ішіндегі Орталық мешітке, Панфиловшылар саябағына, Арбатқа да баруыңызға болады.',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation(); // ✅ t (translate) функциясын алу

  const chatWindowRef = useRef(null);
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendMessage = () => {
    if (!inputPrompt.trim()) return;

    const newUserMessage = { sender: 'user', text: inputPrompt };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputPrompt('');

    setLoadingResponse(true);
    setTimeout(() => {
      // Mock AI жауабы (өзгеріссіз қалады)
      const mockAIResponse = {
        sender: 'ai',
        text: `Сіздің сұрағыңыз: "${newUserMessage.text}". Мен әлі толық жауап бере алмаймын, бірақ сізді тыңдап тұрмын!`,
      };
      setMessages((prevMessages) => [...prevMessages, mockAIResponse]);
      setLoadingResponse(false);
      setError(null);
    }, 1500);
  };

  return (
      <>
        {/* Қалқымалы батырма */}
        <FABWrapper>
          <IconButton
              color="primary"
              size="large"
              onClick={handleOpen}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
                boxShadow: theme.shadows[5],
              }}
          >
            <SmartToyIcon fontSize="large" />
          </IconButton>
        </FABWrapper>

        {/* Чат терезесі (Модальды диалог) */}
        <ChatDialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="ai-advisor-dialog-title"
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {t('ai_advisor.title')}
            </Typography>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            <ChatWindow ref={chatWindowRef}>
              {messages.length === 0 ? (
                  <Typography
                      variant="body1"
                      color="text.secondary"
                      textAlign="center"
                  >
                    {t('ai_advisor.initial_prompt')}
                  </Typography>
              ) : (
                  messages.map((msg, index) => (
                      <MessageBubble key={index} sender={msg.sender}>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <Avatar
                              sx={{
                                width: 24,
                                height: 24,
                                mr: 1,
                                bgcolor:
                                    msg.sender === 'user'
                                        ? theme.palette.secondary.main
                                        : theme.palette.primary.main,
                              }}
                          >
                            {msg.sender === 'user' ? (
                                <PersonIcon fontSize="small" />
                            ) : (
                                <SmartToyIcon fontSize="small" />
                            )}
                          </Avatar>
                          <Typography variant="caption" fontWeight="bold">
                            {msg.sender === 'user' ? t('ai_advisor.you_label') : t('ai_advisor.advisor_label')}
                          </Typography>
                        </Box>
                        <Typography variant="body2">{msg.text}</Typography>
                      </MessageBubble>
                  ))
              )}
              {loadingResponse && (
                  <Box alignSelf="center">
                    <CircularProgress size={20} />
                    <Typography variant="caption" color="text.secondary" ml={1}>
                      {t('ai_advisor.loading_response')}
                    </Typography>
                  </Box>
              )}
              {error && (
                  <Typography color="error" variant="body2" textAlign="center">
                    {t('common.error')}: {error}
                  </Typography>
              )}
            </ChatWindow>
          </DialogContent>
          <DialogActions
              sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
          >
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t('ai_advisor.input_placeholder')}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={loadingResponse}
            />
            <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={loadingResponse || !inputPrompt.trim()}
                sx={{ ml: 1, p: 1.5 }}
            >
              <SendIcon />
            </IconButton>
          </DialogActions>
        </ChatDialog>
      </>
  );
};

export default AIAdvisor;