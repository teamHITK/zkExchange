pragma circom 2.1.3;

include "./hashing.circom";
include "./merklesumtree.circom";
include "./safeCalc.circom";

template Pos(n) {
    signal input rootHash;
    signal input username;
    signal input balance;
    signal input pathIndices[n];
    signal input siblingsHashes[n];
    signal input siblingsSums[n];
    signal input assetsSum;

    signal output leafHash;

    component toLeafHash = ToLeafHash();
    component nextMstLev[n];
    component safeLessThanEqual = LessThanEqual(252);

    //computing the leafHash from the username and balance
    toLeafHash.username <== username;
    toLeafHash.balance <== balance;

    //creating an array of hashes and sums to store the progressive hashes and sums of the computation
    signal hashes[n + 1];
    signal sums[n + 1];

    //initializing the first hash and balance corresponding to the entry that we want to prove inclusion for
    hashes[0] <== toLeafHash.out;
    sums[0] <== balance;

    //iterating over the n of the tree until the root of the mst is reached
    for (var i = 0; i<n; i++){
        nextMstLev[i] = NextMerkleSumTreeLevel();
        //check that the path indices are either 0 or 1
        pathIndices[i] * (1-pathIndices[i]) === 0;

        //pass in the inputs to the next merkle-sum-tree level component that computes the next hash and sum
        nextMstLev[i].hash <== hashes[i];
        nextMstLev[i].sum <== sums[i];
        nextMstLev[i].siblingHash <== siblingsHashes[i];
        nextMstLev[i].siblingSum <== siblingsSums[i];
        nextMstLev[i].pathIndex <== pathIndices[i];

        //store the next hash and sum in the arrays
        hashes[i+1] <== nextMstLev[i].nextHash;
        sums[i+1] <== nextMstLev[i].nextSum;

    }

    //the last hash of the computation must be equal to the root hash
    rootHash === hashes[n];

    //the total sum of the liabilities should be less than or equal to the total assets in order to prove that the organization is solvent
    safeLessThanEqual.in[0] <== sums[n];
    safeLessThanEqual.in[1] <== assetsSum;

    safeLessThanEqual.out === 1;
}