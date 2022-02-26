class ResidencySerializer < ActiveModel::Serializer
  attributes :id, :name, :deadline, :free, :description
end
