# zkDataPrep

## Structuring datasets into Merkle Sum Trees

This is a Typescript (backend-friendly) library used to create Merkle Sum Trees where each node entry is `username -> balance`. The root of this tree contains the aggregated sum of all the node entries, thereby, representing the total assets/liabilities of a firm.

But coming to the point.

## What is a Merkle Sum Tree?

A merkle sum tree is a binary Merkle Tree with the following properties:

- Each entry of the merkle tree is a struct, of username and balance
- Each leaf node of the merkle tree contains a hash and a sum. The hash is equal to `h(username, balance)`. The sum is equal to the balance itself, at the node level.
- Each non-leaf node contains a hash and a sum. The hash is equal to `h(left_child.hash, left_child.sum, right_child.hash, right_child.sum)`. The sum is therefore equal to the sum of the sum of it's children.
- The root node represents the executed/constructed state of the tree and contains all the users'/entry balances. The `merkleSumTree()` is a Typescript implementation of a Merkle Sum Tree and it provides all the functions to construct the above mentioned modified Merkle Tree by just ingesting data from a csv file, picking up only the `username -> balance`.

This diagram is a representation of a similar Merkle Sum Tree

![image](https://github.com/teamHITK/zkExchange/assets/80243668/cc873986-05f6-40a3-bf1a-1995497341e8)

## Setup

### Installing the package

- The package can be directly installed from the npm registry with the following command:
  ```
  $ npm i @0xagnish/zk-data-prep
  ```

### For Database

- Import your database to a csv file, for example [this](zkDataPrep/test/entryPatterns/entry-15-valid.csv)

## API Guide

### new MerkleSumTree (pathToCsv : string) : MerkleSumTree

```ts
import { MerkleSumTree } from '0xagnish/zk-data-prep';

const pathToCsv = 'test/entryPatterns/entry-16-valid.csv';

const tree = new MerkleSumTree(pathToCsv);
//constructs a tree using the given entries in the csv dataset
```
