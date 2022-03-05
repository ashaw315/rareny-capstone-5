class UsersController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    skip_before_action :authorize, only: [:create, :index]

    def create
        # profile_picture = Cloudinary::Uploader.upload(params[:profile_picture])
        user = User.create!(user_params)
            # username: params[:username],
            # password: params[:password],
            # password_confirmation: params[:password_confirmation],
            # website: params[:website],
            # discipline: params[:discipline],
            # bio: params[:bio],
            # profile_picture: profile_picture['url'])
        session[:user_id] = user.id
        if user
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end
    
    def index
        users = User.all
        render json: users, status: :ok
    end

   def show
       render json: @current_user, status: :created
    end

    # def show
    #     a_user = User.find(params[:id])
    #     render json: a_user, status: :ok

    # end

    def update
        user = User.find(params[:id])
        user.update!(user_params) 
        render json: user
        end

    def me
        render json: @current_user, status: :created
    end


    # private

    def user_params
        params.permit(:username, :password, :password_confirmation, :website, :discipline, :bio)
    end

end
