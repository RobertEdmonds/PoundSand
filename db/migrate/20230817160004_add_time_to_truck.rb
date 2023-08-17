class AddTimeToTruck < ActiveRecord::Migration[7.0]
  def change
    add_column :trucks, :time, :datetime, default: "2023-05-09 00:00:00"
  end
end
