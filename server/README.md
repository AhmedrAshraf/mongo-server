# MongoDB Atlas Server

A complete REST API server built with Express.js and MongoDB Atlas, featuring user management with full CRUD operations.

## 🚀 Features

- **MongoDB Atlas Integration** - Cloud-hosted MongoDB database
- **RESTful API** - Complete CRUD operations for users
- **Data Validation** - Mongoose schema validation
- **Error Handling** - Comprehensive error handling and responses
- **CORS Support** - Cross-origin resource sharing enabled
- **Search Functionality** - Search users by name or email
- **Environment Configuration** - Flexible configuration management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- MongoDB Compass (optional, for database visualization)

## 🛠️ Installation

1. **Clone or download the project**
   ```bash
   cd mongo-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB Atlas**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster or use existing one
   - Get your connection string

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=development
   ```

   **Or update the `config.js` file directly:**
   ```javascript
   MONGODB_URI: 'your-mongodb-atlas-connection-string-here'
   ```

## 🔧 MongoDB Atlas Setup

### Step 1: Get Your Connection String
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click on your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string

### Step 2: Update Configuration
Replace the placeholder in `config.js`:
```javascript
MONGODB_URI: 'mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority'
```

### Step 3: Network Access
1. In Atlas, go to "Network Access"
2. Add your IP address or use `0.0.0.0/0` for all IPs (development only)

### Step 4: Database User
1. In Atlas, go to "Database Access"
2. Create a database user with read/write permissions

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Health Check
- **GET** `/`
- **Description**: Check if server is running
- **Response**: Server status and timestamp

#### Users

**Get All Users**
- **GET** `/api/users`
- **Description**: Retrieve all users
- **Response**: Array of user objects

**Get User by ID**
- **GET** `/api/users/:id`
- **Description**: Retrieve a specific user
- **Response**: Single user object

**Create User**
- **POST** `/api/users`
- **Description**: Create a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
  ```
- **Response**: Created user object

**Update User**
- **PUT** `/api/users/:id`
- **Description**: Update an existing user
- **Body**: Same as create (all fields optional)
- **Response**: Updated user object

**Delete User**
- **DELETE** `/api/users/:id`
- **Description**: Delete a user
- **Response**: Deleted user object

**Search Users**
- **GET** `/api/users/search/:query`
- **Description**: Search users by name or email
- **Response**: Array of matching users

## 📊 User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  age: Number (0-150),
  createdAt: Date (auto-generated)
}
```

## 🔍 Testing with MongoDB Compass

1. **Connect Compass to Atlas**
   - Open MongoDB Compass
   - Use your Atlas connection string
   - Connect to your database

2. **View Collections**
   - Navigate to your database
   - Find the `users` collection
   - View, edit, or delete documents directly

3. **Test Queries**
   - Use Compass to test MongoDB queries
   - Verify data consistency with your API

## 🧪 Testing the API

### Using cURL

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":30}'
```

**Get all users:**
```bash
curl http://localhost:3000/api/users
```

**Search users:**
```bash
curl http://localhost:3000/api/users/search/john
```

### Using Postman or Insomnia
Import these endpoints into your API testing tool for easier testing.

## 🛡️ Error Handling

The API includes comprehensive error handling:
- **400**: Bad Request (validation errors)
- **404**: Not Found (user not found)
- **500**: Internal Server Error

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### Customization
- Modify `config.js` for different configurations
- Update the User schema in `server.js` for different data models
- Add new routes for additional functionality

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests! 