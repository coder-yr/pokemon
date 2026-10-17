export const instant = false;
import Link from "next/link";

type PokemonType = {
    type: {
        name: string;
    };
};

type PokemonAbility = {
    ability: {
        name: string;
    };
};

type PokemonStat = {
    base_stat: number;
    stat: {
        name: string;
    };
};

type PokemonMove = {
    move: {
        name: string;
    };
};

type PokemonDetails = {
    name: string;
    id: number;
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
};

type Props = {
    params: Promise<{ name: string }>;
};

export default async function PokemonDetail({ params }: Props) {
    const { name } = await params;

    let pokemon: PokemonDetails;

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name.toLowerCase())}`
        );

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }

        pokemon = await response.json();
    } catch {
        return (
            <main className="min-h-screen bg-gray-950 text-white p-8">
                <h1 className="text-3xl font-bold">Pokémon not found</h1>
                <p className="mt-3 text-gray-400">
                    We couldn't find that Pokémon. Check the name and try again.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-500"
                >
                    Back to Explorer
                </Link>
            </main>
        );
    }

    const image =
        pokemon.sprites.other?.["official-artwork"]?.front_default ??
        pokemon.sprites.front_default;

    return (
        <main className="min-h-screen bg-gray-950 px-5 py-8 text-white sm:px-8">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/"
                    className="inline-block rounded-lg border border-gray-700 px-4 py-2 text-gray-300 hover:bg-gray-800"
                >
                    ← Back to Explorer
                </Link>

                <section className="mt-8 grid gap-8 rounded-2xl border border-gray-800 bg-gray-900 p-6 md:grid-cols-2 md:p-10">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-400">
                            #{String(pokemon.id).padStart(3, "0")}
                        </p>

                        {image ? (
                            <img
                                src={image}
                                alt={pokemon.name}
                                className="h-64 w-64 object-contain"
                            />
                        ) : (
                            <p className="py-20 text-gray-400">
                                No image available
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold capitalize sm:text-5xl">
                            {pokemon.name}
                        </h1>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {pokemon.types.map(({ type }) => (
                                <span
                                    key={type.name}
                                    className="rounded-full bg-blue-600/20 px-4 py-2 text-sm capitalize text-blue-300"
                                >
                                    {type.name}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="rounded-xl bg-gray-800 p-4">
                                <p className="text-sm text-gray-400">Height</p>
                                <p className="mt-1 text-xl font-semibold">
                                    {pokemon.height / 10} m
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-800 p-4">
                                <p className="text-sm text-gray-400">Weight</p>
                                <p className="mt-1 text-xl font-semibold">
                                    {pokemon.weight / 10} kg
                                </p>
                            </div>
                        </div>

                        <h2 className="mt-8 text-xl font-semibold">Abilities</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {pokemon.abilities.map(({ ability }) => (
                                <span
                                    key={ability.name}
                                    className="rounded-lg border border-gray-700 px-3 py-2 capitalize"
                                >
                                    {ability.name.replaceAll("-", " ")}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                    <h2 className="text-2xl font-bold">Base Stats</h2>

                    <div className="mt-6 space-y-5">
                        {pokemon.stats.map(({ base_stat, stat }) => (
                            <div key={stat.name}>
                                <div className="mb-2 flex justify-between gap-4">
                                    <span className="capitalize text-gray-300">
                                        {stat.name.replaceAll("-", " ")}
                                    </span>
                                    <span className="font-semibold">
                                        {base_stat}
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{
                                            width: `${Math.min(base_stat, 200) / 2}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                    <h2 className="text-2xl font-bold">
                        Moves ({pokemon.moves.length})
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {pokemon.moves.slice(0, 30).map(({ move }) => (
                            <span
                                key={move.name}
                                className="rounded-lg bg-gray-800 px-3 py-2 text-sm capitalize text-gray-300"
                            >
                                {move.name.replaceAll("-", " ")}
                            </span>
                        ))}
                    </div>

                    {pokemon.moves.length > 30 && (
                        <p className="mt-4 text-sm text-gray-400">
                            Showing 30 of {pokemon.moves.length} moves.
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}
