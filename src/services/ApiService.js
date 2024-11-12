// ApiService.js
import axios from "axios"; // Import axios
const fs = require("fs"); // For reading file streams in Node.js
const FormData = require("form-data"); // For creating FormData in Node.js

import { config } from "dotenv";

config();

class ApiService {
  constructor() {
    // Base64 encoding of username:password for Basic Authentication
    const username = process.env.PACS_USERNAME;
    const password = process.env.PACS_PASSWORD;
    const authString = btoa(`${username}:${password}`); // Base64 encode
    const url = process.env.AI_SERVICE;

    this.client = axios.create({
      baseURL: url, // Set the base URL
      headers: {
        Accept: "application/json",
        // Authorization: `Basic ${authString}`,
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

  async getFile(endpoint) {
    try {
      const response = await this.client.get(endpoint, {
        responseType: "arraybuffer",
        headers: { Accept: "application/dicom" },
      });

      // console.log(Buffer.from(response.data), "buffer");
      return Buffer.from(response.data);
    } catch (error) {
      throw new Error(`Error in PACS GET request: ${error.message}`);
    }
  }

  async postFile(endpoint, fileData) {
    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Attach the file stream with a custom filename and content type
      formData.append("file", fs.createReadStream(`${fileData.path}`), {
        filename: `${fileData.filename}`,
        contentType: "application/octet-stream",
      });

      // Use axios to post with FormData headers
      const response = await this.client.post(endpoint, formData, {
        headers: {
          ...formData.getHeaders(), // Adds necessary FormData headers
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error in PACS POST request: ${error.message}`);
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

export default new ApiService();

// // pacsService.js
// import axios from "axios"; // Import axios

// import { config } from "dotenv";

// config();

// class PacsService {
//   constructor() {
//     // Base64 encoding of username:password for Basic Authentication
//     const username = process.env.PACS_USERNAME;
//     const password = process.env.PACS_PASSWORD;
//     const authString = btoa(`${username}:${password}`); // Base64 encode

//     this.client = axios.create({
//       baseURL: process.env.PACS_BASE_URL, // Set the base URL from environment variables
//       headers: {
//         Accept: "application/json",
//         Authorization: `Basic ${authString}`, // Add Basic Authorization header
//       },
//     });
//   }

//   async get(endpoint) {
//     try {
//       const response = await this.client.get(endpoint);
//       return response.data;
//     } catch (error) {
//       throw new Error(`Error in PACS GET request: ${error.message}`);
//     }
//   }

//   async getFile(endpoint) {
//     try {
//       const response = await this.client.get(endpoint, {
//         responseType: "arraybuffer",
//         headers: { Accept: "application/dicom" },
//       });

//       // console.log(Buffer.from(response.data), "buffer");
//       return Buffer.from(response.data);
//     } catch (error) {
//       throw new Error(`Error in PACS GET request: ${error.message}`);
//     }
//   }

//   async post(endpoint, data) {
//     try {
//       const response = await this.client.post(endpoint, data);
//       return response.data;
//     } catch (error) {
//       throw new Error(`Error in PACS POST request: ${error.message}`);
//     }
//   }

//   async put(endpoint, data) {
//     try {
//       const response = await this.client.put(endpoint, data);
//       return response.data;
//     } catch (error) {
//       throw new Error(`Error in PACS PUT request: ${error.message}`);
//     }
//   }

//   async delete(endpoint) {
//     try {
//       const response = await this.client.delete(endpoint);
//       return response.data;
//     } catch (error) {
//       throw new Error(`Error in PACS DELETE request: ${error.message}`);
//     }
//   }
// }

// export default new PacsService();