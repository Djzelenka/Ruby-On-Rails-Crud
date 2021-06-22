require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /items" do
    it "returns http success" do
      get "/items"
      expect(response).to have_http_status(200)
    end
  end

  describe "Post /items", type: :request do
    it "creates a new item" do
      item = build(:item)
      post "/items", item

      expect(response).to have_http_status(201)
      json = JSON.parse(response.body)
      expect(json[:name]).to eq(["Test Object"])
    end
  end

end
