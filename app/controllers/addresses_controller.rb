class AddressesController < ApplicationController

    def index
        addresses = Address.all
        render json: addresses
    end

    def show
        address = Address.find(params[:id])
        render json: address
    end

end
