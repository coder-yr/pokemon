# Pokemon Explorer

A responsive Pokemon Explorer web application built with Next.js (App Router), TypeScript, and Tailwind CSS. The app fetches and displays data from the public PokéAPI, allowing users to browse, search, and view detailed information for each Pokémon.

---

## Features

- **Homepage Listing**: Displays an initial roster of Generation 1 Pokémon (151 Pokémon) fetched from PokéAPI.
- **Real-Time Search**: Instant client-side search filtering Pokémon by name.
- **Dynamic Detail Pages**: Dynamic server-side rendered routes (`/pokemon/[id]`) showing:
  - Official high-resolution artwork
  - National Pokédex ID and name
  - Elemental types with color-coded badges
  - Physical attributes (height in meters, weight in kilograms)
  - Abilities (including hidden ability indicators)
  - Base stats with visual progress bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
  - Moves list
- **Resilient States**: Includes clear loading indicators, error feedback, empty search states, and 404 not-found views.
- **Accessible & Responsive**: Accessible markup (labeled inputs, semantic headings) and mobile-friendly grid layouts.

---

## Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Source**: [PokéAPI](https://pokeapi.co/)

---

## PokéAPI Endpoints Used

1. **List Pokémon**:
   - `GET https://pokeapi.co/api/v2/pokemon?limit=151`
   - Fetches the initial list of Pokémon names and URLs.
2. **Pokémon Detail**:
   - `GET https://pokeapi.co/api/v2/pokemon/{id}`
   - Fetches individual Pokémon stats, types, abilities, sprites, and moves.
3. **Official Artwork**:
   - `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

---

## Project Structure

```
pokemon/
├── app/
│   ├── globals.css              # Global Tailwind CSS import and body styles
│   ├── layout.tsx               # Root layout with header and footer
│   ├── page.tsx                 # Homepage component (list & search)
│   └── pokemon/
│       └── [id]/
│           └── page.tsx         # Dynamic detail page (SSR)
├── next.config.ts               # Next.js configuration and remote image domains
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (or yarn / pnpm)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/coder-yr/pokemon.git
cd pokemon
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production build and verify TypeScript types:

```bash
npm run build
npm run start
```

### Linting

Check code quality and TypeScript standards:

```bash
npm run lint
```
