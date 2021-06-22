require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /items" do
    it "returns http success" do
      get "/items"
      expect(response).to have_http_status(200)
    end
  end

  describe "Put /items" do


end
