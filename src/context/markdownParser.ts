
// Import all markdown files from the public/posts directory
export const markdownModules = import.meta.glob('../../../public/posts/*.md', { as: 'raw' });

/**
 * Extracts the clean filename from a path
 * @param path - The full path or filename
 * @returns The clean filename without path or extension
 */
export const extractFilename = (path: string): string => {
  return path
    .split('/')
    .pop()
    ?.replace(/\.md$/i, '') || '';
};



/// BELOW IS FOR YAML SEO METADATA

/**
 * Interface for parsed markdown metadata
 */
export interface PostMetadata {
    title?: string;
    description?: string;
    author?: string;
    publishedDate?: string;
    modifiedDate?: string;
    readTime?: string;
    category?: string;
    tags?: string[];
    image?: string;
    featured?: boolean;
    draft?: boolean;
  }
  
  /**
   * Interface for parsed markdown result
   */
  export interface ParsedMarkdown {
    metadata: PostMetadata;
    content: string;
  }
  
  /**
   * Regex pattern to match YAML frontmatter
   * Matches content between --- delimiters at the start of the file
   */
  const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  
  /**
   * Simple YAML parser for basic frontmatter
   * Note: This is a basic parser. For complex YAML, consider using a proper YAML library.
   */
  const parseYaml = (yamlString: string): PostMetadata => {
    const metadata: PostMetadata = {};
    
    if (!yamlString.trim()) return metadata;
  
    const lines = yamlString.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;
      
      // Handle key-value pairs
      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex > 0) {
        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        const cleanValue = value.replace(/^["']|["']$/g, '');
        
        switch (key) {
          case 'title':
          case 'description':
          case 'author':
          case 'publishedDate':
          case 'modifiedDate':
          case 'readTime':
          case 'category':
          case 'image':
            metadata[key] = cleanValue;
            break;
            
          case 'tags':
            // Parse array format: ["tag1", "tag2"] or tag1, tag2
            if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
              // Array format
              try {
                metadata.tags = JSON.parse(cleanValue);
              } catch {
                // Fallback: split by commas
                metadata.tags = cleanValue
                  .replace(/[\[\]]/g, '')
                  .split(',')
                  .map(tag => tag.trim().replace(/["']/g, ''))
                  .filter(tag => tag);
              }
            } else {
              // Comma-separated format
              metadata.tags = cleanValue
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag);
            }
            break;
            
          case 'featured':
          case 'draft':
            metadata[key] = cleanValue.toLowerCase() === 'true' || cleanValue === 'true';
            break;
        }
      }
    }
    
    return metadata;
  };
  
  /**
   * Parses markdown content with YAML frontmatter
   * @param markdownContent - The raw markdown content
   * @returns ParsedMarkdown object with metadata and content
   */
  export const parseMarkdownWithFrontmatter = (markdownContent: string): ParsedMarkdown => {
    const match = markdownContent.match(FRONTMATTER_REGEX);
    
    if (!match) {
      // No frontmatter found, return empty metadata and full content
      return {
        metadata: {},
        content: markdownContent.trim()
      };
    }
    
    const [, yamlString, content] = match;
    
    try {
      const metadata = parseYaml(yamlString);
      return {
        metadata,
        content: content.trim()
      };
    } catch (error) {
      console.error('Error parsing YAML frontmatter:', error);
      // Return empty metadata and full content if parsing fails
      return {
        metadata: {},
        content: markdownContent.trim()
      };
    }
  };
  
  /**
   * Extracts metadata from markdown content
   * @param markdownContent - The raw markdown content
   * @returns PostMetadata object
   */
  export const extractMetadata = (markdownContent: string): PostMetadata => {
    const { metadata } = parseMarkdownWithFrontmatter(markdownContent);
    return metadata;
  };
  
  /**
   * Extracts content from markdown (removes frontmatter)
   * @param markdownContent - The raw markdown content
   * @returns Clean markdown content without frontmatter
   */
  export const extractContent = (markdownContent: string): string => {
    const { content } = parseMarkdownWithFrontmatter(markdownContent);
    return content;
  };