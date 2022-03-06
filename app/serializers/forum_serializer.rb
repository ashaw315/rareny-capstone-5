class ForumSerializer < ActiveModel::Serializer
  attributes :id, :name, :subforums_length

  has_many :subforums

  def subforums_length
    object.subforums.count
  end

end
