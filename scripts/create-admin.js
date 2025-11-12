// Run this script to create your first admin account
// Usage: node scripts/create-admin.js

const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const readline = require("readline")

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function createAdmin() {
  try {
    console.log("\n=== Create Admin Account ===\n")

    const email = await question("Enter admin email: ")
    const name = await question("Enter admin name: ")
    const password = await question("Enter admin password: ")

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("\n❌ User with this email already exists!")
      rl.close()
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "admin",
      },
    })

    console.log("\n✅ Admin account created successfully!")
    console.log(`Email: ${user.email}`)
    console.log(`Name: ${user.name}`)
    console.log(`\nYou can now login at: http://localhost:3000/admin/login\n`)
  } catch (error) {
    console.error("\n❌ Error creating admin:", error.message)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createAdmin()
