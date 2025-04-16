import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { UsersProvider } from './contexts/UsersContext.tsx';
import { MoviesProvider } from './contexts/MoviesContext.tsx';
import { SearchProvider } from './contexts/SearchContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <BrowserRouter>
        <SearchProvider>
            <UsersProvider>
                <MoviesProvider>
                    <App />
                </MoviesProvider>
            </UsersProvider>
        </SearchProvider>
    </BrowserRouter>
);
