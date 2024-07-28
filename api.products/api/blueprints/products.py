from flask import Blueprint, jsonify, request
from api.models import Product
from api.schemas import ProductSchema

products_blueprint = Blueprint('/products', __name__)
product_schema = ProductSchema(many=True)



@products_blueprint.route('/', methods=['GET'])
def get_products():
    try:
        products = Product.select().where(Product.ProductStatus == 'Active').dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized, 'message': '' }, 200

# @products_blueprint.route('/<int:id>', methods=['GET'])
# def get_product(id):
#     product = Product.get_or_none(Product.ProductID == id)
#     if product:
#         return jsonify(product_schema.dump(product))
#     return jsonify({'error': 'Product not found'}), 404
