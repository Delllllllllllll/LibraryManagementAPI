const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

class Users {
  constructor() {
    this.usersPath = path.join(__dirname, "../data/users.json");
  }

  async loadUsers() {
    try {
      const users = await fs.readFile(this.usersPath, "utf-8");
      return JSON.parse(users);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }
      throw err.message;
    }
  }

  async saveUser(users) {
    await fs.writeFile(this.usersPath, JSON.stringify(users, null, 2));
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

    try {
        const newUser = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
            pwd: userData.pwd,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        users.push(newUser);
        await this.saveUser(users);

        return newUser;
    } catch (err) {
      console.error("Something went wrong: ", err);
      next(err);
    }
  }

  async delete(id) {
    const users = await this.loadUsers();
    const userIndex = users.findIndex(user => user.id ===  id);
    
    if(users.length < 1) return { message: `No user is registered`} 
    if(userIndex === -1) return { success: false };
    users.splice(userIndex, 1); 
    await this.saveUser(users);

    return { success: true};
  }

  async getAllUser(){
    return await this.loadUsers();
  } 

};


module.exports = Users; 