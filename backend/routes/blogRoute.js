const express = require("express");
const {  isAuth } = require('../util');
const Blog = require("../models/blogModel")
const router = express.Router();

router.post("/",isAuth,async (req,res) => {
    const blog = req.body;
  const newBlog = new Blog({
    ...blog,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlog.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
})

router.get("/", async (req,res) => {
    const { page } = req.query;
  try {
    // const tours = await TourModal.find();
    // res.status(200).json(tours);

    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Blog.countDocuments({});
    const blogs = await Blog.find().limit(limit).skip(startIndex);
    res.json({
      data: blogs,
      currentPage: Number(page),
      totalBlogs: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
})

router.get("/:id", async (req,res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
})
router.get("/userTours/:id", isAuth, async (req,res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userBlogs = await Blog.find({ creator: id });
  res.status(200).json(userBlogs);
})

router.delete("/:id", isAuth, async (req,res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }
    await Blog.findByIdAndRemove(id);
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
})
router.patch("/:id", isAuth, async (req,res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const updatedBlog = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/search", async (req,res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const blogs = await Blog.find({ title });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});
router.get("/tag/:tag", async (req,res) => {
  const { tag } = req.params;
  try {
    const blogs = await Blog.find({ tags: { $in: tag } });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});


router.post("/relatedTours", async (req,res) => {
  const tags = req.body;
  try {
    const blogs = await Blog.find({ tags: { $in: tags } });
    res.json(blogs);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
});


router.patch("/like/:id", isAuth, async (req,res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const blog = await Blog.findById(id);

    const index = blog.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      blog.likes.push(req.userId);
    } else {
      blog.likes = blog.likes.filter((id) => id !== String(req.userId));
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
    });

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
