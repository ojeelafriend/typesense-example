import { searchProductsByCategory } from "@/services/search";
import styles from "./page.module.css";
import Image from "next/image";
import { Grid } from "@/ui/Product/Grid";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q: string }>;
}

export default async function Products({ params, searchParams }: Props) {
  const { category } = await params;
  const { q } = await searchParams;

  const { products, found } = await searchProductsByCategory({
    query: q,
    categorySelected: category,
  });
  return (
    <>
      <Grid products={products ? products : []} found={found} />
    </>
  );
}
