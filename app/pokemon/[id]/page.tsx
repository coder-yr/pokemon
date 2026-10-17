export const instant = false;

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// TypeScript interfaces for Pokemon detail data
interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  is_hidden: boolean;
  ability: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonMove {
  move: {
    name: string;
  };
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
}

// Type colors mapping for badges
const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-100 text-gray-800 border-gray-300",
  fire: "bg-orange-100 text-orange-800 border-orange-300",
  water: "bg-blue-100 text-blue-800 border-blue-300",
  grass: "bg-green-100 text-green-800 border-green-300",
  electric: "bg-yellow-100 text-yellow-800 border-yellow-300",
  ice: "bg-cyan-100 text-cyan-800 border-cyan-300",
  fighting: "bg-red-100 text-red-800 border-red-300",
  poison: "bg-purple-100 text-purple-800 border-purple-300",
  ground: "bg-amber-100 text-amber-800 border-amber-300",
  flying: "bg-indigo-100 text-indigo-800 border-indigo-300",
  psychic: "bg-pink-100 text-pink-800 border-pink-300",
  bug: "bg-lime-100 text-lime-800 border-lime-300",
  rock: "bg-stone-100 text-stone-800 border-stone-300",
  ghost: "bg-violet-100 text-violet-800 border-violet-300",
  dragon: "bg-purple-100 text-purple-800 border-purple-300",
  steel: "bg-slate-100 text-slate-800 border-slate-300",
  fairy: "bg-rose-100 text-rose-800 border-rose-300",
  dark: "bg-neutral-200 text-neutral-800 border-neutral-400",
};

interface PokemonDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PokemonDetailProps): Promise<Metadata> {
  const { id } = await params;
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  return {
    title: `${name} | Pokemon Explorer`,
    description: `View stats, types, abilities, and moves for ${name}.`,
  };
}

export default async function PokemonDetailPage({ params }: PokemonDetailProps) {
  const { id } = await params;

  let pokemon: PokemonDetail | null = null;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`);
    if (res.ok) {
      pokemon = await res.json();
    }
  } catch (err) {
    console.error(err);
  }

  // Not found fallback
  if (!pokemon) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-800">Pokemon not found</h1>
        <p className="mt-2 text-gray-500">
          We couldn&apos;t find details for &ldquo;{id}&rdquo;.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          &larr; Back to Pokemon List
        </Link>
      </div>
    );
  }

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div>
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition"
        >
          &larr; Back to Pokemon List
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Top Details Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8 border-b border-gray-100">
          {/* Pokemon Image */}
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6">
            {image ? (
              <Image
                src={image}
                alt={pokemon.name}
                width={200}
                height={200}
                className="w-48 h-48 object-contain"
                priority
              />
            ) : (
              <p className="text-gray-400 py-12">No image available</p>
            )}
          </div>

          {/* Core Info */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <span className="text-sm font-mono text-gray-400">
              #{String(pokemon.id).padStart(3, "0")}
            </span>

            <h1 className="text-3xl font-bold text-gray-900 capitalize mt-1">
              {pokemon.name}
            </h1>

            {/* Types */}
            <div className="flex flex-wrap gap-2 mt-3">
              {pokemon.types.map((t: PokemonType) => {
                const typeName = t.type.name;
                const badgeColor =
                  TYPE_COLORS[typeName] || "bg-gray-100 text-gray-800 border-gray-200";

                return (
                  <span
                    key={typeName}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${badgeColor}`}
                  >
                    {typeName}
                  </span>
                );
              })}
            </div>

            {/* Physical Attributes */}
            <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Height</p>
                <p className="text-base font-semibold text-gray-800 mt-0.5">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-base font-semibold text-gray-800 mt-0.5">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>

            {/* Abilities */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-700">Abilities</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {pokemon.abilities.map((a: PokemonAbility) => (
                  <span
                    key={a.ability.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700 capitalize"
                  >
                    {a.ability.name.replaceAll("-", " ")}
                    {a.is_hidden && (
                      <span className="text-[10px] text-gray-500 font-normal">
                        (Hidden)
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Base Stats</h2>
          <div className="space-y-3 max-w-xl">
            {pokemon.stats.map((s: PokemonStat) => {
              const statName = s.stat.name.replaceAll("-", " ");
              const statValue = s.base_stat;
              const percentage = Math.min(Math.round((statValue / 200) * 100), 100);

              return (
                <div key={s.stat.name} className="flex items-center gap-4 text-sm">
                  <span className="w-32 text-gray-600 capitalize text-xs">
                    {statName}
                  </span>
                  <span className="w-8 font-semibold text-gray-900 text-xs text-right">
                    {statValue}
                  </span>
                  <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Moves Section */}
        <div className="p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Moves ({pokemon.moves.length})
          </h2>
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-1">
            {pokemon.moves.map((m: PokemonMove) => (
              <span
                key={m.move.name}
                className="px-2.5 py-1 rounded bg-gray-100 text-xs text-gray-700 capitalize"
              >
                {m.move.name.replaceAll("-", " ")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
