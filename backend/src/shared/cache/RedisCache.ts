import Redis from "ioredis";

export default class RedisCache {
    private client: Redis;

    constructor() {
        this.client = new Redis(process.env.REDIS_URL as string);
    }

    public async save(key: string, value: any): Promise<void> {
        this.client.set(key, JSON.stringify(value));
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}