class SiteSerializer < ActiveModel::Serializer
  attributes :id, :location, :crew, :total_delivered, :total_on_site, :total_sand_used, :start_date, :trash_sand, :completed

  has_many :sand_useds do 
    object.sand_useds.order(:date)
  end

  has_many :trucks do 
    object.trucks.order(:date, :updated_at)
  end
end
