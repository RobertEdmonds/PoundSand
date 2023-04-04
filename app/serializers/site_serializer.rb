class SiteSerializer < ActiveModel::Serializer
  attributes :id, :location, :total_on_site, :total_sand_used

  has_many :sand_useds do 
    object.sand_useds.order(:date)
  end

  has_many :trucks do 
    object.trucks.order(:date)
  end
end
