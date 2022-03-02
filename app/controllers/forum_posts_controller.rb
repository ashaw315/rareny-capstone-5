class ForumPostsController < ApplicationController

    def index
        forum_posts = ForumPost.all
        render json: forum_posts
    end

    def show
       forum_post = ForumPost.find(params[:id])
       render json: forum_post
    end

    def create
        forum_post =  @current_user.forum_posts.create!(forum_post_params)
        render json: forum_post, status: :created 
    end

    def destroy
        forum_post = @current_user.forum_post.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def forum_post_params
        params.require(:forum_post).permit(:title, :body, :user_id, :subforum_id)
    end
end
