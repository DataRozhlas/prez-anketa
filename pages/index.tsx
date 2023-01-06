import Head from "next/head";
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
            className="space-y-3"
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
                className="cursor-grab overflow-hidden rounded-md bg-white px-6 py-4 shadow active:cursor-grabbing"
              >
                {`${items.indexOf(item) + 1}. ${item.name}`}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </main>
    </>
  );
}
