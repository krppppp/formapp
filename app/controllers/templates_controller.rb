class TemplatesController < ApplicationController
  include PayjpModule

  def index
    @templates = Template.all

  end

  def p1
    @user =User.find_by(name: params[:name])
    @id = 1
  end
  def p2
    @user =User.find_by(name: params[:name])
    @id = 2

  end
  def p3
    @user =User.find_by(name: params[:name])
    @id = 3

  end

  def pay
    user = User.find(params[:name])
    card_token = params["payjp-token"]
    id = params[:template]

    upload(user, id)

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
    SendMailer.send_when_subscription_create(user).deliver

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

  def upload(user, id)


    doc = File.read("#{Rails.root}/app/views/templates/p#{id}.html.erb")
    doc.gsub!(/<%= @user.title %>/, "#{user.title}")
    doc.gsub!(/<%= @user.menu1 %>/, "#{user.menu1}")
    doc.gsub!(/<%= @user.menu2 %>/, "#{user.menu2}")
    doc.gsub!(/<%= @user.menu3 %>/, "#{user.menu3}")
    doc.gsub!(/<%= @user.menu4 %>/, "#{user.menu4}")
    doc.gsub!(/<%= @user.menu5 %>/, "#{user.menu5}")
    doc.gsub!(/<%= @user.heading1 %>/, "#{user.heading1}")
    doc.gsub!(/<%= @user.heading2 %>/, "#{user.heading2}")
    doc.gsub!(/<%= @user.heading3 %>/, "#{user.heading3}")
    doc.gsub!(/<%= @user.heading4 %>/, "#{user.heading4}")
    doc.gsub!(/<%= @user.heading5 %>/, "#{user.heading5}")
    doc.gsub!(/<%= @user.subheading1 %>/, "#{user.subheading1}")
    doc.gsub!(/<%= @user.subheading2 %>/, "#{user.subheading2}")
    doc.gsub!(/<%= @user.subheading3 %>/, "#{user.subheading3}")
    doc.gsub!(/<%= @user.subheading4 %>/, "#{user.subheading4}")
    doc.gsub!(/<%= @user.subheading5 %>/, "#{user.subheading5}")
    doc.gsub!(/\/assets/, ".")

    client = AWS::S3::Client.new(
        access_key_id: "AKIAJXOOQX7JR6MEO5IQ",
        secret_access_key: "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"
    )
    s3 = AWS::S3.new(
        access_key_id: "AKIAJXOOQX7JR6MEO5IQ",
        secret_access_key: "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"
    )

    bucket_name = "#{user.email.split("@").first}-" + "#{id}"

    #バケット作成
    client.create_bucket(bucket_name: "#{bucket_name}") unless s3.buckets[bucket_name].exists?

    #indexをアップロード
    client.put_object({
                          # :bucket_name => "#{@user.email}-"+"#{i}",
                          :bucket_name => "#{bucket_name}",
                          :key => 'index.html',
                          :data => doc,
                          s3_endpoint: "s3-ap-northeast-1.amazonaws.com"
                      })

    #空のtemplate#{i}フォルダ作成

    client.put_object({
                          # :bucket_name => "#{@user.email}-"+"#{i}",
                          :bucket_name => "#{bucket_name}",
                          :key => "template#{id}/",
                          :data => doc,
                          s3_endpoint: "s3-ap-northeast-1.amazonaws.com"
                      })
    #該当ディレクトリ下の必要なファイルをすべてアップロード
    dir_name = Dir.open("#{Rails.root}/app/assets/images/template#{id}")
    dir_name.each_with_index do |f, index|
      if f == "." || f == ".."
        next
      end
      data = File.read("#{Rails.root}/app/assets/images/template#{id}" + '/' + f)
      client.put_object({
                            :bucket_name => "#{bucket_name}",
                            :key => "template#{id}/#{f}",
                            :data => data,
                            s3_endpoint: "s3-ap-northeast-1.amazonaws.com"
                        })
    end
    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AddPerm",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::#{bucket_name}/*"
                ]
            }
        ]
    }.to_json
    client.set_bucket_policy(
        bucket_name: bucket_name,
        policy: policy
    )
  end
end
