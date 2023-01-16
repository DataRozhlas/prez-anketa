import Image from "next/image";
import { DragControls } from "framer-motion";

interface ImageProps {
  item: {
    id: number;
    name: string;
    age: number;
    city: string;
    job: string;
  };
}

const CandidateImage = ({ item }: ImageProps) => {
  return (
    <div className="pointer-events-auto flex-shrink-0">
      <Image
        src={`https://data.irozhlas.cz/prez-anketa/img/${item.id}.png`}
        alt={item.name}
        width={60}
        height={60}
        className="rounded-full"
      ></Image>
    </div>
  );
};

export default CandidateImage;
