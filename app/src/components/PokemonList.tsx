
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Pokemon = {
    name: string;
    url: string;
    img: string | null;
};

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPokemonList() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=100"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch Pokémon list");
                }

                const data = await response.json();

                const fetchImages: Pokemon[] = await Promise.all(
                    data.results.map(
                        async (pokemon: { name: string; url: string }) => {
                            const pokemonDetails = await fetch(pokemon.url);

                            if (!pokemonDetails.ok) {
                                throw new Error(
                                    `Failed to fetch ${pokemon.name}`
                                );
                            }

                            const details = await pokemonDetails.json();

                            return {
                                name: pokemon.name,
                                url: pokemon.url,
                                img: details.sprites.front_default,
                            };
                        }
                    )
                );

                setPokemonList(fetchImages);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
                setError(
                    "Unable to load Pokémon. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchPokemonList();
    }, []);

    const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    return (
        <main className="min-h-screen bg-gray-950 px-5 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    Pokémon Explorer
                </h1>

                <p className="mt-2 text-gray-400">
                    Discover your favorite Pokémon.
                </p>

                <div className="mt-8">
                    <label htmlFor="pokemon-search" className="sr-only">
                        Search Pokémon
                    </label>

                    <input
                        id="pokemon-search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Pokémon..."
                        className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-blue-500"
                    />
                </div>

                <h2 className="mb-5 mt-8 text-xl font-semibold">
                    Pokémon List
                </h2>

                {loading ? (
                    <p className="text-gray-400" role="status">
                        Loading Pokémon...
                    </p>
                ) : error ? (
                    <p className="text-red-400" role="alert">
                        {error}
                    </p>
                ) : filteredPokemon.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {filteredPokemon.map((pokemon) => (
                            <li
                                key={pokemon.name}
                                className="rounded-xl border border-gray-800 bg-gray-900 transition hover:border-blue-500"
                            >
                                <Link
                                    href={`/pokemon/${pokemon.name}`}
                                    className="flex h-full flex-col items-center gap-3 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                >
                                    {pokemon.img ? (
                                        <img
                                            src={pokemon.img}
                                            alt={pokemon.name}
                                            className="h-24 w-24 object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-24 items-center text-sm text-gray-500">
                                            No image
                                        </div>
                                    )}

                                    <span className="font-medium capitalize">
                                        {pokemon.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">
                        No Pokémon found. Try another name.
                    </p>
                )}
            </div>
        </main>
    );
}
