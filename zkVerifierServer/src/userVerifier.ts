import { FullProof } from "./types";

import { groth16 } from "snarkjs";

/**
 * Lets a user verify the Solvency for the company
 */

export default class UserVerifier {
  private readonly _verificationKey: JSON;
  private readonly username: string;
  private readonly balance: bigint;

  /**
   * @notice Initialises the verifier
   * @param username The username of the user
   * @param balance balance of the user
   */
  constructor(username: string, balance: bigint, verificationKey: JSON) {
    this._verificationKey = verificationKey;
    this.username = username;
    this.balance = balance;
    // freezing the object to prevent further changes
    Object.freeze(this);
  }

  /**
   * @notice Verifies the Proof of Solvency
   * @param FullProof the proof of Solvency
   * @param True if the proof is valid, false otherwise
   */
  public async verifyProof(fullProof: FullProof): Promise<boolean> {
    if (
      fullProof.entry.username !== this.username ||
      fullProof.entry.balance !== this.balance
    ) {
      return false;
    }
    const leafHash: bigint = fullProof.entry.computeLeaf().hash;

    return await groth16.verify(
      this._verificationKey,
      [leafHash, fullProof.rootHash, fullProof.assetsSum],
      fullProof.proof
    );
  }
}
