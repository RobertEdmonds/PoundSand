class AddColumnCorrectionToSite < ActiveRecord::Migration[7.0]
  def change
    add_column :sites, :correction, :float, default: 0
  end
end
