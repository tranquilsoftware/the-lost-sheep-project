import App from './App';
import { createBrowserRouter } from 'react-router-dom';

// blogs
import BlogPage from './pages/blog/BlogPage';
import BlogPostPage from './pages/blog/posts/[slug]'
import MakeNewPost from './pages/blog/make-new-post';
import AnimationScrollPage from './components/animations/WholePageScrollAnimation';

export const router = createBrowserRouter([

  // Blog routes
  {
    path: '/blog/new',
    element: <MakeNewPost />,
    errorElement: <div>Something went wrong loading the blog. Please try again later.</div>
  },
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
  },
  {
    path: '/scroll',
    element: <AnimationScrollPage />,
  },
]);
