// deno-lint-ignore-file no-explicit-any
import * as d3 from "npm:d3-dsv";

const rawData = await Deno.readTextFile("data/tips.json");

const data = JSON.parse(rawData);

const result = data.map((item: any) => {
  return {
    time: new Date(+item.Item.uid.N),
    email: item.Item.email.S,
    tip: item.Item.tip.L.map((item: any) => +item.N),
    votes: +item.Item.votes.N,
  };
});

result.sort((a: { time: number }, b: { time: number }) => a.time - b.time);

await Deno.writeTextFile("data/results.csv", d3.csvFormat(result.slice(13)));
await Deno.writeTextFile("data/results.json", JSON.stringify(result.slice(13)));

const winners = result
  .slice(13)
  .filter(
    (item: any) => item.tip.toString() === [4, 7, 6, 1, 2, 9, 8, 5].toString()
  )
  .filter((item: any) => item.email !== "null")
  .filter((item: any) => item.votes === 1985000);

console.log(winners.length);

await Deno.writeTextFile("data/losers.csv", d3.csvFormat(winners));

// const codeBook = JSON.parse(await Deno.readTextFile("./salaty.json"));

// // deno-lint-ignore no-explicit-any
// const codeBookResult = codeBook.map((item: any) => {
//   return { id: +item.id, item: item.name };
// });

// await Deno.writeTextFile("./codebook.csv", d3.csvFormat(codeBookResult));
