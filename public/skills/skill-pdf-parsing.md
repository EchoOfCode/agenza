# Skill: PDF Parsing

## Overview
This skill file teaches an AI agent how to extract structured content from PDF documents, including text, tables, images, and metadata. Handles both digital and scanned PDFs.

## Capabilities Unlocked
- Extract clean text from multi-column layouts
- Parse tables into structured JSON/CSV format
- Detect and OCR scanned pages
- Extract document metadata (title, author, date)
- Handle academic paper formats (abstract, body, references)

## Agent Instructions

### Step 1: Document Analysis
Before parsing, classify the PDF:
```
TYPE: digital | scanned | hybrid
LAYOUT: single-column | multi-column | mixed
CONTENT: text-heavy | table-heavy | image-heavy | mixed
PAGES: total page count
LANGUAGE: detected language
```

### Step 2: Text Extraction
For digital PDFs:
- Use direct text extraction (no OCR needed)
- Preserve paragraph boundaries
- Detect headers vs body text via font size analysis
- Handle footnotes and endnotes separately

For scanned PDFs:
- Apply image enhancement (contrast, deskew)
- Run OCR with language-specific model
- Post-process: fix common OCR errors (l/1, O/0)

### Step 3: Table Extraction
1. Detect table boundaries using line detection
2. Identify header rows vs data rows
3. Map cell contents to grid positions
4. Output as structured JSON:
```json
{
  "table_id": 1,
  "headers": ["Year", "Revenue", "Growth"],
  "rows": [
    ["2023", "$1.2M", "15%"],
    ["2024", "$1.8M", "50%"]
  ]
}
```

### Step 4: Academic Paper Parsing
For research papers, extract:
- Title and authors
- Abstract
- Section headers and body
- Figures and captions
- References list (parsed into structured citations)

## Output Format
```json
{
  "metadata": { "title": "...", "author": "...", "pages": 12 },
  "sections": [
    { "heading": "Introduction", "content": "...", "page": 1 }
  ],
  "tables": [...],
  "references": [...]
}
```

## Error Handling
- Corrupted PDF: Return partial extraction with error flags
- Password-protected: Request password or skip
- Very large files (>100 pages): Process in batches of 20
