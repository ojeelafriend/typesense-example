import { Client } from "typesense";

import dotenv from "dotenv";

dotenv.config();

export class TypesenseClient {
  private static HOST: string = `${process.env.TYPESENSE_HOST}`;
  private static PORT: number = parseInt(`${process.env.TYPESENSE_PORT}`);
  private static PROTOCOL: string = `${process.env.TYPESENSE_PROTOCOL}`;
  private static API_KEY: string = `${process.env.TYPESENSE_API_KEY}`;

  public static create(): Client {
    return new Client({
      nodes: [
        {
          host: this.HOST,
          port: this.PORT,
          protocol: this.PROTOCOL,
        },
      ],
      apiKey: this.API_KEY,
      connectionTimeoutSeconds: 2,
    });
  }
}
