import { ScrollArea } from "@radix-ui/react-scroll-area"
import { FileText, Twitter, Linkedin, MessageSquare, BookOpen } from "lucide-react"
import { ContentViewer } from "./gpt-version/ContentViewer"
import { Card } from "./ui/card"
import type { CodeStructBlock } from "@/lib/types"

interface KanbanViewProps {
  contentBlocks: CodeStructBlock[]
}

export function KanbanView({ contentBlocks }: KanbanViewProps) {
  const groupedContent = contentBlocks.reduce(
    (acc, block) => {
      const platform = block.language || "other"
      if (!acc[platform]) {
        acc[platform] = []
      }
      acc[platform].push(block)
      return acc
    },
    {} as Record<string, CodeStructBlock[]>,
  )

  const platformConfig = {
    twitter: {
      name: "X (Twitter)",
      icon: Twitter,
      color: "bg-blue-500/10 border-blue-500/20",
      headerColor: "bg-blue-500/20 text-blue-400",
    },
    linkedin: {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-600/10 border-blue-600/20",
      headerColor: "bg-blue-600/20 text-blue-300",
    },
    threads: {
      name: "Threads",
      icon: MessageSquare,
      color: "bg-purple-500/10 border-purple-500/20",
      headerColor: "bg-purple-500/20 text-purple-400",
    },
    medium: {
      name: "Medium",
      icon: BookOpen,
      color: "bg-green-500/10 border-green-500/20",
      headerColor: "bg-green-500/20 text-green-400",
    },
    other: {
      name: "Other",
      icon: FileText,
      color: "bg-gray-500/10 border-gray-500/20",
      headerColor: "bg-gray-500/20 text-gray-400",
    },
  }

  const platforms = Object.keys(groupedContent)

  return (
    <div className="p-2 sm:p-4 h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Content Kanban</h3>
        <p className="text-sm text-muted-foreground mb-4">Organize your social media content by platform</p>
      </div>

      {contentBlocks.length > 0 ? (
        <div className="h-[calc(100%-120px)] border rounded-lg overflow-hidden">
          <div className="flex h-full overflow-x-auto">
            {platforms.map((platform) => {
              const config = platformConfig[platform as keyof typeof platformConfig] || platformConfig.other
              const Icon = config.icon
              const blocks = groupedContent[platform]

              return (
                <div key={platform} className="flex-shrink-0 w-80 border-r border-border last:border-r-0">
                  {/* Column Header */}
                  <div className={`p-3 border-b border-border ${config.headerColor} flex items-center space-x-2`}>
                    <Icon className="h-4 w-4" />
                    <span className="font-semibold text-sm">{config.name}</span>
                    <span className="text-xs opacity-75">({blocks.length})</span>
                  </div>

                  {/* Column Content */}
                  <ScrollArea className="h-[calc(100%-60px)]">
                    <div className="p-3 space-y-3">
                      {blocks.map((block, index) => (
                        <Card key={index} className={`${config.color} border transition-all hover:shadow-md`}>
                          <div className="p-3">
                            <div className="flex items-center space-x-2 mb-3">
                              <FileText className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium truncate">{block.filename}</span>
                            </div>
                            <ContentViewer
                              content={block.content || ""}
                              platform={config.name}
                              contentType={block.language}
                              filename={block.filename}
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
          <div className="text-center text-muted-foreground p-4">
            <div className="text-4xl mb-2">📋</div>
            <p>No content found</p>
            <p className="text-xs mt-1">Generate some social media content to see your kanban board</p>
          </div>
        </div>
      )}
    </div>
  )
}
