import styles from "./page.module.css";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import Link from "next/link";

export default async function NotFound() {
  return (
    <>
      <div className={styles.banner}>
        <h4>{"This product is not in our catalog, please try another one."}</h4>
      </div>

      <div className={styles.grid}>
        <div>
          <Link href={"/?page=1"}>
            <AiFillProduct size={100} />
            <h1>All products</h1>
          </Link>
        </div>
        <div>
          <Link href={"/womens-dresses?q=women"}>
            <GiClothes size={100} />
            <h1>Women dresses</h1>
          </Link>
        </div>
        <div>
          <Link href={"/motorcycle?q=motorcycle"}>
            <FaMotorcycle size={100} />
            <h1>Motorcycle</h1>
          </Link>
        </div>
        <div>
          <Link href={"/smartphones?q=smartphone"}>
            <MdOutlinePhoneAndroid size={100} />
            <h1>Smartphones</h1>
          </Link>
        </div>
      </div>
    </>
  );
}
