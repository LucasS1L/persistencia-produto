import {RedisOptions} from "ioredis";
import * as process from "node:process";

interface ICacheConfig {
    config: {
        redis: RedisOptions;
    };
    driver: string;
}

export const cacheConfig = {
    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: undefined,
        }
    },
    driver: "redis",
} as ICacheConfig;