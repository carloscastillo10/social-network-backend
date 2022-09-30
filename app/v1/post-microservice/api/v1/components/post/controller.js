const error = require('../../../../../utils/error');
const uuid = require('uuid');
const table = 'post';

class PostController {
    constructor(injectedStore) {
        this.store = injectedStore;
        if (!this.store) {
            const DummyStore = require('../../../../../store/dummy');
            this.store = new DummyStore();
        }
    }

    list() {
        return this.store.list(table);
    }

    async get(id) {
        const user = await this.store.get(table, id);
        if (!user) {
            throw error('Post not found', 404);
        }

        return user;
    }

    async upsert(data, user) {
        const post = {
            id: data.id,
            user: user,
            text: data.text,
        };

        if (!post.id) {
            post.id = uuid.v1();
        }

        return this.tore.upsert(table, post).then(() => post);
    }

    async like(post, user) {
        const like = await this.tore.upsert(`${table}_like`, {
            post: post,
            user: user,
        });

        return like;
    }

    async postsLiked(user) {
        const users = await this.tore.query(`${table}_like`, { user: user });
        return users;
    }

    async postLikers(post) {
        const users = await this.store.query(
            `${table}_like`,
            { post: post },
            { post: post }
        );
        return users;
    }
}

module.exports = PostController;
