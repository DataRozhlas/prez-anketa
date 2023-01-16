import Head from "next/head";
import { useState, useEffect } from "react";
import candidates from "../data/candidates-sorted.json";
import ItemStatic from "../components/ItemStatic";
import { usePostMessageWithHeight } from "../hooks";

export default function Home() {
  const [items, setItems] = useState(candidates);

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(
    "cro_prez_anketa_results"
  );

  useEffect(() => {
    postHeightMessage();
  }, [items, postHeightMessage]);

  return (
    <div ref={containerRef}>
      <Head>
        <title>Jak tipují pořadí kandidátů čtenáři iROZHLAS.cz</title>
        <meta
          name="description"
          content="tipují pořadí kandidátů čtenáři iROZHLAS.cz"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold leading-7">
          Jak tipují pořadí kandidátů čtenáři iROZHLAS.cz
        </h1>
        <h2 className="pb-0 pt-1 text-xs leading-5">Na základě 5 878 tipů</h2>
        <div className="w-full select-none pt-3">
          <ol className="space-y-2">
            {items.map((item) => (
              <ItemStatic key={item.id} item={item} items={items}></ItemStatic>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
