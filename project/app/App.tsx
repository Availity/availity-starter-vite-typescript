import { Routes, Route, useSearchParams } from 'react-router-dom';
import { Container, PageHeader, Spaces } from '@availity/element';

import { Request } from './Request';
import { Response } from './Response';
import { ErrorBoundary, Footer } from './components';

const App = () => {
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get('spaceId') || '';

  return (
    <Container data-testid="app-container" id="app-container">
      <Spaces spaceIds={[spaceId]} clientId="test">
        {/* TODO: Replace headerText, breadcrumbs, and help with your app's values */}
        <PageHeader
          breadcrumbs={{ active: 'Home' }}
          headerText="My Application"
          help={{ helpAppName: 'My Application', url: 'https://design.availity.com' }}
        />
        <Container>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Request />} />
              <Route path="/response" element={<Response />} />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </Container>
      </Spaces>
    </Container>
  );
};

export default App;
