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
    puts pass_temp
    @user.encrypted_password = BCrypt::Password.create(pass_temp)
    @user.save
    SendMailer.send_when_registration(current_user, pass_temp).deliver
  end

  def after_sign_up_path_for(resource)
    about_path
  end

  def after_inactive_sign_up_path_for(resource)
    about_path
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
    params.require(:user).permit(:last_name, :first_name, :last_name_kana, :first_name_kana, :email, :business_type,
                                 :tel, :password, :salt, :encrypted_password,
                                 :latitude, :main_image, :title, :city, :self,
                                 :menu1, :menu2, :menu3, :menu4, :menu5,
                                 :image1, :image2, :image3, :image4, :image5,
                                 :headline1, :headline2, :headline3,:headline4, :headline5, :headline6,
                                 :headline7, :headline8, :headline9,:headline10,
                                 :menu1_1, :menu2_1, :menu3_1, :menu4_1, :menu5_1,
    )
  end
end
