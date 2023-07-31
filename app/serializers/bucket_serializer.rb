class BucketSerializer < ActiveModel::Serializer
  attributes :id, :stage, :pounds
  has_one :sand_used
end
