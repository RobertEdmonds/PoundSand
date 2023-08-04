class UpdateSandUsed < ActiveRecord::Migration[7.0]
  def change
    change_column :sand_useds, :date, :datetime 
  end
end
