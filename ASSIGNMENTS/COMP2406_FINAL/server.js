const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;


/*

    make a user admin
    update users set role = 'admin' where username = 'ENTER THE USERNAME HERE'
*/
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for session
app.use(session({
  secret: 'your-secret-key', // Change this to a secure random key
  resave: false,
  saveUninitialized: true,
}));

// SQLite database setup
const db = new sqlite3.Database('users.db');
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT NOT NULL DEFAULT 'guest' -- Added 'role' column with default value 'guest'
  )
`);
db.run (`
    CREATE TABLE IF NOT EXISTS comments (
        comment_id INTEGER PRIMARY KEY,
        user_username TEXT,
        comment_text TEXT,
        FOREIGN KEY (user_username) REFERENCES users(username)
      );
    `
)

// db.run('UPDATE users SET role = "guest" WHERE role IS NULL', (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Updated existing users to set default value for "role"');
//     }
//   });

// Middleware to check if the user is logged in
function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
}

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/protected');
  } else {
    res.render('index');
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Insert user into the SQLite database with the default role 'guest'
  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, "guest")', [username, password], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error signing up');
    } else {
      req.session.user = { username };
      res.redirect('/');
    }
  });
});


// Middleware to check if the user has the role 'admin'
async function requireAdmin(req, res, next) {
    try {
        const username = req.session.user && req.session.user.username;

        // Retrieve the user's role from the database
        const userRole = await getUserRoleFromDatabase(username);

        if (userRole === 'admin') {
            next();
        } else {
            res.status(403).send('Access forbidden');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
function getAllUsersFromDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('users.db');
        db.all('SELECT id, username, role FROM users', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
        db.close();
    });
}
// Function to get user role from the database
function getUserRoleFromDatabase(username) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database('users.db');
        db.get('SELECT role FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row.role : null);
            }
        });
        db.close();
    });
}
app.get('/admin', requireAdmin, async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await getAllUsersFromDatabase();

        // Render the admin template with the user data
        res.render('admin', { username: req.session.user.username, users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    } else {
      if (row) {
        req.session.user = { username };
        res.redirect('/');
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
  });
});

app.get('/protected', requireLogin, async (req, res) => {
  try {
    const apiKey = '6c7bb4706b5b7520a7cf5f3b1bfc2935';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Ottawa&appid=${apiKey}`;
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Fetch comments from the database
    db.all('SELECT * FROM comments', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching comments');
      } else {
        // Render the weather template with weather data and comments
        res.render('weather', { username: req.session.user.username, weatherData, comments: rows });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/post-comment', (req, res) => {
    console.log(req.body);

    const { user, text } = req.body;
    console.log('Received comment from user:', user);
    console.log('Comment text:', text);

    // Process the comment as needed

    // Insert the comment into the database
    db.run('INSERT INTO comments (user_username, comment_text) VALUES (?, ?)', [user, text], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error signing up');
        } else {
            
            // Redirect the user to a different page
            res.redirect('/protected');
        }
    });
});

app.post('/wipe-comments', requireAdmin, (req, res) => {
    // Wipe out the comments table
    db.run('DELETE FROM comments', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error wiping out comments');
        } else {
            res.redirect('/admin');
        }
    });
});

app.listen(port, () => {
  console.log("SERVER IS RUNNING. VISIT THE FOLLOWING LINKS:")
  console.log(`http://localhost:${port}`);
  console.log(`http://localhost:${port}/protected`);
  console.log(`http://localhost:${port}/admin`);
});
