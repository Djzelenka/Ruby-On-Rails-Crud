class ItemsController < ApplicationController
  
  def index
    items = Item.all
    
    ItemSerializer.new(items).serialized_json
  end

  def show
    item = Item.find_by(params[:id])

    render json: ItemSerializer.new(item).serialized_json
  end

  def create
    item = Item.new(item_params)

    if item.save
      render json: ItemSerializer.new(item).serialized_json
    else
      render json: { error: item.errors.messages }, status: 422
    end
  end

  def update
    item = Item.find_by(params[:id])

    if item.update(item_params)
      render json: ItemSerializer.new(item).serialized_json
    else
      render json: { error: item.errors.messages }, status: 422
    end
  end

    def destroy
    item = Item.find_by(params[:id])

    if item.destroy
      head :no_content
    else
      render json: { errors: item.errors.messages }, status: 422
    end
  end
  

  private 

  def item_params
    params.requre(:item).permit( :name, :description, :cost )
  end

end