import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import {
  Timeline,
  CallSplit,
  Merge,
  Download,
  Add,
  Compare,
  Restore,
  Tag,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import type { CharacterVersion, Branch } from '../types';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const CharacterVersions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [openCommitDialog, setOpenCommitDialog] = useState(false);
  const [openBranchDialog, setOpenBranchDialog] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [branchName, setBranchName] = useState('');

  // 임시 데이터
  const characterName = '엘리자베스';
  const currentBranch = 'main';

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
  ];

  const branches: Branch[] = [
    {
      name: 'main',
      characterId: id || '1',
      headVersion: 'v2.1.0',
      baseVersion: 'v1.0.0',
      isDefault: true,
      createdAt: new Date('2024-01-01'),
      author: 'user1',
    },
    {
      name: 'feature/personality-enhancement',
      characterId: id || '1',
      headVersion: 'v2.1.0-feature.1',
      baseVersion: 'v2.0.0',
      isDefault: false,
      createdAt: new Date('2024-01-19'),
      author: 'user1',
    },
    {
      name: 'experimental/emotion-system',
      characterId: id || '1',
      headVersion: 'v2.0.0-exp.3',
      baseVersion: 'v1.5.0',
      isDefault: false,
      createdAt: new Date('2024-01-10'),
      author: 'user1',
    },
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCommit = () => {
    // 커밋 로직 구현
    console.log('Creating new commit:', commitMessage);
    setOpenCommitDialog(false);
    setCommitMessage('');
  };

  const handleCreateBranch = () => {
    // 브랜치 생성 로직 구현
    console.log('Creating new branch:', branchName);
    setOpenBranchDialog(false);
    setBranchName('');
  };

  const handleRestore = (version: string) => {
    // 버전 복원 로직 구현
    console.log('Restoring to version:', version);
  };

  const handleCompare = (version1: string, version2: string) => {
    // 버전 비교 로직 구현
    console.log('Comparing versions:', version1, 'vs', version2);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>E</Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {characterName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`브랜치: ${currentBranch}`} 
                size="small" 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                label={`최신: ${versions[0]?.version}`} 
                size="small" 
                color="success"
              />
            </Box>
          </Box>
        </Box>
        
        <Typography variant="body1" color="text.secondary">
          Git 스타일 버전 관리로 캐릭터의 발전 과정을 추적하고 관리하세요
        </Typography>
      </Box>

      {/* 액션 버튼들 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenCommitDialog(true)}
        >
          새 버전 커밋
        </Button>
        <Button
          variant="outlined"
          startIcon={<CallSplit />}
          onClick={() => setOpenBranchDialog(true)}
        >
          브랜치 생성
        </Button>
        <Button
          variant="outlined"
          startIcon={<Compare />}
        >
          버전 비교
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
        >
          내보내기
        </Button>
      </Box>

      {/* 탭 네비게이션 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            label="커밋 히스토리" 
            icon={<Timeline />} 
            iconPosition="start"
          />
          <Tab 
            label="브랜치" 
            icon={<CallSplit />} 
            iconPosition="start"
          />
          <Tab 
            label="태그" 
            icon={<Tag />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* 커밋 히스토리 */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              커밋 히스토리
            </Typography>
            
            {versions.map((version, index) => (
              <Box key={version.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                  <Box sx={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.main',
                    mr: 2,
                    position: 'relative'
                  }}>
                    {index < versions.length - 1 && (
                      <Box sx={{
                        position: 'absolute',
                        top: 12,
                        left: '50%',
                        width: 2,
                        height: 60,
                        bgcolor: 'divider',
                        transform: 'translateX(-50%)'
                      }} />
                    )}
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6">{version.version}</Typography>
                      <Chip 
                        label={version.branch} 
                        size="small" 
                        variant="outlined"
                      />
                      {index === 0 && (
                        <Chip 
                          label="HEAD" 
                          size="small" 
                          color="primary"
                        />
                      )}
                    </Box>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      {version.commitMessage}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {version.author} • {version.createdAt.toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      title="이 버전으로 복원"
                      onClick={() => handleRestore(version.version)}
                    >
                      <Restore />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      title="비교하기"
                      onClick={() => handleCompare(version.version, versions[0].version)}
                    >
                      <Compare />
                    </IconButton>
                  </Box>
                </Box>
                {index < versions.length - 1 && <Box sx={{ ml: 3 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>
      </TabPanel>

      {/* 브랜치 */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              브랜치 관리
            </Typography>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>브랜치명</TableCell>
                    <TableCell>최신 버전</TableCell>
                    <TableCell>생성일</TableCell>
                    <TableCell>작성자</TableCell>
                    <TableCell>액션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branches.map((branch) => (
                    <TableRow key={branch.name}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CallSplit sx={{ fontSize: 16 }} />
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {branch.name}
                          </Typography>
                          {branch.isDefault && (
                            <Chip label="기본" size="small" color="primary" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {branch.headVersion}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {branch.createdAt.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {branch.author}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" variant="outlined">
                            체크아웃
                          </Button>
                          {!branch.isDefault && (
                            <Button size="small" variant="outlined" startIcon={<Merge />}>
                              병합
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 태그 */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              릴리즈 태그
            </Typography>
            <Alert severity="info">
              주요 릴리즈 버전에 태그를 지정하여 중요한 마일스톤을 표시할 수 있습니다.
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 커밋 다이얼로그 */}
      <Dialog open={openCommitDialog} onClose={() => setOpenCommitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>새 버전 커밋</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="커밋 메시지"
            fullWidth
            multiline
            rows={3}
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="이번 변경사항을 간단히 설명해주세요..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCommitDialog(false)}>취소</Button>
          <Button 
            onClick={handleCommit} 
            variant="contained"
            disabled={!commitMessage.trim()}
          >
            커밋
          </Button>
        </DialogActions>
      </Dialog>

      {/* 브랜치 생성 다이얼로그 */}
      <Dialog open={openBranchDialog} onClose={() => setOpenBranchDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>새 브랜치 생성</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="브랜치명"
            fullWidth
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="feature/new-feature 또는 fix/bug-name"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBranchDialog(false)}>취소</Button>
          <Button 
            onClick={handleCreateBranch} 
            variant="contained"
            disabled={!branchName.trim()}
          >
            생성
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CharacterVersions;
