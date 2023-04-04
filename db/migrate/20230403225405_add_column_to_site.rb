class AddColumnToSite < ActiveRecord::Migration[7.0]
  def change
    add_column :sites, :start_date, :date
  end
end
