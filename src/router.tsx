import App from './App';
import { createBrowserRouter } from 'react-router-dom';

// blogs
import BlogPage from './pages/blog/BlogPage';
import BlogPostPage from './pages/blog/posts/[slug]'

export const router = createBrowserRouter([

  // Blog routes
  {
    path: '/blog',
    element: <BlogPage />,
    errorElement: <div>Something went wrong loading the blog. Please try again later.</div>
  },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
    errorElement: <div>Blog post not found.</div>
  },
  {
    path: '*',
    element: <App />,
  }
]);
