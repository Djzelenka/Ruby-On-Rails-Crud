require "test_helper"

class ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @item = Item.new(name: "new item", description:"brand new item", cost:12.55)
  end

  test "item should be valid" do 
    assert @item.valid?
  end

  test "item name should have at least 1 character"
    @item.name = ''
    assert_not @item.valid?
  end

  test "item description should have at least 1 character"
    @item.description = ''
    assert_not @item.valid?
  end

  test "item cost should be non-negative"
    @item.cost = -2
    assert_not @item.valid?
  end

  test 'item description should not exceed 80 characters'
    @item.description = 'a' * 81
    assert_not @item.valid?
  end

  test 'item name should not exceed 20 characters'
    @item.name = 'a' * 21
    assert_not @item.valid?
  end

end
