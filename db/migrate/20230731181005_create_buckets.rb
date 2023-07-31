class CreateBuckets < ActiveRecord::Migration[7.0]
  def change
    create_table :buckets do |t|
      t.belongs_to :sand_used, null: false, foreign_key: true
      t.integer :pounds
      t.string :stage 

      t.timestamps
    end
  end
end
