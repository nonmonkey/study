import Home from './Home';
import News from './News';
import NewsHome from './NewsHome';
import NewsDetail from './NewsDetail';
import NewsSearch from './NewsSearch';

const config = [
  {
    path: '/news',
    name: 'news',
    component: News,
    children: [
      { path: '/', name: 'newsHome', exact: true, component: NewsHome },
      { path: '/detail', name: 'newsDetail', exact: true, component: NewsDetail },
      { path: '/search', name: 'newsSearch', exact: true, component: NewsSearch },
    ],
  },
  { path: '/', name: 'home', component: Home },
];
export default config;
