import { useState } from "react"
import MarkdownMaker from "../../../components/markdown/markdown-maker/MarkdownMaker"
import MarkdownRenderer from "../../../components/markdown/MarkdownRenderer"
import { MarkdownProvider } from "../../../components/markdown/context/MarkdownContext"
import { Button } from "../../../components/ui/Button"
import { bgColors, borderColors, textColors } from "../../../styles/colors"

export default function MakeNewPost() {
  const [markdown, setMarkdown] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add logic to save the post
    console.log("Post content:", markdown)
    // router.push("/blog")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

{/*         NOT NEEDED TITLE FUNCTIOANLITY RN
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter post title"
            required
          />
        </div> 
*/}
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Content</label>
          <MarkdownMaker 
            markdown={markdown} 
            onChange={setMarkdown} 
          />
        </div>

        <div className="space-y-2">
          <h2 className={`text-xl font-semibold mt-8 mb-4${textColors.primary}`}>Live Preview</h2>
          
        {/* ${borderColors.default} */}
          <div className={`border rounded-lg p-4 min-h-[200px] ${bgColors.primary} 
           border-transparent`}>
            <MarkdownRenderer 
                content={markdown} 
                contentAlignment="left"
                headingAlignment="left"
                showToc={false}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            // onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit">Publish Post</Button>
        </div>
      </form>
    </div>
  )
}