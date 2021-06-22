require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /items" do
    it "returns http success" do
      get "/items"
      expect(response).to have_http_status(200)
    end
  end

RSpec.describe "Put /items", type: :request do
    it "creates a new item" do
      post "/items", item: { name: "New Test Item", description: "The item is a new test item", cost: 13.99 }

      expect(response).to have_http_status(201)
      json = JSON.parse(response.body)
      expect(json[:name]).to eq(["New Test Item"])
    end
  end

end
