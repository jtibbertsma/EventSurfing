# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150820165321) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "crash_requests", force: :cascade do |t|
    t.integer  "hoster_id",                    null: false
    t.integer  "requester_id",                 null: false
    t.boolean  "accepted",     default: false, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "crash_requests", ["hoster_id", "requester_id"], name: "index_crash_requests_on_hoster_id_and_requester_id", unique: true, using: :btree
  add_index "crash_requests", ["hoster_id"], name: "index_crash_requests_on_hoster_id", using: :btree
  add_index "crash_requests", ["requester_id"], name: "index_crash_requests_on_requester_id", using: :btree

  create_table "event_joins", force: :cascade do |t|
    t.integer  "attender_id"
    t.integer  "event_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "event_joins", ["attender_id"], name: "index_event_joins_on_attender_id", using: :btree
  add_index "event_joins", ["event_id", "attender_id"], name: "index_event_joins_on_event_id_and_attender_id", unique: true, using: :btree
  add_index "event_joins", ["event_id"], name: "index_event_joins_on_event_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "organizer_id", null: false
    t.string   "title",        null: false
    t.text     "description",  null: false
    t.datetime "start_time",   null: false
    t.datetime "end_time"
    t.integer  "spots"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "location_id",  null: false
  end

  add_index "events", ["organizer_id"], name: "index_events_on_organizer_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "imageable_id",   null: false
    t.string   "imageable_type", null: false
    t.string   "image_url",      null: false
    t.string   "thumb_url",      null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "images", ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree

  create_table "places", force: :cascade do |t|
    t.string   "place_id",                                   null: false
    t.string   "formatted_address",                          null: false
    t.decimal  "lat",               precision: 10, scale: 6, null: false
    t.decimal  "lng",               precision: 10, scale: 6, null: false
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
  end

  add_index "places", ["place_id"], name: "index_places_on_place_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                                                null: false
    t.string   "email",                                               null: false
    t.string   "session_token",                                       null: false
    t.string   "password_digest",                                     null: false
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.text     "description_head"
    t.string   "hosting_status",   default: "Maybe Accepting Guests", null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
