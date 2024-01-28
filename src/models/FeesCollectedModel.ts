import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "feesCollected" } })
export class FeesCollected {
  @prop({ required: true })
  public token!: string;

  @prop({ required: true, index: true })
  public integrator!: string;

  @prop({ required: true })
  public integratorFee!: bigint;

  @prop({ required: true })
  public lifiFee!: bigint;

  @prop({ required: true })
  public blockNumber!: number;

  @prop({ required: true })
  public txHash!: string;
}

export const FeesCollectedModel = getModelForClass(FeesCollected);
