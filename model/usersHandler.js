const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class Users {
  constructor() {
    this.usersPath = path.join(__dirname, process.env.USERS_DATA_PATH);
    this.cacheUsers = null, 
    this.lastModified = null 
  }

  async loadUsers() {
    try {
      const stats = await fs.stat(this.usersPath); 
      console.log(`This is the cache: `, this.cacheUsers);
      // If the there is cache meaning it's not null
      // And if the lastModified >= lastMofiedTime then meaning we can use the old one
      if(this.cacheUsers && this.lastModified >= stats.mtime){
        return this.cacheUsers; 
      }
      
      // If there is no cache yet 
      const users = await fs.readFile(this.usersPath, "utf-8");
      this.cacheUsers = JSON.parse(users);
      this.lastModified = stats.mtime;

      return JSON.parse(users);
    } catch (err) {
      if (err.code === "ENOENT") { // This means if the file is missing just return []
        return [];
      }
      throw err;
    }
  }

  async saveUser(users) {
    try{
      await fs.writeFile(this.usersPath, JSON.stringify(users, null, 2));
    }catch(err) {
      throw new Error(`Failed to save users to ${this.usersPath}`);
    }
  }

  async findUserById(id) {
    const users = await this.loadUsers();
    return users.find((user) => user.id === id);
  }

  async findUserByEmail(email) {
    const users = await this.loadUsers();
    return users.find((user) => user.email === email);
  }

  async create(userData) {
    const users = await this.loadUsers();
    const saltRounds = 10; // Higher = secure but slower
    const hashedPassword = await bcrypt.hash(userData.pwd, saltRounds);

        const newUser = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
            pwd: hashedPassword,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        users.push(newUser);
        // When this function failed it will propagate the error to the error handler
        await this.saveUser(users); // since this one is already throwing error then we don't need try/catch 

        return newUser;
  }

  async delete(id) {
    const users = await this.loadUsers();
    const userIndex = users.findIndex(user => user.id ===  id);
    
    if(userIndex === -1) throw new Error('User not found');

    // Splice: The first parameter is where to start cutting inclusive
    // Splice: The second parameter is the number to cut and it will start on the first paramter index
    users.splice(userIndex, 1); 
    await this.saveUser(users); // This will throw an error when it fails so no neeed for try/catch

    return { success: true};
  }

  async getAllUser(){
    return await this.loadUsers();
  } 
};

module.exports = Users; 