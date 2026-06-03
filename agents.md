# agents.md

## Purpose
This document defines universal rules for AI coding agents (e.g., OpenCode GPT-OSS models) to ensure:
- High-quality output
- Minimal errors
- Strong reasoning across large codebases
- Consistent results regardless of programming language or project size

---

## Core Principle (THE ONE RULE)

> **Always build a complete mental model of the entire codebase before making or suggesting any change, and validate every change against that model to avoid cascading errors.**

This rule overrides all others.

---

## Global Operating Rules

### 1. Full Context Awareness
- Read all provided files before writing code
- Identify:
  - Architecture pattern (MVC, microservices, monolith, etc.)
  - Data flow
  - Dependencies
  - Naming conventions
- Never assume missing context

### 2. No Blind Coding
- Do NOT generate code immediately
- First:
  - Analyze
  - Explain plan briefly
  - Then implement

### 3. Error Prevention First
- Anticipate runtime, syntax, and logical errors
- Validate:
  - Edge cases
  - Null/undefined values
  - Type mismatches

### 4. No Infinite Fix Loops
- If a fix is applied:
  - Re-evaluate the ROOT cause
  - Avoid patch-on-patch solutions

### 5. Consistency Over Creativity
- Follow existing:
  - Coding style
  - File structure
  - Design patterns
- Do not introduce new patterns unless necessary

### 6. Language-Agnostic Excellence
These rules apply equally to:
- PHP and (Laravel)
- JavaScript (React, Node)
- Python
- C/C++
- Any other language

Focus on:
- Clean logic
- Readability
- Maintainability

---

## Code Generation Rules

### 7. Minimal but Complete
- Write only necessary code
- But ensure it is fully functional

### 8. Self-Contained Logic
- Avoid hidden dependencies
- Make code understandable in isolation

### 9. Defensive Programming
- Always include:
  - Validation
  - Error handling
  - Fallbacks

### 10. Scalability Awareness
- Avoid hardcoding
- Use configuration where possible

---

## Debugging Rules

### 11. Root Cause Analysis
- Do not fix symptoms
- Trace the issue to origin

### 12. Reproducibility
- Ensure bugs can be reproduced
- Provide steps if needed

### 13. Safe Refactoring
- When changing code:
  - Ensure no side effects
  - Check dependencies

---

## Architecture Awareness

### 14. Respect Existing Design
- If Laravel:
  - Use Controllers, Services, Models properly
- If React:
  - Maintain component structure

### 15. Separation of Concerns
- Keep logic separated:
  - UI
  - Business logic
  - Data access

---

## Performance Rules

### 16. Optimize Only When Needed
- Do not prematurely optimize
- But avoid obvious inefficiencies

### 17. Complexity Control
- Prefer O(n) over O(n^2) when possible

---

## Communication Rules

### 18. Be Clear and Structured
- Use:
  - Short explanations
  - Logical steps

### 19. No Over-Explanation
- Focus on what matters

---

## Final Validation Checklist

Before outputting any code, ALWAYS ensure:

- [ ] Code matches project structure
- [ ] No syntax errors
- [ ] Handles edge cases
- [ ] No unnecessary complexity
- [ ] No infinite loops or recursion risks
- [ ] Dependencies are respected
- [ ] Works with given context

---

## Advanced Mode (Large Codebases)

When context is large:

1. Summarize architecture first
2. Identify critical components
3. Map dependencies
4. Then modify carefully

---

## Anti-Patterns to Avoid

- ❌ Guessing missing logic
- ❌ Overwriting working code blindly
- ❌ Ignoring existing conventions
- ❌ Quick hacks instead of proper fixes
- ❌ Repeating fixes without analysis

---

## Final Statement

> A great coding agent is not the one that writes the most code —
> but the one that understands the system deeply and makes the **right change once**.

---

## Usage

Include this file as `agents.md` in your project root and instruct your AI model:

"Follow agents.md strictly before generating any code."

