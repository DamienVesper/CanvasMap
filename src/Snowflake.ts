type Snowflake = `${bigint}`;

const NODE_ID_BITS = 10;
const INCREMENT_BITS = 16;

const EPOCH = 1651640400000;

const MAX_NODE_ID = Math.pow(2, NODE_ID_BITS) - 1;
const MAX_INCREMENT = Math.pow(2, INCREMENT_BITS) - 1;

let increment = 0n;
let lastTimestamp = 0n;

const createID = (nodeID?: number): Snowflake => {
    const currentTimestamp = BigInt(Date.now() - EPOCH);

    if (currentTimestamp < lastTimestamp) throw new Error(`System Clock Error`);
    else if (currentTimestamp === lastTimestamp) increment = (increment + 1n) & BigInt(MAX_INCREMENT);
    else increment = 0n;

    lastTimestamp = currentTimestamp;

    let id = currentTimestamp << BigInt(NODE_ID_BITS + INCREMENT_BITS);

    id |= BigInt(((nodeID ?? process.pid) & MAX_NODE_ID) << INCREMENT_BITS);
    id |= BigInt(increment);

    return `${id}`;
};

export {
    createID,
    Snowflake
};
