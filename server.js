const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

let intial_path = path.join(__dirname, "public");

let app = express();
app.use(express.static(intial_path));

app.get('/', (req,res) =>{
	res.sendFile(path.join(intial_path, "index.html"));
})

app.get('/:id', (req, res) => {
	res.sendFile(path.join(intial_path, "about.html"));
})

app.use((req, res) => {
	res.json("404");
})

app.listen(PORT, ()=> {
   console.log('listening on port .....');
});
