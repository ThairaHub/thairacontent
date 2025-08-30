import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FileText } from "lucide-react";
import { ContentViewer } from "./gpt-version/ContentViewer";
import { Card } from "./ui/card";
import { CodeStructBlock } from "@/lib/types";

interface KanbanViewProps {
    contentBlocks: CodeStructBlock[]
}

export function KanbanView({contentBlocks}: KanbanViewProps) {


    return (
              <div className="p-2 sm:p-4 h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
          <p className="text-sm text-muted-foreground mb-4">Preview of your generated social media content</p>
        </div>


        {contentBlocks.length > 0 ? (
          <div className="h-[calc(100%-120px)] border rounded-lg overflow-hidden">
            <ScrollArea className="h-full p-2 sm:p-4">
              {contentBlocks.map((block, index) => (
                <Card key={index} className="mb-4 p-2 sm:p-4 bg-message-bg border-border">
                  <div className="flex items-center space-x-2 mb-2 flex-wrap">
                    <FileText className="h-4 w-4 text-ai-glow flex-shrink-0" />
                    <span className="text-sm font-semibold truncate">{block.filename}</span>
                    <span className="text-xs text-muted-foreground">({block.language})</span>
                  </div>
                  <ContentViewer
                    content={block.content || ""}
                    platform={
                      block.language === "twitter"
                        ? "X (Twitter)"
                        : block.language === "medium"
                          ? "Medium"
                          : block.language === "threads"
                            ? "Threads"
                            : block.language === "linkedin"
                              ? "LinkedIn"
                              : undefined
                    }
                    contentType={block.language}
                    filename={block.filename}
                  />
                </Card>
              ))}
            </ScrollArea>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
            <div className="text-center text-muted-foreground p-4">
              <div className="text-4xl mb-2">📝</div>
              <p>No content found</p>
              <p className="text-xs mt-1">Generate some social media content to see a preview</p>
            </div>
          </div>
        )}
      </div>
    )
}