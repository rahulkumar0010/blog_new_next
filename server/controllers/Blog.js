const Joi = require("joi");
const slugify = require("slugify");
const Blog = require("../model/blog");

exports.createBlog = async (req, res) => {
  const { title, description, short_desc } = req.body;

  // Validation with Joi
  const registerSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    short_desc: Joi.string().required(),
  });
  const { error } = registerSchema.validate({ title, description, short_desc });

  if (error) {
    return res
      .status(422)
      .json({ status: false, message: error.message, data: {} });
  }

  // Generate a slug from the title
  let timestamp = new Date().getTime();
  const slug = slugify(
    title.split(" ").slice(0, 10).join(" ") + `-${timestamp}`,
    { lower: true, strict: true }
  );
  // Create a new blog post with the generated slug
  const blog = new Blog({
    title,
    description,
    short_desc,
    slug,
    ...(req.file ? { image: req.file.path } : {}),
  });
  try {
    await blog.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message, data: {} });
  }
  res.status(201).json({
    status: true,
    message: "Blog post created successfully!",
    data: blog,
  });
};
exports.getAll = async (req, res) => {
  const { title, page, limit } = req.query;
  const currentPage = Number(page) || 1;
  let perPage = Number(limit) || 10;
  const skip = perPage * (currentPage - 1);

  let blog;
  let totalCount;
  try {
    let query = {
      ...(title
        ? { title: { $regex: req.query.q ? req.query.q : "", $options: "i" } }
        : {}),
    };
    blog = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(skip);

    totalCount = await Blog.countDocuments(query).exec();
  } catch (error) {
    res.status(501).json({ status: false, message: error.message, data: [] });
  }
  res.status(200).json({
    status: true,
    data: {
      blog,
      pagination: { page: currentPage, limit: perPage, totalCount },
    },
  });
};

exports.getBySlug = async (req, res) => {
  const { slug } = req.params;

  let blog;

  try {
    let query = { slug };

    blog = await Blog.findOne(query);
  } catch (error) {
    return res
      .status(501)
      .json({ status: false, message: error.message, data: [] });
  }
  res.status(200).json({
    status: true,
    data: blog || {},
  });
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return res
      .status(501)
      .json({ status: false, message: error.message, data: [] });
  }
  res.status(200).json({
    status: true,
    data: blog || {},
  });
};
