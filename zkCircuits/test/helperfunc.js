function createCircomInput(merkleProof, assetsSum) {
  return {
    rootHash: merkleProof.rootHash,
    username: merkleProof.entry.usernameToBigInt,
    balance: merkleProof.entry.balance,
    pathIndices: merkleProof.pathIndices,
    siblingHashes: merkleProof.siblingHashes,
    siblingsSums: merkleProof.siblingsSums,
    assetsSum,
  };
}

module.exports = createCircomInput;
