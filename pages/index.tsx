import Head from "next/head";
import { Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import candidates from "../data/candidates.json";
import Item from "../components/Item";

type Email = string;
type Votes = number;

export default function Home() {
  const [items, setItems] = useState(candidates);
  const [votes, setVotes] = useState<Votes>(1850000);
  const [email, setEmail] = useState<Email>();
  const [hasChanged, setHasChanged] = useState(false);

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
      <main className="flex flex-col items-center">
        <h1 className="text-center text-xl font-bold leading-6 sm:text-2xl">
          Jak dopadnou volby?
          <br />
          Přetažením kandidátů změníte jejich pořadí
        </h1>
        <h2 className="pb-0 text-xs leading-5">
          Výchozí řazení je dané vylosovaným číslem kandidáta
        </h2>
        <div className="w-full pt-3">
          <Reorder.Group
            className="space-y-2"
            axis="y"
            values={items}
            onReorder={(newOrder) => {
              setItems(newOrder);
              setHasChanged(true);
            }}
          >
            {items.map((item) => (
              <Item key={item.id} item={item} items={items}></Item>
            ))}
          </Reorder.Group>
        </div>
        <div className="mx-auto mt-6 flex w-full flex-col items-center">
          <label
            htmlFor="votes"
            className="block text-center text-xl font-bold"
          >
            Kolik hlasů získá vítěz? <br /> {votes.toLocaleString("cs-CZ")}
          </label>
          <div className="mt-1 w-full px-3">
            <input
              type="range"
              name="votes"
              id="votes"
              className="w-full cursor-pointer py-3"
              value={votes}
              onChange={(e) => {
                setHasChanged(true);
                setVotes(parseInt(e.target.value));
              }}
              min="100000"
              max="8000000"
              step="5000"
              aria-describedby="votes-description"
            />
          </div>
          {isNaN(votes) && (
            <p className="mt-1 text-sm text-red-500" id="email-description">
              Zadejte číslo mezi 100 000 a 8 500 000
            </p>
          )}
          {!isNaN(votes) && (
            <p className="mt-1 text-sm text-gray-500" id="email-description">
              V minulých volbách to bylo 1 985 547
            </p>
          )}
          <label htmlFor="number" className="mt-5 block text-xl font-bold">
            Váš e-mail (nepovinné)
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              className="rounded-md border border-gray-300  py-1 px-3 shadow"
              value={email}
              placeholder="jmeno@domena.cz"
              maxLength={254}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="email-description"
            />
          </div>
          <p
            className="mt-1 max-w-xs text-center text-sm leading-4 text-gray-500"
            id="email-description"
          >
            Vyplňte, chcete-li soutěžit o ceny.
            <br />K ničemu jinému váš e-mail nepoužijeme.
          </p>
        </div>
        <button
          type="submit"
          disabled={!hasChanged}
          className="my-6 inline-flex w-11/12 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg  font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-3 h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          Odeslat tip
        </button>
      </main>
    </>
  );
}
