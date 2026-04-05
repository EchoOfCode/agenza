# Skill: Email Outreach

## Overview
This skill file teaches an AI agent how to draft, personalize, and send professional outreach emails with high response rates. Covers cold emails, follow-ups, and campaign sequencing.

## Capabilities Unlocked
- Draft personalized cold emails from templates
- Research recipients for personalization hooks
- Generate follow-up sequences with escalation
- A/B test subject lines and body copy
- Track open/response rates and optimize

## Agent Instructions

### Step 1: Recipient Research
Before drafting any email, gather:
```json
{
  "name": "Full name",
  "title": "Job title",
  "company": "Company name",
  "recent_work": "Latest blog post, talk, or project",
  "mutual_connections": ["shared contacts"],
  "pain_points": ["likely challenges based on role"]
}
```

### Step 2: Email Structure
Follow the AIDA framework:
- **Attention**: Personalized opening (reference their work)
- **Interest**: State the value proposition in 1 sentence
- **Desire**: Provide social proof or specific benefit
- **Action**: Clear, low-friction CTA

### Step 3: Template System
```
Subject: {personalized_hook} — {value_prop}

Hi {first_name},

{opening_referencing_their_recent_work}

{one_sentence_value_prop}

{social_proof_or_benefit}

{clear_cta}

Best,
{sender_name}
```

### Step 4: Follow-Up Sequence
- Day 0: Initial email
- Day 3: Bump email (reply to original, add new angle)
- Day 7: Value-add follow-up (share relevant resource)
- Day 14: Final attempt (direct ask or breakup email)

### Step 5: Optimization
Track per-template:
- Open rate (target: >50%)
- Response rate (target: >15%)
- Meeting booked rate (target: >5%)

Drop templates below threshold. Promote top performers.

## Tone Guidelines
- Professional but human
- Never use "I hope this email finds you well"
- Keep under 150 words
- One CTA per email, never two
