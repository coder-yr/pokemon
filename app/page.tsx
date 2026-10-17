"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon list");
        }

        const data = await response.json();

        const formattedList: Pokemon[] = data.results.map(
          (pokemon: { name: string; url: string }) => {
            const parts = pokemon.url.split("/").filter(Boolean);
            const id = parseInt(parts[parts.length - 1], 10) || 0;
            return {
              id,
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          }
        );

        setPokemonList(formattedList);
      } catch (err) {
        console.error(err);
        setError("Could not load Pokemon. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pokemon Explorer</h1>
        <p className="mt-1 text-gray-600">
          Browse and search through your favorite Pokemon.
        </p>

        <div className="mt-6 max-w-md">
          <label htmlFor="pokemon-search" className="sr-only">
            Search Pokemon by name
          </label>
          <input
            id="pokemon-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokemon by name..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 font-medium">Loading Pokemon...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filteredPokemon.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPokemon.map((pokemon) => (
            <Link
              key={pokemon.id}
              href={`/pokemon/${pokemon.id}`}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-red-300 transition flex flex-col items-center text-center group"
            >
              <div className="relative w-28 h-28 my-2">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={112}
                  height={112}
                  priority={pokemon.id <= 10}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <span className="text-xs text-gray-400 font-mono">
                #{String(pokemon.id).padStart(3, "0")}
              </span>

              <h2 className="text-base font-semibold text-gray-900 capitalize mt-1">
                {pokemon.name}
              </h2>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filteredPokemon.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No Pokemon found matching &ldquo;{search}&rdquo;.
          </p>
        </div>
      )}
    </div>
  );
}
