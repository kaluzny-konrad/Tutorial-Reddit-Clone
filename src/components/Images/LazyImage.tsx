import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
};

export default async function LazyImage({ src, alt }: Props) {
  return <Image src={src} alt={alt} width={500} height={500} />;
}
