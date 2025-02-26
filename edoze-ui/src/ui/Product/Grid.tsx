import styles from "./Grid.module.css";
import Image from "next/image";

import { Product } from "../../services/search";

interface Props {
  products: Product[];
  found: boolean;
}

export async function Grid({ products, found }: Props) {
  return (
    <>
      <div className={styles.grid}>
        {found
          ? products?.map((product) => (
              <div key={product.id} className={styles.item}>
                <div className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={product.image}
                    alt=""
                    width={350}
                    height={300}
                  />
                </div>
                <div className={styles.info}>
                  <li className={styles.title}>
                    {product.title.length > 20
                      ? product.title.substring(0, 30) + "..."
                      : product.title}
                  </li>
                  <li className={styles.price}>${product.price}</li>
                </div>
              </div>
            ))
          : "Product not found"}
      </div>
    </>
  );
}
