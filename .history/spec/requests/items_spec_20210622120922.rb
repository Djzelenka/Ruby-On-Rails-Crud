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
    end
  end

  describe "Put /items", type: :request do
    it "updates an item" do 
      item = create(:item)

      put "/items/#{item.id}", params: { item: { name:"New Object", description:"Less new object on the market", cost: 13.99 }}
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json[data][attributes][name]).to eq("New Object")
    end
  end

  describe "Delete /items", type: :request do
    it "deletes an item" do
      item = create(:item)

      delete "/items/#{item.id}"
      expect(response).to have_http_status(204)
    end
  end

end
