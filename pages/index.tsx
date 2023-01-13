import Head from "next/head";
import { Reorder } from "framer-motion";
import { useState, useEffect } from "react";
import candidates from "../data/candidates.json";
import Item from "../components/Item";
import { usePostMessageWithHeight } from "../hooks";

type Email = string;
type Votes = number;

export default function Home() {
  const [items, setItems] = useState(candidates);
  const [votes, setVotes] = useState<Votes>(1850000);
  const [email, setEmail] = useState<Email>("");
  const [hasChanged, setHasChanged] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { containerRef, postHeightMessage } =
    usePostMessageWithHeight("cro_prez_anketa");

  useEffect(() => {
    postHeightMessage();
  }, [isSubmitted, postHeightMessage]);

  const handlePostClick = () => {
    const http = new XMLHttpRequest();
    const url =
      "https://44xqsx4dlsm53kbequqhly5r2e0fappc.lambda-url.eu-central-1.on.aws/";
    http.open("POST", url);
    http.send(
      JSON.stringify({
        tip: items.map((item) => item.id),
        votes: votes,
        email: email.length === 0 ? "null" : email,
      })
    );
    setIsSubmitted(true);
  };

  return (
    <div ref={containerRef}>
      <Head>
        <title>Prezidentská tipovačka</title>
        <meta
          name="description"
          content="Tipněte si pořadí kandidátů v prvním kole voleb prezidenta České republiky"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold leading-7">
          Tipovačka skončila
        </h1>
        <h2 className="pb-0 pt-1  text-center leading-5">
          S otevřením volebních místností jsme ukončili příjem tipů.
        </h2>
        <h2 className="pb-0 pt-1  text-center leading-5">
          Výsledky zveřejníme na serveru iROZHLAS.cz v sobotu 14. ledna, autory
          nejpřesnějších tipů kontaktujeme e-mailem v úterý 17. ledna.
        </h2>
      </main>
      {/* {!isSubmitted && (
        <main className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold leading-7">
            Jak dopadne první kolo?
            <br />
            Přetažením kandidátů změníte pořadí
          </h1>
          <h2 className="pb-0 pt-1 text-xs leading-5">
            Výchozí řazení je dané vylosovaným číslem kandidáta
          </h2>
          <div className="w-full select-none pt-3">
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
          <div className="mx-auto mt-10 flex w-full flex-col items-center">
            <label
              htmlFor="votes"
              className="block text-center text-xl font-bold"
            >
              Kolik hlasů získá vítěz prvního kola? <br />{" "}
              {votes.toLocaleString("cs-CZ")}
            </label>
            <div className="w-full px-3">
              <input
                type="range"
                name="votes"
                id="votes"
                className="w-full cursor-pointer py-2 accent-indigo-600"
                value={votes}
                onChange={(e) => {
                  setHasChanged(true);
                  setVotes(parseInt(e.target.value));
                }}
                min="100000"
                max="4000000"
                step="5000"
                aria-describedby="votes-description"
              />
            </div>
            <p className="text-sm text-gray-500" id="email-description">
              V minulých volbách to bylo 1 985 547
            </p>
            <label htmlFor="number" className="mt-10 block text-xl font-bold">
              Váš e-mail (nepovinné)
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md  border border-gray-300 bg-white py-1 px-3 shadow focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              <br />K ničemu jinému váš e-mail nepoužijeme a po volbách jej
              smažeme.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePostClick}
            disabled={!hasChanged}
            className="mt-14 mb-3 inline-flex w-10/12 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg  font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
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
      )}
      {isSubmitted && (
        <main className="flex flex-col items-center">
          <h1 className="text-center text-2xl font-bold leading-7">
            Váš tip byl uložen{" "}
          </h1>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setHasChanged(false);
              setVotes(1850000);
              setEmail("");
              setItems(candidates);
            }}
            disabled={!hasChanged}
            className="my-6 inline-flex w-6/12 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg  font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
          >
            Zadat další tip
          </button>
          <h2 className="w-8/12 text-center text-sm leading-5">
            Pokud zadáte více tipů se stejnou e-mailovou adresou, do soutěže o
            ceny vstupuje jen ten poslední.
          </h2>
        </main>
      )} */}
    </div>
  );
}
