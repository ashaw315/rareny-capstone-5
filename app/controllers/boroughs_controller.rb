class BoroughsController < ApplicationController

    def index
        boroughs = Borough.all
        render json: boroughs
    end

    def show
        borough = Borough.find(params[:id])
        render json: borough
    end
end
