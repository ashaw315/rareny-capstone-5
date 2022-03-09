class ArtistResourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :phone, :description, :website, :borough

  has_many :addresses
  has_one :borough

  # def phone
  #   object.phone.match('/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/')
  # end

  def borough
    object.borough.name
  end

end
