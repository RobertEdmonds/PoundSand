class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sites do |t|
      t.string :location
      t.boolean :completed, default: false
      t.integer :total_on_site
      t.integer :total_sand_used

      t.timestamps
    end
  end
end
