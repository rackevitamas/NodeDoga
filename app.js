import express from 'express';
import path from 'path';
import { start } from 'repl';
import { fileURLToPath } from 'url';

const PORT = 3000;
const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const users = [
    { id: "1",  name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Sam Johnson" },
  ];

app.get('/hi', (req, res) => {
    res.send("Hi, there!");
});

app.get('/express', (req, res) => {
    res.send("Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült");
});


app.get('/greeting ', (req, res) => {
    res.send("Hello,  John Doe");
});


app.get('/nodejs', (req, res) => {
    res.send("A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(root, 'public', 'index.html'))
});

app.use(express.static(path.join(root, 'public', 'index.html')));

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const [users] = users.filter(e => e.id == id);
    if (!users) {
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(users);
});

app.post('/api/users', (req, res) => {
    const name = req.body.name;
    users.sort((a, b) => a.id - b.id);
    const id = users[users.length - 1].id + 1;
    const user = {id: id, name: name};
    users.push(user);
    res.status(201).json(user);
})

app.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const [user] = users.filter(e => e.id == id);
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    user.name = name;
    users[users.indexOf(user)] = user;
    res.status(200).json(user);
});

app.delete('/api/users', (req, res) => {
    const id = req.params.id;
    const user = users.filter(e => e.id == id);
    res.sendStatus(204);
})

app.listen(PORT, () => {console.log(`A szerver portja: ${PORT}`)});