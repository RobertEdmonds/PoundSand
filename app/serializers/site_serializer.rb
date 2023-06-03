class SiteSerializer < ActiveModel::Serializer
  attributes :id, :location, :crew, :total_delivered, :company_id, :total_on_site, :total_sand_used, :start_date, :trash_sand, :correction, :completed

  has_many :sand_useds do 
    object.sand_useds.order(:date)
  end

  has_many :trucks do 
    object.trucks.order(:date, :updated_at)
  end
end
