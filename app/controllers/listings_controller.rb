class ListingsController < ApplicationController

    def index
        listings = Listing.all
        render json: listings
    end

    def create
        image1 = Cloudinary::Uploader.upload(params[:image1])
        image2 = Cloudinary::Uploader.upload(params[:image2])
        image3 = Cloudinary::Uploader.upload(params[:image3])
        image4 = Cloudinary::Uploader.upload(params[:image4])
        image5 = Cloudinary::Uploader.upload(params[:image5])
        listing = @current_user.listings.create!(
            title: params[:title],
            price: params[:price],
            sq_footage: params[:sq_footage],
            email: params[:email],
            description: params[:description],
            neighborhood: params[:neighborhood],
            nyc_borough: params[:nyc_borough],
            image1: image1['url'],
            image2: image2['url'],
            image3: image3['url'],
            image4: image4['url'],
            image5: image5['url'],
        )
        render json: listing, status: :created
    end

    def show
        listing = Listing.find(params[:id])
        render json: listing
    end

    def destroy
        listing = @current_user.listings.find(params[:id])
        listing.destroy
        head :no_content
    end

end
