export type Product = {
  id: string;
  title: string;
  image: string;
  price: string;
};

export const searchProductsByCategory = async ({
  query,
  categorySelected,
}: {
  query: string;
  categorySelected?: string;
}): Promise<{
  found: boolean;
  products?: Product[];
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/_search?q=${query}&category=${categorySelected}`
  );

  const result = await response.json();

  if (!result.ok) {
    return { found: false };
  }

  return { found: true, products: result.products };
};

export const searchAllProducts = async ({ page = "1" }: { page?: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/_search/all?page=${page}`
  );
  const result = await response.json();

  console.log(result.products);
  if (!result.ok) {
    return { found: false };
  }

  return { found: true, products: result.products };
};
