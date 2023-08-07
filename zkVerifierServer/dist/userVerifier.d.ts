import { FullProof } from "./types";
/**
 * Lets a user verify the Solvency for the company
 */
export default class UserVerifier {
    private readonly _verificationKey;
    private readonly username;
    private readonly balance;
    /**
     * @notice Initialises the verifier
     * @param username The username of the user
     * @param balance balance of the user
     */
    constructor(username: string, balance: bigint, verificationKey: JSON);
    /**
     * @notice Verifies the Proof of Solvency
     * @param FullProof the proof of Solvency
     * @param True if the proof is valid, false otherwise
     */
    verifyProof(fullProof: FullProof): Promise<boolean>;
}
