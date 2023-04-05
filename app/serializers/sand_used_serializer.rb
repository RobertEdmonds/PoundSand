class SandUsedSerializer < ActiveModel::Serializer
  attributes :id, :pounds, :stage, :date, :moisture, :total_amount_per_day
end
