import { SnarkProverArtifacts, FullProof, CircomInput } from "./types";
import { MerkleSumTree } from "@0xagnish/zk-data-prep";
import { groth16 } from "snarkjs";
import buildCircomInput from "./buildInput";

/**
 * @notice Prover is a class that contains the core methods that can provide credible Proof of Solvency to it's users as 
 * well as external auditing parties, without disclosing any further business information
 */
export default class Prover {
    private readonly _tree: MerkleSumTree,
    private readonly _assetsSum: bigint,
    private readonly _proverArtifacts: SnarkProverArtifacts

    /**
     * @notice initialises the prover class
     * @param tree the Merkle Sum Tree generated by the prover
     * @param assetsSum The total assets owned by the company
     * @param proverArtifacts the zkSNARK components provided by the prover
     */
    constructor(tree: MerkleSumTree, assetsSum: bigint, proverArtifacts: SnarkProverArtifacts) {
        this._tree = tree;
        this._assetsSum = assetsSum;
        this._proverArtifacts = proverArtifacts;

        // freexing the object from further changes
        Object.freeze(this);
    }

    public get tree(): MerkleSumTree {
        return this._tree
    }

    public get assetsSum(): bigint {
        return this._assetsSum;
    }
}