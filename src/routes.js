import AppRoot from './components/app-root.jsx';
import Home from './views/Home.jsx';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import Logout from './views/Logout.jsx';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/login',
        component: Login 
      },
      { path: '/signup',
        component: Signup 
      },
      { path: '/logout',
        component: Logout 
      },
    ]
  }
];

export default routes;


{/* <Route path='/receipt'> 
  <Receipt />
</Route>
<Route path='/cart'>
  <Cart />
</Route>
<Route path='/product'> 
  <Product />
</Route>
<Route path='/profile'> 
  <Profile />
</Route>
<Route path='/'>
  <Home />
</Route> */}