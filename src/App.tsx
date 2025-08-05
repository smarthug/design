import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './utils/theme';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import CharacterList from './pages/CharacterList';
import CharacterEditor from './pages/CharacterEditor';
import CharacterVersions from './pages/CharacterVersions';
import ChatPage from './pages/ChatPage';
import RAGSettings from './pages/RAGSettings';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/characters/new" element={<CharacterEditor />} />
            <Route path="/characters/:id/edit" element={<CharacterEditor />} />
            <Route path="/characters/:id/versions" element={<CharacterVersions />} />
            <Route path="/characters/:id/chat" element={<ChatPage />} />
            <Route path="/characters/:id/rag" element={<RAGSettings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
