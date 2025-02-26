import express, { Request, Response, Express } from "express";

import sync from "./sync.routes";
import { TypesenseClient } from "../../Contexts/Shared/framework/Typesense";
import { SearchParams } from "typesense/lib/Typesense/Documents";

const router = express.Router();

const typesense = TypesenseClient.create();

const routes = (server: Express) => {
  server.use("/_search", router);
  server.use("/sync", sync);
};

//all products
router.get("/all", async (request: Request, response: Response) => {
  try {
    const { page } = request.query;

    const parsedPage = typeof page === "string" ? parseInt(page || "1") : 1;

    const responseSearch = await typesense
      .collections("products")
      .documents()
      .search({ q: `*`, page: parsedPage });

    const products = responseSearch.hits?.map((hit) => hit.document);

    return response.status(200).json({ ok: true, products });
  } catch (error) {
    console.log(error);
    return response.status(200).json({ ok: false, error: `Internal Error` });
  }
});

//search to broad and by category
router.get("", async (request: Request, response: Response) => {
  try {
    const { q, category } = request.query;

    if (category) {
      const searchStrictResponse = await typesense
        .collections("products")
        .documents()
        .search({
          q: `${q}`,
          query_by: "title, description",
          filter_by: `category:${category}`,
        });

      const searchBroadResponse = await typesense
        .collections("products")
        .documents()
        .search({
          q: "*",
          query_by: "title, description",
          filter_by: `category:${category}`,
        });

      const { found: foundStrict, hits: hitsStrict } = searchStrictResponse;
      const { found: foundBroad, hits: hitsBroad } = searchBroadResponse;

      const productsStrict = hitsStrict?.map((hit) => hit.document);

      const productsBroad = hitsBroad?.map((hit) => hit.document);

      const found = foundStrict + foundBroad;

      const products: any[] =
        productsStrict && productsBroad
          ? [...productsStrict, ...productsBroad]
          : productsStrict
          ? [...productsStrict]
          : productsBroad
          ? [...productsBroad]
          : [];

      const uniqueIds = new Set<number>();

      // Filter the array to remove duplicates
      const uniqueProducts = products.filter((product: any) => {
        if (!uniqueIds.has(product?.id)) {
          uniqueIds.add(product?.id);
          return true;
        }
        return false;
      });

      return response
        .status(200)
        .json({ ok: true, found, products: uniqueProducts });
    }

    const searchResponse = await typesense
      .collections("products")
      .documents()
      .search({ q: `${q}`, query_by: "category, title, description" });

    const { found, hits } = searchResponse;

    const products = hits?.map((hit) => hit.document);

    return response.status(200).json({ ok: true, found, products });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ ok: false, error: `Internal Error` });
  }
});

//search by id
router.get("/code/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response
        .status(404)
        .json({ ok: false, error: `Product not found` });
    }

    const products = await typesense
      .collections("products")
      .documents(`${id}`)
      .retrieve();

    return response.status(200).json({ ok: true, products });
  } catch (error: any) {
    if (error.message.includes("Request failed with HTTP code 404")) {
      return response
        .status(404)
        .json({ ok: false, error: "Product not found" });
    }

    return response.status(500).json({ ok: false, error: `Internal Error` });
  }
});

//suggestions - autocomplete
router.get("/autocomplete", async (request: Request, response: Response) => {
  try {
    const { q } = request.query;

    const searchParams: any = {
      q: `${q}`,
      query_by: "title,description,category",
    };

    let searchResponse: any = await typesense
      .collections("products")
      .documents()
      .search(searchParams);

    if (searchResponse.found === 0) {
      return response
        .status(404)
        .json({ ok: false, error: `Product not found` });
    }

    let documents: any[] = [];

    const hits = searchResponse.hits;

    if (!hits) {
      return response
        .status(404)
        .json({ ok: false, error: `Hits don't exist in ${hits}` });
    }

    for (const hit of hits) {
      documents = [
        ...documents,
        {
          id: hit.document.id,
          snippet: hit.document.title,
          category: hit.document.category,
        },
      ];
    }

    return response.status(200).json({ ok: true, suggestions: documents });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ ok: false, error: `Internal Error` });
  }
});

export default routes;
