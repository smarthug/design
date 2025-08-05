import React from 'react';
import { Typography, Box } from '@mui/material';

const CharacterEditor: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        캐릭터 에디터
      </Typography>
      <Typography variant="body1">
        캐릭터 에디터 페이지입니다.
      </Typography>
    </Box>
  );
};

export default CharacterEditor;
