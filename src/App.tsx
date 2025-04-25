import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider } from './context/AuthContext';

// Lazy-loaded routes
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const EventsPage = lazy(() => import('./pages/events/EventsPage'));
const EventDetailPage = lazy(() => import('./pages/events/EventDetailPage'));
const CreateEventPage = lazy(() => import('./pages/events/CreateEventPage'));
const SessionPage = lazy(() => import('./pages/sessions/SessionPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth">
            <Route 
              path="login" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <LoginPage />
                </Suspense>
              } 
            />
            <Route 
              path="register" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <RegisterPage />
                </Suspense>
              } 
            />
          </Route>
          <Route 
            path="dashboard" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardPage />
              </Suspense>
            } 
          />
          <Route path="events">
            <Route 
              index 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <EventsPage />
                </Suspense>
              } 
            />
            <Route 
              path="create" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CreateEventPage />
                </Suspense>
              } 
            />
            <Route 
              path=":eventId" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <EventDetailPage />
                </Suspense>
              } 
            />
          </Route>
          <Route 
            path="sessions/:sessionId" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <SessionPage />
              </Suspense>
            } 
          />
          <Route 
            path="profile" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ProfilePage />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;