class SubforumSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :forum
end
