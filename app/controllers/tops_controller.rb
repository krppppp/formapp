class TopsController < ApplicationController
  before_action :authenticate_user?, except: :about
  before_action :set_top, only: [:show, :edit, :update, :destroy]

  # GET /tops
  # GET /tops.json
  def index
    if current_user.amount.nil?
      redirect_to users_p20_path(current_user.id)
    else
      redirect_to user_path(current_user.id)
    end
  end

 def about

 end




  private


  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params
        .require(:user)
        .permit(:id, :email, :password, :latitude, :first_name, :last_name, :amount,
                :main_image, :title, :template, :theme_color,
                :city, :self, :name, :menu1, :menu2, :menu3, :menu4, :menu5,
                :heading1, :heading2, :heading3, :heading4, :heading5,
                :subheading1, :subheading2, :subheading3, :subheading4, :subheading5,
                :image1, :image2, :image3, :image4, :image5,
                :headline1, :headline2, :headline3, :headline4, :headline5,
                :menu1_1, :menu2_1, :menu3_1, :menu4_1, :menu5_1,
                :character1, :character2, :character3, :character4, :character5,
                :character6, :character7, :character8, :character9, :character10)

  end
end
