import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  People,
  Chat,
  Timeline,
  Add,
  TrendingUp,
  Memory,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: '내 캐릭터',
      value: '12',
      icon: <People />,
      color: '#6366f1',
      change: '+2 이번 주',
    },
    {
      title: '총 대화',
      value: '1,234',
      icon: <Chat />,
      color: '#ec4899',
      change: '+156 오늘',
    },
    {
      title: '활성 세션',
      value: '8',
      icon: <Timeline />,
      color: '#10b981',
      change: '+3 현재',
    },
    {
      title: 'RAG 데이터베이스',
      value: '5',
      icon: <Memory />,
      color: '#f59e0b',
      change: '+1 이번 달',
    },
  ];

  const recentCharacters = [
    {
      id: '1',
      name: '엘리자베스',
      version: 'v2.1.0',
      lastUpdated: '2시간 전',
      status: 'active',
      chats: 45,
      avatar: '/avatars/elizabeth.png',
    },
    {
      id: '2',
      name: '마르코',
      version: 'v1.5.2',
      lastUpdated: '1일 전',
      status: 'draft',
      chats: 23,
      avatar: '/avatars/marco.png',
    },
    {
      id: '3',
      name: '아이리스',
      version: 'v3.0.0-beta',
      lastUpdated: '3일 전',
      status: 'testing',
      chats: 67,
      avatar: '/avatars/iris.png',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'testing':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '활성';
      case 'draft':
        return '초안';
      case 'testing':
        return '테스트';
      default:
        return '알 수 없음';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
          대시보드
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI 캐릭터 개발 및 관리 현황을 확인하세요
        </Typography>
      </Box>

      {/* 통계 카드 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: stat.color + '20',
                    color: stat.color,
                    mr: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  {stat.change}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* 최근 캐릭터 */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" component="h2">
                최근 캐릭터
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/characters/new')}
              >
                새 캐릭터
              </Button>
            </Box>
            
            {recentCharacters.map((character, index) => (
              <Box key={character.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                  <Avatar
                    src={character.avatar}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  >
                    {character.name[0]}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6">{character.name}</Typography>
                      <Chip
                        label={character.version}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={getStatusText(character.status)}
                        size="small"
                        color={getStatusColor(character.status) as 'success' | 'warning' | 'info' | 'default'}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {character.chats}회 대화 • {character.lastUpdated}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/characters/${character.id}/versions`)}
                    >
                      버전 관리
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/characters/${character.id}/chat`)}
                    >
                      채팅
                    </Button>
                  </Box>
                </Box>
                {index < recentCharacters.length - 1 && <Divider />}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* 퀵 액션과 시스템 상태 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                퀵 액션
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  fullWidth
                  onClick={() => navigate('/characters/new')}
                >
                  새 캐릭터 만들기
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Memory />}
                  fullWidth
                  onClick={() => navigate('/rag')}
                >
                  RAG 데이터베이스 설정
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Chat />}
                  fullWidth
                  onClick={() => navigate('/chat')}
                >
                  새 채팅 시작
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* 시스템 상태 */}
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                시스템 상태
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">저장소 사용량</Typography>
                  <Typography variant="body2">68%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={68} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">API 사용량</Typography>
                  <Typography variant="body2">45%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">모델 활성도</Typography>
                  <Typography variant="body2">92%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={92} color="success" />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
