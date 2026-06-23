import { CSSProperties } from 'react';

// Clean, minimal syntax highlighting theme with green and blue colors
export const customSyntaxTheme: Record<string, CSSProperties> = {
  'code[class*="language-"]': {
    color: '#e8eaed',
    background: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '14px',
    textAlign: 'left' as const,
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none' as const,
  },
  'pre[class*="language-"]': {
    color: '#e8eaed',
    background: '#1a1a1a',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '14px',
    textAlign: 'left' as const,
    whiteSpace: 'pre' as const,
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none' as const,
    padding: '1.5em',
    margin: '0.5em 0',
    overflow: 'auto' as const,
    borderRadius: '12px',
    border: '1px solid #333',
  },
  token: {
    color: '#e8eaed',
  },
  comment: {
    color: '#6b7280', // Gray comments
    fontStyle: 'italic' as const,
  },
  prolog: {
    color: '#6b7280',
  },
  doctype: {
    color: '#6b7280',
  },
  cdata: {
    color: '#6b7280',
  },
  punctuation: {
    color: '#e8eaed',
  },
  // Blue theme for structural elements
  property: {
    color: '#3b82f6', // Blue
  },
  tag: {
    color: '#3b82f6', // Blue
  },
  'attr-name': {
    color: '#3b82f6', // Blue
  },
  builtin: {
    color: '#3b82f6', // Blue
  },
  entity: {
    color: '#3b82f6', // Blue
  },
  url: {
    color: '#3b82f6', // Blue
  },
  function: {
    color: '#3b82f6', // Blue
  },
  // Green theme for values and data
  boolean: {
    color: '#10b981', // Green
  },
  constant: {
    color: '#10b981', // Green
  },
  symbol: {
    color: '#10b981', // Green
  },
  selector: {
    color: '#10b981', // Green
  },
  string: {
    color: '#10b981', // Green
  },
  char: {
    color: '#10b981', // Green
  },
  inserted: {
    color: '#10b981', // Green
  },
  'attr-value': {
    color: '#10b981', // Green
  },
  // Neutral colors for other elements
  number: {
    color: '#e8eaed', // Light gray
  },
  deleted: {
    color: '#ef4444', // Red for deletions
  },
  operator: {
    color: '#e8eaed',
  },
  variable: {
    color: '#e8eaed', // Light gray
  },
  regex: {
    color: '#e8eaed', // Light gray
  },
  important: {
    color: '#e8eaed',
    fontWeight: 'bold' as const,
  },
  bold: {
    fontWeight: 'bold' as const,
  },
  italic: {
    fontStyle: 'italic' as const,
  },
  keyword: {
    color: '#3b82f6', // Blue for keywords
    fontWeight: 'bold' as const,
  },
  'class-name': {
    color: '#3b82f6', // Blue
  },
};
