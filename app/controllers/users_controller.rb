class UsersController < ApplicationController
  require 'aws-sdk-v1'
  require "aws-sdk-core"

  before_action :authenticate_user?
  before_action :update_info, except: [:show, :p1, :pay, :pay2]

  def show
    @user = User.find(params[:id])
    if @user.amount.nil?
      redirect_to users_p1_path(@user.id)
    end
  end

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
        .permit(:id, :email, :password, :amount, :tel,:address,
                :title, :main_color, :sub_color, :sub2_color,
                :city, :self, :name, :business, :establishment_date,
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


  private

  def create_payjp_customer(user, card_token)
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    customer = Payjp::Customer.create(
        email: user.email,
        card: card_token
    )
    user.update!(payjp_id: customer.id)
  end
end
