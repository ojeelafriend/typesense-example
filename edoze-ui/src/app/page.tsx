import Link from "next/link";

import { searchAllProducts } from "@/services/search";
import { Grid } from "@/ui/Product/Grid";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

export default async function Home({ params, searchParams }: Props) {
  const { page } = await searchParams;
  const { found, products } = await searchAllProducts({
    page: page ? `${page}` : "1",
  });

  let parsedPage = typeof page === "string" ? parseInt(`${page}`) : 1;

  return (
    <>
      <Grid products={products} found={found} />
      <div className={styles.paginationContainer}>
        {parsedPage > 1 ? (
          <Link href={`/?page=${parsedPage - 1}`}>{"<< Prev page"}</Link>
        ) : (
          ""
        )}
        <span> </span>
        {parsedPage !== 12 && parsedPage < 12 ? (
          <Link href={`/?page=${parsedPage + 1}`}>{"Next page >>"}</Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
