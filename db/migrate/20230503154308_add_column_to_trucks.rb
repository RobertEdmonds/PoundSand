class AddColumnToTrucks < ActiveRecord::Migration[7.0]
  def change
    add_column :trucks, :edited, :boolean, default: false
  end
end
