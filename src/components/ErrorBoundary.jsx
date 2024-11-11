import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import NutrientDashboard from './components/NutrientDashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorBoundary>
          <NutrientDashboard />
        </ErrorBoundary>
      </Container>
    </>
  );
}

export default App;