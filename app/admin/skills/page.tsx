"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 50,
    order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills")
      const data = await res.json()
      setSkills(data)
    } catch (error) {
      console.error("Failed to fetch skills:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingSkill
        ? `/api/skills/${editingSkill.id}`
        : "/api/skills"
      const method = editingSkill ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsDialogOpen(false)
        resetForm()
        fetchSkills()
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to save skill:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      level: 50,
      order: 0,
    })
    setEditingSkill(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <div className="flex space-x-4">
                <Link href="/admin/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/admin/projects" className="text-gray-700 hover:text-gray-900">
                  Projects
                </Link>
                <Link href="/admin/experience" className="text-gray-700 hover:text-gray-900">
                  Experience
                </Link>
                <Link href="/admin/skills" className="text-gray-900 font-semibold">
                  Skills
                </Link>
              </div>
            </div>
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Skills</h1>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button>Add Skill</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the skill details
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="React, TypeScript, Python..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="Frontend, Backend, Tools..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="level">Proficiency Level (0-100)</Label>
                  <Input
                    id="level"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({ ...formData, level: parseInt(e.target.value) })
                    }
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.level}% proficiency
                  </p>
                </div>
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingSkill ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : skills.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No skills yet. Click "Add Skill" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Proficiency</TableHead>
                  <TableHead>Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium">{skill.name}</TableCell>
                    <TableCell>{skill.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{skill.order}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
