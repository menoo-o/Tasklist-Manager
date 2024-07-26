import express from 'express';
import mongoose from 'mongoose';
import Todo from './models/task.model.js'

const app = express();
app.use(express.json());
const PORT = 3000;


//Display All Todos
app.get('/api/todos', async ( req , res ) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error){
        res.status(500).json({message:error.message})
    }
}) 

//Display todo with an id
app.get('/api/todos/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const todos = await Todo.findById(id)
        res.status(200).json(todos);
    } catch (error){
        res.status(500).json({message:error.message})
    }
})

//POST Method
app.post('/api/todos', async (req, res)=>{

    try{
       const todo = await Todo.create(req.body);
       res.status(200).json(todo);

       } catch (error){
        res.status(400).json({message: error.message})
       }
})


//PATCH Method
app.patch('/api/todos/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const todo = await Todo.findByIdAndUpdate(id, req.body)
        if(!todo){
            res.status(200).json({message:"task not found"})
        }

        const updatedTodo = await Todo.findById(id);
        res.status(200).json(updatedTodo);

    } catch(error){
        res.status(500).json({message:error.message})
    }
})


//DElete tasks
app.delete("/api/todos/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            res.status(200).json({message:"task does not exists or has been deleted already"})
        }  
        res.status(200).json({message:"todo task deleted"});
      } catch(error){
        res.status(500).json({message:error.message})
      }

})




//listening at server
app.listen(PORT, (req,res)=>{
    mongoose.connect('mongodb+srv://menosuper6:A44BPJkWRFcAcF4o@backenddb.enm3wy7.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
     .then(() => {
        console.log('Connected to DB!');
     })
    .catch(()=>{
        console.log('DB connection unsuccessful');
     })
     

    console.log(`server listening at port ${PORT}`);
})