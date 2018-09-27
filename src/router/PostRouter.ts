import { Request, Response, Router } from "express";
import Post from "../models/Post";

class PostRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetPosts(req: Request, res: Response): void {
    Post.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  public GetPost(req: Request, res: Response): void {}

  public CreatePost(req: Request, res: Response): void {}

  public UpdatePost(req: Request, res: Response): void {}

  public DeletePost(req: Request, res: Response): void {}



  routes() {
    this.router.get('/', this.GetPosts)
  }
}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
