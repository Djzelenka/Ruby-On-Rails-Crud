require 'rails_helper'

RSpec.describe Item, :type => :model do
    before(:each) do  
    item = build(:item)
  

    it 'is valid with valid attributes' do
      expect(item).to be_valid
    end

    it 'is not valid without a name' do 
      item.name = ""
      expect(item).to_not be_valid
    end

    it 'is not valid without a description' do
      item.description = ""
      expect(item).to_not be_valid
    end

    it 'is not valid with a negative cost value' do
      item.cost = -2.00
      expect(item).to_not be_valid
    end

    it 'is not valid with a description too long' do
      item.description = "Described item" * 10
      expect(item).to_not be_valid
    end

    it 'is not valid with a name too long' do
      item.name = "Name" * 10
      expect(item).to_not be_valid
    end
  end
end