import {
  Prover,
  UserVerifier,
  FullProof,
  SnarkProverArtifacts,
} from "../src/index";
import { MerkleSumTree } from "@0xagnish/zk-data-prep";

describe("Proof of Solvency Test", () => {
  console.log("Generating the tree....please wait for a while");
  const tree = new MerkleSumTree("../entryPattern/entry-65536-valid.csv");
  const liabilities = tree.root.sum;

  const pathToValidWasm =
    "./test/zksnarkArtifacts/valid/proofOfSolvency16.wasm";
  const pathToValidZkey =
    "./test/zksnarkArtifacts/valid/proofOfSolvency16_final.zkey";

  const validProverArtifacts: SnarkProverArtifacts = {
    wasmFilePath: pathToValidWasm,
    zKeyFilePath: pathToValidZkey,
  };
  const pathToInvalidWasm = "./test/zksnarkArtifacts/invalid/sempahore.wasm";

  const invalidProverArtifacts1: SnarkProverArtifacts = {
    wasmFilePath: pathToInvalidWasm,
    zKeyFilePath: pathToValidZkey,
  };

  const pathToInvalidZkey = "./zksnarkArtifacts/invalid/sempahore.zkey";

  const invalidProverArtifacts2: SnarkProverArtifacts = {
    wasmFilePath: pathToValidWasm,
    zKeyFilePath: pathToInvalidZkey,
  };
});
