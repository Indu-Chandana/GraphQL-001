const Post = require('./models/Post.model.js');

const resolvers = { 
    Query: {
        hello: () => {
            return "Hello World"
        },
        getAllPosts:  async() => {
            const posts = await Post.find()
            return posts
        },
        getPost: async (parent, {id}, context, info) => {
            // const {id} = args
            return await Post.findById(id)
        }
    },

    Mutation: {
        createPost: async(parent, args, context, info) => {
            const { topic, name, lang, capacity, creator, createdAt, conversation, roomUser,} = args.post;

            const post = new Post({ topic, name, lang, capacity, creator, createdAt, conversation, roomUser, })

            await post.save();
            return post;
        },
        deletePost: async(parent, args, context, info) => {
            const{ id } = args;
            await Post.findByIdAndDelete(id);
            return 'Ok, post deleted';
        },
        updatePost: async(parent, args, context, info) => {
            const{ id } = args;
            const{ topic, name } = args.post;
            const updates = {}
            if( topic !== undefined ) {
                updates.topic = topic
            }
            if ( name !== undefined ) {
                updates.name = name
            }
            // const post = await Post.findByIdAndUpdate(id, { topic, name }, {new: true});
            const post = await Post.findByIdAndUpdate(id, updates, {new: true});

            return post
        },
    },
}

module.exports = resolvers;


// uery {
//     getAllPosts {
//       name
//       topic
  
//     }
//   }
  
//   # mutation {
//   #   createPost(
//   #     post: {
//   #       topic: "This"
//   #       name: "This"
//   #       lang: "This"
//   #       capacity: "This"
//   #       creator: "This"
//   #     }
//   #   ) {
//   #     id
//   #     topic
//   #     name
//   #     lang
//   #     capacity
//   #     creator
//   #   }
//   # }
  