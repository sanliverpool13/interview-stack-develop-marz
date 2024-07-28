from pytest import fixture
from flask import Flask
from peewee import SqliteDatabase
from api.models import Product
from api.blueprints.products import products_blueprint
import json

_TABLES = (Product,)

@fixture()
def test_db():
    db = SqliteDatabase(':memory:')
    with db.bind_ctx(_TABLES):
        db.create_tables(_TABLES)
        try:
            yield db
        finally:
            db.drop_tables(_TABLES)

@fixture()
def test_app(test_db):
    app = Flask(__name__)
    app.register_blueprint(products_blueprint, url_prefix='/products')
    app.config.update({
        "TESTING": True,
    })
    yield app

@fixture()
def test_client(test_app):
    return test_app.test_client()

@fixture()
def init_db():
    active_product_1 = Product(
        ProductName="Product1",
        ProductPhotoURL="/product1",
        ProductStatus="Active"
    )
    active_product_1.save()

    active_product_2 = Product(
        ProductName="Product2",
        ProductPhotoURL="/product2",
        ProductStatus="Active"
    )
    active_product_2.save()

    inactive_product = Product(
        ProductName="Product3",
        ProductPhotoURL="/product3",
        ProductStatus="InActive"
    )
    inactive_product.save()

    return [active_product_1, active_product_2, inactive_product]

def test_get_active_products(test_client, init_db):
    response = test_client.get('/products/')
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    assert len(deserialized_response['data']) == 2
    for product in deserialized_response['data']:
        assert product['ProductStatus'] == 'Active'

# def test_get_product_by_id(test_client, init_db):
#     [active_product, _, _] = init_db
#     response = test_client.get(f"/products/{active_product.ProductID}")
#     assert response.status_code == 200
#     deserialized_response = json.loads(response.data)
#     assert deserialized_response['ProductID'] == active_product.ProductID
#     assert deserialized_response['ProductName'] == active_product.ProductName

# def test_get_product_by_invalid_id(test_client, init_db):
#     response = test_client.get("/products/99999")
#     assert response.status_code == 404
#     deserialized_response = json.loads(response.data)
#     assert 'error' in deserialized_response
#     assert deserialized_response['error'] == 'Product not found'
