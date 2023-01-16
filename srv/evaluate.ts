// deno-lint-ignore-file no-explicit-any
const rawData = await Deno.readTextFile("data/results.json");

const data = JSON.parse(rawData);

const result = data.reduce(
  (
    acc: {
      "1": number;
      "2": number;
      "4": number;
      "5": number;
      "6": number;
      "7": number;
      "8": number;
    },
    item: { time: string; email: string; tip: number[]; votes: number }
  ) => {
    const tip = item.tip.reverse();
    tip.forEach((item: number, index: number) => {
      const key = item.toString();
      acc[key] += index;
    });
    return acc;
  },
  { "1": 0, "2": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 }
);

// const result = data.map((item: any) => {
//   return {
//     time: new Date(+item.Item.uid.N),
//     email: item.Item.email.S,
//     tip: item.Item.tip.L.map((item: any) => +item.N),
//     votes: +item.Item.votes.N,
//   };
// });

// result.sort((a: { time: number }, b: { time: number }) => a.time - b.time);

console.log(result);

// await Deno.writeTextFile("data/ranking.csv", JSON.stringify(result.slice(13)));

// const codeBook = JSON.parse(await Deno.readTextFile("./salaty.json"));

// // deno-lint-ignore no-explicit-any
// const codeBookResult = codeBook.map((item: any) => {
//   return { id: +item.id, item: item.name };
// });

// await Deno.writeTextFile("./codebook.csv", d3.csvFormat(codeBookResult));
