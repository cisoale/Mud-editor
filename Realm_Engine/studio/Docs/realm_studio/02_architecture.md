# Realm Studio Architecture

Version: 1.0
Status: Foundation

---

# Philosophy

Realm Studio is built on top of the Realm Framework.

The Framework contains reusable UI components.

Realm Studio contains application-specific tools.

The Framework MUST NEVER depend on Realm Studio.

Realm Studio MAY depend on the Framework.

```
Framework
    ↑
Realm Studio
```

Dependencies are one-way only.

---

# Layers

```
Application
        │
        ▼
Views
        │
        ▼
Modules
        │
        ▼
Framework
```

---

# Folder Structure

```
studio/

app/
framework/
modules/
repositories/
services/
browser/
inspector/
workspace/
views/
```

---

# Framework

The Framework provides generic reusable components.

It must contain no Realm-specific logic.

```
framework/

core/
controls/
ui/
```

---

# Framework / Core

Purpose:

Provide the base classes of the framework.

Contains:

Component

Container

Control

View

Rules:

No application logic.

No Browser.

No Repository.

No Entity.

No Services.

Only framework code.

---

# Framework / Controls

Purpose:

Interactive reusable controls.

Contains:

Button

TextBox

SearchBox

ListView

Separator

Future:

ComboBox

TreeView

CheckBox

Menu

Rules:

A control must never know what an Entity is.

A control displays data only.

---

# Framework / UI

Purpose:

Visual containers.

Contains:

Panel

Toolbar

Splitter

Tabs

DockPanel

StatusBar

Rules:

A UI container manages layout.

It never contains business logic.

---

# Realm Studio

Realm Studio contains every editor and every tool.

Example:

Browser

Inspector

Workspace

Mob Builder

Room Builder

Quest Builder

Map Builder

---

# Browser

Responsibilities

Display entities.

Search entities.

Select entities.

Nothing else.

Browser does not know how an entity is saved.

Browser does not know repositories.

---

# Inspector

Responsibilities

Display properties.

Edit values.

Notify changes.

Inspector never saves entities.

---

# Repository

Responsibilities

Load.

Save.

Duplicate.

Delete.

Persistence only.

Repositories never contain UI.

---

# Services

Services coordinate the application.

Example:

SchemaLoader

Project

RealmContext

---

# Dependency Rules

Allowed

Application
↓

Views
↓

Modules
↓

Framework

Forbidden

Framework
↓

Application

Framework
↓

Repositories

Framework
↓

Services

Framework
↓

Entities

---

# Component Rules

Every component must have a single responsibility.

Every component must be reusable.

Every component must have a public API.

No component may directly manipulate another component's internals.

Communication happens through methods or events.

---

# Naming

Core classes

Component

Container

Control

View

Controls

Button

ListView

SearchBox

Panel

Toolbar

Never:

ButtonControl

PanelComponent

BrowserPanel

unless application specific.

---

# Future Goals

Stable Framework

Reusable Framework

Independent Realm Studio

Persistent World Builder

Modular Editors

Plugin System

---

# Design Principles

Single Responsibility Principle

Composition over inheritance

Explicit dependencies

No circular references

No duplicated components

Framework first

Application second

---

# Definition of Done

A component is considered complete when:

✓ Reusable

✓ Documented

✓ Tested

✓ No duplicated implementation

✓ No unnecessary dependency

✓ Stable API

Only then may it be used by Realm Studio.



# Golden Rules

1.
The Framework never imports from Realm Studio.

2.
Every class has one responsibility.

3.
No duplicated components.

4.
Composition is preferred over inheritance.

5.
Every public method must have a clear purpose.

6.
Views coordinate.

Modules work.

Repositories persist.

Framework renders.

7.
A component should be understandable in less than five minutes.

8.
If a component becomes too large,
split it.

9.
Every refactoring must reduce complexity.

10.
Architecture is more important than implementation.
