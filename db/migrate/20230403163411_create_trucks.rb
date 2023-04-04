class CreateTrucks < ActiveRecord::Migration[7.0]
  def change
    create_table :trucks do |t|
      t.string :truck
      t.string :mine
      t.string :date
      t.integer :tare_weight
      t.integer :gross_weight
      t.string :ship_to
      t.string :po
      t.integer :total, default: 0
      t.belongs_to :site, null: false, foreign_key: true

      t.timestamps
    end
  end
end
