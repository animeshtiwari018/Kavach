## TASK-SCOPED CODEBASE RULE

Work strictly within the scope of the user's current request.

### 1. DO NOT SCAN THE ENTIRE CODEBASE

Never automatically search, index, read, or analyze the entire project.

For every request:

* Identify the **smallest set of files/components** required.
* Search only those files first.
* Read only the relevant functions, components, styles, and configuration.
* Do not inspect unrelated folders or files.

### 2. FOLLOW THE USER'S EXACT SCOPE

If the user asks for a specific UI behavior, modify only what is necessary for that behavior.

Example:

User:

> "Project icon par click kare to window center me open ho."

Your approach should be:

1. Find the project icon/button component.
2. Find the function/event triggered by its click.
3. Find the window/modal component that opens.
4. Find the positioning logic/CSS for that window.
5. Make the minimum required change so the window opens centered.
6. Test/check the affected code.
7. Stop.

DO NOT:

* Scan every component.
* Inspect unrelated pages.
* Analyze the entire routing system.
* Review the complete CSS architecture.
* Search unrelated utilities/hooks.
* Refactor other code.
* "Improve" unrelated parts of the application.

### 3. SEARCH PROGRESSIVELY

Use this order:

**Level 1 — Direct target**
Search for the exact component, button, text, ID, class, function, or filename mentioned by the user.

**Level 2 — Immediate dependency**
If the target references another component/function, inspect only that dependency.

**Level 3 — Required styling/state**
Only inspect the relevant CSS, Tailwind classes, state, props, or positioning logic.

**Level 4 — Broader search**
Expand the search ONLY if the requested change cannot be understood or implemented with the above information.

Never jump directly to Level 4.

### 4. MINIMAL-CONTEXT PRINCIPLE

Before opening a file, ask internally:

> "Do I actually need this file to complete the user's current task?"

If the answer is no, do not read it.

Prefer:

* 1 relevant component over 20 components
* 1 function over an entire file
* 1 CSS rule over the entire stylesheet
* targeted search over directory-wide exploration

### 5. NO UNNECESSARY REFACTORING

The user's request is the source of truth.

Do not:

* refactor unrelated code
* rename unrelated variables
* reorganize folders
* rewrite working components
* change architecture
* modify styling outside the requested area
* fix unrelated warnings
* introduce new dependencies unless absolutely necessary

Make the **smallest safe change** that solves the requested problem.

### 6. STOP CONDITION

Once you have:

* identified the relevant code,
* understood the existing implementation,
* made the required change,
* and verified that the change is logically correct,

STOP searching.

Do not continue exploring the codebase just to gain more context.

### 7. WHEN MORE CONTEXT IS ACTUALLY REQUIRED

Only expand the scope when:

* the relevant component cannot be found,
* the behavior is controlled by an unknown parent/context,
* the change requires a shared utility,
* there is a genuine dependency that affects the requested behavior,
* or the existing implementation is ambiguous.

When expanding, explain briefly:

> "I need to inspect X because the requested behavior is controlled there."

Then inspect only that dependency.

### 8. PERFORMANCE PRIORITY

Optimize for:

**Target → Relevant dependency → Minimal change → Verify → STOP**

NOT:

**User request → Scan entire repository → Understand everything → Make change**

The goal is to behave like a focused senior developer working on a specific ticket, not like an auditor reviewing the entire codebase.

### 9. DEFAULT ASSUMPTION

Assume the existing code is intentional and working unless the user's request indicates otherwise.

Do not investigate unrelated code "just in case."

### GOLDEN RULE

> **If the user asks for one change, investigate only what is necessary to make that one change.**

Never perform a full-codebase scan for a localized task unless the user explicitly asks for a full-codebase review.
