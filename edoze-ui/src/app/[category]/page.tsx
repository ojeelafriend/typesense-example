import { searchProductsByCategory } from "@/services/search";
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
