"use client"

import { useEffect, useState } from "react"
import { User, Mail, Shield, Lock, Check } from "lucide-react"

export default function AccountPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/session")
        if (res.ok) {
          const session = await res.json()
          if (session?.user) {
            setName(session.user.name ?? "")
            setEmail(session.user.email ?? "")
            setUserId(session.user.id ?? "")
          }
        }
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Something went wrong" })
        return
      }

      setMessage({ type: "success", text: "Profile updated" })
    } catch {
      setMessage({ type: "error", text: "Something went wrong" })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage({ type: "", text: "" })

    if (passwordForm.new !== passwordForm.confirm) {
      setMessage({ type: "error", text: "Passwords do not match" })
      return
    }
    if (passwordForm.new.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" })
      return
    }

    setSaving(true)
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordForm.new }),
      })

      if (!res.ok) {
        const data = await res.json()
        setMessage({ type: "error", text: data.error || "Failed to change password" })
        return
      }

      setMessage({ type: "success", text: "Password changed" })
      setPasswordForm({ current: "", new: "", confirm: "" })
      setShowPassword(false)
    } catch {
      setMessage({ type: "error", text: "Something went wrong" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-100 rounded w-48" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">My Account</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your profile and security settings</p>
      </div>

      {/* Messages */}
      {message.text && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center text-white text-lg font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Profile</h2>
            <p className="text-sm text-slate-400">Your public information</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
              <User size={14} className="text-slate-400" />
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
              <Mail size={14} className="text-slate-400" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
          >
            <Check size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <Lock size={18} className="text-slate-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Security</h2>
            <p className="text-sm text-slate-400">Change your password</p>
          </div>
        </div>

        {showPassword ? (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwordForm.new}
                onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                placeholder="Repeat new password"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                <Lock size={14} />
                {saving ? "Changing..." : "Change Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPassword(false)
                  setPasswordForm({ current: "", new: "", confirm: "" })
                }}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 text-sm font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowPassword(true)}
            className="px-5 py-2.5 border border-slate-200 text-[#0F172A] text-sm font-medium rounded-xl hover:border-[#F59E0B] transition-colors"
          >
            Change Password
          </button>
        )}
      </div>

      {/* Role (read-only) */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-slate-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Role</h2>
            <p className="text-sm text-slate-400">Contact an admin to change your role</p>
          </div>
        </div>
      </div>
    </div>
  )
}
