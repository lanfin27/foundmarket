'use client'

import React from 'react'

interface SidebarItem {
  id: string
  label: string
  count?: number
  active?: boolean
  onClick?: () => void
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface SidebarProps {
  sections: SidebarSection[]
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, className = '' }) => {
  return (
    <aside className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="font-semibold text-gray-900 mb-3">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                    item.active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                  {item.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.active
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}