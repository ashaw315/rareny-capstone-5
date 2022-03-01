class SubforumsController < ApplicationController

    def index
        subforums = Subforum.all
        render json: subforums
    end

    def show 
        subforum = Suborum.find(params[:id])
        render json: subforum
    end

    def create
        subforum = Subforum.create!(subforum_params)
        subforum.forum_posts.create!(forum_post_params)
        render json: subforum, status: :created
    end

      def destroy
        subforum = Subforum.find(params[:id])
        subforum.destroy
        head :no_content
      end

      private

      def subforum_params
        params.require(:subforum).permit(:name, :forum_id)
      end

      def forum_post_params
        params.require(:forum_post).permit(:title, :body, :user_id)
      end

end