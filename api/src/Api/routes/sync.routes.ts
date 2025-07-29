import express, { Request, Response } from "express";
import { TypesenseClient } from "../../Contexts/Shared/framework/Typesense/index";
const router = express.Router();

const typesense = TypesenseClient.create();

interface Product {
  title: string;
  description: string;
  price: string;
  category:
    | "beauty"
    | "fragrances"
    | "furniture"
    | "groceries"
    | "home-decoration"
    | "kitchen-accessories"
    | "laptops"
    | "mens-shirts"
    | "mens-shoes"
    | "mens-watches"
    | "mobile-accessories"
    | "motorcycle"
    | "skin-care"
    | "smartphones"
    | "sports-accessories"
    | "sunglasses"
    | "tablets"
    | "tops"
    | "vehicle"
    | "womens-bags"
    | "womens-dresses"
    | "womens-jewellery"
    | "womens-shoes"
    | "womens-watches";
  image: string;
}

router.get("/synonyms", async (request: Request, response: Response) => {
  try {
    const result = await typesense
      .collections("products")
      .synonyms()
      .retrieve();

    return response.status(200).json({ ok: true, typesense: result });
  } catch (error) {
    console.log(error);
    return response.status(200).json({ ok: false, error: `Internal Error` });
  }
});

router.post("/synonyms", async (request: Request, response: Response) => {
  try {
    const { synonyms, keyWord, root } = request.body;

    if (typeof synonyms !== "object") {
      return response
        .status(403)
        .json({ ok: false, error: `Synonyms invalid typeof` });
    }

    const result = await typesense
      .collections("products")
      .synonyms()
      .upsert(`${keyWord}`, { synonyms, root });

    return response
      .status(201)
      .json({ ok: true, message: `Synonyms added`, typesenseOutput: result });
  } catch (error) {
    console.log(error);
    return response.status(200).json({ ok: false, error: `Internal Error` });
  }
});

router.post("", async (request: Request, response: Response) => {
  try {
    await typesense.collections().create({
      name: "products",
      fields: [
        {
          name: "title",
          type: "string",
          facet: true,
        },
        {
          name: "description",
          type: "string",
          facet: true,
        },
        {
          name: "price",
          type: "string",
          facet: true,
        },
        {
          name: "category",
          type: "string",
          facet: true,
        },
        {
          name: "image",
          type: "string",
          facet: false,
        },
      ],
    });

    const { category } = request.query;
    const result = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const json: any = await result.json();

    const products = json.products.map((product: any) => {
      return {
        title: product.title,
        description: product.description,
        price: `${product.price}`,
        category: product.category,
        image: product.thumbnail,
      };
    });

    await typesense
      .collections("products")
      .documents()
      .import(products, { action: "upsert" });

    return response.status(200).json({ ok: 200, products });
  } catch (error) {
    console.log(error);
    return response.status(200).json({ ok: false, error: `Internal Error` });
  }
});

router.post(
  "/createCollection",
  async (request: Request, response: Response) => {
    try {
      const schema = await typesense.collections().create({
        name: "products",
        fields: [
          {
            name: "title",
            type: "string",
            facet: true,
          },
          {
            name: "description",
            type: "string",
            facet: true,
          },
          {
            name: "price",
            type: "string",
            facet: true,
          },
          {
            name: "category",
            type: "string",
            facet: true,
          },
          {
            name: "image",
            type: "string",
            facet: false,
          },
        ],
      });

      return response.status(200).json({ ok: true, schema });
    } catch (error) {
      console.log(error);
      return response.status(200).json({ ok: false, error: `Internal Error` });
    }
  }
);

export default router;
