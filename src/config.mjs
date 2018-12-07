export default {
    get mongodb_uri() {
        if (!process.env.MONGODB_URI) {
            throw new Error(`MONGODB_URI not provided`);
        }

        return process.env.MONGODB_URI;
    },

    get redis_uri() {
        if (!process.env.REDIS_URI) {
            throw new Error(`REDIS_URI not provided`);
        }

        return process.env.REDIS_URI;
    }
};
