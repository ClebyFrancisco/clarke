import pytest
from app import app, db, Todo

@pytest.fixture
def client():
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    db.create_all()
    with app.test_client() as client:
        yield client
    db.drop_all()

def test_1():
    assert 1+1==2



