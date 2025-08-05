import React from 'react';
import { Typography, Box } from '@mui/material';

const ChatPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        채팅
      </Typography>
      <Typography variant="body1">
        AI 캐릭터와의 채팅 페이지입니다.
      </Typography>
    </Box>
  );
};

export default ChatPage;
