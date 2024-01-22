import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from database import pg_db, Supplier


app = Flask(__name__)

pg_db.connect()
pg_db.create_tables([Supplier])

@app.route('/suppliers', methods=['GET', 'POST'])
def suppliers():
    if request.method == 'GET':
        suppliers_list = Supplier.select()

        consumption_param = request.args.get('consumption')

        if consumption_param is not None and consumption_param.isdigit():
            consumption = float(consumption_param)
            suppliers_list = suppliers_list.where(Supplier.min_kwh_limit > consumption)

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
        new_supplier = Supplier.create(
            name=data['name'],
            logo=data.get('logo', None),
            state=data['state'],
            min_kwh_limit=data['min_kwh_limit'],
            kwh_cost=data['kwh_cost']
        )
        return jsonify({'message': 'Supplier created successfully'}), 201

@app.route('/suppliers/<int:supplier_id>', methods=['GET', 'PUT', 'DELETE'])
def supplier_detail(supplier_id):
    supplier = Supplier.get_or_none(id=supplier_id)

    if supplier is None:
        return jsonify({'error': 'Supplier not found'}), 404

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
        })
    elif request.method == 'PUT':
        data = request.get_json()
        supplier.name = data['name']
        supplier.logo = data.get('logo', None)
        supplier.state = data['state']
        supplier.min_kwh_limit = data['min_kwh_limit']
        supplier.kwh_cost = data['kwh_cost']
        supplier.save()
        return jsonify({'message': 'Supplier updated successfully'})

    elif request.method == 'DELETE':
        supplier.delete_instance()
        return jsonify({'message': 'Supplier deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
