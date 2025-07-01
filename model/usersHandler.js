const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

class Users {
  constructor() {
    this.usersPath = path.join(__dirname, process.env.USERS_DATA_PATH);
  }

  async loadUsers() {
    try {
      const users = await fs.readFile(this.usersPath, "utf-8");
      return JSON.parse(users);
    } catch (err) {
      if (err.code === "ENOENT") {
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

        const newUser = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
            pwd: userData.pwd,
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

    users.splice(userIndex, 1); 
    await this.saveUser(users); // This will throw an error when it fails so no neeed for try/catch

    return { success: true};
  }

  async getAllUser(){
    return await this.loadUsers();
  } 

};

module.exports = Users; 