const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

// 🔐 Permission rules based on Unix-style access control:
// Format: owner / logged-in / public
// 640 → owner can write, logged-in can read, public denied
// 664 → logged-in can write, public can read
// 660 → logged-in can write and read
// 644 → owner can write, public can read
// 600 → owner only
// 444 → public read-only
// 440 → logged-in read-only
// 400 → owner read-only
const rules = auth.rewriter({
  tutorials: 640,
  posts: 664,
  comments: 660,
  profiles: 644,
  messages: 600,
  news: 444,
  alerts: 440,
  audits: 400
});

// Bind the database to the app (required for json-server-auth)
app.db = router.db;

// Enable CORS for frontend access
app.use(cors());

// Apply permission rules before authentication
app.use(rules);

// Apply authentication middleware before routing
app.use(auth);

// Route requests to the database
app.use(router);

// Start the server
app.listen(3000, () => {
  console.log('JSON Server with Auth is running on port 3000');
});
