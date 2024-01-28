import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "lastIndexedBlock" } })
class LastIndexedBlock {
  @prop()
  public blockNumber: number;
}

export const LastIndexedBlockModel = getModelForClass(LastIndexedBlock);
