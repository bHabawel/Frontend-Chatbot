This was deployed in Vercel. Its API came from Backend-Chatbot Repository which was deployed in Render.

To make the Backend-Chatbot run locally.
Remove "api." in every import since it is specific to Render only.

For Backend:

1. Open Terminal
2. python train.py
3. python app.py
4. use the server which it shows. Typically 127.0.0.1:5000

For Frotend:

1. Chang the fetched api into the server URL of Backend.
2. Then Go live or click live server.
3. Live Server will show a port most likely 5500 or 3000
4. Change 127.0.0.1:5000 into 127.0.0.1:5500 depending if its 5500 or 3000

Note:

1. Also add /public/ in the index.html for the link and script
   /public/static/css.....
   /public/static/js.....
   Thank youuuuu!!
