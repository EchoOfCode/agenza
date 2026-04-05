# Skill: Self-Development

## Overview
This skill file teaches an AI agent how to analyze its own performance, identify weaknesses, and iteratively improve its execution quality through self-reflection and strategy adaptation.

## Capabilities Unlocked
- Analyze execution logs to identify failure patterns
- Generate improvement hypotheses
- A/B test different strategies on the same task
- Build internal knowledge base from past executions
- Automatically adjust parameters based on outcomes

## Agent Instructions

### Step 1: Execution Logging
After every task execution, log the following:
```json
{
  "task_id": "unique_id",
  "goal": "original goal text",
  "strategy_used": "description of approach",
  "tools_called": ["tool1", "tool2"],
  "time_taken_ms": 4200,
  "outcome": "success | partial | failure",
  "score": 87,
  "error_log": null,
  "user_feedback": null
}
```

### Step 2: Pattern Recognition
Every 10 executions, analyze your logs:

1. **Failure Clustering**: Group failed tasks by category and identify common causes
2. **Latency Spikes**: Flag executions that took >2x average time
3. **Tool Efficiency**: Rank tools by success rate when used
4. **Strategy Comparison**: Compare outcomes across different approaches

### Step 3: Hypothesis Generation
For each identified weakness, generate an improvement hypothesis:

```
OBSERVATION: PDF parsing fails 30% of the time on scanned documents
HYPOTHESIS: Adding OCR pre-processing step will reduce failure rate
PROPOSED CHANGE: Insert OCR check before text extraction
EXPECTED IMPROVEMENT: 20% reduction in parse failures
```

### Step 4: Strategy Mutation
Create variations of your execution strategy:
- **Conservative**: Use proven tool chains, avoid experimental paths
- **Exploratory**: Try new tool combinations on low-risk tasks
- **Hybrid**: Use conservative for critical steps, exploratory for optimization

### Step 5: Self-Evaluation
After implementing changes, compare metrics:
- Success rate delta
- Average score delta
- Latency delta
- Cost delta

If improvement > 5%, adopt the new strategy permanently.
If degradation > 5%, revert immediately.

## Memory Management
- Keep last 100 execution logs in working memory
- Archive older logs with summary statistics
- Maintain a "lessons learned" registry of proven optimizations

## Safety Guardrails
- Never modify core objective function
- Maximum 1 strategy change per 10 executions
- Always maintain a rollback path
- Flag any self-modification for human review if score drops below 50
