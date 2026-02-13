"use client"

import { useState } from "react"
import { Users, DollarSign, FolderKanban, TrendingUp } from "lucide-react"
import { GlassSidebar } from "@/components/glass-sidebar"
import { GlassTopBar } from "@/components/glass-top-bar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { StatCard } from "@/components/stat-card"
import { GlassChart } from "@/components/glass-chart"
import { ActivityList } from "@/components/activity-list"
import { ProjectsTable } from "@/components/projects-table"
import { DetailPanel } from "@/components/detail-panel"

const stats = [
  { icon: Users, label: "Total Users", value: "12,849", change: "+12.5%", positive: true },
  { icon: DollarSign, label: "Revenue", value: "$91,200", change: "+8.2%", positive: true },
  { icon: FolderKanban, label: "Active Projects", value: "47", change: "+3", positive: true },
  { icon: TrendingUp, label: "Conversion Rate", value: "3.24%", change: "-0.4%", positive: false },
]

interface ActivityItem {
  id: number
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  title: string
  description: string
  time: string
}

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null)

  return (
    <div className="mesh-gradient min-h-screen">
      {/* Desktop Sidebar */}
      <GlassSidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Top Bar */}
      <GlassTopBar onMenuToggle={() => setMobileMenuOpen(true)} />

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 lg:pl-[272px] lg:pr-4">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight text-balance">
            Good morning, Alex
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            {"Here's what's happening across your projects today."}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Chart + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="xl:col-span-2">
            <GlassChart />
          </div>
          <div className="glass-card rounded-[2rem] p-6 flex flex-col max-h-[380px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Today</span>
            </div>
            <div className="flex-1 overflow-y-auto -mx-2">
              <ActivityList
                onItemClick={(item) => setSelectedActivity(item as ActivityItem)}
              />
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <ProjectsTable />
      </main>

      {/* Detail Slide-over Panel */}
      <DetailPanel
        item={selectedActivity as Parameters<typeof DetailPanel>[0]["item"]}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  )
}
