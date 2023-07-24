# This is the Verification API (Backend Server)

The purpose of this module is to put the zkSNARK into a proper feasible workflow.

This package too will be published as an `npm package`. To install this head over to your terminal and type:

```
$ npm i @0xagnish/zkVerifier
```

To initialise the library:

```ts
import { Prover, UserVerifier } from "0xagnish/zkVerifier";
import { MerkleSumTree } from "0xagnish/zkDataPrep";
```

`Prover` here is the core API class that generates the Proof of Solvency zkSNARK for each of the users in the given `input.csv`. Since, the proof is a Zero-Knowledge Proof, it doesn't provide much information about the internal details about the `entries of the database`. Entries here refer to as the `username -> balance` structs of the individual users. Thereby, `not revealing` the number of users, or any kind of numerical value to the ongoing assets and liabilities of the Company/Organization.

`UserVerifier` is a class, rather an `Abstraction Layer` that lets a user verify a proof, without getting into the hassle of how the internals of the zero-knowledge verifier is working.

`MerkleSumTree`, as explained in `0xagnish/zkDataPrep` structures the `input.csv` data into a `merkle sum tree`, a data structure that helps in construction of the dataset into a `zk-friendly` manner.

# Usage

## new Prover (tree: MerkleSumTree, assetsSum bigInt, proverArtifacts SnarkProverArtifacts) : Prover

```ts
import { Prover } from "0xagnish/zkVerifier";
import { MerkleSumTree } from "0xagnish/zkDataPrep";

const tree = new MerkleSumTree(
  "provide the relative path of the input.csv file"
);

const assetsSum = BigInt(4000000000);

const pathToWasm = "..enter your file path for WASM";
const pathToZKey = "..enter your file path to ZKEY";

const proverArtifacts = {
  wasmFilePath: pathToWasm,
  zkeyFilePath: pathToZKey,
};

const prover = new Prover(tree, assetsSum, proverArtifacts);
```

Initializes the `prover` object and takes inputs from the `Merkle Sum Tree`, the total assets owned by the Company/Organization. Along with the zkSNARK artifacts, which mainly consists of the `Proof file, Proving Key and Verification Key`.

The circuit repository is available in the `@0xagnish/zkCircuits` npm package, you can install by
calling :

```
$ npm install 0xagnish/zkCircuits
```

## generateProof (user index number : int) : FullProof

Generates a Proof-of-Solvency proof for a specific user
