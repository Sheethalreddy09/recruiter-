import { BrowserRouter } from 'react-router-dom';
import { RecruiterRoutes } from './routes/RecruiterRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <RecruiterRoutes />
    </BrowserRouter>
  );
}
