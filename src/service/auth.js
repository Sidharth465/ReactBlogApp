import config from "../utils/config";
import { Account, Client, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.BASE_URL).setProject(config.PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
        return userAccount;
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return (
        await this, this.account.createEmailPasswordSession(email, password)
      );
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwriter service :: getCurrentUser:: error", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("logout error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
