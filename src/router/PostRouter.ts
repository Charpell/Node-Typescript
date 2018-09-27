import { Request, Response, Router } from "express";
import Post from "../models/Post";

class PostRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the posts in the database
  public GetPosts(req: Request, res: Response): void {
    Post.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  // get a single post by params of 'slug'
  public GetPost(req: Request, res: Response): void {
    const { slug } = req.params;

    Post.findOne({ slug })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  // create a new post
  public CreatePost(req: Request, res: Response): void {
    const {
      title,
      slug,
      content,
      featuredImage,
      category,
      published,
    } = req.body;

    const post = new Post({
      title,
      slug,
      content,
      featuredImage,
      category,
      published,
    });

    post
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

 // update post by params of 'slug'
  public UpdatePost(req: Request, res: Response): void {
    const { slug } = req.body;

    Post.findOneAndUpdate({ slug }, req.body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }


  // delete post by params of 'slug'
  public DeletePost(req: Request, res: Response): void {
    const { slug } = req.body;

    Post.findOneAndRemove({ slug })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }



  routes() {
    this.router.get('/', this.GetPosts);
    this.router.get('/:slug', this.GetPost);
    this.router.post('/', this.CreatePost);
    this.router.put('/:slug', this.UpdatePost);
    this.router.delete('/:slug', this.DeletePost);
  }
}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
