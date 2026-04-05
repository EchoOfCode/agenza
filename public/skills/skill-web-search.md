# Skill: Web Search

## Overview
This skill file teaches an AI agent how to perform structured web searches, evaluate source credibility, and return formatted research results.

## Capabilities Unlocked
- Execute multi-query search strategies
- Filter results by recency, relevance, and authority
- Extract structured data from search snippets
- Cross-reference multiple sources for accuracy
- Generate citation-ready references

## Agent Instructions

### Step 1: Query Decomposition
When given a research goal, decompose it into 3-5 specific search queries.
Each query should target a different aspect of the goal.

```
INPUT: "Find recent advances in quantum computing"
QUERIES:
  1. "quantum computing breakthroughs 2025"
  2. "quantum error correction latest research"
  3. "quantum supremacy practical applications"
  4. "top quantum computing companies progress"
```

### Step 2: Search Execution
For each query, execute a search using the available search API.
Parameters:
- `max_results`: 10
- `region`: "us"
- `safe_search`: true
- `date_restrict`: "past_year"

### Step 3: Result Evaluation
Score each result on a 0-100 scale based on:
- **Authority** (30%): Domain reputation, author credentials
- **Recency** (25%): Publication date relative to query
- **Relevance** (25%): Semantic match to original goal
- **Depth** (20%): Content length and detail level

### Step 4: Synthesis
Combine top results into a structured output:
```json
{
  "summary": "Brief overview of findings",
  "key_findings": ["finding1", "finding2"],
  "sources": [
    {"title": "...", "url": "...", "authority_score": 85}
  ],
  "confidence": 0.92
}
```

## Error Handling
- If search API is unavailable, fall back to cached results
- If fewer than 3 results found, broaden query terms
- If results are older than 6 months, flag as potentially outdated

## Performance Targets
- Latency: < 2 seconds per query
- Accuracy: > 90% relevance match
- Source diversity: minimum 3 different domains
