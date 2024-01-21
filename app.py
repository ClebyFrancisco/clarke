import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class Supplier(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    logo = db.Column(db.String(120), nullable=True)
    state = db.Column(db.String(2), nullable=False)
    min_kwh_limit= db.Column(db.Float, nullable=False)
    kwh_cost = db.Column(db.Float, nullable=False)
    rating = db.Column(db.String, nullable=True, default="[]")
    total_customers = db.Column(db.Integer, nullable=True, default=0)
    

@app.route('/suppliers', methods=['GET', 'POST'])
def suppliers():
    if request.method == 'GET':
        suppliers_list = Supplier.query.all()
        suppliers = [
            {
            'id': supplier.id, 
             'name': supplier.name, 
             'logo': supplier.logo, 
             'state': supplier.state, 
             'min_kwh_limit': supplier.min_kwh_limit, 
             'kwh_cost': supplier.kwh_cost, 
             'rating': supplier.rating, 
             'total_customers': supplier.total_customers
             } for supplier in suppliers_list]

        return jsonify(suppliers)
    elif request.method == 'POST':
        data = request.get_json()
        new_supplier = Supplier(
            name=data['name'], 
            logo=data.get('logo', None), 
            state=data['state'], 
            min_kwh_limit=data['min_kwh_limit'],
            kwh_cost=data['kwh_cost']
            )
        db.session.add(new_supplier)
        db.session.commit()
        return jsonify({'message': 'Supplier created successfully'}), 201

@app.route('/suppliers/<int:supplier_id>', methods=['GET', 'PUT', 'DELETE'])
def supplier_detail(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    
    if request.method == 'GET':
        return jsonify({
            'id': supplier.id, 
             'name': supplier.name, 
             'logo': supplier.logo, 
             'state': supplier.state, 
             'min_kwh_limit': supplier.min_kwh_limit, 
             'kwh_cost': supplier.kwh_cost, 
             'rating': supplier.rating, 
             'total_customers': supplier.total_customers
             } )
    elif request.method == 'PUT':
        data = request.get_json()
        supplier.name=data['name'], 
        supplier.logo=data.get('logo', None), 
        supplier.state=data['state'], 
        supplier.min_kwh_limit=data['min_kwh_limit'],
        supplier.kwh_cost=data['kwh_cost']
        
        db.session.commit()
        return jsonify({'message': 'Supplier updated successfully'})
    
    elif request.method == 'DELETE':
        db.session.delete(supplier)
        db.session.commit()
        return jsonify({'message': 'Supplier deleted successfully'})

    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
