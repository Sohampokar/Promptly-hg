import { connectToDatabase } from './connection'
import { User } from './models/User'
import { Course } from './models/Course'

export async function seedDatabase() {
  try {
    await connectToDatabase()

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@promptmaster.com' })
    if (!adminExists) {
      const admin = new User({
        email: 'admin@promptmaster.com',
        password: 'Admin123!@#',
        name: 'Admin User',
        role: 'admin',
        subscription: 'enterprise',
        security: {
          emailVerified: true
        }
      })
      await admin.save()
      console.log('Admin user created')
    }

    // Create instructor user
    const instructorExists = await User.findOne({ email: 'instructor@promptmaster.com' })
    if (!instructorExists) {
      const instructor = new User({
        email: 'instructor@promptmaster.com',
        password: 'Instructor123!@#',
        name: 'Dr. Sarah Chen',
        role: 'instructor',
        subscription: 'premium',
        profile: {
          bio: 'AI Research Scientist with 10+ years experience in natural language processing and machine learning.',
          avatar: '/placeholder.svg?height=64&width=64'
        },
        security: {
          emailVerified: true
        }
      })
      await instructor.save()
      console.log('Instructor user created')

      // Create foundation course
      const foundationExists = await Course.findOne({ slug: 'foundation-track' })
      if (!foundationExists) {
        const foundationCourse = new Course({
          title: 'Foundation Track',
          description: 'Master the fundamentals of prompt engineering with this comprehensive beginner course.',
          slug: 'foundation-track',
          difficulty: 'Beginner',
          category: 'fundamentals',
          tags: ['basics', 'prompting', 'ai-communication'],
          instructor: instructor._id,
          prerequisites: [],
          learningObjectives: [
            'Understand what prompt engineering is and why it matters',
            'Learn the anatomy of effective prompts',
            'Master basic prompting techniques',
            'Practice writing clear, specific instructions'
          ],
          duration: {
            estimated: 4,
            unit: 'weeks'
          },
          pricing: {
            type: 'free'
          },
          modules: [
            {
              title: 'Introduction to Prompting',
              description: 'Learn the fundamentals of AI communication',
              order: 1,
              estimatedDuration: 60,
              isLocked: false,
              lessons: [
                {
                  title: 'What is Prompt Engineering?',
                  description: 'Understanding the basics of prompt engineering',
                  type: 'theory',
                  content: {
                    text: 'Prompt engineering is the art and science of crafting effective instructions for AI models...'
                  },
                  duration: 15,
                  order: 1,
                  isPreview: true,
                  xpReward: 100
                },
                {
                  title: 'Understanding AI Models',
                  description: 'How AI models process and respond to prompts',
                  type: 'theory',
                  content: {
                    text: 'AI models like GPT-4, Claude, and Gemini work by predicting the next word...'
                  },
                  duration: 20,
                  order: 2,
                  isPreview: false,
                  xpReward: 100
                }
              ]
            }
          ],
          settings: {
            isPublished: true,
            allowComments: true,
            certificateEnabled: true
          }
        })
        await foundationCourse.save()
        console.log('Foundation course created')
      }
    }

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Seed database error:', error)
  }
}