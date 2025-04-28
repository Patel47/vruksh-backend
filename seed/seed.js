import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

dotenv.config();

const seedUsers = async () => {
  try {
    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    // Create test customer
    const customerUser = await User.create({
      name: "Test Customer",
      email: "customer@example.com",
      password: "123456",
      role: "customer",
    });

    console.log("Users seeded successfully");
    return { adminUser, customerUser };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};

const seedCategories = async () => {
  try {
    const categories = [
      {
        name: "Indoor Plants",
        description: "Plants suitable for indoor environments",
      },
      {
        name: "Outdoor Plants",
        description: "Plants suitable for outdoor environments",
      },
      {
        name: "Flowering Plants",
        description: "Beautiful flowering plants",
      },
      {
        name: "Medicinal Plants",
        description: "Plants with medicinal properties",
      },
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log("Categories seeded successfully");
    return createdCategories;
  } catch (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
};

const seedProducts = async (categories) => {
  try {
    const products = [
      {
        name: "Monstera Deliciosa",
        description: "A popular indoor plant with large, glossy leaves",
        price: 29.99,
        category: categories[0]._id,
        stock: 20,
        images: [
          {
            public_id: "monstera_deliciosa_1",
            url: "https://example.com/monstera1.jpg",
          },
        ],
      },
      {
        name: "Rose Bush",
        description: "Beautiful flowering rose bush",
        price: 39.99,
        category: categories[2]._id,
        stock: 15,
        images: [
          {
            public_id: "rose_bush_1",
            url: "https://example.com/rose1.jpg",
          },
        ],
      },
      {
        name: "Aloe Vera",
        description: "Medicinal plant with healing properties",
        price: 19.99,
        category: categories[3]._id,
        stock: 30,
        images: [
          {
            public_id: "aloe_vera_1",
            url: "https://example.com/aloe1.jpg",
          },
        ],
      },
    ];

    await Product.insertMany(products);
    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    console.log("Database cleared");

    // Seed data
    await seedUsers();
    const categories = await seedCategories();
    await seedProducts(categories);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};

export default seedDatabase;
