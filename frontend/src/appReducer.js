import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './redux/reducers/userReducers';

import {
    createBlogReducer,getBlogsReducer,getBlogReducer
  } from './redux/reducers/blogReducers';
  

  const initialState = {
    blog:  { blog: {},
    blogs: [],
    userBlogs: [],
    tagBlogs: [],
    relatedBlogs: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false},
  
  };
  

const persistConfig = {
  key: 'root-auth',
  storage
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  createBlog: createBlogReducer,
  Blogs: getBlogsReducer,
  Blog: getBlogReducer
});
/*const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);*/
export default persistReducer(persistConfig, reducer);
