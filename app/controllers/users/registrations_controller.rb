# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    super
    @user = User.find(current_user.id)
    pass_temp = Devise.friendly_token.first(8)
    @user.encrypted_password = BCrypt::Password.create(pass_temp)
    @user.save
    url = []


    for i in 1..2 do
      doc = File.read("#{Rails.root}/app/views/templates/p#{i}.html.erb")
      doc.sub!(/<%= @user.title %>/, "#{@user.title}")
      doc.sub!(/<%= @user.menu1 %>/, "#{@user.menu1}")
      doc.sub!(/<%= @user.menu2 %>/, "#{@user.menu2}")
      doc.sub!(/<%= @user.menu3 %>/, "#{@user.menu3}")
      doc.sub!(/<%= @user.menu4 %>/, "#{@user.menu4}")
      doc.sub!(/<%= @user.menu5 %>/, "#{@user.menu5}")
      doc.sub!(/<%= @user.subheading1 %>/, "#{@user.subheading1}")
      doc.gsub!(/\/assets/, ".")

      client = AWS::S3::Client.new(
          access_key_id: "AKIAJXOOQX7JR6MEO5IQ",
          secret_access_key: "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"
      )
      s3 = AWS::S3.new(
          access_key_id: "AKIAJXOOQX7JR6MEO5IQ",
          secret_access_key: "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"
      )

      bucket_name = "#{@user.email.split("@").first}-" + "#{i}"

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

      url.push("https://s3.amazonaws.com/#{bucket_name}/index.html")
    end
    puts url.class
    puts url.length
    SendMailer.send_when_update(current_user, pass_temp, url).deliver


  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  def user_params
    params.require(:user).permit(:name, :email, :password, :salt, :encrypted_password,
                                 :latitude, :main_image, :title, :city, :self,
                                 :menu1, :menu2, :menu3, :menu4, :menu5,
                                 :heading1, :heading2, :heading3, :heading4, :heading5,
                                 :subheading1, :subheading2, :subheading3, :subheading4, :subheading5,
                                 :sub_image1, :sub_image2, :sub_image3, :sub_image4, :sub_image5,
                                 :sub_icon1, :sub_icon2, :sub_icon3, :sub_icon4, :sub_icon5
    )
  end
end
