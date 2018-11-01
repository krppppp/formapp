# == Schema Information
#
# Table name: subscriptions
#
#  id                   :integer          not null, primary key
#  payjp_id             :string(255)      not null
#  user_id            :integer
#  status               :integer          not null
#  current_period_start :integer
#  current_period_end   :integer
#  trial_start          :integer
#  trial_end            :integer
#  canceled_at          :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Subscription < ApplicationRecord
  validates :payjp_id, presence: true
  validates :payjp_id, uniqueness: true
  belongs_to :user

  enum status: %i(trial active canceled paused)

  def is_valid?
    update_subscription if update_needed?
    trial? || active? || ( canceled? && Time.zone.at(current_period_end) >= Time.zone.now )
  end

  def update_subscription
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    sub = Payjp::Subscription.retrieve payjp_id
    self.update!(
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
        trial_start: sub.trial_start,
        trial_end: sub.trial_end,
        canceled_at: sub.canceled_at
    )
  end

  private

  def update_needed?
    ( trial? && Time.zone.at(trial_end) <= Time.zone.now ) ||
        ( active? && Time.zone.at(current_period_end) <= Time.zone.now )
  end
end
