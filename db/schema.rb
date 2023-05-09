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

ActiveRecord::Schema[7.0].define(version: 2023_05_05_195803) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "company_users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "code"
    t.string "name"
    t.string "username"
    t.index ["company_id"], name: "index_company_users_on_company_id"
  end

  create_table "sand_useds", force: :cascade do |t|
    t.integer "pounds"
    t.string "stage"
    t.date "date", default: "2023-05-09"
    t.float "moisture"
    t.bigint "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_amount_per_day", default: 0
    t.index ["site_id"], name: "index_sand_useds_on_site_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "location"
    t.string "crew"
    t.boolean "completed", default: false
    t.integer "total_on_site", default: 0
    t.integer "total_sand_used", default: 0
    t.integer "total_delivered", default: 0
    t.float "trash_sand", default: 0.0
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "start_date", default: "2023-05-09"
    t.index ["company_id"], name: "index_sites_on_company_id"
  end

  create_table "trucks", force: :cascade do |t|
    t.string "truck"
    t.string "mine"
    t.string "date", default: "2023-05-09"
    t.integer "tare_weight"
    t.integer "gross_weight"
    t.string "ship_to"
    t.string "po"
    t.integer "total", default: 0
    t.integer "total_amount_per_day", default: 0
    t.bigint "site_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "edited", default: false
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

  add_foreign_key "company_users", "companies"
  add_foreign_key "sand_useds", "sites"
  add_foreign_key "sites", "companies"
  add_foreign_key "trucks", "sites"
end
