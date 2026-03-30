# Hariom's 3D Portfolio — Developer Documentation

> A production-grade interactive 3D portfolio built with Next.js 16, Three.js, React Three Fiber, and GSAP. This document is written for developers who need to understand, modify, or extend the codebase.

---

## Table of Contents

1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Project Structure](#2-project-structure)
3. [Getting Started](#3-getting-started)
4. [Environment Variables](#4-environment-variables)
5. [Architecture & Data Flow](#5-architecture--data-flow)
6. [File-by-File Reference](#6-file-by-file-reference)
   - [App Router (Next.js pages)](#61-app-router-nextjs-pages)
   - [Components](#62-components)
   - [Engine — 3D Character](#63-engine--3d-character)
   - [Engine — Animations](#64-engine--animations)
   - [Engine — Physics](#65-engine--physics)
   - [Sections](#66-sections)
   - [Styles](#67-styles)
   - [Data & Utils](#68-data--utils)
7. [How Files Connect to Each Other](#7-how-files-connect-to-each-other)
8. [The 3D Character System](#8-the-3d-character-system)
9. [Scroll Animation System](#9-scroll-animation-system)
10. [Loading System](#10-loading-system)
11. [Physics — TechStack Spheres](#11-physics--techstack-spheres)
12. [Responsive Design](#12-responsive-design)
13. [SEO Setup](#13-seo-setup)
14. [Security Headers](#14-security-headers)
15. [How to Modify Common Things](#15-how-to-modify-common-things)
16. [Assets Reference](#16-assets-reference)
17. [Build & Deployment](#17-build--deployment)
18. [Common Pitfalls & Gotchas](#18-common-pitfalls--gotchas)

---

## 1. Tech Stack Overview

| Library | Version | Role |
|---|---|---|
| `next` | 16.1.6 | Framework — SSR, routing, image optimization, security headers |
| `react` / `react-dom` | 19.2.3 | UI library |
| `three` | 0.183.2 | Core 3D engine (WebGL) |
| `@react-three/fiber` | 9.5.0 | React renderer for Three.js (used in TechStack) |
| `@react-three/drei` | 10.7.7 | R3F helpers — Environment, Sphere, etc. |
| `@react-three/rapier` | 2.2.0 | Physics engine (Rapier WASM, used in TechStack) |
| `@react-three/postprocessing` | 3.0.4 | Post-processing effects — N8AO ambient occlusion |
| `three-stdlib` | 2.36.1 | GLTFLoader, DRACOLoader, RGBELoader (HDRI) |
| `gsap` | 3.14.2 | ScrollTrigger, ScrollSmoother, SplitText — all scroll & timeline animations |
| `framer-motion` | 12.38.0 | Mobile-only animation for Experience cards |
| `tailwindcss` | 4 | Utility CSS; also custom keyframe animations |
| `lucide-react` | 0.577.0 | Icon set |
| `react-icons` | 5.6.0 | Additional icons |
| `typescript` | 5 | Full type safety |

> **Important about GSAP:** This project uses GSAP's **Club plugins** — `ScrollSmoother` and `SplitText`. These are trial/licensed builds included in `types/gsap-trial.d.ts`. If you upgrade GSAP or switch to the free tier, these plugins will not be available and scroll smoothing + text animations will break.

---

## 2. Project Structure

```
my-portfolio3d/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — wraps everything
│   ├── page.tsx                  # Home page (all main sections)
│   ├── projects/
│   │   └── page.tsx              # /projects route
│   ├── globals.css               # Global CSS variables & base styles
│   ├── robots.ts                 # Auto-generates /robots.txt
│   └── sitemap.ts                # Auto-generates /sitemap.xml
│
├── components/                   # Shared UI components
│   ├── CharacterCanvas.tsx       # Dynamic import wrapper for 3D scene
│   ├── Footer.tsx
│   ├── MainContainer.tsx         # (unused, kept for reference)
│   └── ui/
│       ├── Cursor.tsx            # Custom animated cursor (GSAP)
│       ├── HoverLinks.tsx        # Link hover state management
│       ├── SocialIcons.tsx       # Social media links
│       ├── navbar/
│       │   └── Navbar.tsx        # Navigation bar
│       └── loading/
│           ├── Loading.tsx       # Loading screen UI
│           ├── LoadingProvider.tsx # Context for loading state
│           └── LoadingGate.tsx   # Gate component (referenced)
│
├── engine/                       # 3D rendering + animation logic
│   ├── Character/
│   │   ├── index.tsx             # Entry point for 3D character
│   │   ├── Scene.tsx             # Main Three.js rendering loop
│   │   ├── exports.ts            # Shared refs (scene, renderer, camera)
│   │   └── utils/
│   │       ├── character.ts      # GLTF load + material setup
│   │       ├── decrypt.ts        # AES-CBC model decryption
│   │       ├── lighting.ts       # Scene lights + HDRI environment
│   │       ├── animationUtils.ts # AnimationMixer + bone animations
│   │       ├── mouseUtils.ts     # Head tracking on mouse/touch move
│   │       └── resizeUtils.ts    # Responsive camera zoom on resize
│   ├── animations/
│   │   ├── GsapScroll.ts         # All ScrollTrigger scroll timelines
│   │   ├── initialFX.ts          # Post-loading reveal animations
│   │   └── splitText.ts          # GSAP SplitText on scroll
│   └── physics/
│       └── TechStack.tsx         # Physics spheres with tech logos (R3F)
│
├── sections/                     # Page section components
│   ├── hero/Hero.tsx
│   ├── about/About.tsx
│   ├── whatido/WhatIDo.tsx
│   ├── skills/Skills.tsx
│   ├── experience/Experience.tsx
│   ├── projects/
│   │   ├── Projects.tsx          # Featured projects grid
│   │   └── AllProjects.tsx       # Full projects page
│   └── contact/Contact.tsx
│
├── styles/                       # Component-scoped CSS files
│   ├── About.css
│   ├── Career.css
│   ├── Contact.css
│   ├── Cursor.css
│   ├── Landing.css
│   ├── Loading.css
│   ├── Navbar.css
│   ├── SocialIcons.css
│   ├── WhatIDo.css
│   ├── Work.css
│   └── style.css
│
├── data/
│   └── boneData.ts               # Bone name arrays for character animations
│
├── types/
│   └── gsap-trial.d.ts           # TypeScript types for GSAP Club plugins
│
├── utils/
│   └── smootherRef.ts            # Shared ref for ScrollSmoother instance
│
├── public/
│   ├── images/                   # Tech logos, project screenshots, misc
│   ├── models/
│   │   ├── character.enc         # Encrypted GLTF model (AES-CBC)
│   │   └── char_enviorment.hdr   # HDRI environment map
│   └── draco/                    # DRACO decoder (JS + WASM)
│
├── .env.local                    # Local env variables (not committed)
├── .env.example                  # Template for env variables
├── next.config.ts                # Next.js config + security headers
├── tailwind.config.ts            # Tailwind + custom animations
├── tsconfig.json                 # TypeScript config
├── postcss.config.mjs            # PostCSS (Tailwind pipeline)
└── eslint.config.mjs             # ESLint rules
```

---

## 3. Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm

### Install & Run

```bash
# Clone the repo
git clone <repo-url>
cd my-portfolio3d

# Install dependencies
npm install

# Create your local env file
cp .env.example .env.local
# Then edit .env.local — see section 4 below

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## 4. Environment Variables

Create a `.env.local` file in the root. The only required variable is:

```env
NEXT_PUBLIC_MODEL_KEY=MyCharacter12
```

| Variable | Purpose | Notes |
|---|---|---|
| `NEXT_PUBLIC_MODEL_KEY` | Decryption key for the 3D character model | Used in `engine/Character/utils/decrypt.ts`. The `NEXT_PUBLIC_` prefix means it is exposed in client-side JS bundles — this is intentional for a browser-side decryption flow. |

> **How decryption works:** The key string is hashed with SHA-256 to produce a 32-byte AES-CBC key. The file `/public/models/character.enc` contains the IV (first 16 bytes) followed by the encrypted model data. See [decrypt.ts](#enginecharacterutilsdecryptts) for full details.

> **If you replace the model:** You must re-encrypt your new model with the same key (or change the key) and update `character.enc`. The encryption script is not included in this repo — you will need to write one using Node.js's `crypto` module with AES-CBC.

---

## 5. Architecture & Data Flow

The full user journey from page load to scrolling:

```
Browser loads /
    │
    ▼
app/layout.tsx renders:
    ├── <LoadingProvider>        → provides { isLoading, setIsLoading, progress, setProgress }
    │       └── <Loading />      → renders loading bar (0→100%)
    ├── <CharacterCanvas />      → dynamic import (ssr: false) of engine/Character/index.tsx
    ├── <Navbar />
    └── <Footer />
    │
    ▼
engine/Character/Scene.tsx initializes:
    ├── Creates WebGLRenderer, PerspectiveCamera, THREE.Scene
    ├── Defers via setTimeout(0) so React painting finishes first
    ├── Calls loadCharacter()
    │       ├── decrypt.ts: fetch /models/character.enc → AES-CBC decrypt → ArrayBuffer
    │       └── GLTFLoader: parse ArrayBuffer with DRACOLoader → GLTF object
    ├── customizeMaterials() — sets shirt/pants colors
    ├── setLighting() — DirectionalLight + PointLight + HDRI
    ├── setAnimations() — AnimationMixer + intro animation
    ├── renderer.compileAsync() — compiles shaders in background (non-blocking)
    └── progress.loaded() — waits for loading bar to reach 100%
            └── setCharTimeline() / setAllTimeline() — creates all ScrollTriggers
    │
    ▼
Loading bar reaches 100% → welcome button appears
    │
    ▼
User clicks "Enter" button:
    └── initialFX.ts runs:
            ├── ScrollSmoother.resume()
            ├── ScrollTrigger.refresh()
            ├── setSplitText() — animates text reveals on scroll
            ├── Landing text stagger animation (Hero titles)
            └── setIsLoading(false) → Loading component unmounts
    │
    ▼
User scrolls:
    ├── GsapScroll.ts timelines drive character rotation & camera movement
    ├── SplitText animations reveal paragraphs/headings
    └── TechStack spheres become active after #work trigger
```

---

## 6. File-by-File Reference

### 6.1 App Router (Next.js pages)

---

#### `app/layout.tsx`

Root layout. Wraps every page. Key responsibilities:

- Sets up `<html>` and `<body>` with Geist font
- Renders `<LoadingProvider>` (context for loading state)
- Renders `<CharacterCanvas>` (3D scene, always present except on `/projects`)
- Renders `<Navbar>` and `<Footer>`
- Injects JSON-LD structured data for SEO
- Sets all `<head>` metadata (title, description, OG tags, canonical URL)

**To change site metadata:** Edit the `metadata` export object at the top of this file.

---

#### `app/page.tsx`

Home page (`/`). Client component (`"use client"`). Renders all main sections in order:

```tsx
<Hero />
<About />
<WhatIDo />
<Skills />
<Experience />
<Projects />
<Contact />
```

Also contains an SEO-only hidden `<div>` with text content for crawlers (the 3D content is not crawlable).

**To add/remove a section:** Import and add/remove the component here.

---

#### `app/projects/page.tsx`

The `/projects` route. Renders `<AllProjects />`. The `<CharacterCanvas>` in `layout.tsx` detects this route and hides the 3D character (check `CharacterCanvas.tsx`).

---

#### `app/globals.css`

Global CSS. Defines critical CSS custom properties used everywhere:

```css
--accentColor: #5eead4;    /* Teal accent — used across all sections */
--vh: 1vh;                  /* Corrected viewport height (set by JS) */
--cWidth: 90%;              /* Content width */
--cMaxWidth: 1400px;        /* Max content width */
```

**To change the accent color:** Change `--accentColor` here.

---

#### `app/robots.ts` & `app/sitemap.ts`

Auto-generate `/robots.txt` and `/sitemap.xml` at build time. Update `sitemap.ts` if you add new routes.

---

### 6.2 Components

---

#### `components/CharacterCanvas.tsx`

Thin wrapper that:
1. Detects if the current path is `/projects` — if so, renders nothing
2. Dynamically imports `engine/Character/index.tsx` with `{ ssr: false }` to prevent server-side import of Three.js (Three.js requires `window`/`document`)

**You must keep `ssr: false`** — removing it will crash the build.

---

#### `components/ui/loading/LoadingProvider.tsx`

React Context provider. Exposes:

```ts
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  progress: number;           // 0–100
  setProgress: (v: number) => void;
}
```

Wrap any component that needs to know loading state with `useLoadingContext()`.

---

#### `components/ui/loading/Loading.tsx`

The full-screen loading screen. Contains:
- Animated marquee text (Tailwind `animate-marquee`)
- A Pac-Man mini-game (`animate-loaderGame`, `animate-ball25`)
- A progress bar driven by `progress` from context
- A "Let's Go" / "Welcome" button that appears at 100%

The `setProgress` interval logic lives here — it slowly increments the bar. The actual 3D model load completion in `Scene.tsx` calls `setProgress(100)` to jump it to done.

---

#### `components/ui/Cursor.tsx`

Custom animated cursor using GSAP. Tracks mouse position with `lerp` smoothing. Responds to `data-cursor` HTML attributes on elements:

- `data-cursor="text"` — expands cursor to text mode
- `data-cursor="pointer"` — shows pointer
- (default) — small dot

Imports `styles/Cursor.css`.

---

#### `components/ui/navbar/Navbar.tsx`

Navigation bar. Key behavior:
- Initializes `ScrollSmoother` (from GSAP) on mount — this is the smooth scroll that wraps the whole page
- Has a mobile hamburger menu
- Links use smooth scroll-to-section

**The ScrollSmoother instance** is stored in `utils/smootherRef.ts` so other files can pause/resume it.

---

### 6.3 Engine — 3D Character

---

#### `engine/Character/index.tsx`

Simple entry point. Just renders `<Scene />`. The dynamic import in `CharacterCanvas.tsx` points here.

---

#### `engine/Character/Scene.tsx`

**The most complex file in the project.** Manages the entire Three.js lifecycle:

1. `useEffect` on mount → `setTimeout(0)` defers init
2. Creates `WebGLRenderer` (alpha, antialias, ACESFilmic tone mapping)
3. Creates `PerspectiveCamera` (FOV 14.5°, near 0.1, far 2000)
4. Calls `loadCharacter()` → adds GLTF to scene
5. Calls `setLighting()` → lights + HDRI
6. Calls `setAnimations()` → AnimationMixer + intro anim
7. Calls `setMouseRotation()` → head tracking
8. Calls `handleResize()` → responsive zoom
9. `renderer.compileAsync()` → async shader compile (non-blocking)
10. `progress.loaded()` → once loading bar hits 100%, creates all GSAP scroll timelines
11. RAF loop: `mixer.update(delta)` + head rotation + `renderer.render()`
12. `useEffect` cleanup: disposes all Three.js resources to prevent memory leaks

**Camera:** Orthographic-like effect achieved with a very narrow FOV (14.5°) and large camera Z distance. Changing FOV will significantly change how the character looks.

---

#### `engine/Character/exports.ts`

Exports shared refs (THREE.Scene, WebGLRenderer, Camera) so other files can access them without prop drilling. Treat these as singletons.

---

#### `engine/Character/utils/character.ts`

Handles GLTF loading:

1. Creates `DRACOLoader` pointing to `/draco/` decoder
2. Creates `GLTFLoader` with DRACO support
3. Calls `decryptFile()` to get decrypted ArrayBuffer
4. `loader.parse(buffer, ...)` → GLTF object
5. Customizes materials:
   - Shirt: color `#8B4513` (brown)
   - Pants: color `#000000` (black)
   - Sets `castShadow`, `receiveShadow` on all meshes
6. Positions character so feet are at `y = 3.36`

**To change character clothing colors:** Edit the color hex values in `customizeMaterials()`.

---

#### `engine/Character/utils/decrypt.ts`

AES-CBC decryption in the browser using `window.crypto.subtle`:

```
1. Fetch /models/character.enc?v=2
2. SHA-256 hash of NEXT_PUBLIC_MODEL_KEY → 32-byte key
3. Import as CryptoKey (AES-CBC)
4. First 16 bytes of file = IV
5. Remaining bytes = ciphertext
6. crypto.subtle.decrypt() → ArrayBuffer
```

**If you replace the model:** Encrypt your new GLB/GLTF using AES-CBC with the same key, prepend the IV, and save as `character.enc`.

---

#### `engine/Character/utils/lighting.ts`

Sets up the scene's lighting:

- `DirectionalLight` (color `#5eead4`, starts at intensity 0, fades to 2.0 after 2.5s)
- `PointLight` (color `#22d3ee`, intensity driven by a hidden `screenLight` object's opacity)
- `RGBELoader` loads `char_enviorment.hdr` as an equirectangular environment map

**To change the lighting color:** Change the hex values for `DirectionalLight` and `PointLight`.

---

#### `engine/Character/utils/animationUtils.ts`

Manages the character's animations via `THREE.AnimationMixer`:

- **Intro animation** — plays on load (LoopOnce, clampWhenFinished)
- **Typing animation** — loops using bones listed in `data/boneData.ts`
- **Eyebrow animation** (`browup`) — plays on hover over the face div
- **Key press animations** (`key1` through `key6`) — triggered by specific scroll positions
- `filterAnimationTracks(clip, boneNames[])` — utility to extract per-bone tracks from a clip

**`data/boneData.ts`** contains the arrays of bone names that define which bones are animated in each animation. If you swap the character model, these bone names must match the armature in your new model.

---

#### `engine/Character/utils/mouseUtils.ts`

Head rotation that follows the cursor:

- Normalizes mouse X/Y to `[-1, 1]`
- Applies to character's head bone rotation (clamped to ±30°)
- **Only active when `window.scrollY < 200px`** — disabled when user scrolls down
- Touch support: uses `touchmove` with debounce

---

#### `engine/Character/utils/resizeUtils.ts`

Handles window resize:

- Recalculates renderer size and camera aspect ratio
- `getResponsiveZoom(aspect)` — returns a zoom multiplier:
  - Portrait screens (phone): lower zoom so character fits width
  - Landscape/desktop: full zoom
- Refreshes all `ScrollTrigger` instances after resize

---

### 6.4 Engine — Animations

---

#### `engine/animations/GsapScroll.ts`

**All scroll-driven animations.** Uses GSAP `ScrollTrigger` + `gsap.timeline()`.

Two main exported functions:

**`setCharTimeline()`** — 3 timelines for the character:

| Timeline | Trigger Section | What Happens |
|---|---|---|
| `tl1` | Hero → About | Character rotates 15° left, camera pans right, About section slides in |
| `tl2` | About → WhatIDo | Camera pulls back to z=75, character turns to show screen, monitor light fades in |
| `tl3` | WhatIDo → Skills | Character slides off screen upward |

**`setAllTimeline()`** — 2 timelines for other sections:

| Timeline | Trigger Section | What Happens |
|---|---|---|
| `tl4` | Experience/Career | Cards slide in staggered |
| `tl5` | Skills | Character peeks back in, TechStack spheres activate |

Desktop and mobile have different timeline parameters — look for `isMobile` checks inside this file.

---

#### `engine/animations/initialFX.ts`

Runs once after the user clicks "Enter" on the loading screen:

1. `ScrollSmoother.resume()` — re-enables smooth scrolling (was paused during load)
2. `ScrollTrigger.refresh()` — recalculates all scroll positions after DOM is fully rendered
3. `setSplitText()` — triggers text reveal animations
4. Animates Hero section text with GSAP stagger
5. Calls `setIsLoading(false)` — unmounts `<Loading>`

---

#### `engine/animations/splitText.ts`

GSAP `SplitText` on scroll (desktop only, `window.innerWidth > 900`):

- **Paragraphs** — split into words, each animates `y: 0` from `y: 20` with stagger
- **Headings (`h2`)** — split into chars, each animates with `rotationX` and `opacity`
- Each uses a `ScrollTrigger` `{ trigger, start: "top 85%" }`

---

### 6.5 Engine — Physics

---

#### `engine/physics/TechStack.tsx`

Renders a physics-enabled 3D sphere cluster with tech stack logos using React Three Fiber:

- **30 spheres** distributed randomly in 3D space
- Each sphere has a tech logo texture (React, Next.js, Node, Express, MongoDB, MySQL, TypeScript, JavaScript — some repeated)
- Uses **Rapier physics** (`@react-three/rapier`) — spheres collide and pile up
- A **kinematic rigid body** tracks the pointer position; spheres are pushed away from cursor
- Uses `N8AO` (ambient occlusion) from `@react-three/postprocessing`
- `MeshPhysicalMaterial` with emissive maps for a glowing tech-logo effect
- **Only activates on desktop** and after the user scrolls past the `#work` section trigger

**Textures used** (from `public/images/`): `react.webp`, `react2.webp`, `next.webp`, `next2.webp`, `node.webp`, `node2.webp`, `express.webp`, `mongo.webp`, `mysql.webp`, `typescript.webp`, `javascript.webp`

**To add a new tech logo:**
1. Add your `.webp` image to `public/images/`
2. Add the texture path to the `textures` array in `TechStack.tsx`
3. The sphere count auto-adjusts with the array length

---

### 6.6 Sections

Each section is a standalone React component in `sections/`. They are rendered in order in `app/page.tsx`.

---

#### `sections/hero/Hero.tsx`

- Full-viewport landing section
- Typewriter effect cycling between "Developer" and "Engineer"
- Large responsive typography using CSS clamp values
- Targets for GSAP scroll animations (character enters from here)

---

#### `sections/about/About.tsx`

- Calculates real-time experience duration from `October 2024` start date
- Two-column grid layout (text + visual)
- The character is positioned alongside this section via GSAP camera movement

---

#### `sections/whatido/WhatIDo.tsx`

- Services/skills cards
- The 3D character is animated to face the screen during this section

---

#### `sections/skills/Skills.tsx`

- Technical skills display
- TechStack physics spheres are activated here (via scroll trigger in `GsapScroll.ts`)

---

#### `sections/experience/Experience.tsx`

Three work entries:
1. Arbutus Infotech — React Developer
2. Bluestock — SDE Intern
3. UnizzTech — Web Developer

**Desktop:** GSAP ScrollTrigger card reveals
**Mobile:** Framer Motion animations

**To update experience:** Edit the data array in this file directly.

---

#### `sections/projects/Projects.tsx`

Featured projects grid. Each project card has:
- Screenshot image
- Title, description
- Tech stack tags
- Live demo + GitHub links

**To add/edit projects:** Edit the `projects` array in this file. Add screenshots to `public/images/`.

---

#### `sections/projects/AllProjects.tsx`

Rendered at `/projects`. Contains the full project list.

---

#### `sections/contact/Contact.tsx`

CTA / contact section with email link and social icons.

---

### 6.7 Styles

CSS files in `styles/` are imported by their corresponding components. They use regular CSS (not CSS modules), relying on class name conventions. They are scoped by component-specific class names.

| File | Used by |
|---|---|
| `Landing.css` | `sections/hero/Hero.tsx` |
| `About.css` | `sections/about/About.tsx` |
| `WhatIDo.css` | `sections/whatido/WhatIDo.tsx` |
| `Career.css` | `sections/experience/Experience.tsx` |
| `Work.css` | `sections/projects/Projects.tsx` |
| `Contact.css` | `sections/contact/Contact.tsx` |
| `Loading.css` | `components/ui/loading/Loading.tsx` |
| `Navbar.css` | `components/ui/navbar/Navbar.tsx` |
| `Cursor.css` | `components/ui/Cursor.tsx` |
| `SocialIcons.css` | `components/ui/SocialIcons.tsx` |
| `style.css` | General shared styles |

**Tailwind custom animations** are defined in `tailwind.config.ts`:
- `animate-marquee` — horizontal text scroll (Loading screen)
- `animate-loaderGame` — obstacle scroll in Pac-Man game
- `animate-ball25` — ball bounce in Pac-Man game
- `animate-blink` — cursor blink
- `animate-blinkDone` — one-shot cursor fade out

---

### 6.8 Data & Utils

---

#### `data/boneData.ts`

Arrays of Three.js bone names from the character's armature. Used by `animationUtils.ts` to filter animation tracks to specific bones:

- **Typing bones** — ~50+ bones for fingers, hands, wrists, arms
- Other bone groupings for facial animations

**If you swap the 3D character model**, you must update these bone names to match the new armature. Use Blender or a GLTF viewer to inspect bone names.

---

#### `utils/smootherRef.ts`

A single exported `ref` holding the `ScrollSmoother` instance. Allows files outside of `Navbar.tsx` to call `smootherRef.current.pause()` / `.resume()` without prop drilling.

---

## 7. How Files Connect to Each Other

```
app/layout.tsx
    ├── imports LoadingProvider      → components/ui/loading/LoadingProvider.tsx
    │       └── renders Loading      → components/ui/loading/Loading.tsx
    │               └── uses context: { progress, setProgress, setIsLoading }
    │
    ├── imports CharacterCanvas      → components/CharacterCanvas.tsx
    │       └── dynamic import       → engine/Character/index.tsx
    │               └── renders Scene → engine/Character/Scene.tsx
    │                       ├── loadCharacter()  → engine/Character/utils/character.ts
    │                       │       └── decryptFile() → engine/Character/utils/decrypt.ts
    │                       ├── setLighting()    → engine/Character/utils/lighting.ts
    │                       ├── setAnimations()  → engine/Character/utils/animationUtils.ts
    │                       │       └── uses boneData → data/boneData.ts
    │                       ├── setMouseRotation() → engine/Character/utils/mouseUtils.ts
    │                       ├── handleResize()   → engine/Character/utils/resizeUtils.ts
    │                       └── progress.loaded()
    │                               ├── setCharTimeline() → engine/animations/GsapScroll.ts
    │                               └── setAllTimeline()  → engine/animations/GsapScroll.ts
    │
    ├── imports Navbar               → components/ui/navbar/Navbar.tsx
    │       └── initializes ScrollSmoother, stores in → utils/smootherRef.ts
    │
    └── imports Footer               → components/Footer.tsx

app/page.tsx
    ├── Hero        → sections/hero/Hero.tsx
    ├── About       → sections/about/About.tsx
    ├── WhatIDo     → sections/whatido/WhatIDo.tsx
    ├── Skills      → sections/skills/Skills.tsx
    │       └── TechStack → engine/physics/TechStack.tsx
    ├── Experience  → sections/experience/Experience.tsx
    ├── Projects    → sections/projects/Projects.tsx
    └── Contact     → sections/contact/Contact.tsx

initialFX.ts (called after loading screen exits)
    ├── ScrollSmoother.resume() via utils/smootherRef.ts
    ├── setSplitText()  → engine/animations/splitText.ts
    └── setIsLoading(false) → LoadingProvider context
```

---

## 8. The 3D Character System

### Model File

- Located at `public/models/character.enc`
- AES-CBC encrypted GLTF with DRACO compression
- Contains: character mesh, armature (skeleton), named animations, materials
- Uses Git LFS (see `public/models/.gitattributes`) — large files tracked via LFS

### How the Model Loads

1. `decrypt.ts` fetches and decrypts the file using `window.crypto.subtle`
2. `GLTFLoader.parse()` parses the decrypted buffer (not a URL, so no second HTTP request)
3. `DRACOLoader` decompresses mesh geometry using `/public/draco/draco_decoder.wasm`
4. Materials are cloned and customized (colors, shadows)
5. The model is added to the THREE.Scene

### Animation System

The character has multiple named animations baked into the GLTF:

| Animation Name | Trigger | Type |
|---|---|---|
| Intro | On load | LoopOnce (plays once) |
| Typing | After intro | Loops via filtered bone tracks |
| browup | Mouse hover on face div | LoopOnce |
| key1–key6 | Scroll positions | LoopOnce |

`AnimationMixer.update(delta)` is called every frame in the RAF loop in `Scene.tsx`.

### Bone Data

`data/boneData.ts` lists bone names. These must exactly match the armature in the GLTF. If you're seeing broken animations after swapping the model, the first thing to check is whether bone names match.

### HDRI Environment

`char_enviorment.hdr` is loaded with `RGBELoader` and set as `scene.environment`. This provides realistic reflections on the character's materials. The HDRI also contributes to lighting.

---

## 9. Scroll Animation System

This project uses GSAP's `ScrollTrigger` and `ScrollSmoother` (Club plugins).

### ScrollSmoother

Initialized in `Navbar.tsx`. Wraps the entire page content in smooth momentum scrolling at `speed: 1.7`. It is:
- **Paused** during the loading screen
- **Resumed** in `initialFX.ts` after the user clicks "Enter"

The smoother instance is stored in `utils/smootherRef.ts`.

### ScrollTrigger Timelines

All timelines are created in `engine/animations/GsapScroll.ts` after the character model loads. The timelines are keyed to HTML element IDs:

| Section ID | Corresponding Section |
|---|---|
| `#hero` | Hero |
| `#about` | About |
| `#whatido` | WhatIDo |
| `#skills` | Skills |
| `#work` | Projects |
| `#career` | Experience |

**Make sure these IDs exist on the section wrapper elements** — if an ID is missing, the corresponding ScrollTrigger will fail silently and that animation won't run.

### SplitText

`engine/animations/splitText.ts` uses GSAP `SplitText` to split paragraph and heading text into animatable units. This runs **only on desktop (`innerWidth > 900`)** and is called from `initialFX.ts`. It re-runs on `ScrollTrigger.refresh()`.

---

## 10. Loading System

The loading system coordinates between the UI progress bar and the actual 3D model loading.

### Progress Flow

1. `Loading.tsx` starts a `setInterval` on mount that slowly increments `progress` from 0 → ~90% (artificial delay)
2. In `Scene.tsx`, once the GLTF is loaded and shaders compiled, it calls `setProgress(100)` via the context
3. `Loading.tsx` detects `progress >= 100`, animates the bar to full, then reveals the "Enter" button
4. User clicks "Enter" → `initialFX.ts` runs → `setIsLoading(false)` → Loading unmounts

This two-step approach (artificial + real progress) ensures the loading screen doesn't disappear too fast even on fast connections, while still correctly representing real completion.

---

## 11. Physics — TechStack Spheres

Located in `engine/physics/TechStack.tsx`. Uses React Three Fiber (`@react-three/fiber`) — this is a different rendering path from the main character scene (which uses vanilla Three.js).

### How It Works

- A `<Canvas>` renders a separate WebGL context on top of the page
- `<Physics>` from `@react-three/rapier` provides gravity and collision detection
- 30 `<RigidBody>` spheres are spawned with random positions
- A `<RigidBody type="kinematicPosition">` (the "pointer ball") tracks mouse position
- Each frame, the pointer ball updates its position; Rapier physics engine calculates sphere reactions
- `N8AO` provides ambient occlusion for depth

### Activation

The TechStack is only active (`active` state) when:
1. The user is on desktop (`window.innerWidth > 900`)
2. The `#work` ScrollTrigger has fired (user scrolled to Skills/Projects section)

When not active, the Canvas is hidden to save GPU resources.

---

## 12. Responsive Design

The project handles three cases: desktop, tablet, and mobile.

### Breakpoints

Defined in CSS files (not Tailwind breakpoints). Key breakpoints:
- `900px` — main mobile/desktop split for GSAP animations
- Various section-specific breakpoints in individual CSS files

### Camera Zoom (3D)

`engine/Character/utils/resizeUtils.ts` → `getResponsiveZoom(aspect)`:
- Portrait phones: zoom ~0.345–0.56 (character fits narrower viewport)
- Landscape/desktop: zoom 1.1

### Animation Differences

- **Desktop:** Full GSAP ScrollTrigger timelines with camera movement
- **Mobile:** Simplified timelines, no camera pan, character stays centered; Framer Motion used for Experience cards

### Viewport Height Fix

`app/globals.css` sets `--vh: 1vh`. JS should update this on resize for correct 100vh on mobile browsers (check `globals.css` for the listener if needed).

---

## 13. SEO Setup

- **`app/layout.tsx`** — `metadata` export with title, description, OG image, Twitter card, canonical URL
- **JSON-LD** — Structured data schema injected via `<script type="application/ld+json">` in layout
- **`app/robots.ts`** — Generates `/robots.txt` — currently allows all bots
- **`app/sitemap.ts`** — Generates `/sitemap.xml` — update if you add routes
- **Hidden SEO content** — `app/page.tsx` contains a visually hidden `<div>` with text for crawlers since the 3D content is not crawlable

---

## 14. Security Headers

Configured in `next.config.ts` and applied to all routes:

| Header | Value | Why |
|---|---|---|
| `Content-Security-Policy` | Allows self, unsafe-inline, blob:, fonts.googleapis.com, cdn.worldvectorlogo.com | GSAP requires unsafe-inline; Three.js uses blob: for textures |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage |
| `Permissions-Policy` | Disables camera, microphone, geolocation | Minimal permissions |

**Cache headers:**
- `/images/*` — 1 year cache (`31536000s`)
- `/models/*` and `/videos/*` — 1 day cache (`86400s`)

---

## 15. How to Modify Common Things

### Change Accent Color

Edit `--accentColor` in `app/globals.css`. Also update the light colors in `engine/Character/utils/lighting.ts` if you want the character lighting to match.

### Update Personal Info (Name, Bio, Title)

- **Hero title/subtitle:** `sections/hero/Hero.tsx`
- **About text:** `sections/about/About.tsx`
- **SEO metadata:** `app/layout.tsx` → `metadata` object
- **JSON-LD schema:** `app/layout.tsx` → `<script type="application/ld+json">`
- **Footer links:** `components/Footer.tsx`
- **Social links:** `components/ui/SocialIcons.tsx`

### Add/Edit Work Experience

Edit the data array in `sections/experience/Experience.tsx`. Each entry needs: company, role, date, description, tech stack.

### Add/Edit Projects

Edit the projects array in `sections/projects/Projects.tsx` (featured) and `sections/projects/AllProjects.tsx` (full list). Add screenshots to `public/images/`.

### Add a New Tech Logo to Physics Spheres

1. Add `.webp` image to `public/images/`
2. Add it to the `textures` array in `engine/physics/TechStack.tsx`

### Change the 3D Character Model

1. Prepare your model as a GLTF/GLB with DRACO compression
2. Encrypt it with AES-CBC (IV prepended) using `NEXT_PUBLIC_MODEL_KEY`
3. Replace `public/models/character.enc`
4. Update bone names in `data/boneData.ts` to match your new armature
5. Update animation names in `engine/Character/utils/animationUtils.ts`
6. Update `customizeMaterials()` in `engine/Character/utils/character.ts` if material names differ

### Modify Scroll Animations

All scroll timelines are in `engine/animations/GsapScroll.ts`. Each `ScrollTrigger` is tied to a section `id`. Edit the `gsap.to()` calls within each timeline to change what animates and how.

### Change Loading Screen

Edit `components/ui/loading/Loading.tsx` and `styles/Loading.css`. The Pac-Man game is fully CSS-animated using Tailwind custom keyframes defined in `tailwind.config.ts`.

### Add a New Page/Route

1. Create `app/your-route/page.tsx`
2. Update `app/sitemap.ts` to include the new URL
3. If the page should not show the 3D character, update the path check in `components/CharacterCanvas.tsx`

---

## 16. Assets Reference

### Images (`public/images/`)

| File | Used in |
|---|---|
| `react.webp`, `react2.webp` | TechStack spheres |
| `next.webp`, `next2.webp` | TechStack spheres |
| `node.webp`, `node2.webp` | TechStack spheres |
| `express.webp` | TechStack spheres |
| `mongo.webp` | TechStack spheres |
| `mysql.webp` | TechStack spheres |
| `typescript.webp` | TechStack spheres |
| `javascript.webp` | TechStack spheres |
| `replyzen.png` | Projects section |
| `prism.png` | Projects section |
| `techbay.png` | Projects section |
| `hotel-management.png` | Projects section |
| `portfolio3d.png` | Projects section |
| `creator-insights.png` | Projects section |
| `logo.png` | Navbar / general branding |
| `bond.png`, `Maxlife.png`, `Solidx.png`, `sapphire.png`, `radix.png` | About / experience section |

### 3D Models (`public/models/`)

| File | Purpose |
|---|---|
| `character.enc` | Encrypted AES-CBC GLTF — the main 3D character |
| `char_enviorment.hdr` | HDRI equirectangular environment map for lighting & reflections |

### DRACO Decoder (`public/draco/`)

| File | Purpose |
|---|---|
| `draco_decoder.js` | JS fallback for DRACO decompression |
| `draco_decoder.wasm` | WASM binary for DRACO decompression (faster) |

These files are required for `DRACOLoader` to work. Do not delete them.

---

## 17. Build & Deployment

### Commands

```bash
npm run dev        # Development server (hot reload)
npm run build      # Production build (outputs to .next/)
npm start          # Serve production build
npm run lint       # ESLint check
```

### Environment Variables for Production

Set `NEXT_PUBLIC_MODEL_KEY` in your hosting environment (Vercel, etc.).

### Deploying on Vercel

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Add `NEXT_PUBLIC_MODEL_KEY` in Vercel project settings → Environment Variables
4. Deploy

### Git LFS

The `public/models/` directory uses Git LFS (Large File Storage) for `character.enc` and `char_enviorment.hdr`. Make sure Git LFS is installed and the files are tracked before pushing:

```bash
git lfs install
git lfs track "*.enc" "*.hdr"
git add .gitattributes
```

If Git LFS is not set up on a clone, the model files will be LFS pointer files (tiny text files) instead of real binaries, and the 3D character will fail to load.

---

## 18. Common Pitfalls & Gotchas

### `window is not defined` on Build

Three.js uses browser APIs (`window`, `document`). Always keep `ssr: false` in the dynamic import in `CharacterCanvas.tsx`. Never import Three.js files at the top level of a server component.

### GSAP Club Plugins (ScrollSmoother, SplitText)

These require a GSAP Club license. The types are declared in `types/gsap-trial.d.ts`. If you upgrade GSAP to a version that removes trial access, smooth scrolling and split text animations will stop working. Keep the current `gsap` version locked.

### Bone Names Must Match the Model

`data/boneData.ts` contains hard-coded bone names. If you swap the character model, every bone name in that file must match the armature in your new GLTF exactly (case-sensitive). Mismatched bones cause silent animation failures.

### The Model Must Be Re-encrypted When Changed

`decrypt.ts` expects the exact AES-CBC format (IV prepended). If you provide a plain GLTF/GLB file as `character.enc`, decryption will fail or produce garbage, and the character will not appear.

### ScrollTrigger Section IDs

`GsapScroll.ts` references `#hero`, `#about`, `#whatido`, `#skills`, `#work`, `#career` as trigger elements. If any of these IDs are renamed in the section components, the corresponding scroll animation will silently not run.

### `progress.loaded()` Race Condition

The GSAP scroll timelines are only created after `progress.loaded()` resolves (both 3D loading and loading bar). If the loading bar never reaches 100% (e.g., `setProgress(100)` is never called), the scroll timelines are never set up. This means the character will be static and no scroll animations will run.

### Physics Canvas Z-Index

`TechStack.tsx` renders in a separate `<Canvas>` element. Make sure its CSS `z-index` and `pointer-events` are correctly set so it doesn't block interaction with other page elements. Check `styles/Work.css` for the canvas wrapper styles.

### Mobile Performance

Three.js + Physics + GSAP can be heavy on low-end mobile devices. The project already disables camera panning and physics on mobile. If you add more 3D elements, test on actual mobile devices, not just browser emulation.

### Git LFS on Clone

If you clone this repo without Git LFS installed, the 3D model files will be pointer files. Run `git lfs pull` after installing Git LFS to fetch the actual binaries.

---

*This documentation was written based on the full source code analysis of the project as of March 2026.*
