const path = require("path");
const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;

exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);
const Fr = new F1Field(exports.p);

const { MerkleSumTree } = require("@0xagnish/zk-data-prep");

const createCircomInput = require("./helperfunc.js");

describe("Circuit Testing", function async() {
  const pathToCsv = "./test/entryPatterns/entry-16-valid.csv";
  // total sum of the liablities is 3273939304
  console.log("Constructing Merkle Sum Tree");
  console.log("Initializing the Merkle Sum Tree from the given data set......");
  const tree = new MerkleSumTree(pathToCsv);

  //getting the index of the user we want to create a proof for
  console.log("Getting the Merkle Proof for that particular user.....");
  const entryIndex = tree.indexOf("dxGaEAii", BigInt(11888));

  //creating a Merkle Proof for that user
  const proof = tree.createProof(entryIndex);

  beforeEach(async function () {
    this.timeout(100000);
    circuit = await wasm_tester(
      path.join(__dirname, "../scripts/input", "proofOfSolvency16.circom")
    );
  });

  it("Should verify a proof of inclusion of an existing entry if assetsSum > liabilitiesSum", async () => {
    console.log(
      "Packing the inputs into the circom zkSNARK construction..., putting assets 1 more than liabilities..."
    );
    const input = createCircomInput(proof, BigInt(3273939305));
    console.log("Computing the leaf hashes of the given user data");
    const expectedLeafHashOutput = proof.entry.computeLeaf().hash;
  });
});
