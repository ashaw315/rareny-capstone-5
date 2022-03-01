class ForumsController < ApplicationController

    def index
        forums = Forum.all
        render json: forums
    end

    def show 
        forum = Forum.find(params[:id])
        render json: forum
    end

    # def create
    #     forum = Forum.create!(forum_params)
    #     forum.subforums.create!(subforum_params)
    #     render json: forum, status: :created
    # end

    #   private

    #   def forum_params
    #     params.require(:forum).permit(:name)
    #   end

    #   def subforum_params
    #     params.require(:subforum).permit(:name)
    #   end

end
