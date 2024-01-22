import os
from dotenv import load_dotenv
from peewee import *

load_dotenv()
port_str = os.environ.get("DATABASE_PORT")

pg_db = PostgresqlDatabase(os.environ.get("DATABASE"), user=os.environ.get("DATABASE_USER"), password=os.environ.get("DATABASE_PASSWORD"),
                           host=os.environ.get("DATABASE_HOST"), port=int(port_str))


class Supplier(Model):
    name = CharField(max_length=120, null=False)
    logo = CharField(max_length=120, null=True)
    state = CharField(max_length=2, null=False)
    min_kwh_limit = FloatField(null=False)
    kwh_cost = FloatField(null=False)
    rating = FloatField(null=True, default=0)
    total_customers = FloatField(null=True, default=0)
    
    class Meta:
        database = pg_db