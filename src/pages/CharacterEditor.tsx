import React, { useState, useRef } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Autocomplete,
} from '@mui/material';
import {
  Save,
  Cancel,
  Preview,
  Timeline,
  Edit,
  CloudUpload,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import type { Character, CharacterVersion } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`editor-tabpanel-${index}`}
      aria-labelledby={`editor-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const CharacterEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openCommitDialog, setOpenCommitDialog] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const gitgraphRef = useRef<HTMLDivElement>(null);

  // 캐릭터 데이터 상태
  const [character, setCharacter] = useState<Partial<Character>>({
    id: id || 'new',
    name: '엘리자베스',
    description: '빅토리아 시대 귀족 여성. 우아하고 지적이며 예의 바른 성격을 가지고 있습니다.',
    personality: '우아하고 지적인 성격으로, 항상 정중하고 예의 바른 말투를 사용합니다. 문학과 예술에 대한 깊은 조예가 있으며, 상대방을 존중하는 태도를 보입니다.',
    systemPrompt: `당신은 엘리자베스라는 이름의 빅토리아 시대 귀족 여성입니다.

특징:
- 우아하고 지적인 성격
- 항상 정중하고 예의 바른 말투 사용
- 문학과 예술에 대한 깊은 조예
- 상대방을 존중하는 태도

대화 스타일:
- "안녕하세요" 대신 "안녕하십니까" 등 정중한 표현 사용
- 고풍스럽고 우아한 어투
- 상대방의 의견을 존중하며 경청하는 자세
- 적절한 문학적 표현이나 인용구 사용

금지사항:
- 무례하거나 비속한 표현 사용 금지
- 현대적이고 캐주얼한 말투 사용 금지
- 상대방을 무시하거나 비하하는 태도 금지`,
    tags: ['귀족', '빅토리아', '우아함', '지적'],
    isPublic: false,
    currentVersion: 'v2.1.0',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  });

  // 임시 버전 히스토리 데이터
  const versions: CharacterVersion[] = [
    {
      id: '1',
      version: 'v2.1.0',
      characterId: id || '1',
      name: '엘리자베스',
      description: '빅토리아 시대 귀족 여성',
      personality: '우아하고 지적인 성격',
      systemPrompt: '당신은 엘리자베스입니다...',
      createdAt: new Date('2024-01-20'),
      commitMessage: '성격 설명 개선 및 대화 스타일 조정',
      branch: 'main',
      author: 'user1',
      isDraft: false,
    },
    {
      id: '2',
      version: 'v2.0.1',
      characterId: id || '1',
      name: '엘리자베스',
      description: '빅토리아 시대 귀족 여성',
      personality: '우아하고 지적인 성격',
      systemPrompt: '당신은 엘리자베스입니다...',
      createdAt: new Date('2024-01-18'),
      commitMessage: '버그 수정: 응답 톤 일관성 개선',
      branch: 'main',
      author: 'user1',
      isDraft: false,
    },
    {
      id: '3',
      version: 'v2.0.0',
      characterId: id || '1',
      name: '엘리자베스',
      description: '빅토리아 시대 귀족 여성',
      personality: '우아하고 지적인 성격',
      systemPrompt: '당신은 엘리자베스입니다...',
      createdAt: new Date('2024-01-15'),
      commitMessage: '메이저 업데이트: RAG 통합 및 지식 베이스 확장',
      branch: 'main',
      author: 'user1',
      isDraft: false,
    },
    {
      id: '4',
      version: 'v1.5.0',
      characterId: id || '1',
      name: '엘리자베스',
      description: '빅토리아 시대 귀족 여성',
      personality: '우아하고 지적인 성격',
      systemPrompt: '당신은 엘리자베스입니다...',
      createdAt: new Date('2024-01-10'),
      commitMessage: '초기 캐릭터 설정 완료',
      branch: 'main',
      author: 'user1',
      isDraft: false,
    },
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field: keyof Character, value: string | boolean | string[]) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagsChange = (_: React.SyntheticEvent, newValue: string[]) => {
    handleInputChange('tags', newValue);
  };

  const handleSave = () => {
    setOpenCommitDialog(true);
  };

  const handleCommit = () => {
    // 커밋 로직 구현
    console.log('Creating new commit:', commitMessage);
    console.log('Character data:', character);
    setOpenCommitDialog(false);
    setCommitMessage('');
    // 성공 후 버전 페이지로 이동
    navigate(`/characters/${id}/versions`);
  };

  const handleCancel = () => {
    navigate('/characters');
  };

  const handlePreview = () => {
    // 미리보기 로직
    navigate(`/characters/${id}/chat`);
  };

  // Git 그래프 설정
  const gitgraphOptions = {
    template: templateExtend(TemplateName.Metro, {
      colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b'],
      branch: {
        lineWidth: 3,
        spacing: 50,
      },
      commit: {
        spacing: 40,
        dot: {
          size: 8,
        },
        message: {
          displayAuthor: false,
          displayHash: false,
          font: 'normal 12px Arial',
        },
      },
    }),
  };

  const renderGitGraph = () => {
    return (
      <Gitgraph options={gitgraphOptions}>
        {(gitgraph) => {
          // 메인 브랜치
          const main = gitgraph.branch("main");
          
          // 버전 히스토리를 역순으로 커밋
          const sortedVersions = [...versions].reverse();
          
          sortedVersions.forEach((version, index) => {
            if (version.branch === 'main') {
              main.commit({
                subject: version.commitMessage,
                hash: version.version,
                author: version.author,
                style: {
                  dot: {
                    color: index === sortedVersions.length - 1 ? '#10b981' : '#6366f1',
                  },
                },
              });
            }
          });

          // 피처 브랜치 예시
          const featureBranch = gitgraph.branch("feature/personality-v3");
          featureBranch.commit({
            subject: "WIP: 감정 시스템 추가 실험",
            hash: "feat-1",
            author: "user1",
            style: {
              dot: { color: '#ec4899' },
            },
          });
          featureBranch.commit({
            subject: "감정 반응 패턴 개선",
            hash: "feat-2", 
            author: "user1",
            style: {
              dot: { color: '#ec4899' },
            },
          });

          return null;
        }}
      </Gitgraph>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            {character.name?.[0] || 'N'}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {id === 'new' ? '새 캐릭터 만들기' : `${character.name} 편집`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`현재 버전: ${character.currentVersion}`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
              {character.isPublic ? (
                <Chip label="공개" size="small" color="success" />
              ) : (
                <Chip label="비공개" size="small" color="default" />
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Preview />}
              onClick={handlePreview}
              disabled={id === 'new'}
            >
              미리보기
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
            >
              저장
            </Button>
          </Box>
        </Box>
        
        <Typography variant="body1" color="text.secondary">
          캐릭터의 성격, 배경, 시스템 프롬프트를 수정하고 새 버전으로 커밋하세요
        </Typography>
      </Box>

      {/* 탭 네비게이션 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            label="기본 정보" 
            icon={<Edit />} 
            iconPosition="start"
          />
          <Tab 
            label="시스템 프롬프트" 
            icon={<Edit />} 
            iconPosition="start"
          />
          <Tab 
            label="버전 히스토리" 
            icon={<Timeline />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* 기본 정보 탭 */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                캐릭터 기본 정보
              </Typography>

              <Box sx={{ display: 'grid', gap: 3 }}>
                <TextField
                  label="캐릭터 이름"
                  value={character.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  fullWidth
                  required
                />

                <TextField
                  label="한 줄 설명"
                  value={character.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  helperText="캐릭터를 간단히 소개하는 설명"
                />

                <TextField
                  label="성격 설명"
                  value={character.personality || ''}
                  onChange={(e) => handleInputChange('personality', e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  helperText="캐릭터의 성격과 특징을 자세히 설명"
                />

                <Autocomplete
                  multiple
                  freeSolo
                  value={character.tags || []}
                  onChange={handleTagsChange}
                  options={['귀족', '현대인', '판타지', 'SF', '로맨스', '코미디', '진지함', '유머러스']}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="태그"
                      placeholder="태그를 입력하고 Enter를 누르세요"
                      helperText="캐릭터를 분류할 태그들"
                    />
                  )}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={character.isPublic || false}
                      onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                    />
                  }
                  label="공개 캐릭터"
                />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                아바타 및 추가 설정
              </Typography>

              <Box sx={{ display: 'grid', gap: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2, fontSize: '3rem' }}
                    src={character.avatar}
                  >
                    {character.name?.[0] || 'N'}
                  </Avatar>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    component="label"
                  >
                    아바타 업로드
                    <input type="file" hidden accept="image/*" />
                  </Button>
                </Box>

                <Alert severity="info">
                  <Typography variant="body2">
                    캐릭터 변경 사항은 새로운 버전으로 저장됩니다. 
                    이전 버전은 언제든 복원할 수 있습니다.
                  </Typography>
                </Alert>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    생성일: {character.createdAt?.toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">
                    마지막 수정: {character.updatedAt?.toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* 시스템 프롬프트 탭 */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              시스템 프롬프트
            </Typography>

            <TextField
              label="시스템 프롬프트"
              value={character.systemPrompt || ''}
              onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
              fullWidth
              multiline
              rows={20}
              helperText="AI가 이 캐릭터를 연기할 때 따를 상세한 지침서"
            />

            <Box sx={{ mt: 2 }}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>시스템 프롬프트 작성 팁:</strong>
                </Typography>
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  <li>캐릭터의 배경과 성격을 명확히 정의하세요</li>
                  <li>대화 스타일과 어투를 구체적으로 설명하세요</li>
                  <li>금지사항과 허용사항을 명시하세요</li>
                  <li>예시 대화나 문장을 포함하면 더 효과적입니다</li>
                </ul>
              </Alert>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 버전 히스토리 탭 */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Git 스타일 버전 히스토리
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Alert severity="info">
                이 캐릭터의 개발 과정을 Git 그래프로 시각화했습니다. 
                각 커밋은 캐릭터의 새로운 버전을 나타냅니다.
              </Alert>
            </Box>

            <Box 
              ref={gitgraphRef}
              sx={{ 
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                p: 2,
                overflow: 'auto',
                minHeight: 400,
              }}
            >
              {renderGitGraph()}
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                브랜치 설명:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#6366f1' }} />
                  <Typography variant="body2">main - 안정적인 릴리즈 버전</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ec4899' }} />
                  <Typography variant="body2">feature/* - 새로운 기능 개발</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981' }} />
                  <Typography variant="body2">HEAD - 현재 작업 중인 버전</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 커밋 다이얼로그 */}
      <Dialog open={openCommitDialog} onClose={() => setOpenCommitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>새 버전 커밋</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            변경사항을 새로운 버전으로 저장합니다. 커밋 메시지를 입력해주세요.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="커밋 메시지"
            fullWidth
            multiline
            rows={3}
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="예: 성격 설명 개선 및 대화 스타일 조정"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCommitDialog(false)}>취소</Button>
          <Button 
            onClick={handleCommit} 
            variant="contained"
            disabled={!commitMessage.trim()}
          >
            커밋 & 저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CharacterEditor;
