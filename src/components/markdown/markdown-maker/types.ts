export interface CodeLanguageOption {
  value: string;
  label: string;
}

export const CODE_LANGUAGES: CodeLanguageOption[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tsx', label: 'TSX' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' }
];
