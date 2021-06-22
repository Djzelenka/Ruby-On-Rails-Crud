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
      post "/items", params: { item: { name:"New Test Object", description:"Newest object on the market", cost: 13.99 } }

      expect(response).to have_http_status(201)
      json = JSON.parse(response.body)
      expect(json).to contain("New Test Object")
    end
  end

  describe "Put /items", type: :request do
    it "updates an item" do 
      post "/items", params: { item: { name:"New Test Object", description:"Newest object on the market", cost: 13.99 } }

      json = JSON.parse(response.body)
      put "/items/#{json.id}", params: { item: { name:"New Object", description:"Less new object on the market", cost: 13.99 }}
      expect(response).to have_http_status(200)
  end
end

end
