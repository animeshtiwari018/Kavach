# Kavach — Window Drag & Centering Fix

## Objective

Fix the behavior of all application/windows in the Kavach portfolio.

When any app/window is opened — such as:

* Projects
* About
* VS Code
* Terminal
* Other portfolio applications

it must behave like a proper desktop window.

---

## Required Behavior

### 1. Open in the Center

Whenever a window is opened:

* It must appear **centered on the homepage/desktop area**.
* Center it relative to the **usable desktop area**, not the entire browser viewport if the top bar or bottom app bar occupies space.
* Do not change the existing window size unless absolutely necessary.
* Do not change the existing visual design.

### 2. Fully Draggable

After opening, the user must be able to drag the window freely around the desktop.

The window can move:

* Left
* Right
* Up
* Down
* Diagonally
* To any position inside the usable desktop area

The window should feel like a real desktop application window.

---

## Drag Boundaries

The window **MUST NOT** move outside the usable desktop area.

### Top Boundary

The window must never go above the top navigation/menu bar.

The window's top edge must remain at or below the bottom edge of the top bar.

### Bottom Boundary

The window must never move underneath or behind the bottom application/dock bar.

The window's bottom edge must remain above the top edge of the bottom app bar.

### Left Boundary

The window must not disappear beyond the left edge of the desktop.

### Right Boundary

The window must not disappear beyond the right edge of the desktop.

---

## Important Constraint

Think of the desktop as a bounded rectangle:

```text
┌──────────────────────────────────────────────────────────────┐
│                     TOP BAR                                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                                                              │
│                  ┌───────────────────────┐                   │
│                  │                       │                   │
│                  │      APP WINDOW       │                   │
│                  │                       │                   │
│                  └───────────────────────┘                   │
│                                                              │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                     APP / DOCK BAR                           │
└──────────────────────────────────────────────────────────────┘
```

The draggable area is ONLY:

```text
┌──────────────────────────────────────────────────────────────┐
│ TOP BAR — NOT AVAILABLE                                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                  USABLE DESKTOP AREA                         │
│                                                              │
│             WINDOW CAN MOVE FREELY HERE                      │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ APP BAR — NOT AVAILABLE                                      │
└──────────────────────────────────────────────────────────────┘
```

---

# Implementation Rules

## Do NOT scan the entire codebase

This task is specifically about **window positioning and dragging**.

Do not unnecessarily analyze, rewrite, or refactor unrelated parts of Kavach.

First identify only:

1. The component responsible for opening/rendering application windows.
2. The component/hook responsible for window position.
3. The existing drag implementation.
4. The top bar dimensions/reference.
5. The bottom app bar/dock dimensions/reference.
6. Any shared window component used by multiple applications.

Then make the smallest possible change required.

---

## Reuse Existing Architecture

Before creating a new window system:

* Check whether Kavach already has a shared window component.
* Check whether position state already exists.
* Check whether drag handlers already exist.
* Check whether multiple apps already use the same window component.

If a shared implementation exists, **fix it there** so all applications inherit the behavior.

Do NOT create separate drag logic for every individual app unless the architecture requires it.

---

# Centering Logic

When a window is opened for the first time:

```text
usableDesktopWidth  = viewportWidth
usableDesktopHeight = viewportHeight - topBarHeight - bottomBarHeight

windowX = (usableDesktopWidth - windowWidth) / 2

windowY = topBarHeight +
          (usableDesktopHeight - windowHeight) / 2
```

The exact implementation should adapt to the existing Kavach layout.

Do not hardcode arbitrary pixel positions such as:

```js
left: 300px
top: 150px
```

unless the existing architecture specifically requires it.

---

# Dragging Logic

During dragging, calculate the new position and clamp it within the usable desktop boundaries.

Conceptually:

```text
minX = 0
maxX = desktopWidth - windowWidth

minY = topBarHeight
maxY = viewportHeight - bottomBarHeight - windowHeight
```

Then:

```text
x = clamp(newX, minX, maxX)
y = clamp(newY, minY, maxY)
```

This ensures the entire window stays visible.

---

# Important Edge Cases

Handle these cases properly:

### Different Screen Sizes

The behavior must work on:

* Laptop screens
* Large desktop monitors
* Smaller browser windows

Do not build the solution around one fixed screen resolution.

### Window Larger Than Available Space

If a window is larger than the available desktop area, prevent it from becoming impossible to access.

Do not allow the window to become permanently stuck outside the usable area.

### Reopening a Window

When a window is opened:

* It should initially appear centered.
* If the existing application architecture intentionally preserves window position, preserve that behavior where appropriate.
* Do not accidentally reset every window on every React render.

### Multiple Windows

If multiple windows can be open simultaneously:

* Each newly opened window should initially center correctly.
* Existing windows should not unexpectedly jump when another window opens.
* Do not break existing z-index/focus behavior.

---

# Do Not Break

While implementing this fix, preserve all existing functionality:

* Window UI
* Window size
* Resize behavior
* Minimize behavior
* Close behavior
* Maximize behavior
* Z-index/focus behavior
* Top navigation
* Bottom app bar
* Application icons
* Animations
* Existing styling
* Existing responsive behavior

Only modify what is necessary for:

**window centering + window dragging + drag boundaries.**

---

# Verification Checklist

Before considering the task complete, verify:

* [ ] Projects opens in the center.
* [ ] About opens in the center.
* [ ] VS Code opens in the center.
* [ ] Terminal opens in the center.
* [ ] Other shared windows open in the center.
* [ ] Window can be dragged left.
* [ ] Window can be dragged right.
* [ ] Window can be dragged upward.
* [ ] Window can be dragged downward.
* [ ] Window can be dragged diagonally.
* [ ] Window cannot cross the top bar.
* [ ] Window cannot go underneath the bottom app bar.
* [ ] Window cannot disappear through the left edge.
* [ ] Window cannot disappear through the right edge.
* [ ] Dragging works consistently for every application using the shared window system.
* [ ] Existing window functionality still works.
* [ ] No unrelated files/components were unnecessarily changed.

---

# Agent Workflow

Follow this exact workflow:

### Step 1 — Locate

Find the shared window component and its position/drag logic.

### Step 2 — Understand

Read ONLY the relevant files needed to understand:

* Window rendering
* Position state
* Drag handlers
* Desktop/container dimensions
* Top bar
* Bottom app bar

### Step 3 — Implement

Make the smallest targeted change.

### Step 4 — Verify

Test the behavior across the relevant applications and screen sizes.

### Step 5 — Report

Briefly report:

```text
WINDOW FIX COMPLETE

Changed:
- ...
- ...

Behavior:
- Opens centered
- Fully draggable within desktop
- Cannot cross top bar
- Cannot cross bottom app bar
- Cannot leave screen

Files changed:
- ...
```

Do not provide a broad codebase analysis.

Do not refactor unrelated code.

Do not modify unrelated UI.
