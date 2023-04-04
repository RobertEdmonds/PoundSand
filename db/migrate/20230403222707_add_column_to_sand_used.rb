class AddColumnToSandUsed < ActiveRecord::Migration[7.0]
  def change
    add_column :sand_useds, :total_amount_per_day, :integer, default: 0
  end
end
