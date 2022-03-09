class ArtistResourcesController < ApplicationController

    def index
        artist_resources = ArtistResource.all
        render json: artist_resources
    end

    def show
        artist_resource = ArtistResource.find(params[:id])
        render json: artist_resource
    end

end
