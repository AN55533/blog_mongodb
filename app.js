
// app.get('/api/blog/:id', (req,res) => {
//     const id = req.params.id;
//     const blogs = blogPosts.find(blog => blog.BlogID == id);
//     if (!blogs) {
//         return res.status(404).json({ error: 'Blog not found' });
//     }
//     res.json(blogs);
// })

// app.post('/blog', (req,res) => {
//     const {BlogID, title, author, content } = req.body;
//     console.log(req.body);
//     const newPost = {BlogID, title, author, content };
//     blogPosts.push(newPost);
//     console.log(blogPosts);
//     res.redirect('/submitted');
// })

// app.listen(3000, () => {
//     console.log("The server is starting on port 3000")
// })




const express = require('express');
const path = require('path');
const app = express();
const mongoose=require('mongoose');
const sample=require('./models/blogdetails.js')
const dotenv=require('dotenv');
dotenv.config();

const uri = process.env.mongo_uri;

mongoose.connect(
    uri // using .env
);
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database Connected");
});


// app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
});

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/viewallblogs', (req, res) => {
    res.send(blogPosts)
})

 






app.post('/submit-form',async (req, res) => {
    try{
        const data=req.body;
        console.log(data)
        const details= await sample.create(data);
        res.status(201).redirect('/thank-you');
    
       }
    catch(error){
    res.status(500).json
    }
        

});

app.get("/blog/:id", (req, res) => {
   
      res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
      
    });
    
    app.get('/api/blog/:id',async (req, res) => {
        const id= req.params.id;
        const details= await sample.findOne({BlogID: id})
        console.log(details);
        res.json(details);
    });


const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});