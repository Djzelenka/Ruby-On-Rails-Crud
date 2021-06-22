require 'rails_helper'

RSpec.describe Item, :type => :model do

    it 'is valid with valid attributes' do
      item = build(:item)
      expect(item).to be_valid
    end

    it 'is not valid without a name' do 
      item = build(:item)
      item.name = ""
      expect(item).to_not be_valid
    end

    it 'is not valid without a description' do
      item = build(:item)
      item.description = ""
      expect(item).to_not be_valid
    end

    it 'is not valid with a negative cost value' do
      item = build(:item)
      item.cost = -2.00
      expect(item).to_not be_valid
    end

    it 'is not valid with a description too long' do
      item = build(:item)
      item.description = "Described item" * 10
      expect(item).to_not be_valid
    end

    it 'is not valid with a name too long' do
      item = build(:item)
      item.name = "Name" * 10
      expect(item).to_not be_valid
    end
end