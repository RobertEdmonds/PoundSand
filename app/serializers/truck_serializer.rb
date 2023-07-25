class TruckSerializer < ActiveModel::Serializer
  attributes :id, :truck, :mine, :date, :ticket_number, :tare_weight, :gross_weight, :ship_to, :po, :total, :site_id, :mine_total_per_day, :total_amount_per_day, :created_at
end
