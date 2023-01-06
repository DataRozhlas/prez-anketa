import Head from "next/head";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { useState } from "react";
import candidates from "../data/candidates.json";

export default function Home() {
  const [items, setItems] = useState(candidates);

  return (
    <>
      <Head>
        <title>Prezidentská tipovačka</title>
        <meta
          name="description"
          content="Tipněte si pořadí kandidátů v prvním kole voleb prezidenta České republiky"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold leading-6 sm:text-2xl">
          Jak dopadnou volby? Přetažením kandidátů změníte jejich pořadí
        </h1>
        <h2 className="pb-0 text-sm leading-5">
          Výchozí řazení je dané vylosovaným číslem kandidátní listiny
        </h2>
        <div className="px-1 pt-3">
          <Reorder.Group
            className="space-y-2"
            as="ol"
            role="list"
            axis="y"
            values={items}
            onReorder={setItems}
          >
            {items.map((item) => (
              <Reorder.Item
                key={item.id}
                value={item}
                className="relative flex cursor-grab items-center space-x-3 overflow-hidden rounded-lg border border-gray-300 bg-white px-3 py-3 shadow-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 active:cursor-grabbing"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={`https://data.irozhlas.cz/prez-anketa/img/${item.id}.png`}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                    draggable="false"
                  ></Image>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{`${
                    items.indexOf(item) + 1
                  }. ${item.name}`}</p>
                  <p className="truncate text-sm text-gray-500">{`${item.age} let, ${item.city}`}</p>
                  <p className="truncate text-sm text-gray-500">{item.job}</p>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </main>
    </>
  );
}
