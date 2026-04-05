# Skill: Data Visualization

## Overview
This skill file teaches an AI agent how to analyze raw data and generate appropriate, publication-ready visualizations. Covers chart selection, formatting, and export.

## Capabilities Unlocked
- Analyze datasets to recommend chart types
- Generate SVG/PNG charts from raw data
- Apply consistent styling and color palettes
- Create multi-chart dashboards
- Export in presentation-ready formats

## Agent Instructions

### Step 1: Data Analysis
Before visualizing, understand the data:
```json
{
  "columns": ["name", "type", "unique_values", "null_count"],
  "row_count": 1500,
  "relationships": ["x correlates with y", "z is categorical"],
  "time_series": true,
  "recommended_charts": ["line", "bar", "scatter"]
}
```

### Step 2: Chart Type Selection
| Data Pattern | Recommended Chart |
|---|---|
| Trend over time | Line chart |
| Category comparison | Bar chart (horizontal if >7 categories) |
| Part-of-whole | Donut chart (not pie) |
| Correlation | Scatter plot |
| Distribution | Histogram or box plot |
| Geographic | Choropleth map |

### Step 3: Styling Rules
- Color palette: Use max 6 colors per chart
- Fonts: Sans-serif for labels, mono for data values
- Gridlines: Light gray, horizontal only
- Legend: Position bottom or right, never overlapping data
- Title: Descriptive, includes time range if applicable
- Annotations: Highlight outliers or key data points

### Step 4: Export
Generate in multiple formats:
- SVG for web/presentations
- PNG @2x for documents
- Interactive HTML for dashboards
- Raw data as CSV alongside

## Quality Checklist
- [ ] Axes labeled with units
- [ ] Title is descriptive
- [ ] Color-blind friendly palette
- [ ] No 3D effects
- [ ] Data source cited
- [ ] Responsive sizing
