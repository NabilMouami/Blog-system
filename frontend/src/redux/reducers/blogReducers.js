import {
    BLOG_CREATE_REQUEST,BLOG_CREATE_FAIL,BLOG_CREATE_SUCCESS,
    BLOGS_GET_REQUEST,BLOGS_GET_FAIL,BLOGS_GET_SUCCESS,
    BLOG_GET_REQUEST,BLOG_GET_FAIL,BLOG_GET_SUCCESS} from "../constants/blogConstants";

    
function  createBlogReducer(state ={}, action) {
    switch (action.type) {
        case BLOG_CREATE_REQUEST:
          return { loading: true };
        case BLOG_CREATE_SUCCESS:
          return { loading: false, createBlog: [action.payload] };
        case BLOG_CREATE_FAIL:
          return { loading: false, error: action.payload };
        default: return state;
    
}
}

function  getBlogsReducer(state ={blogs: [],currentPage:1,numberOfPages:null}, action) {
    switch (action.type) {
        case BLOGS_GET_REQUEST:
          return { loading: true, blogs: [] };
        case BLOGS_GET_SUCCESS:
          return { loading: false, blogs : action.payload.data,numberOfPages: action.payload.numberOfPages,currentPage: action.payload.currentPage };
        case BLOGS_GET_FAIL:
          return { loading: false, error: action.payload };
        default: return state;
    
}
}

function  getBlogReducer(state ={}, action) {
    switch (action.type) {
        case BLOG_GET_REQUEST:
          return { loading: true, blog: [] };
        case BLOG_GET_SUCCESS:
          return { loading: false, blog: action.payload };
        case BLOG_GET_FAIL:
          return { loading: false, error: action.payload };
        default: return state;
    
}
}

export {createBlogReducer,getBlogsReducer,getBlogReducer};