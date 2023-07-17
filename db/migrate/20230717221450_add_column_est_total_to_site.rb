class AddColumnEstTotalToSite < ActiveRecord::Migration[7.0]
  def change
    add_column :sites, :est_total, :integer
  end
end
