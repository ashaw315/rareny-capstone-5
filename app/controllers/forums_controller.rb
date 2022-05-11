class ForumsController < ApplicationController

    def index
        forums = Forum.all
        render json: forums
    end

    def show 
        forum = Forum.find(params[:id])
        render json: forum
    end

end
