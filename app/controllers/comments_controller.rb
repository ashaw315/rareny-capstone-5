class CommentsController < ApplicationController

    def index
        comments= Comment.all
        render json: comments, include: :user
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        comment = @current_user.comments.find(params[:id])
        comment.destroy
        head :no_content
    end

private

def comment_params
   params.require(:comment).permit(:body, :forum_post_id, :user_id)
end
end
