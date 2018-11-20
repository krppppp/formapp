class UsersController < ApplicationController
  require 'aws-sdk-v1'
  require "aws-sdk-core"

  before_action :authenticate_user?
  before_action :update_info, except: [:show, :p1, :pay, :pay2, :p20, :p25]

  def show
    @user = User.find(params[:id])
    if @user.main_color.nil?
      redirect_to users_p1_path(@user.id)
    end
  end

  #ホームページ内容入力フォームページ
  def p0
  end

  def p1
    @user = User.find(params[:id])
    @subscription = @user.subscriptions.last

  end

  def p2
  end

  def p3
  end

  def p4
  end

  def p5
  end

  def p6
  end

  def p7
  end

  def p8
  end

  def p9
  end

  def p10
  end

  def p11
    SendMailer.send_to_creator_new_record(@user).deliver
    redirect_to user_path(@user.id)

  end


  #申請用情報フォームページ

  def p20
    @user = User.find(params[:id])
  end

  def p21
  end

  def p22
  end

  def p23
  end

  def p24
  end

  def p25
  end

  def update
    SendMailer.send_to_creator_updated(@user).deliver
    redirect_to user_path(@user.id)
  end


  def pay
    user = User.find(params[:id])
    card_token = params["payjp-token"]
    create_payjp_customer(user, card_token) if user.payjp_id.blank?
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    sub = Payjp::Subscription.create(
        plan: 'pln_2807910c89867be3bdf5374f1a70',
        customer: user.payjp_id,
    )
    Subscription.create!(
        payjp_id: sub.id,
        user: user,
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
        trial_start: sub.trial_start,
        trial_end: sub.trial_end
    )
    redirect_to users_p1_path(user)
  end

  def pay2
    user = User.find(params[:id])
    card_token = params["payjp-token"]
    create_payjp_customer(user, card_token) if user.payjp_id.blank?
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    sub = Payjp::Subscription.create(
        plan: 'pln_972d979ccfa3f23acce1bbc10d29',
        customer: user.payjp_id,
    )
    Subscription.create!(
        payjp_id: sub.id,
        user: user,
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
        trial_start: sub.trial_start,
        trial_end: sub.trial_end
    )
    redirect_to users_p1_path(user)
  end

  private

  def update_info
    @user = User.find(params[:id])
    @user.update(user_params)
  end

  def user_params
    params
        .require(:user)
        .permit(:id, :email, :password,
                #申請用カラム
                :birthday, :phone_number, :postcode, :prefecture,:prefecture_number, :city, :address, :address_small, :price,
                :co_name, :co_name_kana, :co_number, :business, :business_middle, :business_small,
                :financial_month, :establishment_date, :number_of_shop,
                :co_address_postcode, :co_prefecture, :co_city, :co_address, :co_address_small,
                :capital_stock, :number_of_employees, :number_of_regular_employees, :about_business,:before_the_previous_fiscal_year_ended,

                #前々期決算
                :before_the_previous_fiscal_year_employee, :before_the_previous_fiscal_year_average_work_time, :before_the_previous_fiscal_year_sales,
                :before_the_previous_fiscal_year_pre_sales, :before_the_previous_fiscal_year_operating_income, :before_the_previous_fiscal_year_loan,
                :before_the_previous_fiscal_year_cash_deposit, :before_the_previous_fiscal_year_depreciation_cost,:before_the_previous_fiscal_year_capital,
                :before_the_previous_fiscal_year_total_net_assets, :before_the_previous_fiscal_year_total_liabilities, :before_the_previous_fiscal_year_accounts_receivable,
                :before_the_previous_fiscal_year_bills_recivable, :before_the_previous_fiscal_year_inventory, :before_the_previous_fiscal_year_accounts_payable, :before_the_previous_fiscal_year_bills_payable,

                #前期決算
                :previous_fiscal_year_employee, :previous_fiscal_year_average_work_time, :previous_fiscal_year_sales,
                :previous_fiscal_year_pre_sales, :previous_fiscal_year_operating_income, :previous_fiscal_year_loan,
                :previous_fiscal_year_cash_deposit, :previous_fiscal_year_depreciation_cost,:previous_fiscal_year_capital,
                :previous_fiscal_year_total_net_assets, :previous_fiscal_year_total_liabilities, :previous_fiscal_year_accounts_receivable,
                :previous_fiscal_year_bills_recivable, :previous_fiscal_year_inventory, :previous_fiscal_year_accounts_payable, :previous_fiscal_year_bills_payable,

                #ホームページ内容カラム
                :title, :main_color, :sub_color, :sub2_color,
                :menu1, :menu2, :menu3, :menu4, :menu5,
                :image1, :image2, :image3, :image4, :image5,
                :headline1, :headline2, :headline3, :headline4, :headline5,
                :headline6, :headline7, :headline8, :headline9, :headline10,
                :menu1_1, :menu2_1, :menu3_1, :menu4_1, :menu5_1,
                :domain1, :domain2, :domain3
        )

  end

  def authenticate_user?
    unless current_user
      redirect_to new_user_registration_path
    end
  end

  def create_payjp_customer(user, card_token)
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    customer = Payjp::Customer.create(
        email: user.email,
        card: card_token
    )
    user.update!(payjp_id: customer.id)
  end
end
