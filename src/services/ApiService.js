// ApiService.js
// import axios from "axios"; // Import axios
// const fs = require("fs"); // For reading file streams in Node.js
// const FormData = require("form-data"); // For creating FormData in Node.js

// import { config } from "dotenv";

// config();

// class ApiService {
//   constructor() {
//     // Base64 encoding of username:password for Basic Authentication
//     const username = process.env.PACS_USERNAME;
//     const password = process.env.PACS_PASSWORD;
//     const authString = btoa(`${username}:${password}`); // Base64 encode
//     const url = process.env.PACS_BASE_URL.trim();

//     this.client = axios.create({
//       baseURL: url, // Set the base URL
//       headers: {
//         Accept: "application/json",
//         Authorization: `Basic ${authString}`,
//       },
//     });

//     console.log(`Requesting ${this.client.defaults.baseURL}/studies`);
//   }

//   async get(endpoint) {
//     try {
//       const response = await this.client.get(endpoint);
//       return response.data;
//     } catch (error) {
//       console.log(error, "therr");
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

//   async postFile(endpoint, fileData) {
//     try {
//       // Create a new FormData instance
//       const formData = new FormData();

//       // Attach the file stream with a custom filename and content type
//       formData.append("file", fs.createReadStream(`${fileData.path}`), {
//         filename: `${fileData.filename}`,
//         contentType: "application/octet-stream",
//       });

//       // Use axios to post with FormData headers
//       const response = await this.client.post(endpoint, formData, {
//         headers: {
//           ...formData.getHeaders(), // Adds necessary FormData headers
//         },
//       });

//       return response.data;
//     } catch (error) {
//       throw new Error(`Error in PACS POST request: ${error.message}`);
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

// export default new ApiService();

// Import axios and other dependencies
import axios from "axios";
import { config } from "dotenv";
import fs from "fs"; // Node.js file system
import FormData from "form-data"; // For creating FormData in Node.js

config();

class ApiService {
  static instance = null;

  constructor(customUrl = null) {
    if (ApiService.instance && !customUrl) {
      return ApiService.instance;
    }

    const username = process.env.PACS_USERNAME;
    const password = process.env.PACS_PASSWORD;
    const authString = btoa(`${username}:${password}`);
    const url = (customUrl || process.env.PACS_BASE_URL || "").trim();

    this.client = axios.create({
      baseURL: url,
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${authString}`,
      },
    });

    this.cache = new Map();
    this.cacheTTL = 20 * 60 * 1000; // Cache timeout: 20 minutes

    if (!customUrl) {
      ApiService.instance = this;
    }
  }

  // Static method to get/create instance with optional URL
  static getInstance(customUrl = null) {
    if (customUrl) {
      return new ApiService(customUrl);
    }
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Cache helper function to check and set cache
  getFromCache(endpoint) {
    const cacheEntry = this.cache.get(endpoint);
    if (cacheEntry && Date.now() - cacheEntry.timestamp < this.cacheTTL) {
      return cacheEntry.data;
    }
    this.cache.delete(endpoint); // Clean up expired cache
    return null;
  }

  setCache(endpoint, data) {
    this.cache.set(endpoint, { data, timestamp: Date.now() });
  }

  async get(endpoint) {
    // Check cache before making the request
    const cachedData = this.getFromCache(endpoint);
    if (cachedData) {
      console.log(`Returning cached data for ${endpoint}`);
      return cachedData;
    }

    try {
      const response = await this.client.get(endpoint);
      this.setCache(endpoint, response.data); // Cache the response
      return response.data;
    } catch (error) {
      console.error(`Error in PACS GET request: ${error.message}`);
      throw new Error(`Error in PACS GET request: ${error.message}`);
    }
  }

  async getFile(endpoint) {
    // Check cache before making the request
    const cachedData = this.getFromCache(endpoint);
    if (cachedData) {
      console.log(`Returning cached file data for ${endpoint}`);
      return cachedData;
    }

    try {
      const response = await this.client.get(endpoint, {
        responseType: "arraybuffer",
        headers: { Accept: "application/dicom" },
      });
      const fileBuffer = Buffer.from(response.data);
      this.setCache(endpoint, fileBuffer); // Cache the file buffer
      return fileBuffer;
    } catch (error) {
      throw new Error(`Error in PACS GET request: ${error.message}`);
    }
  }

  async postFile(endpoint, fileData) {
    try {
      // Ensure `fileData` is in the correct structure
      if (!fileData || !fileData.path || !fileData.originalname) {
        throw new Error("Invalid file data provided.");
      }

      const formData = new FormData();

      // Attach the file to FormData with appropriate metadata
      formData.append("file", fs.createReadStream(fileData.path), {
        filename: fileData.originalname,
        contentType: "application/octet-stream", // Set content type for binary files
      });

      // Post the formData with correct headers
      const response = await this.client.post(endpoint, formData, {
        headers: {
          ...formData.getHeaders(), // Includes Content-Type: multipart/form-data boundary
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error in PACS POST request: ${error.message}`);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
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

// Export default instance
export default ApiService.getInstance();

// Also export the class for custom URL usage
export { ApiService };
