// const Post = require ('../models/post')
import Post from '../models/post'
import PubSub from '../subscription'
import Events  from '../subscription/events'
const { stringToBase64, base64ToString  } = require('../helper/index')

interface Iquery {
    _id?: any
}

class PostService {

    public getPosts = async ( cursor : any, limit : any ) => {
        try {
            const query: Iquery  = { }
            
            if (cursor) {
                query['_id'] = {
                '$lt': base64ToString(cursor)
                }
            }

            let posts = await Post.find(query).sort({ _id: -1 }).limit(limit + 1);;

            const hasNextPage = posts.length > limit;
            posts = hasNextPage ? posts.slice(0, -1) : posts;

            return{
                postFeed : posts,
                pageInfo : {
                    nextPageCursor: hasNextPage ? stringToBase64(posts[posts.length - 1].id) : null,
                    hasNextPage: hasNextPage
                }
            }
        } catch( error ) {
            console.log( error )
            throw error;
        }
    }

    public getPost = async (id: string): Promise<any> => {
        return Post.findById(id)
    }

    /**  get post by category, tag ,brand , table column */
    public postbymeta = async ( options : any ): Promise<any> => {
        let posts = await Post.find( options );
        return posts
    }


    public createPost = async ( input: any, loggedInUserId: string ) : Promise<any> => {
        let post = new Post({ ...input, user: loggedInUserId });
        let result = post.save();

        PubSub.publish(Events.POST_CREATED, {
            postCreated: result
        });

        return result
    }

    public updatePost = async (id: string, post: any): Promise<any> => {
        return Post.findOneAndUpdate( { _id: id }, post, { new: true } )
    }

    public deletePost = async (id: string): Promise<any> => {
        return Post.findOneAndDelete( { _id: id } )
    }

    public bulkdeletePost = async (id: string): Promise<any> => {
        return await Post.deleteMany({ _id: id })
    }
}

export default new PostService()

/*
export default {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    postbymeta,
    bulkdeletePost
}
*/