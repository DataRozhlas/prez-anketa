import Head from "next/head";
import { Reorder } from "framer-motion";
import { useState } from "react";
import candidates from "../data/candidates.json";
import Item from "../components/Item";

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
      <main>
        <h1 className="text-xl font-bold leading-6 sm:text-2xl">
          Jak dopadnou volby? Přetažením kandidátů změníte jejich pořadí
        </h1>
        <h2 className="pb-0 text-sm leading-5">
          Výchozí řazení je dané vylosovaným číslem kandidáta
        </h2>
        <div className="pt-3">
          <Reorder.Group
            className="space-y-2"
            axis="y"
            values={items}
            onReorder={setItems}
          >
            {items.map((item) => (
              <Item key={item.id} item={item} items={items}></Item>
            ))}
          </Reorder.Group>
        </div>
      </main>
    </>
  );
}
