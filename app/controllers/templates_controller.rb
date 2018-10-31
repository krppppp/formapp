class TemplatesController < ApplicationController
  include PayjpModule
  def p1
    @user =User.find_by(name: params[:name])
  end
  def p2
    @user =User.find_by(name: params[:name])

  end
  def p3
    @user =User.find_by(name: params[:name])

  end

  def pay
    user = User.find(params[:name])
    card_token = params["payjp-token"]
    create_payjp_customer(user, card_token) if user.payjp_id.blank?
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    sub = Payjp::Subscription.create(
        plan: 'pln_a4aac1a3a0bd2474baa9f69d00da',
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
    redirect_to user_path(user)
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
