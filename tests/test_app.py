import json
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_suppliers(client):
    response = client.get('/suppliers')

   
    assert response.status_code == 200

    
    data = json.loads(response.data)

    assert isinstance(data, list)

    
    for supplier in data:
        assert 'id' in supplier
        assert 'name' in supplier
        assert 'logo' in supplier
        assert 'state' in supplier
        assert 'min_kwh_limit' in supplier
        assert 'kwh_cost' in supplier
        assert 'rating' in supplier
        assert 'total_customers' in supplier

