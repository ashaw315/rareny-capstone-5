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

ActiveRecord::Schema[7.1].define(version: 2025_07_16_191008) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "street"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.bigint "artist_resource_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_resource_id"], name: "index_addresses_on_artist_resource_id"
  end

  create_table "artist_resources", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.bigint "phone"
    t.text "description"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "borough_id", null: false
    t.index ["borough_id"], name: "index_artist_resources_on_borough_id"
  end

  create_table "boroughs", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id", null: false
    t.bigint "forum_post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["forum_post_id"], name: "index_comments_on_forum_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "forum_posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "subforum_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subforum_id"], name: "index_forum_posts_on_subforum_id"
    t.index ["user_id"], name: "index_forum_posts_on_user_id"
  end

  create_table "forums", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "listing_images", force: :cascade do |t|
    t.string "image1"
    t.string "image2"
    t.string "image3"
    t.string "image4"
    t.string "image5"
    t.bigint "listing_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_id"], name: "index_listing_images_on_listing_id"
  end

  create_table "listings", force: :cascade do |t|
    t.string "title"
    t.integer "price"
    t.integer "sq_footage"
    t.string "email"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image1"
    t.string "image2"
    t.string "image3"
    t.string "image4"
    t.string "image5"
    t.string "neighborhood"
    t.string "nyc_borough"
    t.index ["user_id"], name: "index_listings_on_user_id"
  end

  create_table "profile_pictures", force: :cascade do |t|
    t.string "picture"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_profile_pictures_on_user_id"
  end

  create_table "residencies", force: :cascade do |t|
    t.string "name"
    t.string "deadline"
    t.boolean "free"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subforums", force: :cascade do |t|
    t.string "name"
    t.bigint "forum_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["forum_id"], name: "index_subforums_on_forum_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "website"
    t.string "discipline"
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "addresses", "artist_resources"
  add_foreign_key "artist_resources", "boroughs"
  add_foreign_key "comments", "forum_posts"
  add_foreign_key "comments", "users"
  add_foreign_key "forum_posts", "users"
  add_foreign_key "listing_images", "listings"
  add_foreign_key "listings", "users"
  add_foreign_key "profile_pictures", "users"
  add_foreign_key "subforums", "forums"
end
