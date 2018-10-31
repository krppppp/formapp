class UsersController < ApplicationController
  require 'aws-sdk-v1'
  require "aws-sdk-core"

  before_action :set_user

  def show

  end

  def edit
  end

  def update

    @user = User.find(params[:id])

    if @user.update(user_params)
      for i in 1..3 do
        #i = 1

        #doc = File.read('/app/views/templates/p1.html.erb')
        doc = File.read("#{Rails.root}/app/views/templates/p#{i}.html.erb")
        doc.gsub!(/<%= @user.title %>/, "#{@user.title}")
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

        #空のtemplate#{i}フォルダ作成

        client.put_object({
                              # :bucket_name => "#{@user.email}-"+"#{i}",
                              :bucket_name => "#{bucket_name}",
                              :key => "template#{i}/",
                              :data => doc,
                              s3_endpoint: "s3-ap-northeast-1.amazonaws.com"
                          })
        #該当ディレクトリ下の必要なファイルをすべてアップロード
        dir_name = Dir.open("/app/assets/images/template#{i}")
        dir_name.each_with_index do |f, index|
          if index == 0 || index == 1
            next
          end
          data = File.read("/app/assets/images/template#{i}" + '/' + f)
          client.put_object({
                                :bucket_name => "#{bucket_name}",
                                :key => "template#{i}/#{f}",
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
      redirect_to user_path(current_user)
    else
      redirect_to edit_user_path(current_user)
    end
  end

  def destroy

  end

  private

  def user_params
    params
        .require(:user)
        .permit(:id, :email, :password, :latitude, :first_name, :last_name,
                :main_image, :title,
                :city, :self, :name, :menu1, :menu2, :menu3, :menu4, :menu5,
                :heading1, :heading2, :heading3, :heading4, :heading5,
                :subheading1, :subheading2, :subheading3, :subheading4, :subheading5,
                :sub_image1, :sub_image2, :sub_image3, :sub_image4, :sub_image5,
                :sub_icon1, :sub_icon2, :sub_icon3, :sub_icon4, :sub_icon5)

  end

  def set_user
    @user = User.find(params[:id])
  end
end
