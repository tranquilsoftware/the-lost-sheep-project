// MarkdownMaker.tsx
"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link, Image, Code, Quote } from "lucide-react"
import { bgColors, borderColors, textColors } from "../../styles/colors"

interface MarkdownMakerProps {
  markdown: string
  onChange: (value: string) => void
}

interface ToolbarButtonProps {
  icon: React.ReactNode
  onClick: () => void
  tooltip: string
}

type ToolbarAction = "bold" | "italic" | "h1" | "h2" | "h3" | "ul" | "ol" | "link" | "image" | "code" | "quote"

export default function MarkdownMaker({ markdown, onChange }: MarkdownMakerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [codeLanguage, setCodeLanguage] = useState<string>("javascript")

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = markdown.substring(start, end)

    const newText = markdown.substring(0, start) + before + selectedText + after + markdown.substring(end)

    onChange(newText)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const handleToolbarAction = (action: ToolbarAction) => {
    switch (action) {
      case "bold":
        insertText("**", "**")
        break
      case "italic":
        insertText("*", "*")
        break
      case "h1":
        insertText("# ")
        break
      case "h2":
        insertText("## ")
        break
      case "h3":
        insertText("### ")
        break
      case "ul":
        insertText("- ")
        break
      case "ol":
        insertText("1. ")
        break
      case "link":
        insertText("[", "](url)")
        break
      case "image":
        insertText("![alt text](", ")")
        break
      case "code":
        insertText("```" + codeLanguage + "\n", "\n```")
        break
      case "quote":
        insertText("> ")
        break
      default:
        break
    }
  }

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCodeLanguage(e.target.value)
  }

  return (
    <div className={`${borderColors.default} rounded-lg overflow-hidden ${bgColors.primary} shadow-sm`}>
      <div className={`flex flex-wrap gap-1 p-2 ${borderColors.default} ${bgColors.secondary}`}>
        <ToolbarButton icon={<Bold size={18} />} onClick={() => handleToolbarAction("bold")} tooltip="Bold" />
        <ToolbarButton icon={<Italic size={18} />} onClick={() => handleToolbarAction("italic")} tooltip="Italic" />
        <ToolbarButton icon={<Heading1 size={18} />} onClick={() => handleToolbarAction("h1")} tooltip="Heading 1" />
        <ToolbarButton icon={<Heading2 size={18} />} onClick={() => handleToolbarAction("h2")} tooltip="Heading 2" />
        <ToolbarButton icon={<Heading3 size={18} />} onClick={() => handleToolbarAction("h3")} tooltip="Heading 3" />
        <ToolbarButton icon={<List size={18} />} onClick={() => handleToolbarAction("ul")} tooltip="Unordered List" />
        <ToolbarButton
          icon={<ListOrdered size={18} />}
          onClick={() => handleToolbarAction("ol")}
          tooltip="Ordered List"
        />
        <ToolbarButton icon={<Link size={18} />} onClick={() => handleToolbarAction("link")} tooltip="Link" />
        <ToolbarButton icon={<Image size={18} />} onClick={() => handleToolbarAction("image")} tooltip="Image" />
        <div className="flex items-center">
          <ToolbarButton icon={<Code size={18} />} onClick={() => handleToolbarAction("code")} tooltip="Code Block" />
          <select
            value={codeLanguage}
            onChange={handleLanguageChange}
            className={`ml-1 text-sm ${bgColors.primary} ${borderColors.default} rounded px-1 py-0.5 ${textColors.primary}`}
          >
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="typescript">TypeScript</option>
            <option value="tsx">TSX</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="swift">Swift</option>
            <option value="bash">Bash</option>
            <option value="sql">SQL</option>
            <option value="json">JSON</option>
            <option value="yaml">YAML</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>
        <ToolbarButton icon={<Quote size={18} />} onClick={() => handleToolbarAction("quote")} tooltip="Blockquote" />
      </div>
      <textarea
        ref={textareaRef}
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-4 min-h-[300px] focus:outline-none resize-none font-mono text-sm ${bgColors.primary} ${textColors.primary}`}
        placeholder="Type your markdown here..."
      />
    </div>
  )
}

function ToolbarButton({ icon, onClick, tooltip }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      title={tooltip}
    >
      {icon}
    </button>
  )
}