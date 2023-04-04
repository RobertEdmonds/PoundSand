# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_03_225405) do
  create_table "sand_on_sites", force: :cascade do |t|
    t.integer "pounds"
    t.float "moisture"
    t.date "date"
    t.integer "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_id"], name: "index_sand_on_sites_on_site_id"
  end

  create_table "sand_useds", force: :cascade do |t|
    t.integer "pounds"
    t.string "stage"
    t.date "date"
    t.float "moisture"
    t.integer "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_amount_per_day", default: 0
    t.index ["site_id"], name: "index_sand_useds_on_site_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "location"
    t.boolean "completed", default: false
    t.integer "total_on_site", default: 0
    t.integer "total_sand_used", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "start_date"
  end

  create_table "trucks", force: :cascade do |t|
    t.string "truck"
    t.string "mine"
    t.string "date"
    t.integer "tare_weight"
    t.integer "gross_weight"
    t.string "ship_to"
    t.string "po"
    t.integer "total", default: 0
    t.integer "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["site_id"], name: "index_trucks_on_site_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.boolean "boss", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "log_number", default: 0
  end

  add_foreign_key "sand_on_sites", "sites"
  add_foreign_key "sand_useds", "sites"
  add_foreign_key "trucks", "sites"
end
