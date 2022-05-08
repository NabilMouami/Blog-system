import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../redux/actions/blogActions";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

function AddEditBlog() {
  const [blogData, setBlogData] = useState(initialState);
  const { error, userBlogs } = useSelector((state) => ({
    ...state.blog,
  }));
  const { userInfo } = useSelector((state) => ({ ...state.userSignin }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, description, tags } = blogData;
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      console.log(singleTour);
      setTourData({ ...singleTour });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedBlogData = { ...blogData, name: userInfo?.name };

      if (!id) {
        dispatch(createBlog({ updatedBlogData, navigate, toast }));
      } else {

      }
      handleClear();
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...blogData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setBlogData({ ...blogData, tags: [...blogData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...blogData,
      tags: blogData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
  };

  return (
    <div>
      <form>
         <h2>Add Blog</h2>
         <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
        />

      </form>
    </div>
  )
}

export default AddEditBlog