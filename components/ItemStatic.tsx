import CandidateImageStatic from "./CandidateImageStatic";

interface ItemProps {
  item: {
    id: number;
    name: string;
    age: number;
    city: string;
    job: string;
  };
  items: {}[];
}

let isMobile = false;
if (typeof window !== "undefined") {
  isMobile = window.innerWidth < 620;
}

const Item = ({ item, items }: ItemProps) => {
  return (
    <div
      key={item.id}
      className="relative flex  items-center space-x-3 overflow-hidden rounded-lg border border-gray-300 bg-white px-3 py-0 shadow-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 "
    >
      <CandidateImageStatic item={item} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">{`${
          items.indexOf(item) + 1
        }. ${item.name}`}</p>
        <p className="truncate text-sm text-gray-500">{`${item.age} let, ${item.city}`}</p>
        <p className="truncate text-sm text-gray-500">{item.job}</p>
      </div>
    </div>
  );
};

export default Item;
