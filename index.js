import  express  from "express";
import { PrismaClient } from '@prisma/client';

const app= express ();
const  client = new PrismaClient();


app.use(express.json());


app.get("/", (_req, res) => {
    res.send("<h1>Minimal Blogging Platform RESTFul API</h1>");
});

app.get("/users", async (_req, res) => {
    try {
     const users = await client.user.findMany()
     res.json(users);
    } catch (error) {
     res.status(500).json({message: "Something went wrong", error: error.message });
    }
 });


 app.post("/users", async (req, res) => {
    try {
      const { firstname, lastname, email, username } = req.body;
  
      const newUser = await client.user.create({
        data: {
             firstName: firstname, 
             lastName: lastname, 
             email, 
             username },
      });
  
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  });
  

 app.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
    const user = await client.user.findUnique({
        where:{ id},
        include: {posts: true},
     });
     if (!user) return res.status(404).json({ message: "user not found" });
    res.json(user);

    } catch (error) {
     res.status(500).json({ message: "Something went wrong", error: error.message });
    }
 });
 
 app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
    const deleteUser = await client.user.delete({
        where:{ id},
     });
    res.json(deleteUser);

    } catch (error) {
     res.status(500).json({ message: "Something went wrong", error: error.message });
    }
 });
//posts now


 app.get("/posts", async (_req, res) => {
    try {
     const posts= await client.post.findMany({
        include: {author: true},
     });
     res.json(posts);
    } catch (error) {
     res.status(500).json({message: "Something went wrong", error: error.message });
    }
 });
//adding post
 app.post("/posts", async (req, res) => {
    try {
      const { title, content, isCompleted=false ,authorId } = req.body;
  
      const newPost= await client.post.create({
        data: {title, content, isCompleted, authorId},
      });
  
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  });

//get specific post
  app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;

    try {
    const post = await client.post.findUnique({
        where:{ id},
        include: {author: true},
     });
     if (!post) return res.status(404).json({ message: "user not found" });
    res.json(post);

    } catch (error) {
     res.status(500).json({ message: "Something went wrong", error: error.message });
    }
 });
//delete post
 app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
    const deletePost = await client.post.delete({
        where:{ id},
     });
    res.json(deletePost);

    } catch (error) {
     res.status(500).json({ message: "Something went wrong", error: error.message });
    }
 });

 //update post
 app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const updatedPost= req.body;
    try {
    const updatePost = await client.post.update({
        where:{ id},
        data: updatedPost

     });
    res.json(updatePost);

    } catch (error) {
     res.status(500).json({ message: "Something went wrong", error: error.message });
    }
 });


let port;
if (process.env.PORT){
    port=process.env.PORT
}
        else {
            port=4003
        }

app.listen(port,() => {
    console.log(`app running on port 4003`)
})