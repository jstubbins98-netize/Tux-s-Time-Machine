import { type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import TeacherPage from '@/pages/teacher';
import Game from '@/game/Game';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Game} />
        <Route path="/teacher" component={TeacherPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
