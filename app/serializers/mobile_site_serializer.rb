class MobileSiteSerializer < ActiveModel::Serializer
  attributes :id, :company_id, :location, :crew, :total_delivered, :total_on_site, :total_sand_used, :est_total, :start_date, :trash_sand, :correction, :completed
end
