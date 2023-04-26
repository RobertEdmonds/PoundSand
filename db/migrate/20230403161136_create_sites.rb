class CreateSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sites do |t|
      t.string :location
      t.string :crew
      t.boolean :completed, default: false
      t.integer :total_on_site, default: 0
      t.integer :total_sand_used, default: 0
      t.integer :total_delivered, default: 0
      t.float :trash_sand, default: 0

      t.timestamps
    end
  end
end
