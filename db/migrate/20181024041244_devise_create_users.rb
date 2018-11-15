# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string "name"
      t.string "email", null: false
      t.integer "introducer"
      t.string "tel"
      t.integer "amount"

      #company
      t.date "establishment_date"
      t.string "type"
      t.string "co_name"
      t.string "co_name_kana"
      t.string "co_number"
      t.string "co_tel"
      t.string "co_post_number"
      t.string "co_address"
      t.string "business"
      t.string "capital_stock"
      t.string "representative"
      t.string "representative_kana"
      t.text "about_business"
      t.integer "financial_statement"

      t.integer "sales_amount"
      t.integer "pre_sales_amount"
      t.integer "benefit"
      t.integer "financial_month"
      t.integer "number_of_regular_employees"
      t.integer "number_of_employees"
      t.integer "1y_later_benefit"


      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false

      t.string "address"

      t.string "title"

      t.text "headline1"
      t.text "headline2"
      t.text "headline3"
      t.text "headline4"
      t.text "headline5"
      t.text "headline6"
      t.text "headline7"
      t.text "headline8"
      t.text "headline9"
      t.text "headline10"

      t.string "menu1"
      t.string "menu2"
      t.string "menu3"
      t.string "menu4"
      t.string "menu5"

      t.text "menu1_1"
      t.text "menu2_1"
      t.text "menu3_1"
      t.text "menu4_1"
      t.text "menu5_1"

      t.text "image1", limit: 65535
      t.text "image2", limit: 65535
      t.text "image3", limit: 65535
      t.text "image4", limit: 65535
      t.text "image5", limit: 65535
      t.text "image6", limit: 65535
      t.text "image7", limit: 65535
      t.text "image8", limit: 65535
      t.text "image9", limit: 65535
      t.text "image10", limit: 65535

      t.string "main_color"
      t.string "sub_color"
      t.string "sub2_color"
      t.text "self"

      t.string "domain1"
      t.string "domain2"
      t.string "domain3"

      t.string "payjp_id"


      t.string "encrypted_password", default: "", null: false
      t.string "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.integer "sign_in_count", default: 0, null: false
      t.datetime "current_sign_in_at"
      t.datetime "last_sign_in_at"
      t.string "current_sign_in_ip"
      t.string "last_sign_in_ip"
      t.string "confirmation_token"
      t.datetime "confirmed_at"
      t.datetime "confirmation_sent_at"
      t.string "unconfirmed_email"
      t.integer "failed_attempts", default: 0, null: false
      t.string "unlock_token"
      t.datetime "locked_at"
      t.string "crypted_password"
      t.string "salt"


      t.index ["email"], name: "index_members_on_email", unique: true, using: :btree
      t.index ["reset_password_token"], name: "index_members_on_reset_password_token", using: :btree
      t.index ["unlock_token"], name: "index_members_on_unlock_token", unique: true, using: :btree
      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
