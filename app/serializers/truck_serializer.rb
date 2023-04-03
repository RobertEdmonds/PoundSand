class TruckSerializer < ActiveModel::Serializer
  attributes :id, :truck, :mine, :date, :tare_weight, :gross_weight, :ship_to, :po, :total
end
