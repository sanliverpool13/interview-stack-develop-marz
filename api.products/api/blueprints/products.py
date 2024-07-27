from flask import Blueprint, jsonify, request
from api.models import Product
from api.schemas import ProductSchema

products_blueprint = Blueprint('/products', __name__)
product_schema = ProductSchema(many=True)

@products_blueprint.route('/', methods=['GET'])
def get_products():
    products = Product.select().where(Product.ProductStatus == 'Active')
    return jsonify(product_schema.dump(products))

@products_blueprint.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.get_or_none(Product.ProductID == id)
    if product:
        return jsonify(product_schema.dump(product))
    return jsonify({'error': 'Product not found'}), 404
