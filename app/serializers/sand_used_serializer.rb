class SandUsedSerializer < ActiveModel::Serializer
  attributes :id, :pounds, :stage, :date, :moisture, :total_amount
end
