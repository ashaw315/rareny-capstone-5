class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :website, :discipline, :bio, :profile_picture
end
