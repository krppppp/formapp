# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string   "name"
      t.string   "email",                                                         null: false
      t.integer  "template", default: 1

      t.datetime "created_at",                                                    null: false
      t.datetime "updated_at",                                                    null: false

      t.integer  "post_number"
      t.string   "prefecture"
      t.string   "city"
      t.string   "address"
      t.float    "longitude",                       limit: 53
      t.float    "latitude",                        limit: 53

      t.string   "title"
      t.date     "establishment_date"

      t.string   "menu1"
      t.string   "menu2"
      t.string   "menu3"
      t.string   "menu4"
      t.string   "menu5"

      t.text     "menu1_1"
      t.text     "menu2_1"
      t.text     "menu3_1"
      t.text     "menu4_1"
      t.text     "menu5_1"
      t.text     "headline1"
      t.text     "headline2"
      t.text     "headline3"

      t.string   "character1"
      t.string   "character2"
      t.string   "character3"
      t.string   "character4"
      t.string   "character5"
      t.string   "character6"
      t.string   "character7"
      t.string   "character8"
      t.string   "character9"
      t.string   "character10"


      # t.text     "main_image",                        limit: 65535

      t.string   "heading1"
      t.text   "subheading1"
      # t.text     "sub_image1",                        limit: 65535
      # t.text     "sub_icon1",                        limit: 65535

      t.string   "heading2"
      t.text   "subheading2"
      # t.text     "sub_image2",                        limit: 65535
      # t.text     "sub_icon2",                        limit: 65535

      t.string   "heading3"
      t.text   "subheading3"

      # t.text     "sub_image3",                        limit: 65535
      # t.text     "sub_icon3",                        limit: 65535

      t.string   "heading4"
      t.text   "subheading4"
      # t.text     "sub_image4",                        limit: 65535
      # t.text     "sub_icon4",                        limit: 65535

      t.string   "heading5"
      t.text   "subheading5"
      # t.text     "sub_image5",                        limit: 65535
      # t.text     "sub_icon5",                        limit: 65535

      t.text     "self"

      t.string   "encrypted_password",                            default: "",    null: false
      t.string   "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.integer  "sign_in_count",                                 default: 0,     null: false
      t.datetime "current_sign_in_at"
      t.datetime "last_sign_in_at"
      t.string   "current_sign_in_ip"
      t.string   "last_sign_in_ip"
      t.string   "confirmation_token"
      t.datetime "confirmed_at"
      t.datetime "confirmation_sent_at"
      t.string   "unconfirmed_email"
      t.integer  "failed_attempts",                               default: 0,     null: false
      t.string   "unlock_token"
      t.datetime "locked_at"

      t.string   "crypted_password"
      t.string   "salt"

      t.string   "payjp_id"

      t.index ["email"], name: "index_members_on_email", unique: true, using: :btree
      t.index ["reset_password_token"], name: "index_members_on_reset_password_token", using: :btree
      t.index ["unlock_token"], name: "index_members_on_unlock_token", unique: true, using: :btree
      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
