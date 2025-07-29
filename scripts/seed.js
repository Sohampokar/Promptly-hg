const { seedDatabase } = require('../lib/database/seed.ts')

async function runSeed() {
  try {
    await seedDatabase()
    console.log('Seeding completed')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

runSeed()