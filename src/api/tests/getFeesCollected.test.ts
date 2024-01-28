import request from "supertest";
import app from "../app";
import {
  getFeesCollected,
  getFeesCollectedCount,
} from "../../services/feesCollectedService";

jest.mock("../../services/feesCollectedService");

describe("GET /api/fees-collected", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 OK", async () => {
    (getFeesCollected as jest.Mock).mockImplementation(() =>
      Promise.resolve([]),
    );
    (getFeesCollectedCount as jest.Mock).mockImplementation(() =>
      Promise.resolve(0),
    );
    const res = await request(app).get("/api/fees-collected");

    expect(res.status).toBe(200);
  });

  it("should return a paginated response with data and total", async () => {
    (getFeesCollected as jest.Mock).mockImplementation(() =>
      Promise.resolve(testResponse.data),
    );
    (getFeesCollectedCount as jest.Mock).mockImplementation(() =>
      Promise.resolve(testResponse.total),
    );
    const res = await request(app).get("/api/fees-collected");
    expect(res.body).toEqual(testResponse);
  });

  it("should apply filters send as query params", async () => {
    await request(app).get(
      "/api/fees-collected?limit=10&offset=2&integrator=0xD5e230cEa6dA2F0C62bdeED2Cf85326F1063e27D",
    );
    expect(getFeesCollected).toHaveBeenCalledWith(
      { integrator: "0xD5e230cEa6dA2F0C62bdeED2Cf85326F1063e27D" },
      10,
      2,
    );
  });
});

const testResponse = {
  data: [
    {
      _id: "65b686525ed963e749f60846",
      token: "0x0000000000000000000000000000000000000000",
      integrator: "0xD5e230cEa6dA2F0C62bdeED2Cf85326F1063e27D",
      integratorFee: "267596920100000",
      lifiFee: "47222985900000",
      blockNumber: 47962736,
      txHash:
        "0x3d1f81f140898c6b13d8420727cc44ba5c998c1a65561871c5e495d008315494",
    },
    {
      _id: "65b686525ed963e749f60847",
      token: "0x0000000000000000000000000000000000000000",
      integrator: "0xD5e230cEa6dA2F0C62bdeED2Cf85326F1063e27D",
      integratorFee: "349163795600000",
      lifiFee: "61617140400000",
      blockNumber: 47962820,
      txHash:
        "0xf56bc1d2c73045b4f2a9c32fba1bdbcbca6985c802996976daa7f8300dc7c351",
    },
  ],
  total: 34,
};
