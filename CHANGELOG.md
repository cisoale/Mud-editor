# Realm of Lord

---

# v0.5.1 Beta - The Foundation

Release Date: Luglio 2026

## Highlights

Questa versione rappresenta la rifondazione del motore di gioco.
L'architettura è stata completamente riorganizzata per supportare un mondo persistente, modulare ed estendibile.

---

## Entity Framework

- Nuovo Entity Framework
- DEFAULT_ENTITY
- ENTITY_SCHEMA
- Entity Validator
- Entity Loader
- Entity Registry
- Entity Access Layer
- Preparazione al nuovo Entity Builder

---

## ECS

Implementati e consolidati:

- StatsComponent
- CombatComponent
- AIComponent
- InventoryComponent
- PositionComponent

---

## Combat

- Combat completamente integrato con StatSystem
- Skill migrate al nuovo StatSystem
- Boss Combat aggiornato
- Migliore separazione tra gameplay e dati

---

## Builder

- Migliorata la struttura del Mob Builder
- Preparazione al futuro Entity Builder
- Supporto ai Registry

---

## Gameplay

- Sistema Loot migliorato
- Cadaveri dinamici
- Gestione Gold
- Miglior gestione Spawn
- Preparazione sistema Fazioni

---

## Interface

- Nuovo Banner iniziale
- Nuovo HUD
- Supporto ANSI
- Migliore organizzazione dell'output

---

## Internal Refactoring

- Riduzione codice duplicato
- Preparazione alla completa migrazione ECS
- Maggiore modularità
- Architettura orientata ai componenti

---

## Next Version

v0.6 Alpha

Living World

- AI avanzata
- Pattugliamenti
- Fazioni
- Dialoghi NPC
- Entity Builder 2.0



## v0.5.2 - ECS Combat Foundation

### Added
- RewardComponent
- ECS reward integration
- Mob movement notifications

### Changed
- CombatSystem refactored to use ECS components
- MobFactory updated to create RewardComponent
- Improved HUD and prompt refresh
- Improved combat message handling

### Fixed
- Mob movement visibility
- Prompt refresh during combat
- Reward handling through ECS