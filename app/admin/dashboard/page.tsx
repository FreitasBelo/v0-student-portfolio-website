import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SignOutButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminDashboard() {
  const user = await currentUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <div className="hidden md:flex space-x-4">
                <Link href="/admin/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/admin/projects" className="text-gray-700 hover:text-gray-900">
                  Projects
                </Link>
                <Link href="/admin/experience" className="text-gray-700 hover:text-gray-900">
                  Experience
                </Link>
                <Link href="/admin/skills" className="text-gray-700 hover:text-gray-900">
                  Skills
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.emailAddresses[0]?.emailAddress}</span>
              <SignOutButton>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Projects</h3>
            <p className="text-3xl font-bold mt-2">0</p>
            <Link href="/admin/projects" className="text-blue-600 text-sm mt-2 inline-block">
              Manage →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Experience</h3>
            <p className="text-3xl font-bold mt-2">0</p>
            <Link href="/admin/experience" className="text-blue-600 text-sm mt-2 inline-block">
              Manage →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Skills</h3>
            <p className="text-3xl font-bold mt-2">0</p>
            <Link href="/admin/skills" className="text-blue-600 text-sm mt-2 inline-block">
              Manage →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Portfolio</h3>
            <p className="text-3xl font-bold mt-2">Live</p>
            <Link href="/" className="text-blue-600 text-sm mt-2 inline-block">
              View →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Welcome to Your Admin Panel</h2>
          <p className="text-gray-600 mb-4">
            Here you can manage all aspects of your portfolio. Use the navigation above to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Add, edit, and delete projects</li>
            <li>Manage your work experience</li>
            <li>Update your skills and expertise</li>
            <li>View your live portfolio</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
