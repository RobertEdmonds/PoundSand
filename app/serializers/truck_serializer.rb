class TruckSerializer < ActiveModel::Serializer
  attributes :id, :truck, :mine, :date, :tare_weight, :gross_weight, :ship_to, :po, :total, :site_id, :total_amount_per_day
end
