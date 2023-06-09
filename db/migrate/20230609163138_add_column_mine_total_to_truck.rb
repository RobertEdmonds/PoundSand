class AddColumnMineTotalToTruck < ActiveRecord::Migration[7.0]
  def change
    add_column :trucks, :mine_total_per_day, :integer, default: 0
  end
end
