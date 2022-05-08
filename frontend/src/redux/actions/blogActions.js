import Axios from "axios";
import {
BLOG_CREATE_REQUEST,BLOG_CREATE_FAIL,BLOG_CREATE_SUCCESS,
BLOGS_GET_REQUEST,BLOGS_GET_FAIL,BLOGS_GET_SUCCESS,
BLOG_GET_REQUEST,BLOG_GET_FAIL,BLOG_GET_SUCCESS,
} from "../constants/blogConstants";

const createBlog = ({updatedTourData, navigate, toast}) => async (dispatch) => {
    dispatch({ type: BLOG_CREATE_REQUEST, payload: { updatedTourData } });
    try {
        const response = await Axios.post("http://localhost:5000/api/blogs/",
          updatedTourData
        );
        dispatch({ type: BLOG_CREATE_SUCCESS, payload: response });

        toast.success("Tour Added Successfully");
        navigate("/");
        return response.data;
        } catch (error) {
        dispatch({ type: BLOG_CREATE_FAIL, payload: error.message });
      }
}

const getBlogs = (page) => async (dispatch) => {
    dispatch({ type: BLOGS_GET_REQUEST});
    try {
        const response = await Axios.get(`http://localhost:5000/api/blogs?page=${page}`
        );
        dispatch({ type: BLOGS_GET_SUCCESS, payload: response });

        return response.data;
        } catch (error) {
        dispatch({ type: BLOGS_GET_FAIL, payload: error.message });
      }

}

const getBlog = (id) => async (dispatch) => {
    dispatch({ type: BLOG_GET_REQUEST, payload: id});
    try {
        const response = await Axios.get(`http://localhost:5000/api/blogs/${id}`
        );
        dispatch({ type: BLOGS_GET_SUCCESS, payload: response });

        return response.data;
        } catch (error) {
        dispatch({ type: BLOGS_GET_FAIL, payload: error.message });
      }

}

export {createBlog,getBlogs,getBlog};