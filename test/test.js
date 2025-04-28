import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "http://localhost:5000/api";

// Test user credentials
const testUser = {
  name: "Test Customer",
  email: "customer@example.com",
  password: "123456",
};

const adminUser = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
};

let userToken = "";
let adminToken = "";

// Helper function to make authenticated requests
const makeAuthRequest = async (method, url, data = null, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    switch (method.toLowerCase()) {
      case "get":
        return await axios.get(`${API_URL}${url}`, config);
      case "post":
        return await axios.post(`${API_URL}${url}`, data, config);
      case "put":
        return await axios.put(`${API_URL}${url}`, data, config);
      case "delete":
        return await axios.delete(`${API_URL}${url}`, config);
      default:
        throw new Error("Invalid HTTP method");
    }
  } catch (error) {
    console.error(
      `Error in ${method} ${url}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Test Authentication
const testAuthentication = async () => {
  console.log("Testing Authentication...");

  // First, run the seed script to ensure we have a clean database state
  try {
    await axios.post(`${API_URL}/seed`);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(
      "Error seeding database:",
      error.response?.data || error.message
    );
    throw error;
  }

  // Login test user
  try {
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    userToken = loginResponse.data.token;
    console.log("User login successful");
  } catch (error) {
    console.error("User login failed:", error.response?.data || error.message);
    throw error;
  }

  // Login admin
  try {
    const adminLoginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: adminUser.email,
      password: adminUser.password,
    });
    adminToken = adminLoginResponse.data.token;
    console.log("Admin login successful");
  } catch (error) {
    console.error("Admin login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Test Product Management
const testProductManagement = async () => {
  console.log("\nTesting Product Management...");

  // Get existing categories
  const categoriesResponse = await makeAuthRequest(
    "get",
    "/categories",
    null,
    userToken
  );
  const categories = categoriesResponse.data;
  console.log("Categories fetched successfully");

  // Use the first category for product creation
  const categoryId = categories[0]._id;

  // Create product
  const productResponse = await makeAuthRequest(
    "post",
    "/products",
    {
      name: "Test Plant",
      description: "A beautiful test plant",
      price: 29.99,
      category: categoryId,
      stock: 10,
    },
    adminToken
  );
  const productId = productResponse.data._id;
  console.log("Product created successfully");

  // Get products
  const productsResponse = await makeAuthRequest(
    "get",
    "/products",
    null,
    userToken
  );
  console.log("Products fetched successfully");

  // Update product
  await makeAuthRequest(
    "put",
    `/products/${productId}`,
    {
      price: 39.99,
    },
    adminToken
  );
  console.log("Product updated successfully");

  return productId;
};

// Test Cart Management
const testCartManagement = async (productId) => {
  console.log("\nTesting Cart Management...");

  // Add to cart
  await makeAuthRequest(
    "post",
    "/cart",
    {
      productId,
      quantity: 2,
    },
    userToken
  );
  console.log("Item added to cart successfully");

  // Get cart
  const cartResponse = await makeAuthRequest("get", "/cart", null, userToken);
  console.log("Cart fetched successfully");

  // Update cart item
  await makeAuthRequest(
    "put",
    `/cart/${productId}`,
    {
      quantity: 3,
    },
    userToken
  );
  console.log("Cart item updated successfully");
};

// Test Order Management
const testOrderManagement = async () => {
  console.log("\nTesting Order Management...");

  // Create order
  const orderResponse = await makeAuthRequest(
    "post",
    "/orders",
    {
      shippingAddress: {
        street: "123 Test St",
        city: "Test City",
        state: "TS",
        country: "Test Country",
        zipCode: "12345",
      },
      paymentMethod: "COD",
    },
    userToken
  );
  console.log("Order created successfully");

  // Get orders
  const ordersResponse = await makeAuthRequest(
    "get",
    "/orders",
    null,
    userToken
  );
  console.log("Orders fetched successfully");

  // Update order status (admin)
  await makeAuthRequest(
    "put",
    `/orders/${orderResponse.data._id}`,
    {
      orderStatus: "Confirmed",
    },
    adminToken
  );
  console.log("Order status updated successfully");
};

// Run all tests
const runTests = async () => {
  try {
    await testAuthentication();
    const productId = await testProductManagement();
    await testCartManagement(productId);
    await testOrderManagement();
    console.log("\nAll tests completed successfully!");
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exit(1);
  }
};

runTests();
