// 캐릭터 관련 타입
export interface Character {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  personality: string;
  systemPrompt: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isPublic: boolean;
  authorId: string;
  // Git 스타일 버전 관리
  currentVersion: string;
  versions: CharacterVersion[];
}

export interface CharacterVersion {
  id: string;
  version: string; // v1.0.0 형태
  characterId: string;
  name: string;
  description: string;
  personality: string;
  systemPrompt: string;
  ragConfig?: RAGConfig;
  createdAt: Date;
  commitMessage: string;
  parentVersion?: string; // 브랜치 관리를 위한 부모 버전
  branch: string; // main, dev, feature/xxx 등
  author: string;
  isDraft: boolean;
}

// RAG 설정 타입
export interface RAGConfig {
  id: string;
  name: string;
  description: string;
  // 벡터 데이터베이스 설정
  vectorDatabase: {
    provider: 'pinecone' | 'weaviate' | 'chroma' | 'local';
    apiKey?: string;
    indexName: string;
    dimension: number;
  };
  // 임베딩 모델 설정
  embeddingModel: {
    provider: 'openai' | 'huggingface' | 'local';
    modelName: string;
    apiKey?: string;
  };
  // 검색 설정
  retrievalConfig: {
    topK: number;
    similarityThreshold: number;
    searchType: 'similarity' | 'mmr' | 'similarity_score_threshold';
  };
  // 데이터 소스
  dataSources: DataSource[];
  // 청크 설정
  chunkConfig: {
    chunkSize: number;
    chunkOverlap: number;
    splitter: 'recursive' | 'character' | 'token';
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DataSource {
  id: string;
  type: 'file' | 'url' | 'text';
  name: string;
  content?: string;
  url?: string;
  filePath?: string;
  metadata: Record<string, any>;
  isProcessed: boolean;
  createdAt: Date;
}

// 채팅 관련 타입
export interface ChatSession {
  id: string;
  characterId: string;
  characterVersion: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  // RAG 관련 메타데이터
  ragContext?: {
    sources: RetrievedDocument[];
    query: string;
    relevanceScore: number;
  };
}

export interface RetrievedDocument {
  id: string;
  content: string;
  metadata: Record<string, any>;
  score: number;
  source: string;
}

// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Git 스타일 diff 타입
export interface CharacterDiff {
  version1: string;
  version2: string;
  changes: {
    field: keyof CharacterVersion;
    oldValue: any;
    newValue: any;
    changeType: 'added' | 'modified' | 'deleted';
  }[];
}

// 브랜치 관련 타입
export interface Branch {
  name: string;
  characterId: string;
  headVersion: string;
  baseVersion: string;
  isDefault: boolean;
  createdAt: Date;
  author: string;
}

export interface MergeRequest {
  id: string;
  sourceBranch: string;
  targetBranch: string;
  characterId: string;
  title: string;
  description: string;
  status: 'open' | 'merged' | 'closed';
  author: string;
  createdAt: Date;
  mergedAt?: Date;
}
