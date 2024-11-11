// pacsService.js
import { create } from "axios";
import { config } from "dotenv";

config();

class PacsService {
  constructor() {
    this.client = create({
      baseURL: process.env.PACS_BASE_URL,
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${process.env.PACS_API_KEY}`,
      },
    });
  }

  async get(endpoint) {
    try {
      const response = await this.client.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Error in PACS GET request: ${error.message}`);
    }
  }

  async post(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error in PACS POST request: ${error.message}`);
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.client.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`Error in PACS PUT request: ${error.message}`);
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(`Error in PACS DELETE request: ${error.message}`);
    }
  }
}

export default new PacsService();
