class BoroughsController < ApplicationController

    def index
        boroughs = Borough.all
        render json: boroughs, include: ['artist_resources', 'artist_resources.addresses']
    end

    def show
        borough = Borough.find(params[:id])
        render json: borough, include: ['artist_resources', 'artist_resources.addresses']
    end
end
