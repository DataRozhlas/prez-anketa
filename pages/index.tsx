import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
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
      </main>
    </>
  );
}
