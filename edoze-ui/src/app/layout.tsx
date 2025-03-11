"use client";

import { useEffect, useState } from "react";
import styles from "./layout.module.css";
import { FaSearch } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaAmazon } from "react-icons/fa";

import { useRouter } from "next/navigation";
import "./globals.css";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

interface Autocomplete {
  show: boolean;
  suggestions?: {
    id: string;
    snippet: string;
    category: string;
  }[];
}

const MAX_LENGTH = 50;

function Layout({ children }: Props) {
  const router = useRouter();
  const [autocomplete, setAutocomplete] = useState<Autocomplete>({
    show: false,
    suggestions: [],
  });

  const [inputQuery, setInputQuery] = useState<string>("");

  useEffect(() => {
    if (autocomplete.show) {
      fetch(
        `${process.env.NEXT_PUBLIC_API}/_search/autocomplete?q=${inputQuery}`
      ).then((response) => {
        response.json().then((result) => {
          setAutocomplete({ ...autocomplete, suggestions: result.suggestions });
        });
      });
    }
  }, [inputQuery]);

  return (
    <html>
      <body>
        <header className={styles.header}>
          <div className={styles.container}>
            <nav>
              <div className={styles.logotype}>
                <a href="/"></a>
              </div>
              <div className={styles.containerInput}>
                <div className={styles.inputQuery}>
                  <FaSearch></FaSearch>
                  <input
                    type="text"
                    placeholder="Write anything..."
                    onChange={(evt) => {
                      setInputQuery(evt.target.value);

                      if (evt.target.value.length >= 3) {
                        //item a explicar (tecnicas de limitacion de peticiones)
                        setAutocomplete({ ...autocomplete, show: true });
                      }

                      if (
                        evt.target.value.length > 13 ||
                        evt.target.value.length < 3
                      ) {
                        setAutocomplete({ ...autocomplete, show: false });
                      }
                    }}
                    onKeyDown={async (evt) => {
                      if (evt.key === "Enter") {
                        const response = await fetch(
                          `${process.env.NEXT_PUBLIC_API}/_search?q=${inputQuery}`
                        );

                        const result = await response.json();

                        setAutocomplete({ ...autocomplete, show: false });

                        if (result.found <= 0) {
                          router.push(`/notfound?q=${inputQuery}`);
                        } else {
                          router.push(
                            `/${result.products[0].category}?q=${inputQuery}`
                          );
                        }
                      }
                    }}
                    value={inputQuery}
                  />
                </div>
                <div className={styles.autocompleteContainer}>
                  {autocomplete.show && autocomplete.suggestions
                    ? autocomplete.suggestions.map(
                        ({ snippet, category }, index) => (
                          <div
                            onClick={async () => {
                              router.push(`/${category}?q=${snippet}`);
                              setAutocomplete({
                                ...autocomplete,
                                show: false,
                              });
                              setInputQuery(snippet);
                            }}
                            className={styles.autocompleteOption}
                            key={index}
                          >
                            <span>
                              <h5>
                                {snippet.length > MAX_LENGTH
                                  ? snippet.substring(0, MAX_LENGTH) + "..."
                                  : snippet}
                              </h5>
                              <h5>{category}</h5>
                            </span>
                          </div>
                        )
                      )
                    : ""}
                </div>
              </div>
              <button
                className={styles.searchButton}
                onClick={async () => {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/_search?q=${inputQuery}`
                  );

                  const result = await response.json();

                  setAutocomplete({ ...autocomplete, show: false });

                  if (result.found <= 0) {
                    router.push(`/notfound?q=${inputQuery}`);
                  } else {
                    router.push(
                      `/${result.products[0].category}?q=${inputQuery}`
                    );
                  }
                }}
              >
                Search
              </button>
            </nav>
          </div>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.categories}>
            <span>Categories</span>:
            <ul>
              <li>
                <Link href="/mobile-accessories?q=mobile-accessories">
                  Mobile-accessories
                </Link>
              </li>
              <li>
                <Link href="/laptops?q=laptops">Laptops</Link>
              </li>
              <li>
                <Link href="/vehicle?q=vehicle">Vehicle</Link>
              </li>
              <li>
                <Link href="/groceries?q=groceries">Groceries</Link>
              </li>
              <li>
                <Link href="/">Others</Link>
              </li>
            </ul>
          </div>
          <div className={styles.categories}>
            <span>Support</span>:
            <ul>
              <li>
                <Link href="/mobile-accessories?q=mobile-accessories">
                  Vargan Shield
                </Link>
              </li>
              <li>
                <Link href="/laptops?q=laptops">Neztra Care</Link>
              </li>
              <li>
                <Link href="/vehicle?q=vehicle">Nexium Wallet</Link>
              </li>
            </ul>
          </div>
          <div className={styles.contactUs}>
            <h1>edoze</h1>
            <ul>
              <p>
                2025 © edoze – All rights reserved Address:
                <br />
                <span>IDK street - Chicago City</span>
              </p>
              <li>
                <div className={styles.network}>
                  <FaAmazon size={30} color="black" />
                  <FaWhatsapp size={30} color="green" />
                  <MdOutlineAttachEmail size={30} />
                </div>
              </li>
            </ul>
          </div>
        </footer>
        <footer className={styles.deepFooter}>
          <div className={styles.mybrand}>
            <Link href={"https://odev.lat/"} target="__blank">
              odev creation
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}

export default Layout;
