/* tslint:disable:no-any */
import mongoose from "mongoose";
import { MyServer } from "../start-server";
import { Fullcontact } from "./fullcontact";

export type Gateways = {
  mongoose: mongoose.Mongoose;
  fullcontact: Fullcontact;
};

export async function setGateways(server: MyServer): Promise<void> {
  server.gateways = server.gateways || {};

  if (
    // @ts-ignore
    !(server.config.gateways.mongoose && server.config.gateways.mongoose.uri)
  ) {
    server.logger.warn(
      "cannot start server without gateways.mongoose.uri provided in configuration"
    );
  } else {
    // @ts-ignore
    mongoose.connect(server.config.gateways.mongoose.uri).catch(err => {
      server.logger.warn(`failed to connect mongoose: ${err}`);
    });
  }
  // @ts-ignore
  server.gateways.mongoose = mongoose;
  server.gateways.fullcontact = new Fullcontact(
    // @ts-ignore
    server.config.gateways.fullContactApiKey
  );
}
