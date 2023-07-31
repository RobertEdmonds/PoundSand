class Bucket < ApplicationRecord
  belongs_to :sand_used

  validates :pounds, presence: true, comparison: { greater_than: 0, less_than_or_equal_to: 19998000 }
  validates :stage, :sand_useds_id, {presence: true}
end
