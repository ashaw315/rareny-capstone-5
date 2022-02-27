class PostsController < ApplicationController

    skip_before_action :authorize, only: [:create, :index]
    def index
        posts = Post.all
        render json: posts
    end

    def create
        image1 = Cloudinary::Uploader.upload(params[:image1])
        image2 = Cloudinary::Uploader.upload(params[:image2])
        post = Post.create!(title: params[:title], image1: image1['url'], image2: image2['url'])

        render json: {
            post: post, 
            status: 200
        }
    end

    # private

    # def post_params
    #     image1 = Cloudinary::Uploader.upload(params[:image1])
    #     image2 = Cloudinary::Uploader.upload(params[:image2])
    #     params.permit(:title, image1: image1['url'], image2: image2['ur'] )
    # end

end
