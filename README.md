---
name: deepseek-opt
description: Token optimizer for DeepSeek v4 Pro — predicts relevant files, compresses prompts, and tracks token budget. Use when optimizing large context windows or reducing token consumption.
---

## What deepseek-opt Does

deepseek-opt is a CLI tool that sits between you and DeepSeek v4 Pro.
It reduces token usage by classifying tasks, predicting relevant files,
compressing prompts, tracking token budgets, and learning from outcomes.

## Commands

- `ds run "<task>"` — Full pipeline (classify → predict → compress)
- `ds stats` — View prediction accuracy and token savings
- `ds budget` — Check token budget status
- `ds doctor` — Run health diagnostics
- `ds learn "<task>" --files "a.ts,b.ts"` — Provide feedback
- `ds config token-budget 80000` — Adjust budget
- `ds scan --full` — Re-scan project after big changes

## Context

Optimization data lives in `.deepseek-opt/`:
- `project-map.json` — File inventory
- `dependency-graph.json` — Import relationships
- `keyword-index.json` — Searchable file index
- `task-history.json` — Past tasks
- `patterns.json` — Learned co-occurrences
- `metrics.json` — Accuracy statistics
