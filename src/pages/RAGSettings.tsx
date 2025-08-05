import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
} from '@mui/material';
import {
  Memory,
  Storage,
  CloudUpload,
  Delete,
  Refresh,
  Settings,
  ExpandMore,
  DataObject,
  Link,
  TextFields,
} from '@mui/icons-material';
import type { RAGConfig, DataSource } from '../types';

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
      id={`rag-tabpanel-${index}`}
      aria-labelledby={`rag-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const RAGSettings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // RAG 설정 상태
  const [ragConfig, setRagConfig] = useState<Partial<RAGConfig>>({
    name: 'Default RAG Config',
    description: '기본 RAG 설정',
    vectorDatabase: {
      provider: 'pinecone',
      indexName: 'character-knowledge',
      dimension: 1536,
    },
    embeddingModel: {
      provider: 'openai',
      modelName: 'text-embedding-ada-002',
    },
    retrievalConfig: {
      topK: 5,
      similarityThreshold: 0.7,
      searchType: 'similarity',
    },
    chunkConfig: {
      chunkSize: 1000,
      chunkOverlap: 200,
      splitter: 'recursive',
    },
    isActive: true,
  });

  // 데이터 소스 상태
  const [dataSources] = useState<DataSource[]>([
    {
      id: '1',
      type: 'file',
      name: 'character_background.pdf',
      filePath: '/uploads/character_background.pdf',
      metadata: { size: '2.5MB', pages: 45 },
      isProcessed: true,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      type: 'url',
      name: 'Wikipedia - Victorian Era',
      url: 'https://en.wikipedia.org/wiki/Victorian_era',
      metadata: { lastCrawled: '2024-01-20' },
      isProcessed: true,
      createdAt: new Date('2024-01-18'),
    },
    {
      id: '3',
      type: 'text',
      name: '캐릭터 대화 스타일 가이드',
      content: '엘리자베스는 항상 정중하고 우아한 말투를 사용합니다...',
      metadata: { wordCount: 1250 },
      isProcessed: false,
      createdAt: new Date('2024-01-22'),
    },
  ]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleConfigChange = (section: string, field: string, value: string | number | boolean) => {
    setRagConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof RAGConfig],
        [field]: value,
      },
    }));
  };

  const handleReprocessData = async (sourceId: string) => {
    console.log('Reprocessing data for source:', sourceId);
    setIsProcessing(true);
    // 데이터 재처리 로직
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'file':
        return <DataObject />;
      case 'url':
        return <Link />;
      case 'text':
        return <TextFields />;
      default:
        return <DataObject />;
    }
  };

  const getProviderColor = (provider: string) => {
    const colors: Record<string, string> = {
      openai: '#10B981',
      pinecone: '#6366F1',
      weaviate: '#EC4899',
      chroma: '#F59E0B',
      local: '#8B5CF6',
    };
    return colors[provider] || '#64748B';
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
          RAG 설정
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Retrieval-Augmented Generation을 통해 캐릭터의 지식 베이스를 확장하세요
        </Typography>
      </Box>

      {/* 탭 네비게이션 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            label="벡터 데이터베이스" 
            icon={<Storage />} 
            iconPosition="start"
          />
          <Tab 
            label="임베딩 모델" 
            icon={<Memory />} 
            iconPosition="start"
          />
          <Tab 
            label="검색 설정" 
            icon={<Settings />} 
            iconPosition="start"
          />
          <Tab 
            label="데이터 소스" 
            icon={<CloudUpload />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* 벡터 데이터베이스 설정 */}
      <TabPanel value={tabValue} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              벡터 데이터베이스 설정
            </Typography>

            <Box sx={{ display: 'grid', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>벡터 데이터베이스 제공자</InputLabel>
                <Select
                  value={ragConfig.vectorDatabase?.provider || 'pinecone'}
                  onChange={(e) => handleConfigChange('vectorDatabase', 'provider', e.target.value)}
                >
                  <MenuItem value="pinecone">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getProviderColor('pinecone') }} />
                      Pinecone
                    </Box>
                  </MenuItem>
                  <MenuItem value="weaviate">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getProviderColor('weaviate') }} />
                      Weaviate
                    </Box>
                  </MenuItem>
                  <MenuItem value="chroma">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getProviderColor('chroma') }} />
                      Chroma
                    </Box>
                  </MenuItem>
                  <MenuItem value="local">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getProviderColor('local') }} />
                      Local Vector Store
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="API 키"
                type="password"
                value={ragConfig.vectorDatabase?.apiKey || ''}
                onChange={(e) => handleConfigChange('vectorDatabase', 'apiKey', e.target.value)}
                placeholder="벡터 데이터베이스 API 키를 입력하세요"
                helperText="API 키는 안전하게 암호화되어 저장됩니다"
              />

              <TextField
                label="인덱스 이름"
                value={ragConfig.vectorDatabase?.indexName || ''}
                onChange={(e) => handleConfigChange('vectorDatabase', 'indexName', e.target.value)}
                placeholder="character-knowledge"
              />

              <TextField
                label="벡터 차원"
                type="number"
                value={ragConfig.vectorDatabase?.dimension || 1536}
                onChange={(e) => handleConfigChange('vectorDatabase', 'dimension', parseInt(e.target.value))}
                helperText="임베딩 모델의 차원과 일치해야 합니다"
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" startIcon={<Refresh />}>
                  연결 테스트
                </Button>
                <Button variant="contained">
                  설정 저장
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 임베딩 모델 설정 */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              임베딩 모델 설정
            </Typography>

            <Box sx={{ display: 'grid', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>임베딩 제공자</InputLabel>
                <Select
                  value={ragConfig.embeddingModel?.provider || 'openai'}
                  onChange={(e) => handleConfigChange('embeddingModel', 'provider', e.target.value)}
                >
                  <MenuItem value="openai">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getProviderColor('openai') }} />
                      OpenAI
                    </Box>
                  </MenuItem>
                  <MenuItem value="huggingface">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF6B6B' }} />
                      Hugging Face
                    </Box>
                  </MenuItem>
                  <MenuItem value="local">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getProviderColor('local') }} />
                      Local Model
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="모델명"
                value={ragConfig.embeddingModel?.modelName || ''}
                onChange={(e) => handleConfigChange('embeddingModel', 'modelName', e.target.value)}
                placeholder="text-embedding-ada-002"
              />

              <TextField
                label="API 키"
                type="password"
                value={ragConfig.embeddingModel?.apiKey || ''}
                onChange={(e) => handleConfigChange('embeddingModel', 'apiKey', e.target.value)}
                placeholder="임베딩 모델 API 키를 입력하세요"
              />
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 검색 설정 */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              검색 및 조각화 설정
            </Typography>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">검색 설정</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'grid', gap: 3 }}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      검색 결과 개수 (Top-K): {ragConfig.retrievalConfig?.topK || 5}
                    </Typography>
                    <Slider
                      value={ragConfig.retrievalConfig?.topK || 5}
                      onChange={(_, value) => handleConfigChange('retrievalConfig', 'topK', value)}
                      min={1}
                      max={20}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" gutterBottom>
                      유사도 임계값: {ragConfig.retrievalConfig?.similarityThreshold || 0.7}
                    </Typography>
                    <Slider
                      value={ragConfig.retrievalConfig?.similarityThreshold || 0.7}
                      onChange={(_, value) => handleConfigChange('retrievalConfig', 'similarityThreshold', value)}
                      min={0}
                      max={1}
                      step={0.1}
                      marks
                      valueLabelDisplay="auto"
                    />
                  </Box>

                  <FormControl fullWidth>
                    <InputLabel>검색 유형</InputLabel>
                    <Select
                      value={ragConfig.retrievalConfig?.searchType || 'similarity'}
                      onChange={(e) => handleConfigChange('retrievalConfig', 'searchType', e.target.value)}
                    >
                      <MenuItem value="similarity">코사인 유사도</MenuItem>
                      <MenuItem value="mmr">Maximum Marginal Relevance</MenuItem>
                      <MenuItem value="similarity_score_threshold">임계값 기반 유사도</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">텍스트 조각화 설정</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'grid', gap: 3 }}>
                  <TextField
                    label="조각 크기"
                    type="number"
                    value={ragConfig.chunkConfig?.chunkSize || 1000}
                    onChange={(e) => handleConfigChange('chunkConfig', 'chunkSize', parseInt(e.target.value))}
                    helperText="각 텍스트 조각의 최대 문자 수"
                  />

                  <TextField
                    label="조각 겹침"
                    type="number"
                    value={ragConfig.chunkConfig?.chunkOverlap || 200}
                    onChange={(e) => handleConfigChange('chunkConfig', 'chunkOverlap', parseInt(e.target.value))}
                    helperText="인접한 조각 간의 겹치는 문자 수"
                  />

                  <FormControl fullWidth>
                    <InputLabel>분할 방식</InputLabel>
                    <Select
                      value={ragConfig.chunkConfig?.splitter || 'recursive'}
                      onChange={(e) => handleConfigChange('chunkConfig', 'splitter', e.target.value)}
                    >
                      <MenuItem value="recursive">재귀적 분할</MenuItem>
                      <MenuItem value="character">문자 기반 분할</MenuItem>
                      <MenuItem value="token">토큰 기반 분할</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </TabPanel>

      {/* 데이터 소스 */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                데이터 소스 관리
              </Typography>
              <Button variant="contained" startIcon={<CloudUpload />}>
                새 데이터 추가
              </Button>
            </Box>

            {isProcessing && (
              <Box sx={{ mb: 2 }}>
                <Alert severity="info" sx={{ mb: 1 }}>
                  데이터를 처리하고 있습니다...
                </Alert>
                <LinearProgress />
              </Box>
            )}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>유형</TableCell>
                    <TableCell>상태</TableCell>
                    <TableCell>메타데이터</TableCell>
                    <TableCell>생성일</TableCell>
                    <TableCell>액션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getSourceIcon(source.type)}
                          <Typography variant="body2">{source.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={source.type.toUpperCase()} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={source.isProcessed ? '처리 완료' : '처리 대기'} 
                          size="small" 
                          color={source.isProcessed ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {Object.entries(source.metadata).map(([key, value]) => (
                            <Chip
                              key={key}
                              label={`${key}: ${value}`}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {source.createdAt.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            size="small"
                            onClick={() => handleReprocessData(source.id)}
                            disabled={isProcessing}
                          >
                            <Refresh />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                          >
                            <Delete />
                          </IconButton>
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

      {/* 전역 설정 */}
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6">RAG 시스템 활성화</Typography>
                <Typography variant="body2" color="text.secondary">
                  이 설정을 비활성화하면 캐릭터가 RAG 없이 기본 모델만 사용합니다
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch 
                    checked={ragConfig.isActive || false}
                    onChange={(e) => setRagConfig(prev => ({ ...prev, isActive: e.target.checked }))}
                  />
                }
                label=""
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RAGSettings;
