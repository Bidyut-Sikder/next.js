import express from 'express';

const app = express();

app.get('/messages', (req, res) => {
  const requestSource = req.headers['x-id'];
   console.log(requestSource);
  //  console.log(`${new Date().toISOString()}: EXECUTING /messages on backend from ${requestSource}`);

  res.json([
    { id: 1, text: 'Hello World' },
    { id: 2, text: 'Another message from the separate backend' },
  ]); 
});
  
app.listen(8080,() => {
  console.log('Backend listening on port 8080');
});      
             
            
           
     
     
   
   