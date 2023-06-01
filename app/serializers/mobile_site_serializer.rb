class MobileSiteSerializer < ActiveModel::Serializer
  attributes :id, :location, :crew, :total_delivered, :total_on_site, :total_sand_used, :start_date, :trash_sand, :correction, :completed
end
