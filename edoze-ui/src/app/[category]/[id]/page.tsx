async function fetchProductById(code: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/_search/code?id=${code}`
  );

  const result = await response.json();

  if (!result.ok) {
    return { found: false };
  }

  return { found: true, product: result.product };
}

interface Props {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

export default async function Product({ searchParams }: Props) {
  const { code } = await searchParams;

  const { found, product } = await fetchProductById(code.toString());

  return <>{found ? product : "Product not found"}</>;
}
