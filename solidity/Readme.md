### 0x01 Params Setting

#### 0. Before

When i design struct for product, i realize the processing type for each product cannot be modify after i put it on-chain. 

Hence i create farming struct(then for diff. Process will create diff. struct) by using `productId` to identify whether the product have already arrive in farming process. , which also means that when the product have been in Retail process, all data can be found in previous process struct. 

#### 1. Product struct

For create a new product, and add its key information.

```solidity
struct Product {
    uint productId;
    string productName;
    // ProcessType processType;
}
```

> Here, whether we should hash productId or not? now using numOfProduct to create the unique identifier.

#### 2. Farming struct

```
struct Farming {
    uint productId;
    uint recordBlock;
    uint farmingTime;
    uint harvestTime;
    ProcessType pType;
}
```

#### 3. ENUM

```
enum ProcessType {FARMING, MANUFACTURING, SHIPPING, RETAILING, PURCHASING, RECALLING}
```

 #### 4. Mapping

```
mapping (uint => Product) public products;
mapping (uint => Farming) public farming_process;
mapping (uint => Manufacturing) public manu_process;
```



### PS & todo

1. For certificated file in Manu-process, which part need to be stored on-chain, the certificate status or path?

2. Interact with profile sc and add modifier <- after meeting.

   
