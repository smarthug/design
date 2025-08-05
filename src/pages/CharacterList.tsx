import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Edit,
  Delete,
  Timeline,
  Chat,
  Public,
  Lock,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Character } from '../types';

const CharacterList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  // 임시 데이터
  const characters: Character[] = [
    {
      id: '1',
      name: '엘리자베스',
      description: '빅토리아 시대 귀족 여성. 우아하고 지적이며 예의 바른 성격.',
      avatar: '/avatars/elizabeth.png',
      personality: '우아하고 지적인 빅토리아 시대 귀족',
      systemPrompt: '당신은 엘리자베스입니다...',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      tags: ['귀족', '빅토리아', '우아함'],
      isPublic: true,
      authorId: 'user1',
      currentVersion: 'v2.1.0',
      versions: [],
    },
    {
      id: '2',
      name: '마르코',
      description: '이탈리아 요리사. 열정적이고 친근한 성격으로 요리에 대한 깊은 지식을 가지고 있음.',
      avatar: '/avatars/marco.png',
      personality: '열정적인 이탈리아 요리사',
      systemPrompt: '당신은 마르코입니다...',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      tags: ['요리사', '이탈리아', '열정적'],
      isPublic: false,
      authorId: 'user1',
      currentVersion: 'v1.5.2',
      versions: [],
    },
    {
      id: '3',
      name: '아이리스',
      description: '미래의 AI 연구원. 과학기술에 대한 해박한 지식과 호기심 많은 성격.',
      avatar: '/avatars/iris.png',
      personality: '호기심 많은 AI 연구원',
      systemPrompt: '당신은 아이리스입니다...',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-22'),
      tags: ['AI', '과학', '미래'],
      isPublic: true,
      authorId: 'user1',
      currentVersion: 'v3.0.0-beta',
      versions: [],
    },
  ];

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, characterId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedCharacter(characterId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCharacter(null);
  };

  const handleEdit = (characterId: string) => {
    navigate(`/characters/${characterId}/edit`);
    handleMenuClose();
  };

  const handleVersions = (characterId: string) => {
    navigate(`/characters/${characterId}/versions`);
    handleMenuClose();
  };

  const handleChat = (characterId: string) => {
    navigate(`/characters/${characterId}/chat`);
    handleMenuClose();
  };

  const handleDelete = (characterId: string) => {
    // 삭제 로직 구현
    console.log('Delete character:', characterId);
    handleMenuClose();
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
          내 캐릭터
        </Typography>
        <Typography variant="body1" color="text.secondary">
          생성하고 관리 중인 AI 캐릭터들을 확인하세요
        </Typography>
      </Box>

      {/* 검색 및 필터 */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="캐릭터, 설명, 태그로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ minWidth: 'auto', whiteSpace: 'nowrap' }}
        >
          필터
        </Button>
      </Box>

      {/* 캐릭터 그리드 */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: 3,
        mb: 4 
      }}>
        {filteredCharacters.map((character) => (
          <Card key={character.id} sx={{ height: 'fit-content' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Avatar
                  src={character.avatar}
                  sx={{ width: 56, height: 56, mr: 2 }}
                >
                  {character.name[0]}
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="h6" noWrap>
                      {character.name}
                    </Typography>
                    {character.isPublic ? (
                      <Public sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <Lock sx={{ fontSize: 16, color: 'text.secondary' }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip
                      label={character.currentVersion}
                      size="small"
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {character.updatedAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, character.id)}
                >
                  <MoreVert />
                </IconButton>
              </Box>

              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {character.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {character.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="filled"
                    sx={{ bgcolor: 'primary.main', color: 'white', opacity: 0.8 }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEdit(character.id)}
                >
                  편집
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Timeline />}
                  onClick={() => handleVersions(character.id)}
                >
                  버전
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Chat />}
                  onClick={() => handleChat(character.id)}
                >
                  채팅
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 캐릭터가 없을 때 */}
      {filteredCharacters.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm ? '검색 결과가 없습니다' : '아직 생성된 캐릭터가 없습니다'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm 
              ? '다른 검색어로 시도해보세요' 
              : '첫 번째 AI 캐릭터를 만들어보세요'
            }
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/characters/new')}
          >
            새 캐릭터 만들기
          </Button>
        </Box>
      )}

      {/* 플로팅 액션 버튼 */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => navigate('/characters/new')}
      >
        <Add />
      </Fab>

      {/* 컨텍스트 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedCharacter && handleEdit(selectedCharacter)}>
          <Edit sx={{ mr: 1 }} /> 편집
        </MenuItem>
        <MenuItem onClick={() => selectedCharacter && handleVersions(selectedCharacter)}>
          <Timeline sx={{ mr: 1 }} /> 버전 관리
        </MenuItem>
        <MenuItem onClick={() => selectedCharacter && handleChat(selectedCharacter)}>
          <Chat sx={{ mr: 1 }} /> 채팅 시작
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => selectedCharacter && handleDelete(selectedCharacter)}
          sx={{ color: 'error.main' }}
        >
          <Delete sx={{ mr: 1 }} /> 삭제
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CharacterList;
