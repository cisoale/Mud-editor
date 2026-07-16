# Realm of Lord 1.0

# Entity Model

Version 1.0 (Draft)

---

## Philosophy

Realm of Lord is entirely based on Entities.

The engine does not distinguish between:

- Items
- Mobs
- Rooms
- NPCs
- Areas
- Portals
- Resources

Everything in the world is an Entity.

An Entity gains meaning through the Components it owns.

---

## Architecture

World

↓

Entity Manager

↓

Entities

↓

Components

↓

Systems

Systems never care about entity types.

Systems operate only on Components.

---

## Entity

Every Entity has exactly one Identity component.

All other components are optional.
