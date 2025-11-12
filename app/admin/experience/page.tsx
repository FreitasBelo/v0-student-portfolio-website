"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface Experience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
  order: number
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    order: 0,
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience")
      const data = await res.json()
      setExperiences(data)
    } catch (error) {
      console.error("Failed to fetch experiences:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const experienceData = {
      ...formData,
      endDate: formData.current ? null : formData.endDate,
    }

    try {
      const url = editingExperience
        ? `/api/experience/${editingExperience.id}`
        : "/api/experience"
      const method = editingExperience ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData),
      })

      if (res.ok) {
        setIsDialogOpen(false)
        resetForm()
        fetchExperiences()
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to save experience:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      order: 0,
    })
    setEditingExperience(null)
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
                <Link href="/admin/experience" className="text-gray-900 font-semibold">
                  Experience
                </Link>
                <Link href="/admin/skills" className="text-gray-700 hover:text-gray-900">
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
          <h1 className="text-2xl font-bold">Manage Experience</h1>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button>Add Experience</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExperience ? "Edit Experience" : "Add New Experience"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the work experience details
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="current"
                    checked={formData.current}
                    onChange={(e) =>
                      setFormData({ ...formData, current: e.target.checked })
                    }
                  />
                  <Label htmlFor="current">Currently working here</Label>
                </div>
                {!formData.current && (
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="order">Order</Label>
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
                    {editingExperience ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : experiences.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No experience entries yet. Click "Add Experience" to create one.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="font-medium">{exp.company}</TableCell>
                    <TableCell>{exp.position}</TableCell>
                    <TableCell>
                      {new Date(exp.startDate).toLocaleDateString()} - 
                      {exp.current ? " Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {exp.description}
                    </TableCell>
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
